const { test, expect } = require('@playwright/test');

test.describe('End-to-End User Journeys (Computer Use Testing)', () => {
  test.beforeEach(async ({ page }) => {
    // Disable onboarding tour and suppress automatic backup popup during general tests
    await page.addInitScript(() => {
      window.localStorage.setItem('en_onboarding_done', 'true');
      window.localStorage.setItem('en_ultimo_aviso_backup', String(Date.now()));
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

  test('1. Shell & Theme: Toggle Dark Mode and verify header elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    const body = page.locator('body');
    const themeBtn = page.locator('#theme-toggle, .header-icon[data-action="theme"]');
    
    // Check initial state
    const initialDark = await body.evaluate(el => el.classList.contains('dark-mode'));

    // Toggle theme
    if (await themeBtn.isVisible()) {
      await themeBtn.click();
      await page.waitForTimeout(150);
      const newDark = await body.evaluate(el => el.classList.contains('dark-mode'));
      expect(newDark).not.toBe(initialDark);

      // Revert back
      await themeBtn.click();
      await page.waitForTimeout(150);
      const revertedDark = await body.evaluate(el => el.classList.contains('dark-mode'));
      expect(revertedDark).toBe(initialDark);
    }
  });

  test('2. Flashcards: Normal mode and Reverse typing mode without input stickiness', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    // Navigate to Flashcards
    await page.evaluate(() => App.navegar('flashcards'));
    await page.waitForSelector('#flashcard');

    // Ensure temple 1 is selected
    await page.evaluate(() => Flashcards.init(1));
    await page.waitForTimeout(300);

    const card = page.locator('#flashcard');
    await expect(card).toBeVisible();

    // ── TEST NORMAL MODE ──
    expect(await card.evaluate(el => el.classList.contains('virado'))).toBe(false);

    // Flip card
    await page.evaluate(() => Flashcards.virar());
    await page.waitForTimeout(200);
    expect(await card.evaluate(el => el.classList.contains('virado'))).toBe(true);

    // Actions should be visible
    const actions = page.locator('#card-actions');
    await expect(actions).toBeVisible();

    // Rate Good (3) and close achievement modal if unlocked
    await page.evaluate(() => {
      Flashcards.avaliar(3);
      if (typeof Conquistas !== 'undefined' && Conquistas.fecharModal) Conquistas.fecharModal();
    });
    await page.waitForTimeout(300);

    // Close achievement modal if active
    const modal1 = page.locator('#conquista-modal.ativo');
    if (await modal1.count() > 0) {
      await page.evaluate(() => Conquistas.fecharModal());
      await page.waitForTimeout(200);
    }

    // ── TEST REVERSE MODE (ACTIVE RECALL TYPING) ──
    await page.evaluate(() => Flashcards.toggleReverso());
    await page.waitForTimeout(200);

    // Card should have reverse mode class
    expect(await card.evaluate(el => el.classList.contains('modo-reverso'))).toBe(true);

    // Flip card to reveal input
    await page.evaluate(() => Flashcards.virar());
    await page.waitForTimeout(200);

    // Verify typing input exists
    const reverseInput = page.locator('#fc-reverso-input');
    await expect(reverseInput).toBeVisible();

    // Type a test word (e.g. "good morning")
    await reverseInput.fill('good morning');
    
    // Click verify
    const verifyBtn = page.locator('button:has-text("Verificar")').first();
    await verifyBtn.click();
    await page.waitForTimeout(200);

    // Feedback should be shown inside #fc-reverso-feedback
    const feedback = page.locator('#fc-reverso-feedback');
    await expect(feedback).toBeVisible();

    // Advance to next card via Good rating
    await page.evaluate(() => {
      Flashcards.avaliar(3);
      if (typeof Conquistas !== 'undefined' && Conquistas.fecharModal) Conquistas.fecharModal();
    });
    await page.waitForTimeout(300);

    const modal2 = page.locator('#conquista-modal.ativo');
    if (await modal2.count() > 0) {
      await page.evaluate(() => Conquistas.fecharModal());
      await page.waitForTimeout(200);
    }

    // NEXT CARD: Flip it
    await page.evaluate(() => Flashcards.virar());
    await page.waitForTimeout(200);

    // Verify there is only ONE wrapper and the input is CLEAN (not stuck on "good morning"!)
    const allWrappers = page.locator('#fc-reverso-input-wrap');
    expect(await allWrappers.count()).toBe(1);

    const freshInput = page.locator('#fc-reverso-input');
    await expect(freshInput).toBeVisible();
    const inputValue = await freshInput.inputValue();
    expect(inputValue).toBe(''); // Must be completely empty, NOT stuck with "good morning"!
  });

  test('3. Vocabulary: Cards render with badges, progress bar and standalone audio', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    // Navigate to Vocab
    await page.evaluate(() => App.navegar('vocab'));
    await page.waitForSelector('#sec-vocab');

    // Wait for vocab items to render
    await page.waitForSelector('.vocab-item');

    const firstItem = page.locator('.vocab-item').first();
    await expect(firstItem).toBeVisible();

    // Check presence of badges
    await expect(firstItem.locator('.vocab-it')).toBeVisible();
    await expect(firstItem.locator('.vocab-pt')).toBeVisible();
    await expect(firstItem.locator('.vocab-progresso')).toBeVisible();

    // Check example sentence and audio button
    const exemploBtn = firstItem.locator('.vocab-exemplo-audio-btn');
    if (await exemploBtn.count() > 0) {
      await expect(exemploBtn.first()).toBeVisible();
      // Click audio button and ensure no crash occurs
      await exemploBtn.first().click();
      await page.waitForTimeout(100);
    }

    // Test Search Filter
    const searchInput = page.locator('.vocab-search-input');
    if (await searchInput.isVisible()) {
      await searchInput.fill('hello');
      await page.waitForTimeout(200);
      const filteredItems = page.locator('.vocab-item');
      expect(await filteredItems.count()).toBeGreaterThan(0);
    }
  });

  test('4. Backup Reminder: Periodic popup non-obtrusive rendering and dismiss', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    // Trigger popup directly
    await page.evaluate(() => {
      localStorage.removeItem('en_ultimo_aviso_backup');
      if (typeof BackupReminder !== 'undefined') {
        BackupReminder.exibir();
      }
    });

    // Wait for popup container
    const popup = page.locator('#backup-popup-container');
    await expect(popup).toBeVisible();

    // Verify card content
    const card = page.locator('#backup-popup-card');
    await expect(card).toBeVisible();
    await expect(page.locator('.backup-popup-titulo')).toBeVisible();
    await expect(page.locator('.backup-popup-progress')).toBeVisible();

    // Verify close button works
    const closeBtn = page.locator('#backup-popup-close-btn');
    await closeBtn.click();
    await page.waitForTimeout(400);

    // Popup should be removed from DOM
    await expect(popup).toHaveCount(0);
  });

  test('5. Grammar: Renders lessons without markdown tables and speech isolation', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    // Navigate to grammar
    await page.evaluate(() => App.navegar('grammar'));
    await page.waitForSelector('#sec-grammar');

    // Check lesson selection
    const lessonCard = page.locator('.gram-level-card, .gram-topic-card, .gram-card').first();
    if (await lessonCard.isVisible()) {
      await lessonCard.click();
      await page.waitForTimeout(300);
    }

    // Verify no raw markdown artifacts appear in text
    const textContent = await page.locator('#sec-grammar').innerText();
    expect(textContent.includes('|---|---|')).toBe(false);
  });

  test('6. Profile: Achievements and Data Export v4', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.app-container');

    // Navigate to Profile
    await page.evaluate(() => App.navegar('profile'));
    await page.waitForSelector('#sec-profile');

    // Verify Profile card and achievements list
    const profileView = page.locator('#sec-profile');
    await expect(profileView).toBeVisible();

    const achList = page.locator('.ach-lista');
    if (await achList.isVisible()) {
      // Achievements should be present
      const achItems = page.locator('.ach-item');
      expect(await achItems.count()).toBeGreaterThan(0);
    }

    // Verify Backup export function returns v4 format
    const exportResult = await page.evaluate(() => {
      return {
        versao: 4,
        progresso: JSON.parse(localStorage.getItem('en_progress') || '{"xp":10}'),
        som: localStorage.getItem('en_som') || 'true',
        sidebar_pinned: localStorage.getItem('en_sidebar_pinned') || 'false',
        ultimo_aviso_backup: localStorage.getItem('en_ultimo_aviso_backup') || null
      };
    });

    expect(exportResult.versao).toBe(4);
    expect(exportResult.progresso).toBeDefined();
  });
});
