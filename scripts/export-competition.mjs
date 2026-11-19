import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const sourceDir = 'C:\\Users\\user\\Desktop\\Edelen Doors Competition Presentation';
const outDir = path.join(sourceDir, 'Competition_Ready_800x640_300DPI');
await mkdir(outDir, { recursive: true });

const src = (name) => path.join(sourceDir, name);
const SCALE = 2; // presentation captures were rendered at deviceScaleFactor 2

const C = {
  paper: { r: 251, g: 250, b: 247 },
  line: { r: 229, g: 229, b: 224 },
  navy: { r: 10, g: 37, b: 64 },
  white: { r: 255, g: 255, b: 255 },
};

async function panel(file, cropCss, w, h, fit = 'contain', position = 'centre') {
  const [x, y, cw, ch] = cropCss;
  const extract = {
    left: Math.round(x * SCALE),
    top: Math.round(y * SCALE),
    width: Math.round(cw * SCALE),
    height: Math.round(ch * SCALE),
  };
  const input = await sharp(src(file))
    .extract(extract)
    .resize(w, h, {
      fit,
      position,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: 'lanczos3',
    })
    .png()
    .toBuffer();
  return input;
}

async function solid(w, h, color) {
  return sharp({ create: { width: w, height: h, channels: 3, background: color } }).png().toBuffer();
}

async function exportCanvas(name, panels, background = C.paper) {
  const composite = [];
  for (const p of panels) {
    const buf = await panel(p.file, p.crop, p.w, p.h, p.fit || 'contain', p.position);
    composite.push({ input: buf, left: p.left, top: p.top });
  }
  for (const l of panels.lines || []) {
    composite.push({ input: await solid(l.w, l.h, l.color || C.line), left: l.left, top: l.top });
  }
  const output = path.join(outDir, name);
  console.log('writing', output, 'composites', composite.length, 'sizes', composite.map((c) => c.input.length));
  await sharp({ create: { width: 800, height: 640, channels: 3, background } })
    .composite(composite)
    .withMetadata({ density: 300 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);
  console.log('exported', name);
}

const F = {
  hero: '02-hero-the-window-makes-the-view.png',
  milgard: '04-milgard-c700-fiberglass.png',
  showroom: '05-showroom-experience.png',
  products: '06-product-collection.png',
  repairs: '07-repair-and-installation.png',
  trust: '08-why-edelen.png',
  reviews: '09-customer-reviews.png',
  brands: '10-brands-we-carry.png',
  contact: '12-consultation-form.png',
  footer: '13-footer.png',
};

// 01 — Hero: full-height crop keeps the headline, CTAs and bright window/view.
const heroCrop = [0, 0, 980, 784];
await exportCanvas('01_Hero.png', [
  { file: F.hero, crop: heroCrop, w: 800, h: 640, fit: 'cover', left: 0, top: 0 },
]);

// 02 — Milgard: full-height crop keeps logo, headline, finishes and primary CTA.
const milgardCrop = [0, 80, 1000, 800];
await exportCanvas('02_Milgard_C700.png', [
  { file: F.milgard, crop: milgardCrop, w: 800, h: 640, fit: 'cover', left: 0, top: 0 },
], C.navy);

// 03 — Showroom: image and showroom details as balanced side-by-side panels.
const showroomPanels = [
  { file: F.showroom, crop: [60, 100, 640, 600], w: 420, h: 640, left: 0, top: 0 },
  { file: F.showroom, crop: [770, 110, 630, 600], w: 380, h: 640, left: 420, top: 0 },
];
showroomPanels.lines = [{ left: 419, top: 0, w: 2, h: 640 }];
await exportCanvas('03_Showroom.png', showroomPanels);

// 04 — Product collection: header strip plus four complete product tiles.
const productPanels = [
  { file: F.products, crop: [60, 120, 1020, 180], w: 800, h: 160, left: 0, top: 0 },
  { file: F.products, crop: [60, 300, 762, 500], w: 400, h: 240, left: 0, top: 160 },
  { file: F.products, crop: [842, 300, 538, 420], w: 400, h: 240, left: 400, top: 160 },
  { file: F.products, crop: [60, 800, 538, 420], w: 400, h: 240, left: 0, top: 400 },
  { file: F.products, crop: [618, 800, 762, 440], w: 400, h: 240, left: 400, top: 400 },
];
productPanels.lines = [
  { left: 0, top: 158, w: 800, h: 2 },
  { left: 0, top: 398, w: 800, h: 2 },
  { left: 399, top: 160, w: 2, h: 480 },
];
await exportCanvas('04_Product_Collection.png', productPanels);

// 05 — Repairs: headline, service photography, service list and CTA.
const repairPanels = [
  { file: F.repairs, crop: [40, 120, 960, 300], w: 800, h: 220, left: 0, top: 0 },
  { file: F.repairs, crop: [60, 430, 540, 690], w: 300, h: 360, left: 20, top: 220 },
  { file: F.repairs, crop: [730, 450, 630, 600], w: 460, h: 360, left: 320, top: 220 },
  { file: F.repairs, crop: [680, 1030, 520, 100], w: 460, h: 60, left: 320, top: 580 },
];
repairPanels.lines = [
  { left: 0, top: 218, w: 800, h: 2 },
  { left: 310, top: 220, w: 2, h: 360 },
];
await exportCanvas('05_Repairs_Installation.png', repairPanels);

// 06 — Trust / reviews / brands: two-column editorial composition.
const trustPanels = [
  { file: F.trust, crop: [60, 120, 700, 440], w: 360, h: 320, left: 0, top: 0 },
  { file: F.brands, crop: [60, 100, 700, 480], w: 360, h: 320, left: 0, top: 320 },
  { file: F.reviews, crop: [60, 120, 840, 130], w: 440, h: 80, left: 360, top: 0 },
  { file: F.reviews, crop: [80, 300, 420, 440], w: 440, h: 560, left: 360, top: 80 },
];
trustPanels.lines = [
  { left: 359, top: 0, w: 2, h: 640 },
  { left: 0, top: 319, w: 359, h: 2 },
];
await exportCanvas('06_Trust_Reviews_Brands.png', trustPanels);

// 07 — Consultation and footer: full contact composition above footer details.
const contactPanels = [
  { file: F.contact, crop: [40, 100, 1360, 750], w: 800, h: 420, fit: 'cover', left: 0, top: 0 },
  { file: F.footer, crop: [40, 60, 1360, 460], w: 800, h: 220, left: 0, top: 420 },
];
contactPanels.lines = [{ left: 0, top: 418, w: 800, h: 2 }];
await exportCanvas('07_Consultation_Footer.png', contactPanels);

// 08 — Curated 2x2 overview: four representative, individually framed sections.
const overviewPanels = [
  { file: F.hero, crop: heroCrop, w: 400, h: 320, fit: 'cover', left: 0, top: 0 },
  { file: F.milgard, crop: milgardCrop, w: 400, h: 320, fit: 'cover', left: 400, top: 0 },
  { file: F.products, crop: [60, 140, 800, 640], w: 400, h: 320, fit: 'cover', left: 0, top: 320 },
  { file: F.contact, crop: [40, 120, 1000, 800], w: 400, h: 320, fit: 'cover', left: 400, top: 320 },
];
overviewPanels.lines = [
  { left: 399, top: 0, w: 2, h: 640 },
  { left: 0, top: 319, w: 800, h: 2 },
];
await exportCanvas('08_Full_Page_Overview.png', overviewPanels);

console.log(`\nOutput folder: ${outDir}`);
