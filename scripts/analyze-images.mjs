import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--disable-gpu'],
});
const page = await browser.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'load' });

const files = [
  'image-01.jpg', 'image-02.jpg', 'image-03.jpg', 'image-04.jpg', 'image-05.jpg',
  'image-06.jpg', 'image-07.jpg', 'image-08.webp', 'image-10.jpg', 'image-11.jpg', 'image-13.jpg',
];

const data = await page.evaluate(async (files) => {
  const out = [];
  for (const f of files) {
    const res = await fetch('/assets/' + f);
    const blob = await res.blob();
    const bmp = await createImageBitmap(blob);
    const w = 96, h = 64;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bmp, 0, 0, w, h);
    const px = ctx.getImageData(0, 0, w, h).data;
    const cols = 6, rows = 4;
    const grid = [];
    let totalL = 0, brightX = 0, brightY = 0, brightW = 0;
    for (let ry = 0; ry < rows; ry++) {
      const row = [];
      for (let rx = 0; rx < cols; rx++) {
        let sum = 0, n = 0, rS = 0, gS = 0, bS = 0;
        for (let y = Math.floor(ry*h/rows); y < Math.floor((ry+1)*h/rows); y++) {
          for (let x = Math.floor(rx*w/cols); x < Math.floor((rx+1)*w/cols); x++) {
            const i = (y*w+x)*4;
            const r = px[i], g = px[i+1], b = px[i+2];
            const l = 0.2126*r + 0.7152*g + 0.0722*b;
            sum += l; n++; rS += r; gS += g; bS += b;
            totalL += l;
            const bw = Math.max(0, (l - 150) / 105);
            if (bw > 0) { brightX += (x/w)*bw; brightY += (y/h)*bw; brightW += bw; }
          }
        }
        row.push({ l: Math.round(sum/n), rgb: [Math.round(rS/n), Math.round(gS/n), Math.round(bS/n)] });
      }
      grid.push(row);
    }
    out.push({
      file: f,
      dims: [bmp.width, bmp.height],
      avgL: Math.round(totalL/(w*h)),
      brightCenter: brightW > 0 ? [+(brightX/brightW).toFixed(2), +(brightY/brightW).toFixed(2)] : null,
      grid: grid.map(r => r.map(c => c.l)),
      avgRgb: grid.flat().reduce((a,c)=>[a[0]+c.rgb[0],a[1]+c.rgb[1],a[2]+c.rgb[2]],[0,0,0]).map(v=>Math.round(v/(cols*rows))),
    });
    bmp.close();
  }
  return out;
}, files);

for (const d of data) {
  console.log(`\n${d.file}  ${d.dims.join('x')}  avgL=${d.avgL}  brightCenter=${JSON.stringify(d.brightCenter)}  avgRGB=${d.avgRgb.join(',')}`);
  d.grid.forEach(r => console.log('  ' + r.map(v => String(v).padStart(3)).join(' ')));
}
await browser.close();
