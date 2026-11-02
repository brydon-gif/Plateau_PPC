#!/usr/bin/env python3
"""Extract a member from a Google-Docs .docx export.

The Drive connector hands a .docx back as one long base64 string, which has to
be re-typed into a file before it can be used. That re-typing is lossy, so this
verifies every member against the CRC in its own ZIP data descriptor and tells
you exactly where a member went bad.

Usage: extract_member.py <file.b64> [member] [dest]
"""
import base64, binascii, struct, sys, zlib


def members(raw):
    """(name, data_offset, (crc, csize, usize, descriptor_pos)) for each entry."""
    out, i = [], raw.find(b'PK\x03\x04')
    while i >= 0:
        nlen, elen = struct.unpack_from('<HH', raw, i + 26)
        name = raw[i + 30:i + 30 + nlen].decode('utf-8', 'replace')
        doff = i + 30 + nlen + elen
        d = raw.find(b'PK\x07\x08', doff)
        info = struct.unpack_from('<III', raw, d + 4) + (d,) if d >= 0 else None
        out.append((name, doff, info))
        i = raw.find(b'PK\x03\x04', i + 4)
    return out


def progress(buf):
    """How far a deflate stream inflates before it breaks (locates damage)."""
    d, n, out = zlib.decompressobj(-15), 0, bytearray()
    for j in range(len(buf)):
        try:
            out += d.decompress(buf[j:j + 1])
        except Exception:
            return n, bytes(out), False
        n = j + 1
        if d.eof:
            return n, bytes(out), True
    return n, bytes(out), d.eof


def main(path, want=None, dest=None):
    b64 = open(path).read().strip()
    raw = base64.b64decode(b64 + '=' * (-len(b64) % 4))
    print('decoded %d bytes' % len(raw))
    for name, doff, info in members(raw):
        if info is None:
            print('  %-32s no descriptor (transcription ended early)' % name)
            continue
        crc, csize, usize, _ = info
        try:
            out = zlib.decompressobj(-15).decompress(raw[doff:doff + csize])
            ok = binascii.crc32(out) == crc and len(out) == usize
            print('  %-32s %7d bytes  crc=%s' % (name, len(out), 'OK' if ok else 'MISMATCH'))
            if ok and name == want and dest:
                open(dest, 'wb').write(out)
                print('     -> %s' % dest)
        except Exception:
            n, _, _ = progress(raw[doff:doff + csize])
            print('  %-32s FAILED at compressed byte %d (base64 char ~%d)'
                  % (name, n, (doff + n) // 3 * 4))


if __name__ == '__main__':
    main(*sys.argv[1:])
