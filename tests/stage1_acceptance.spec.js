// tests/stage1_acceptance.spec.js
const { test, expect } = require('@playwright/test');

const viewports = [
  { name: '1080p Desktop', width: 1920, height: 1080 },
  { name: 'HD Laptop', width: 1366, height: 768 },
  { name: 'Mobile iPhone', width: 390, height: 844 }
];

for (const vp of viewports) {
  test(`Etapa 1 Acceptance Criteria: ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:8089', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    // 1. Measure header height
    const header = page.locator('.app-header');
    await expect(header).toBeVisible();
    const headerBox = await header.boundingBox();
    console.log(`[${vp.name}] Header height: ${headerBox.height}px`);

    // In desktop, header should be compact (~40-60px)
    if (vp.width >= 1024) {
      expect(headerBox.height).toBeLessThanOrEqual(65);
    }

    // 2. Measure Daily Goal bar height
    const goalBar = page.locator('#daily-goal-bar');
    await expect(goalBar).toBeVisible();
    const goalBox = await goalBar.boundingBox();
    console.log(`[${vp.name}] Goal bar height: ${goalBox.height}px, top: ${goalBox.y}px`);
    expect(goalBox.height).toBeLessThanOrEqual(10);

    // 3. Verify top of active content
    const activeSection = page.locator('.section.active');
    await expect(activeSection).toBeVisible();
    const sectionBox = await activeSection.boundingBox();
    console.log(`[${vp.name}] Section content starts at Y: ${sectionBox.y}px`);

    if (vp.width >= 1024) {
      // Acceptance criterion: useful content starts at <= ~110px
      expect(sectionBox.y).toBeLessThanOrEqual(115);
    }

    // 4. Verify no horizontal scrollbar on body
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`[${vp.name}] ScrollWidth: ${scrollWidth}px, ClientWidth: ${clientWidth}px`);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // 5. Verify all header buttons and stats exist
    await expect(page.locator('#lang-toggle')).toBeVisible();
    await expect(page.locator('#theme-toggle')).toBeVisible();
    await expect(page.locator('#btn-som')).toBeVisible();
    await expect(page.locator('#btn-audio-speed')).toBeVisible();
    await expect(page.locator('#stat-nivel')).toBeVisible();
    await expect(page.locator('#stat-xp')).toBeVisible();
    await expect(page.locator('#stat-streak')).toBeVisible();
    await expect(page.locator('#stat-templi')).toBeVisible();
    await expect(page.locator('#stat-parole')).toBeVisible();
  });
}
