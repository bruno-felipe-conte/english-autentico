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
    await page.evaluate(() => App.navegar('grammatica'));
    
    // Wait for the grammar container
    const grammarView = page.locator('#sec-grammatica');
    await expect(grammarView).toBeVisible();

    // Verify there are no raw markdown table characters like "|---|" showing in text
    const rawMarkdown = await grammarView.evaluate(el => el.textContent.includes('|---|---|'));
    expect(rawMarkdown).toBe(false);
  });

  test('Should align dialogue bubbles correctly based on Utente/Personaggio', async ({ page }) => {
    await page.goto('/');

    // Wait for boot
    await page.waitForSelector('.nav-tab');

    // Force load a dialogue to bypass navigation
    await page.evaluate(async () => {
      App.navegar('dialoghi');
      // Wait for Dialoghi loader to finish and write selector HTML
      await Dialoghi.carregar();
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Mock dialogue data for test
      Dialoghi.dialogoAtual = {
        titulo: "Test Dialogue",
        icone: "💬",
        contexto: "Test Context",
        turni: [
          { id: 1, personaggio: "You", frase: "Hello there!", traducao: "Olá!" },
          { id: 2, personaggio: "Clerk", frase: "Hi! How can I help?", traducao: "Oi!" }
        ]
      };
      Dialoghi.modo = 'leitura';
      Dialoghi.renderizarDialogo();
    });

    const dialogoView = page.locator('#sec-dialoghi');
    await expect(dialogoView).toBeVisible();

    // Find the first bubble (You)
    const firstTurn = page.locator('.dialogo-turno').nth(0);
    await expect(firstTurn).toHaveClass(/utente/); // Should have 'utente' class for You

    // Find the second bubble (Clerk)
    const secondTurn = page.locator('.dialogo-turno').nth(1);
    await expect(secondTurn).toHaveClass(/personaggio/); // Should have 'personaggio' class for others
  });
});
