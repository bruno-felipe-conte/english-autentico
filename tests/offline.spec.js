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

    // Verify Service Worker registration
    const swRegistration = await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.ready;
      return !!registration;
    });
    expect(swRegistration).toBe(true);
  });

  test('Should fallback gracefully without network and cache (WSOD prevention)', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Simulate offline mode
    await context.setOffline(true);

    // Reload the page while offline
    await page.reload();

    // Verify the app did not crash with WSOD
    const errorScreen = page.locator('.white-screen-of-death'); // Placeholder if any
    await expect(errorScreen).toHaveCount(0);

    // Verify that the fallback JSON prevented a crash, allowing the app container to render
    const menuTitle = page.locator('.menu-titulo').first();
    await expect(menuTitle).toBeVisible();
  });
});
