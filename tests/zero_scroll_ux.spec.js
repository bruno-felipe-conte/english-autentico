// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Zero-Scroll UX Architecture', () => {
  test.use({ serviceWorkers: 'block' });

  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('en_onboarding_done', 'true');
      localStorage.setItem('en_onboarding_visto', 'true');
      localStorage.setItem('en_sidebar_pinned', 'false');
      localStorage.setItem('en_ultimo_aviso_backup', String(Date.now()));
    });
  });
  test('Flashcards: seletor inteligente colapsa durante o estudo e reabre ao alternar', async ({ page }) => {
    await page.goto('http://localhost:8089/#flashcards');
    await page.waitForLoadState('domcontentloaded');

    // Sidebar deve estar inicialmente visível e barra compacta oculta
    const sidebar = page.locator('#fc-studio-sidebar');
    const compactBar = page.locator('#fc-compact-bar');
    await expect(sidebar).toBeVisible();
    await expect(compactBar).toBeHidden();

    // Iniciar estudo selecionando Templo 1
    const templeSelect = page.locator('#flashcard-temple-select');
    await templeSelect.selectOption('1');

    // Após iniciar, o seletor colapsa e a barra compacta surge no topo
    await expect(compactBar).toBeVisible();
    await expect(sidebar).toBeHidden();

    // A barra compacta exibe Templo e Modo
    const badge = page.locator('#fc-compact-origem');
    await expect(badge).toContainText('T1');

    // Clicar em "Options / Opções" reabre a sidebar
    const toggleBtn = page.locator('#fc-compact-toggle-btn');
    await toggleBtn.click();
    await expect(sidebar).toBeVisible();

    // Clicar novamente recolhe a sidebar
    await toggleBtn.click();
    await expect(sidebar).toBeHidden();
  });

  test('Quiz: transição in-place oculta alternativas não selecionadas e exibe barra compacta', async ({ page }) => {
    await page.goto('http://localhost:8089/#quiz');
    await page.waitForLoadState('domcontentloaded');

    // Clicar no primeiro templo desbloqueado para iniciar quiz
    const firstTempleBtn = page.locator('.quiz-templo-btn:not(.bloqueado)').first();
    await expect(firstTempleBtn).toBeVisible();
    await firstTempleBtn.click();

    // Barra compacta do quiz deve estar visível
    const quizBar = page.locator('#quiz-compact-bar');
    await expect(quizBar).toBeVisible();
    await expect(page.locator('#quiz-compact-nome')).toContainText(/Quick Mix|T1|Quiz/);

    // Responder uma alternativa
    const optionBtns = page.locator('#opcoes-grid .opcao-btn');
    await expect(optionBtns.first()).toBeVisible();
    const count = await optionBtns.count();
    expect(count).toBeGreaterThan(1);

    // Clica na primeira opção
    await optionBtns.first().click();

    // As opções não selecionadas e neutras devem ter classe opcao-recolhida (display: none)
    const recolhida = page.locator('#opcoes-grid .opcao-recolhida').first();
    await expect(recolhida).toBeAttached();

    // A explicação e o botão próximo surgem no espaço
    const explicacao = page.locator('#explicacao-container');
    await expect(explicacao).toBeVisible();
  });

  test('Vocab: gaveta de filtros colapsável preserva espaço da viewport', async ({ page }) => {
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    await page.goto('http://localhost:8089/#vocab');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Barra de busca visível no topo
    const busca = page.locator('#vocab-busca');
    await expect(busca).toBeVisible();

    // Gaveta de filtros começa colapsada
    const drawer = page.locator('#vocab-filtros-drawer');
    await expect(drawer).toHaveClass(/recolhido/);

    // Botão de alternar filtros
    const toggleFiltros = page.locator('#vocab-btn-toggle-filtros');
    await expect(toggleFiltros).toBeVisible();

    // Abrir gaveta
    await toggleFiltros.click();
    await page.waitForTimeout(300);
    await expect(drawer).not.toHaveClass(/recolhido/);

    // Fechar gaveta
    await toggleFiltros.click();
    await page.waitForTimeout(300);
    await expect(drawer).toHaveClass(/recolhido/);
  });
});
