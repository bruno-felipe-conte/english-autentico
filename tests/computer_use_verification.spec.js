// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

const ARTIFACT_DIR = '/home/bruno/.gemini/antigravity/brain/5cb0a274-0748-481b-84eb-9e6f8ee671a6';

test.describe('Computer Use — E2E Visual & Functional Automated Testing', () => {
  test.use({ serviceWorkers: 'block' });

  test('1. Italiano Autêntico — Renderiza a Curva de Ebbinghaus no tema Renascentista e Noturno', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('it_onboarding_done', 'true');
      localStorage.setItem('it_onboarding_visto', 'true');
      localStorage.setItem('it_tour_done', '1');
      localStorage.setItem('it_sidebar_pinned', 'false');
      localStorage.setItem('it_ultimo_aviso_backup', String(Date.now()));
    });

    await page.goto('http://127.0.0.1:8090/');
    await page.waitForLoadState('domcontentloaded');
    await page.click('.nav-tab[data-section="flashcard"]');
    await page.waitForTimeout(600);

    // Selecionar Templo 1 para carregar cards e acionar Ebbinghaus
    const templeSelect = page.locator('#flashcard-templo-select, #flashcard-temple-select');
    await expect(templeSelect).toBeVisible();
    await templeSelect.selectOption('1');
    await page.waitForTimeout(500);

    // Na arquitetura Zero-Scroll, o seletor colapsa ao iniciar. Clicamos em Opções para reabrir a sidebar
    const toggleBtn = page.locator('#fc-compact-toggle-btn');
    if (await toggleBtn.isVisible()) {
      await toggleBtn.click();
      await page.waitForTimeout(400);
    }

    // Verificar card de Ebbinghaus na sidebar
    const ebCard = page.locator('#ebbinghaus-container .it-ebbinghaus-card');
    await expect(ebCard).toBeVisible();
    await expect(ebCard.locator('.it-ebbinghaus-title')).toContainText(/Curva dell’Oblio|Curva de Esquecimento/i);

    // Screenshot do Estúdio de Flashcards no tema Claro (Travertino)
    const lightPath = path.join(ARTIFACT_DIR, 'it-ebbinghaus-light.png');
    await page.screenshot({ path: lightPath, fullPage: false });

    // Alternar para Dark Mode (Noturno Veneziano)
    const themeBtn = page.locator('.theme-toggle-btn').first();
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(400);
      const darkPath = path.join(ARTIFACT_DIR, 'it-ebbinghaus-dark.png');
      await page.screenshot({ path: darkPath, fullPage: false });
    }
  });

  test('2. Italiano Autêntico — Tour Interativo de Ajuda avança sem loops ou travamentos', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('it_onboarding_done', 'true');
      localStorage.setItem('it_onboarding_visto', 'true');
      localStorage.setItem('it_ultimo_aviso_backup', String(Date.now()));
      localStorage.removeItem('it_tour_done');
    });

    await page.goto('http://127.0.0.1:8090/#templi');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(600);

    // Iniciar o tour explicitamente
    await page.evaluate(() => {
      if (window.Tour) window.Tour.iniciar(true);
    });
    await page.waitForTimeout(500);

    // Driver.js popover visível
    const popover = page.locator('.driver-popover');
    await expect(popover).toBeVisible();

    // Avançar 3 passos para garantir que a navegação moveTo() opera perfeitamente
    for (let i = 0; i < 3; i++) {
      const nextBtn = page.locator('.driver-popover-next-btn');
      await expect(nextBtn).toBeVisible();
      await nextBtn.click();
      await page.waitForTimeout(400);
    }

    const tourPath = path.join(ARTIFACT_DIR, 'it-tour-step.png');
    await page.screenshot({ path: tourPath, fullPage: false });

    // Fechar o tour
    const closeBtn = page.locator('.driver-popover-close-btn');
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  });

  test('3. English Autêntico — Seletor Retrátil Inteligente e Zero-Scroll nos Flashcards', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('en_onboarding_done', 'true');
      localStorage.setItem('en_onboarding_visto', 'true');
      localStorage.setItem('en_sidebar_pinned', 'false');
      localStorage.setItem('en_ultimo_aviso_backup', String(Date.now()));
    });

    await page.goto('http://127.0.0.1:8089/#flashcards');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(600);

    // Selecionar Templo 1 para colapsar seletor e exibir barra compacta
    const templeSelect = page.locator('#flashcard-temple-select');
    await templeSelect.selectOption('1');
    await page.waitForTimeout(500);

    const compactBar = page.locator('#fc-compact-bar');
    await expect(compactBar).toBeVisible();

    const fcPath = path.join(ARTIFACT_DIR, 'en-zero-scroll-fc.png');
    await page.screenshot({ path: fcPath, fullPage: false });
  });

  test('4. English Autêntico — Quiz com Transição In-Place e Vocabulário com Gaveta Retrátil', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.addInitScript(() => {
      localStorage.setItem('en_onboarding_done', 'true');
      localStorage.setItem('en_onboarding_visto', 'true');
      localStorage.setItem('en_sidebar_pinned', 'false');
      localStorage.setItem('en_ultimo_aviso_backup', String(Date.now()));
    });

    // --- Quiz In-Place ---
    await page.goto('http://127.0.0.1:8089/#quiz');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const firstTemple = page.locator('.quiz-templo-btn:not(.bloqueado)').first();
    await firstTemple.click();
    await page.waitForTimeout(400);

    const optionBtn = page.locator('#opcoes-grid .opcao-btn').first();
    await optionBtn.click();
    await page.waitForTimeout(400);

    const quizPath = path.join(ARTIFACT_DIR, 'en-quiz-inplace.png');
    await page.screenshot({ path: quizPath, fullPage: false });

    // --- Vocabulário Drawer ---
    await page.goto('http://127.0.0.1:8089/#vocab');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const toggleFiltros = page.locator('#vocab-btn-toggle-filtros');
    await toggleFiltros.click();
    await page.waitForTimeout(300);

    const drawer = page.locator('#vocab-filtros-drawer');
    await expect(drawer).not.toHaveClass(/recolhido/);

    const vocabPath = path.join(ARTIFACT_DIR, 'en-vocab-drawer.png');
    await page.screenshot({ path: vocabPath, fullPage: false });
  });
});
