// Injected into the invoice HTML; Chromium lays the page out, this reads back
// every painted rectangle and every word with its exact position, and parks the
// result in a <pre> so --dump-dom can return it.
(function () {
  const out = { rects: [], words: [], images: [] };
  const px2pt = 0.75;                       // 96 CSS px/in -> 72 pt/in

  function col(s) {
    const m = s.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if (!m) return null;
    if ((m[4] === undefined ? 1 : parseFloat(m[4])) === 0) return null;
    return [+m[1] / 255, +m[2] / 255, +m[3] / 255];
  }

  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) continue;
    const bg = col(cs.backgroundColor);
    if (bg) out.rects.push({ x: r.x * px2pt, y: r.y * px2pt, w: r.width * px2pt, h: r.height * px2pt, c: bg });
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      const bw = parseFloat(cs['border' + side + 'Width']) || 0;
      if (bw <= 0 || cs['border' + side + 'Style'] === 'none') continue;
      const bc = col(cs['border' + side + 'Color']);
      if (!bc) continue;
      let x = r.x, y = r.y, w = r.width, h = r.height;
      if (side === 'Top') h = bw;
      if (side === 'Bottom') { y = r.bottom - bw; h = bw; }
      if (side === 'Left') w = bw;
      if (side === 'Right') { x = r.right - bw; w = bw; }
      out.rects.push({ x: x * px2pt, y: y * px2pt, w: w * px2pt, h: h * px2pt, c: bc });
    }
    if (el.tagName === 'IMG') {
      out.images.push({ x: r.x * px2pt, y: r.y * px2pt, w: r.width * px2pt, h: r.height * px2pt,
                        src: el.getAttribute('src') });
    }
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const txt = n.nodeValue;
    if (!txt || !txt.trim()) continue;
    const cs = getComputedStyle(n.parentElement);
    const size = parseFloat(cs.fontSize) * px2pt;
    const c = col(cs.color) || [0, 0, 0];
    const bold = (parseInt(cs.fontWeight) || 400) >= 600;
    const re = /\S+/g;
    let m;
    while ((m = re.exec(txt))) {
      const range = document.createRange();
      range.setStart(n, m.index);
      range.setEnd(n, m.index + m[0].length);
      const rects = range.getClientRects();
      if (!rects.length) continue;
      const r = rects[0];
      out.words.push({ t: m[0], x: r.x * px2pt, top: r.y * px2pt, bot: r.bottom * px2pt,
                       w: r.width * px2pt, size: size, bold: bold, c: c });
    }
  }

  const pre = document.createElement('pre');
  pre.id = 'LAYOUT';
  pre.textContent = JSON.stringify(out);
  document.body.appendChild(pre);
})();
