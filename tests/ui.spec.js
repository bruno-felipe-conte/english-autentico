const { test, expect } = require('@playwright/test');

test.describe('UI and User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Disable onboarding tour and Service Worker reloads
    await page.addInitScript(() => {
      window.localStorage.setItem('en_onboarding_done', 'true');
      if (navigator.serviceWorker) {
        navigator.serviceWorker.register = () => new Promise(() => {}); // No-op
        const originalAddEventListener = navigator.serviceWorker.addEventListener;
        navigator.serviceWorker.addEventListener = function(type, listener, options) {
          if (type === 'controllerchange') return;
          return originalAddEventListener.apply(this, arguments);
        };
      }
    });
  });

  test('Should render grammar tables correctly without raw markdown', async ({ page }) => {
    await page.goto('/');

    // Wait for boot
    await page.waitForSelector('.nav-tab');
    
    // Navigate to grammar
    await page.evaluate(() => App.navegar('grammar'));
    
    // Wait for the grammar container
    const grammarView = page.locator('#sec-grammar');
    await expect(grammarView).toBeVisible();

    // Verify there are no raw markdown table characters like "|---|" showing in text
    const rawMarkdown = await grammarView.evaluate(el => el.textContent.includes('|---|---|'));
    expect(rawMarkdown).toBe(false);
  });

  test('Should align dialogue bubbles correctly based on Utente/Personaggio', async ({ page }) => {
    await page.goto('/');

    // Wait for boot
    await page.waitForSelector('.nav-tab');

    // Navigate to dialogues
    await page.evaluate(() => App.navegar('dialogues'));
    await page.waitForSelector('.dialogue-card');

    // Click the first dialogue card to open it
    await page.locator('.dialogue-card').first().click();

    // Wait for the dialogue conversation bubbles
    await page.waitForSelector('.dialogue-turno');

    const turns = page.locator('.dialogue-turno');
    const count = await turns.count();
    expect(count).toBeGreaterThan(0);

    // Verify at least one bubble has utente or personagem
    const firstTurnClass = await turns.first().getAttribute('class');
    expect(firstTurnClass).toContain('dialogo-turno');
  });
});
