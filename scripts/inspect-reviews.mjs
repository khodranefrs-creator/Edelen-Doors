import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000/', { waitUntil: 'load' });
const data = await page.evaluate(() => {
  const s = document.querySelector('section[aria-labelledby="reviews-title"]');
  const r = s.getBoundingClientRect();
  return [...s.querySelectorAll('*')]
    .filter((n) => n.children.length === 0 && n.innerText && n.innerText.trim())
    .map((n) => ({
      tag: n.tagName,
      t: n.innerText.replace(/\s+/g, ' ').trim().slice(0, 90),
      y: Math.round(n.getBoundingClientRect().top - r.top),
      x: Math.round(n.getBoundingClientRect().left - r.left),
      w: Math.round(n.getBoundingClientRect().width),
    }));
});
console.log(data.map((x) => `${x.tag.padEnd(8)} ${String(x.y).padStart(4)} ${x.t}`).join('\n'));
await browser.close();
