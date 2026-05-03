import { chromium } from "playwright";

const url = process.argv[2];
const out = process.argv[3];
const w = Number(process.argv[4] || 1280);
const h = Number(process.argv[5] || 900);
const sel = process.argv[6];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: w, height: h } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
if (sel) {
  const el = await page.$(sel);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
}
await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log("wrote", out);
