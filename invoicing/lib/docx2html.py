#!/usr/bin/env python3
"""Render a Google-Docs-exported document.xml as HTML for Chromium to lay out.

Only the subset Google emits: tables with fixed grids, cell shading and
borders, inline run formatting, anchored images. Good enough to reproduce the
invoice exactly; not a general WordprocessingML implementation.
"""
import html, os, sys
import xml.etree.ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
WP = '{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}'
EMU = 914400.0


def tw(v):
    return float(v) / 20.0            # twips -> points


def attr(el, name, default=None):
    return default if el is None else el.get(W + name, default)


class Renderer:
    def __init__(self, rels):
        self.rels = rels

    def run_style(self, rPr):
        if rPr is None:
            return ''
        s = []

        def on(tag):
            e = rPr.find(W + tag)
            return e is not None and attr(e, 'val', '1') not in ('0', 'false')

        if on('b'):
            s.append('font-weight:700')
        if on('i'):
            s.append('font-style:italic')
        u = rPr.find(W + 'u')
        if u is not None and u.get(W + 'val', 'single') != 'none':
            s.append('text-decoration:underline')
        c = rPr.find(W + 'color')
        if c is not None and c.get(W + 'val') not in (None, 'auto'):
            s.append('color:#%s' % c.get(W + 'val'))
        sz = rPr.find(W + 'sz')
        if sz is not None:
            s.append('font-size:%gpt' % (float(sz.get(W + 'val')) / 2.0))
        f = rPr.find(W + 'rFonts')
        if f is not None:
            fam = f.get(W + 'ascii') or f.get(W + 'hAnsi') or f.get(W + 'cs')
            if fam:
                s.append("font-family:'%s',Arial,Helvetica,sans-serif" % fam)
        return ';'.join(s)

    def render_drawing(self, drawing):
        cx = cy = None
        for e in drawing.iter(WP + 'extent'):
            cx, cy = e.get('cx'), e.get('cy')
            break
        blip = None
        for b in drawing.iter(A + 'blip'):
            blip = b.get(R + 'embed')
            break
        src = self.rels.get(blip)
        if not src:
            return ''
        style = 'width:%gin;height:%gin;' % (int(cx) / EMU, int(cy) / EMU) if cx and cy else ''
        return '<img src="%s" style="%sdisplay:block;" />' % (html.escape(src), style)

    def render_run(self, r):
        style = self.run_style(r.find(W + 'rPr'))
        parts = []
        for child in r:
            if child.tag == W + 't':
                parts.append(html.escape(child.text or '').replace('  ', '&nbsp; '))
            elif child.tag == W + 'br':
                parts.append('<br/>')
            elif child.tag == W + 'tab':
                parts.append('<span style="display:inline-block;width:36pt"></span>')
            elif child.tag == W + 'drawing':
                parts.append(self.render_drawing(child))
        inner = ''.join(parts)
        if not inner:
            return ''
        return '<span style="%s">%s</span>' % (style, inner) if style else inner

    def render_p(self, p):
        pPr = p.find(W + 'pPr')
        s = ['margin:0']
        if pPr is not None:
            sp = pPr.find(W + 'spacing')
            if sp is not None:
                if sp.get(W + 'before'):
                    s.append('margin-top:%gpt' % tw(sp.get(W + 'before')))
                if sp.get(W + 'after'):
                    s.append('margin-bottom:%gpt' % tw(sp.get(W + 'after')))
                line, rule = sp.get(W + 'line'), sp.get(W + 'lineRule')
                if line and rule in (None, 'auto'):
                    s.append('line-height:%g' % (float(line) / 240.0))
                elif line:
                    s.append('line-height:%gpt' % tw(line))
            jc = pPr.find(W + 'jc')
            if jc is not None:
                m = {'left': 'left', 'start': 'left', 'center': 'center',
                     'right': 'right', 'end': 'right', 'both': 'justify'}
                s.append('text-align:%s' % m.get(jc.get(W + 'val'), 'left'))
            ind = pPr.find(W + 'ind')
            if ind is not None:
                for k, css in (('left', 'margin-left'), ('right', 'margin-right')):
                    if ind.get(W + k):
                        s.append('%s:%gpt' % (css, tw(ind.get(W + k))))
            if attr(pPr.find(W + 'pStyle'), 'val') == 'Title':
                s.append('font-size:26pt')
            rs = self.run_style(pPr.find(W + 'rPr'))
            if rs:
                s.append(rs)
        body = ''.join(self.render_run(r) for r in p.findall(W + 'r'))
        for hl in p.findall(W + 'hyperlink'):
            body += ''.join(self.render_run(r) for r in hl.findall(W + 'r'))
        return '<p style="%s">%s</p>' % (';'.join(s), body or '&nbsp;')

    def border_css(self, tcBorders):
        out = []
        if tcBorders is None:
            return out
        for side, css in (('top', 'border-top'), ('left', 'border-left'),
                          ('bottom', 'border-bottom'), ('right', 'border-right')):
            e = tcBorders.find(W + side)
            if e is None:
                continue
            if e.get(W + 'val', 'single') in ('nil', 'none'):
                out.append('%s:none' % css)
                continue
            sz = float(e.get(W + 'sz', '4')) / 8.0        # eighths of a point
            col = e.get(W + 'color', '000000')
            out.append('%s:%gpt solid #%s' % (css, max(sz, 0.5),
                                              '000000' if col == 'auto' else col))
        return out

    def render_tbl(self, tbl):
        tblPr = tbl.find(W + 'tblPr')
        grid = [int(g.get(W + 'w')) for g in tbl.findall(W + 'tblGrid/' + W + 'gridCol')]
        style = ['border-collapse:collapse', 'table-layout:fixed']
        w = tblPr.find(W + 'tblW') if tblPr is not None else None
        if w is not None and w.get(W + 'type') == 'dxa':
            style.append('width:%gpt' % tw(float(w.get(W + 'w'))))
        else:
            style.append('width:100%')
        jc = tblPr.find(W + 'jc') if tblPr is not None else None
        if jc is not None and jc.get(W + 'val') == 'center':
            style += ['margin-left:auto', 'margin-right:auto']
        out = ['<table style="%s">' % ';'.join(style),
               '<colgroup>' + ''.join('<col style="width:%gpt"/>' % tw(g) for g in grid) + '</colgroup>']
        for tr in tbl.findall(W + 'tr'):
            trPr = tr.find(W + 'trPr')
            rs = []
            if trPr is not None:
                h = trPr.find(W + 'trHeight')
                if h is not None:
                    rs.append('height:%gpt' % tw(h.get(W + 'val')))
            out.append('<tr style="%s">' % ';'.join(rs))
            for tc in tr.findall(W + 'tc'):
                tcPr = tc.find(W + 'tcPr')
                cs, span = ['vertical-align:top', 'overflow-wrap:break-word'], 1
                if tcPr is not None:
                    gs = tcPr.find(W + 'gridSpan')
                    if gs is not None:
                        span = int(gs.get(W + 'val'))
                    shd = tcPr.find(W + 'shd')
                    if shd is not None and shd.get(W + 'fill') not in (None, 'auto'):
                        cs.append('background-color:#%s' % shd.get(W + 'fill'))
                    mar = tcPr.find(W + 'tcMar')
                    if mar is not None:
                        pads = []
                        for side in ('top', 'right', 'bottom', 'left'):
                            e = mar.find(W + side)
                            pads.append('%gpt' % (tw(float(e.get(W + 'w'))) if e is not None else 0))
                        cs.append('padding:%s' % ' '.join(pads))
                    else:
                        cs.append('padding:5pt')
                    va = tcPr.find(W + 'vAlign')
                    if va is not None:
                        cs.append('vertical-align:%s' % {'top': 'top', 'center': 'middle',
                                                         'bottom': 'bottom'}.get(va.get(W + 'val'), 'top'))
                    cs += self.border_css(tcPr.find(W + 'tcBorders'))
                inner = []
                for child in tc:
                    if child.tag == W + 'p':
                        inner.append(self.render_p(child))
                    elif child.tag == W + 'tbl':
                        inner.append(self.render_tbl(child))
                out.append('<td%s style="%s">%s</td>'
                           % (' colspan="%d"' % span if span > 1 else '', ';'.join(cs), ''.join(inner)))
            out.append('</tr>')
        out.append('</table>')
        return ''.join(out)

    def render(self, xml_text):
        body = ET.fromstring(xml_text).find(W + 'body')
        parts = []
        for child in body:
            if child.tag == W + 'tbl':
                parts.append(self.render_tbl(child))
            elif child.tag == W + 'p':
                parts.append(self.render_p(child))
        return '\n'.join(parts)


HEAD = '''<!doctype html>
<html><head><meta charset="utf-8">
<style>
  @page { size: 8.5in 11in; margin: 0; }
  html,body { margin:0; padding:0; }
  body { font-family: Arial, 'Liberation Sans', Helvetica, sans-serif; font-size:11pt; color:#000;
         -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  p { margin:0; } table { border-spacing:0; } img { max-width:100%; }
</style></head><body>
'''
TAIL = '\n</body></html>\n'


def main(doc_path, partsdir, out_html):
    rels = {'rId6': os.path.abspath(os.path.join(partsdir, 'word__media__image1.png')),
            'rId7': os.path.abspath(os.path.join(partsdir, 'word__media__image2.png'))}
    rels = {k: 'file://' + v for k, v in rels.items() if os.path.exists(v)}
    out = Renderer(rels).render(open(doc_path, encoding='utf-8').read())
    open(out_html, 'w', encoding='utf-8').write(HEAD + out + TAIL)
    return out_html


if __name__ == '__main__':
    print(main(sys.argv[1], sys.argv[2], sys.argv[3]))
