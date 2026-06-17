const { test, expect } = require('@playwright/test');

test.describe('UI and User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Disable onboarding tour
    await page.addInitScript(() => {
      window.localStorage.setItem('en_onboarding_done', 'true');
    });
  });

  test('Should render grammar tables correctly without raw markdown', async ({ page }) => {
    await page.goto('/');

    // Wait for boot
    await page.waitForSelector('.menu-btn');
    
    // Navigate to grammar
    await page.evaluate(() => window.App.irPara('gramatica'));
    
    // Wait for the grammar container
    const grammarView = page.locator('#gramatica-view');
    await expect(grammarView).toBeVisible();

    // Verify there are no raw markdown table characters like "|---|" showing in text
    const rawMarkdown = await grammarView.evaluate(el => el.textContent.includes('|---|---|'));
    expect(rawMarkdown).toBe(false);
  });

  test('Should align dialogue bubbles correctly based on Utente/Personaggio', async ({ page }) => {
    await page.goto('/');

    // Wait for boot
    await page.waitForSelector('.menu-btn');

    // Force load a dialogue to bypass navigation
    await page.evaluate(() => {
      // Mock dialogue data for test
      window.App.dialogoAtivo = {
        titulo: "Test Dialogue",
        linhas: [
          { nome: "You", texto: "Hello there!", traducao: "Olá!" },
          { nome: "Clerk", texto: "Hi! How can I help?", traducao: "Oi!" }
        ]
      };
      window.App.renderizarDialogo(window.App.dialogoAtivo);
      window.App.irPara('dialogo');
    });

    const dialogoView = page.locator('#dialogo-view');
    await expect(dialogoView).toBeVisible();

    // Find the first bubble (You)
    const firstTurn = page.locator('.dialogo-turno').nth(0);
    await expect(firstTurn).toHaveClass(/utente/); // Should have 'utente' class for You

    // Find the second bubble (Clerk)
    const secondTurn = page.locator('.dialogo-turno').nth(1);
    await expect(secondTurn).toHaveClass(/personaggio/); // Should have 'personaggio' class for others
  });
});
