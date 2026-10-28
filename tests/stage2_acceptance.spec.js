// tests/stage2_acceptance.spec.js
const { test, expect } = require('@playwright/test');

const viewports = [
  { name: '1080p Desktop', width: 1920, height: 1080 },
  { name: 'HD Laptop', width: 1366, height: 768 },
  { name: 'Mobile iPhone', width: 390, height: 844 }
];

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('en_onboarding_done', '1');
    localStorage.setItem('en_onboarding_visto', '1');
    localStorage.setItem('onboarding_visto', '1');
    localStorage.setItem('onboarding_done', '1');
    // Suppress periodic backup reminder during test
    localStorage.setItem('en_ultimo_aviso_backup', Date.now().toString());
    localStorage.setItem('it_ultimo_aviso_backup', Date.now().toString());
    // Pre-visit phrasal so Regra de Ouro starts collapsed (default after first visit)
    localStorage.setItem('en_phrasal_visited', '1');
    localStorage.setItem('en_phrasal_regra_ouro', 'collapsed');
  });
});

for (const vp of viewports) {
  test(`Etapa 2 Acceptance: Phrasal Verbs Lab on ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:8089', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    await page.evaluate(() => window.App && window.App.navegar && window.App.navegar('phrasal'));
    await page.waitForSelector('#sec-phrasal.active');
    await page.waitForTimeout(400);

    // 1. Verify Phrasal Section is active
    const sec = page.locator('#sec-phrasal');
    await expect(sec).toBeVisible();

    // Log breakdown of all sections above first card
    const secBox = await sec.boundingBox();
    const heroBox = await page.locator('.phrasal-hero').boundingBox();
    const bannerBox = await page.locator('.phrasal-pronoun-banner').boundingBox();
    const controlsBox = await page.locator('.phrasal-controls').boundingBox();
    const ctaBox = await page.locator('.phrasal-primary-study-cta').boundingBox();
    const firstCard = page.locator('.phrasal-card').first();
    const cardBox = await firstCard.boundingBox();

    console.log(`[${vp.name}] Breakdown:
      secBox.y: ${secBox.y}
      hero: Y=${heroBox.y}, H=${heroBox.height}
      banner: Y=${bannerBox.y}, H=${bannerBox.height}
      controls: Y=${controlsBox.y}, H=${controlsBox.height}
      cta: Y=${ctaBox.y}, H=${ctaBox.height}
      firstCard: Y=${cardBox.y}, H=${cardBox.height}
      cardFromContentTop: ${cardBox.y - secBox.y}`);

    // In 1920x1080: first card appears <= ~330px from top of content area
    if (vp.width >= 1920) {
      const cardFromContentTop = cardBox.y - secBox.y;
      expect(cardFromContentTop).toBeLessThanOrEqual(330);
    }

    // 3. Verify "Estudar agora" CTA button is visible without scrolling
    const studyCta = page.locator('.phrasal-primary-study-cta');
    await expect(studyCta).toBeVisible();
    if (vp.height >= 768) {
      expect(ctaBox.y).toBeLessThan(vp.height);
    }

    // 4. Verify no horizontal scrollbar
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`[${vp.name}] ScrollWidth: ${scrollWidth}px, ClientWidth: ${clientWidth}px`);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

    // 5. Verify all 415 cards rendered
    const cardCount = await page.locator('.phrasal-card').count();
    expect(cardCount).toBe(415);

    // 6. Test Card Accordion Expand & Collapse
    const cardHeader = firstCard.locator('.phrasal-card-compact-header');
    await expect(firstCard).not.toHaveClass(/expandido/);
    await cardHeader.click();
    await expect(firstCard).toHaveClass(/expandido/);
    const details = firstCard.locator('.phrasal-card-details');
    await expect(details).toBeVisible();
    await cardHeader.click();
    await expect(firstCard).not.toHaveClass(/expandido/);

    // 7. Test "Expandir todos / Recolher todos" button
    const toggleAllBtn = page.locator('#phrasal-toggle-all-btn');
    await expect(toggleAllBtn).toBeVisible();
    await toggleAllBtn.click();
    await expect(page.locator('.phrasal-card.expandido').first()).toBeVisible();
    await toggleAllBtn.click();
    await expect(page.locator('.phrasal-card.expandido')).toHaveCount(0);

    // 8. Test Regra de Ouro expand/collapse
    const regraToggle = page.locator('#btn-toggle-regra-ouro');
    await expect(regraToggle).toBeVisible();
    const regraBody = page.locator('#phrasal-pronoun-body');
    await expect(regraBody).not.toHaveClass(/expandido/);
    await regraToggle.click();
    await expect(regraBody).toHaveClass(/expandido/);
    await regraToggle.click();
    await expect(regraBody).not.toHaveClass(/expandido/);

    // 9. Verify minigame button still opens modal
    await page.click('.phrasal-minigame-btn');
    await page.waitForSelector('.phrasal-modal-overlay');
    await expect(page.locator('.phrasal-modal-title')).toContainText('O Pronome no Meio');
    await page.click('.phrasal-modal-close');
    await page.waitForSelector('.phrasal-modal-overlay', { state: 'detached' });
  });
}

