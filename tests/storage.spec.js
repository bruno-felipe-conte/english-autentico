const { test, expect } = require('@playwright/test');

test.describe('LocalStorage and State Handling', () => {
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

  test('Should handle QuotaExceededError and perform Flashcard GC', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    // Evaluate in context to mock QuotaExceededError when saving flashcards
    await page.evaluate(() => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = function(key, value) {
        if (key === 'en_flashcards') {
          const err = new Error('QuotaExceededError');
          err.name = 'QuotaExceededError';
          throw err;
        }
        originalSetItem.call(localStorage, key, value);
      };
      
      // Inject some mock flashcards to trigger GC
      App.estado.flashcardData = {
        cards: new Array(30).fill({}).map((_, i) => ({ id: `card_${i}`, deck: 't1' }))
      };
    });

    // Handle the expected alert gracefully
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Storage Limit Reached');
      expect(dialog.message()).toContain('auto-cleanup');
      await dialog.accept();
    });

    // Trigger saving flashcards which will throw the mock QuotaExceededError
    await page.evaluate(() => {
      App.salvarFlashcards();
    });

    // Verify Garbage Collection happened (reduced from 30 to 10 cards)
    const cardCount = await page.evaluate(() => App.estado.flashcardData.cards.length);
    expect(cardCount).toBe(10); // 30 - 20 = 10
  });

  test('Should correctly update daily streak using local timezone', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    await page.evaluate(() => {
      // Mock an older date in localStorage
      const pastDate = new Date(Date.now() - 86400000 * 2).toISOString().slice(0, 10);
      App.estado.progresso = {
        ofensiva: 5,
        xp_hoje: 0,
        data_xp_hoje: pastDate,
        xp: 100,
        nivel: 1,
        streak: 5,
        templos_desbloqueados: [1],
        templos_concluidos: [],
        total_palavras: 1000,
        favoritos: []
      };
      // Trigger update
      Progressao.ganhar(50);
    });

    const xpData = await page.evaluate(() => ({
      ofensiva: App.estado.progresso.ofensiva,
      xp_hoje: App.estado.progresso.xp_hoje,
      data_hoje: App.estado.progresso.data_xp_hoje
    }));

    // Local timezone date check
    const now = new Date();
    const expectedDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

    // It was more than 1 day ago, offensive might reset or maintain depending on logic,
    // but the date must be today's local date.
    expect(xpData.data_hoje).toBe(expectedDate);
    expect(xpData.xp_hoje).toBe(50);
  });
});
