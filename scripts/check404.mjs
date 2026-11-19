import { chromium } from 'playwright-core';
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
  args: ['--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const bad = [];
page.on('response', (r) => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); });
page.on('requestfailed', (r) => bad.push(`FAILED ${r.url()} ${r.failure()?.errorText}`));
await page.goto('http://localhost:3000/', { waitUntil: 'load' });
await page.waitForTimeout(2500);
console.log(bad.length ? bad.join('\n') : 'no bad responses');
await browser.close();
