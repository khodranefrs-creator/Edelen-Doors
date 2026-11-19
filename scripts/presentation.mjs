import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const desktopDir = 'C:\\Users\\user\\Desktop';
const outDir = path.join(desktopDir, 'Edelen Doors Competition Presentation');
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--disable-gpu', '--hide-scrollbars'],
});

async function prepare(page) {
  await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 90000 });
  // Trigger lazy images and reveal animations.
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 70));
    }
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
}

// Context 1: crisp desktop section captures at 2x.
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await prepare(page);

const shots = [
  { file: '02-hero-the-window-makes-the-view.png', locator: 'section#top' },
  { file: '03-editorial-transition-art-of-the-view.png', locator: 'section[aria-labelledby="view-statement-title"]' },
  { file: '04-milgard-c700-fiberglass.png', locator: 'section#milgard' },
  { file: '05-showroom-experience.png', locator: 'section#showroom' },
  { file: '06-product-collection.png', locator: 'section[aria-labelledby="collection-title"]' },
  { file: '07-repair-and-installation.png', locator: 'section#repairs' },
  { file: '08-why-edelen.png', locator: 'section#about' },
  { file: '09-customer-reviews.png', locator: 'section[aria-labelledby="reviews-title"]' },
  { file: '10-brands-we-carry.png', locator: 'section[aria-labelledby="brands-title"]' },
  { file: '11-service-area.png', locator: 'section[aria-labelledby="area-title"]' },
  { file: '12-consultation-form.png', locator: 'section#contact' },
  { file: '13-footer.png', locator: 'footer' },
];

for (const shot of shots) {
  const el = page.locator(shot.locator).first();
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: path.join(outDir, shot.file), animations: 'disabled' });
  console.log('captured', shot.file);
}
await ctx.close();

// Context 2: full homepage at 1440 width, 1x to keep file size reasonable.
const fullCtx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const fullPage = await fullCtx.newPage();
await prepare(fullPage);
await fullPage.screenshot({ path: path.join(outDir, '01-full-homepage-1440.png'), fullPage: true, animations: 'disabled' });
console.log('captured 01-full-homepage-1440.png');
await fullCtx.close();

// Context 3: wide 1920 hero and full page for large-screen review.
const wideCtx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const widePage = await wideCtx.newPage();
await prepare(widePage);
await widePage.locator('section#top').screenshot({ path: path.join(outDir, '14-hero-1920.png'), animations: 'disabled' });
await widePage.screenshot({ path: path.join(outDir, '15-full-homepage-1920.png'), fullPage: true, animations: 'disabled' });
console.log('captured 14-hero-1920.png and 15-full-homepage-1920.png');
await wideCtx.close();

// Context 4: mobile homepage overview.
const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
const mobilePage = await mobileCtx.newPage();
await prepare(mobilePage);
await mobilePage.screenshot({ path: path.join(outDir, '16-mobile-homepage.png'), fullPage: true, animations: 'disabled' });
console.log('captured 16-mobile-homepage.png');
await mobileCtx.close();

const readme = `EDELEN DOORS & WINDOWS — COMPETITION PRESENTATION\n================================================\n\nHomepage concept: "THE ART OF THE VIEW"\n\nScreenshots\n-----------\n01-full-homepage-1440.png .......... Complete page, standard desktop width\n02-hero-the-window-makes-the-view.png ... Hero / first impression\n03-editorial-transition-art-of-the-view.png ... Editorial chapter divider\n04-milgard-c700-fiberglass.png ...... Milgard C700 feature\n05-showroom-experience.png ......... Showroom section\n06-product-collection.png .......... Product collection\n07-repair-and-installation.png ..... Repair & installation services\n08-why-edelen.png .................. Trust pillars\n09-customer-reviews.png ............ Verified on-site customer reviews\n10-brands-we-carry.png ............. Brand showcase\n11-service-area.png ................ Portland service area\n12-consultation-form.png ........... Final consultation CTA\n13-footer.png ...................... Footer\n14-hero-1920.png ................... Hero at wide desktop width\n15-full-homepage-1920.png .......... Complete page at 1920px\n16-mobile-homepage.png ............. Mobile presentation\n\nAll screenshots were captured from the production build at http://localhost:3000.\nThe original Edelen logo and all official brand imagery are preserved.\n`;
await writeFile(path.join(outDir, 'README.txt'), readme, 'utf8');

await browser.close();
console.log(`\nPresentation folder: ${outDir}`);
