// tests/tour.spec.js
const { test, expect } = require('@playwright/test');

test('Tour advances through all 13 steps smoothly without getting stuck', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('http://localhost:8089', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(600);

  // Trigger Tour via ❓ button in header
  const helpBtn = page.locator('.header-icons button[title*="Tour"], .header-icons button:has-text("❓")');
  await expect(helpBtn).toBeVisible();
  await helpBtn.click();
  await page.waitForTimeout(600);

  const popover = page.locator('.driver-popover');
  await expect(popover).toBeVisible();

  const visitedTitles = [];

  for (let s = 1; s <= 13; s++) {
    const title = await page.locator('.driver-popover-title').textContent();
    const progress = await page.locator('.driver-popover-progress-text').textContent();
    console.log(`Step ${s}: ${title} | ${progress}`);
    visitedTitles.push(title);

    const nextBtn = page.locator('.driver-popover-next-btn');
    await expect(nextBtn).toBeVisible();

    const btnText = await nextBtn.textContent();
    if (s === 13) {
      console.log('Final button text:', btnText);
      expect(btnText).toContain('Vamos');
      await nextBtn.click();
      await page.waitForTimeout(400);
      break;
    }

    await nextBtn.click();
    await page.waitForTimeout(350);
  }

  // After last step, tour popover should close
  await expect(page.locator('.driver-popover')).not.toBeVisible();
  expect(visitedTitles.length).toBe(13);
  console.log('Successfully completed all 13 steps!');
});
