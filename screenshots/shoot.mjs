import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "./screenshots/out.png";
const w = Number(process.argv[4] || 420);
const h = Number(process.argv[5] || 900);
const clickSel = process.argv[6]; // optional CSS selector to click before screenshot

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: w, height: h } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
if (clickSel) {
  await page.click(clickSel);
  await page.waitForTimeout(600); // animation
}
await page.screenshot({ path: out, fullPage: false });
await browser.close();
console.log("wrote", out);
