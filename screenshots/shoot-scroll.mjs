import { chromium } from "playwright";

const url = process.argv[2];
const out = process.argv[3];
const w = Number(process.argv[4] || 1280);
const h = Number(process.argv[5] || 900);
const scrollY = Number(process.argv[6] || 0);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: w, height: h } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
if (scrollY) { await page.evaluate(y => window.scrollTo(0, y), scrollY); await page.waitForTimeout(400); }
await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log("wrote", out);
