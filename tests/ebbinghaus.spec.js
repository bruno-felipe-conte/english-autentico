// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Ebbinghaus Forgetting Curve E2E Spec', () => {
  test('Renderiza o card de Ebbinghaus no estúdio de flashcards com acessibilidade', async ({ page }) => {
    await page.goto('http://localhost:8089/#flashcards');
    await page.waitForLoadState('domcontentloaded');

    // Container deve existir no DOM
    const container = page.locator('#ebbinghaus-container');
    await expect(container).toBeVisible();

    // Card interno deve existir
    const card = container.locator('.it-ebbinghaus-card');
    await expect(card).toBeVisible();

    // SVG acessível presente
    const svg = card.locator('svg[role="img"]');
    await expect(svg).toBeVisible();
    await expect(svg.locator('title')).toBeAttached();
    await expect(svg.locator('title')).toHaveText(/Curva de Esquecimento|Forgetting Curve/);
    await expect(svg.locator('desc')).toBeAttached();

    // Badge de origem (ex: "Sem cards cadastrados" ou "Média do baralho" ou "Card em foco")
    const badge = card.locator('.it-ebbinghaus-badge');
    await expect(badge).toBeVisible();

    // Legenda presente com os dots estilizados
    const legend = card.locator('.it-ebbinghaus-legend');
    await expect(legend).toBeVisible();
    await expect(card.locator('.it-ebbinghaus-dot--current')).toBeVisible();
    await expect(card.locator('.it-ebbinghaus-dot--good')).toBeVisible();

    // Alternar para tema escuro e verificar que o container se adapta
    const themeBtn = page.locator('#theme-toggle');
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await expect(page.locator('body')).toHaveClass(/dark-mode/);
      // O card permanece visível com contraste no dark mode
      await expect(card).toBeVisible();
    }
  });
});
