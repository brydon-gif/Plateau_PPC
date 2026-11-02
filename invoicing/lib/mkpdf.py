#!/usr/bin/env python3
"""Paint an extracted layout into a PDF with base-14 fonts and no embedding.

Chromium's own print output is ~90KB because it embeds font subsets. Gmail
attachments have to be hand-typed as base64 into the draft call, and 90KB of
that will not survive the trip - these come out near 2KB.
"""
import json, sys, zlib

PAGE_W, PAGE_H = 612.0, 792.0
DESC = 0.212          # Liberation Sans descent, as a fraction of em


def esc(s):
    return s.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


def build(layout, out_path, compress=True):
    ops, last_col = [], None
    for r in layout['rects'] + [i for i in layout.get('images', []) if i.get('c')]:
        c = r['c']
        if c != last_col:
            ops.append('%.3f %.3f %.3f rg' % tuple(c))
            last_col = c
        ops.append('%.2f %.2f %.2f %.2f re f' % (r['x'], PAGE_H - r['y'] - r['h'], r['w'], r['h']))

    ops.append('BT')
    cur_font = cur_size = None
    last_col = None
    ws = sorted(layout['words'], key=lambda w: (round(w['top'], 1), w['x']))

    # Merge neighbouring words that share a style into one show-text op, so
    # inter-word spacing comes from the PDF font rather than Chromium's metrics.
    groups = []
    for wd in ws:
        if groups:
            g = groups[-1]
            gap = wd['x'] - (g['x'] + g['w'])
            if (abs(wd['top'] - g['top']) < 0.6 and wd['size'] == g['size']
                    and wd['bold'] == g['bold'] and wd['c'] == g['c']
                    and -0.5 <= gap <= 0.45 * wd['size']):
                g['t'] += ('' if gap < 0.12 * wd['size'] else ' ') + wd['t']
                g['w'] = wd['x'] + wd['w'] - g['x']
                continue
        groups.append(dict(wd))

    for wd in groups:
        font, size = '/F2' if wd['bold'] else '/F1', wd['size']
        if (font, round(size, 2)) != (cur_font, cur_size):
            ops.append('%s %.2f Tf' % (font, size))
            cur_font, cur_size = font, round(size, 2)
        if wd['c'] != last_col:
            ops.append('%.3f %.3f %.3f rg' % tuple(wd['c']))
            last_col = wd['c']
        baseline = wd['bot'] - DESC * size
        ops.append('1 0 0 1 %.2f %.2f Tm (%s) Tj' % (wd['x'], PAGE_H - baseline, esc(wd['t'])))
    ops.append('ET')

    content = '\n'.join(ops).encode('latin-1', 'replace')
    stream, filt = (zlib.compress(content, 9), '/Filter /FlateDecode ') if compress else (content, '')
    objs = [
        b'<< /Type /Catalog /Pages 2 0 R >>',
        b'<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
        ('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 %g %g] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>'
         % (PAGE_W, PAGE_H)).encode(),
        ('<< /Length %d %s>>\nstream\n' % (len(stream), filt)).encode() + stream + b'\nendstream',
        b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
        b'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
    ]
    buf, offs = bytearray(b'%PDF-1.4\n'), []
    for i, o in enumerate(objs, 1):
        offs.append(len(buf))
        buf += ('%d 0 obj\n' % i).encode() + o + b'\nendobj\n'
    xref = len(buf)
    buf += ('xref\n0 %d\n' % (len(objs) + 1)).encode() + b'0000000000 65535 f \n'
    for o in offs:
        buf += ('%010d 00000 n \n' % o).encode()
    buf += ('trailer\n<< /Size %d /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n'
            % (len(objs) + 1, xref)).encode()
    open(out_path, 'wb').write(bytes(buf))
    return len(buf)


if __name__ == '__main__':
    print(build(json.load(open(sys.argv[1])), sys.argv[2]), 'bytes')
