const { test, expect } = require('@playwright/test');

test.describe('Offline and Service Worker Resilience', () => {
  test.beforeEach(async ({ page }) => {
    // Disable onboarding tour
    await page.addInitScript(() => {
      window.localStorage.setItem('en_onboarding_done', 'true');
    });
  });

  test('Should load the app and register service worker', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app container to be visible
    const appContainer = page.locator('.app-container');
    await expect(appContainer).toBeVisible();

    // Verify Service Worker registration, handling context destruction from SW reload
    let swRegistration;
    try {
      swRegistration = await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.ready;
        return !!registration;
      });
    } catch (e) {
      // If reload happened, wait for the page load and retry
      await page.waitForLoadState('load');
      swRegistration = await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.ready;
        return !!registration;
      });
    }
    expect(swRegistration).toBe(true);
  });

  test('Should fallback gracefully without network and cache (WSOD prevention)', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for the Service Worker to be ready
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });

    // Simulate offline mode
    await context.setOffline(true);

    // Reload the page while offline
    await page.reload();

    // Verify the app did not crash with WSOD
    const errorScreen = page.locator('.white-screen-of-death'); // Placeholder if any
    await expect(errorScreen).toHaveCount(0);

    // Verify that the fallback JSON prevented a crash, allowing the app container to render
    const menuTitle = page.locator('.section-titulo').first();
    await expect(menuTitle).toBeVisible();
  });
});
