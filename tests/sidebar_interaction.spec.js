// tests/sidebar_interaction.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Sidebar Hover & Pin Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('en_onboarding_done', 'true');
      localStorage.setItem('en_onboarding_visto', 'true');
      localStorage.setItem('en_sidebar_pinned', 'false');
      localStorage.setItem('en_ultimo_aviso_backup', String(Date.now()));
    });
  });

  test('Sidebar collapses to 64px, expands to 200px on hover, and toggles pin correctly on 1920x1080', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:8089', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);

    const sidebar = page.locator('#app-sidebar');
    const mainWrapper = page.locator('.app-main-wrapper');
    const pinBtn = page.locator('#sidebar-pin-btn');

    // 1. Initial unpinned state: collapsed ~64px
    await expect(sidebar).toBeVisible();
    let box = await sidebar.boundingBox();
    expect(Math.round(box.width)).toBe(64);

    let wrapperBox = await mainWrapper.boundingBox();
    expect(Math.round(wrapperBox.x)).toBe(64);

    // Labels should not be visible (opacity 0)
    const label = sidebar.locator('.nav-tab-label').first();
    let opacity = await label.evaluate(el => window.getComputedStyle(el).opacity);
    expect(Number(opacity)).toBe(0);

    // 2. Hover over sidebar: expands to 200px, main wrapper margin stays 64px (floating shadow)
    await sidebar.hover();
    await page.waitForTimeout(300);

    box = await sidebar.boundingBox();
    expect(Math.round(box.width)).toBe(200);

    wrapperBox = await mainWrapper.boundingBox();
    expect(Math.round(wrapperBox.x)).toBe(64);

    opacity = await label.evaluate(el => window.getComputedStyle(el).opacity);
    expect(Number(opacity)).toBe(1);

    // 3. Move mouse away: collapses back to 64px
    await page.mouse.move(500, 500);
    await page.waitForTimeout(300);

    box = await sidebar.boundingBox();
    expect(Math.round(box.width)).toBe(64);

    opacity = await label.evaluate(el => window.getComputedStyle(el).opacity);
    expect(Number(opacity)).toBe(0);

    // 4. Hover again and click Pin button
    await sidebar.hover();
    await page.waitForTimeout(300);
    await expect(pinBtn).toBeVisible();
    await pinBtn.click();
    await page.waitForTimeout(300);

    // Body should have 'sidebar-pinned' class
    const isBodyPinned = await page.evaluate(() => document.body.classList.contains('sidebar-pinned'));
    expect(isBodyPinned).toBe(true);

    // When pinned, sidebar is 200px and main wrapper shifts to 200px
    box = await sidebar.boundingBox();
    expect(Math.round(box.width)).toBe(200);

    wrapperBox = await mainWrapper.boundingBox();
    expect(Math.round(wrapperBox.x)).toBe(200);

    // Move mouse away: stays pinned at 200px!
    await page.mouse.move(500, 500);
    await page.waitForTimeout(300);

    box = await sidebar.boundingBox();
    expect(Math.round(box.width)).toBe(200);

    wrapperBox = await mainWrapper.boundingBox();
    expect(Math.round(wrapperBox.x)).toBe(200);

    opacity = await label.evaluate(el => window.getComputedStyle(el).opacity);
    expect(Number(opacity)).toBe(1);

    // 5. Click Pin button again to unpin
    await pinBtn.click();
    await page.waitForTimeout(300);

    // Move mouse away
    await page.mouse.move(500, 500);
    await page.waitForTimeout(300);

    const isBodyStillPinned = await page.evaluate(() => document.body.classList.contains('sidebar-pinned'));
    expect(isBodyStillPinned).toBe(false);

    box = await sidebar.boundingBox();
    expect(Math.round(box.width)).toBe(64);

    wrapperBox = await mainWrapper.boundingBox();
    expect(Math.round(wrapperBox.x)).toBe(64);
  });
});
