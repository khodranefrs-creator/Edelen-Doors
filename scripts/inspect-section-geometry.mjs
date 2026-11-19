import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'load' });

const selectors = [
  'section#top',
  'section[aria-labelledby="view-statement-title"]',
  'section#milgard',
  'section#showroom',
  'section[aria-labelledby="collection-title"]',
  'section#repairs',
  'section#about',
  'section[aria-labelledby="reviews-title"]',
  'section[aria-labelledby="brands-title"]',
  'section[aria-labelledby="area-title"]',
  'section#contact',
  'footer',
];

const data = await page.evaluate((selectors) => {
  return selectors.map((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { sel, missing: true };
    const r = el.getBoundingClientRect();
    const rel = (n) => ({
      x: Math.round(n.left - r.left),
      y: Math.round(n.top - r.top),
      w: Math.round(n.width),
      h: Math.round(n.height),
    });
    const text = [...el.querySelectorAll('h1,h2,h3,p,a,button')]
      .filter((n) => n.offsetParent !== null)
      .map((n) => ({
        tag: n.tagName.toLowerCase(),
        t: (n.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 55),
        ...rel(n.getBoundingClientRect()),
      }))
      .filter((n) => n.t && n.y < 1100);
    const imgs = [...el.querySelectorAll('img')].map((n) => ({
      src: n.currentSrc.split('/').pop(),
      ...rel(n.getBoundingClientRect()),
    }));
    return { sel, size: [Math.round(r.width), Math.round(r.height)], text: text.slice(0, 30), imgs };
  });
}, selectors);

for (const s of data) {
  console.log('\n###', s.sel, s.missing ? 'MISSING' : s.size.join('x'));
  if (s.missing) continue;
  console.log('TEXT:');
  s.text.forEach((t) => console.log(`  ${t.tag.padEnd(6)} ${String(t.x).padStart(4)},${String(t.y).padStart(4)} ${String(t.w).padStart(4)}x${String(t.h).padStart(3)}  ${t.t}`));
  console.log('IMGS:');
  s.imgs.forEach((i) => console.log(`  ${i.src.padEnd(32)} ${String(i.x).padStart(4)},${String(i.y).padStart(4)} ${String(i.w).padStart(4)}x${String(i.h).padStart(3)}`));
}
await browser.close();
