#!/usr/bin/env python3
"""Replace exact <w:t> run texts in a document.xml, refusing anything ambiguous.

Google splits text across runs, so a date reads as two runs ('09', '/01/2026').
Every replacement must match exactly one run or this raises - a silent partial
edit on an invoice is worse than a crash.
"""
import re


def patch(src_path, pairs, dest_path=None):
    d = open(src_path, encoding='utf-8').read()
    for old, new in pairs:
        pat = re.compile(r'(<w:t[^>]*>)' + re.escape(old) + r'(</w:t>)')
        hits = pat.findall(d)
        if len(hits) != 1:
            raise SystemExit('expected 1 run matching %r, found %d' % (old, len(hits)))
        d = pat.sub(lambda m: m.group(1) + new + m.group(2), d, count=1)
    if dest_path:
        open(dest_path, 'w', encoding='utf-8').write(d)
    return d


def runs(path):
    return re.findall(r'<w:t[^>]*>([^<]*)</w:t>', open(path, encoding='utf-8').read())
