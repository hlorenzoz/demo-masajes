import { chromium } from '@playwright/test';

const base = 'http://localhost:4317/es';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Scroll the whole page slowly so IntersectionObserver reveals fire and imgs load.
async function settle() {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 600) {
      window.scrollTo(0, y);
      await sleep(120);
    }
    window.scrollTo(0, 0);
    await sleep(300);
  });
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map(
          (img) =>
            new Promise((res) => {
              img.onload = img.onerror = res;
            })
        )
    )
  );
  await page.waitForTimeout(600);
}

// Dark (default)
await page.goto(base, { waitUntil: 'networkidle' });
await settle();
await page.screenshot({ path: '/tmp/hondo-dark-hero.png' });
await page.screenshot({ path: '/tmp/hondo-dark-full.png', fullPage: true });

// Light (set localStorage + reload)
await page.evaluate(() => localStorage.setItem('theme', 'light'));
await page.reload({ waitUntil: 'networkidle' });
await settle();
await page.screenshot({ path: '/tmp/hondo-light-hero.png' });
await page.screenshot({ path: '/tmp/hondo-light-full.png', fullPage: true });

await browser.close();
console.log('done');
