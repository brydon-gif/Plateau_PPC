#!/usr/bin/env python3
"""document.xml -> HTML -> (Chromium lays it out) -> compact PDF.

LibreOffice is installed but cannot load any file in this container, so
Chromium does the layout and mkpdf does the painting.
"""
import glob, json, html, os, re, shutil, subprocess, sys
import docx2html, mkpdf

def _find_chrome():
    """Playwright bumps the Chromium build number, so never hard-code the path."""
    for pat in ('/opt/pw-browsers/chromium-*/chrome-linux*/chrome',
                '/opt/pw-browsers/chromium*/chrome-linux*/headless_shell'):
        hits = sorted(glob.glob(pat))
        if hits:
            return hits[-1]
    for name in ('chromium', 'chromium-browser', 'google-chrome'):
        p = shutil.which(name)
        if p:
            return p
    raise SystemExit('no Chromium found under /opt/pw-browsers or on PATH')


CHROME = _find_chrome()
BLUE = [13 / 255, 131 / 255, 221 / 255]       # the header/footer bar in the template
HERE = os.path.dirname(os.path.abspath(__file__))


def render(doc_xml_path, partsdir, stem):
    html_path = stem + '.html'
    docx2html.main(doc_xml_path, partsdir, html_path)
    src = open(html_path, encoding='utf-8').read().replace(
        '</body>', '<script src="%s/extract.js"></script></body>' % HERE)
    open(html_path, 'w', encoding='utf-8').write(src)

    dom = subprocess.run(
        [CHROME, '--headless', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=5000',
         '--window-size=816,1056', '--hide-scrollbars', '--dump-dom',
         'file://' + os.path.abspath(html_path)],
        capture_output=True, text=True, timeout=180).stdout
    m = re.search(r'<pre id="LAYOUT">(.*?)</pre>', dom, re.S)
    if not m:
        raise SystemExit('layout extraction failed - did Chromium load the page?')
    lay = json.loads(html.unescape(m.group(1)))
    for im in lay['images']:
        if 'image1' in (im.get('src') or ''):
            im['c'] = BLUE                     # the bar is a flat colour, draw it as one
    size = mkpdf.build(lay, stem + '.pdf')
    return stem + '.pdf', size, len(lay['words'])


if __name__ == '__main__':
    print(render(sys.argv[1], sys.argv[2], sys.argv[3]))
