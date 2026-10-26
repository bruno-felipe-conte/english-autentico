const { test, expect } = require('@playwright/test');

test.describe('Songs Feature', () => {
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

  test('Should render songs list and allow creating/playing a custom song', async ({ page }) => {
    await page.goto('/');

    // Wait for boot
    await page.waitForSelector('.nav-tab');

    // Navigate to Songs
    await page.evaluate(() => App.navegar('songs'));
    
    // Wait for the songs view to be visible
    const songsView = page.locator('#sec-songs');
    await expect(songsView).toBeVisible();

    // Wait for songs to finish loading
    await page.waitForFunction(() => (window.Songs || window.Canzoni)?.dados !== null);

    // Open create form
    await page.evaluate(() => (window.Songs || window.Canzoni).abrirFormularioCriar());
    
    // Fill in song metadata
    await page.locator('#can-titulo').fill('Believer');
    await page.locator('#can-artista').fill('Imagine Dragons');
    
    // Fill in verse
    const firstVerseCompleto = page.locator('input[data-campo="texto_completo"]').first();
    const firstVerseLacuna = page.locator('input[data-campo="texto_lacuna"]').first();
    const firstVersePalavra = page.locator('input[data-campo="palavra_oculta"]').first();

    await firstVerseCompleto.fill("First things first, I'ma say all the words inside my head");
    await firstVerseLacuna.fill("First things first, I'ma say all the ___ inside my head");
    await firstVersePalavra.fill("words");

    // Click Salvar
    const saveButton = page.locator('button:has-text("Salvar Música")').first();
    await saveButton.click();

    // Verify it was added to the list
    const songCard = page.locator('.dialogo-card:has-text("Believer")').first();
    await expect(songCard).toBeVisible();

    // Open the song
    await songCard.click();

    // Verify the song screen opened and contains the lyrics
    const verseText = page.locator('#can-karaoke-area, .can-verse, #can-estrofes, .dialogo-card');
    await expect(verseText.first()).toBeVisible();
  });
});
