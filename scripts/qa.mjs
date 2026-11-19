import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const outDir = 'C:\\Users\\user\\AppData\\Local\\Temp\\opencode\\qa';
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--disable-gpu', '--hide-scrollbars'],
});

const widths = [1440, 1280, 1920];
const results = [];

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: width === 1920 ? 1080 : 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  const failed = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => failed.push(`${r.url()} — ${r.failure()?.errorText}`));

  await page.goto('http://localhost:3000/', { waitUntil: 'load', timeout: 90000 });
  // Scroll through the document to trigger lazy-loaded images.
  await page.evaluate(async () => {
    const step = Math.max(400, Math.round(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
  // Trigger all reveal animations for the full-page capture.
  await page.evaluate(() => document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible')));
  await page.waitForTimeout(300);

  const metrics = await page.evaluate(() => {
    const imgs = [...document.images];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
    const nav = document.querySelector('nav[aria-label="Primary"]');
    const h1 = document.querySelector('h1');
    const header = document.querySelector('header');
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const anchors = [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href')).filter((h) => h && h !== '#');
    const missingAnchors = [...new Set(anchors)].filter((h) => !document.querySelector(h));
    const external = [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !a.rel.includes('noopener')).length;
    return {
      viewport: [window.innerWidth, window.innerHeight],
      title: document.title,
      images: imgs.length,
      broken,
      overflow,
      desktopNavVisible: nav ? getComputedStyle(nav).display !== 'none' : false,
      headerHeight: header ? Math.round(header.getBoundingClientRect().height) : 0,
      h1FontSize: h1 ? getComputedStyle(h1).fontSize : null,
      h1FontFamily: h1 ? getComputedStyle(h1).fontFamily : null,
      bodyFontFamily: getComputedStyle(document.body).fontFamily,
      totalHeight: Math.round(document.documentElement.scrollHeight),
      sectionCount: document.querySelectorAll('section').length,
      missingAnchors,
      externalMissingNoopener: external,
      h2List: [...document.querySelectorAll('h2')].map((h) => h.innerText.replace(/\n/g, ' ')),
    };
  });

  const shot = path.join(outDir, `home-${width}.png`);
  await page.screenshot({ path: shot, fullPage: true });

  results.push({ width, metrics, errors, failed, screenshot: shot });
  await context.close();
}

// Form + interaction test at desktop width.
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
await page.goto('http://localhost:3000/', { waitUntil: 'load' });
await page.locator('#contact form button[type="submit"]').click();
const emptyValidation = await page.evaluate(() => {
  const form = document.querySelector('#contact form');
  return { valid: form.checkValidity(), invalidCount: form.querySelectorAll(':invalid').length };
});
await page.locator('input[name="name"]').fill('Test Homeowner');
await page.locator('input[name="phone"]').fill('503-255-9999');
await page.locator('input[name="email"]').fill('test@example.com');
await page.locator('select[name="projectType"]').selectOption({ index: 1 });
await page.locator('textarea[name="message"]').fill('I would like a quote for new windows.');
await page.locator('#contact form button[type="submit"]').click();
const formFeedback = await page.locator('#contact').innerText();
const formResult = {
  emptyValidation,
  successShown: formFeedback.includes('Thank you for reaching out'),
  honestDemoNote: formFeedback.includes('design prototype'),
};

await browser.close();
console.log(JSON.stringify({ results, formResult }, null, 2));
