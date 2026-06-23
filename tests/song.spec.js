const { test, expect } = require('@playwright/test');

test.describe('Canzoni (Songs) Feature', () => {
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

  test('Should be able to import a song via AI JSON and play it', async ({ page }) => {
    await page.goto('/');

    // Wait for boot
    await page.waitForSelector('.nav-tab');

    // Navigate to Canzoni
    await page.evaluate(() => App.navegar('canzoni'));
    
    // Wait for the canzoni view to be visible
    const canzoniView = page.locator('#sec-canzoni');
    await expect(canzoniView).toBeVisible();

    // Wait for canzoni to finish loading from JSON (to avoid the race condition!)
    await page.waitForFunction(() => Canzoni.dados !== null);

    // Click the "Add via AI" button or the normal Add button
    // Let's use the normal add form which has the "Build AI prompt" and paste area
    await page.evaluate(() => Canzoni.abrirFormularioCriar());
    
    // Click the Import Single Part button to show the textarea
    await page.locator('button:has-text("Importar parte única")').click();

    // Wait for the form to appear
    const iaPasteArea = page.locator('#can-ia-resultado');
    await expect(iaPasteArea).toBeVisible();

    // Paste the JSON payload
    const jsonPayload = {
      "titulo": "Believer",
      "artista": "Imagine Dragons",
      "nivel": "A2",
      "icone": "🎵",
      "estrofes": [
        {
          "id": 1,
          "line": "First things first, I'ma say all the words inside my head",
          "translation": "Em primeiro lugar, vou dizer todas as palavras dentro da minha cabeça",
          "words": [
            {"w": "First", "t": "0:14", "m": "Primeiro", "hidden": false},
            {"w": "things", "t": "0:15", "m": "coisas", "hidden": false},
            {"w": "first,", "t": "0:15", "m": "primeiro", "hidden": false},
            {"w": "I'ma", "t": "0:15", "m": "Eu vou", "hidden": false},
            {"w": "say", "t": "0:16", "m": "dizer", "hidden": false},
            {"w": "all", "t": "0:16", "m": "todas", "hidden": false},
            {"w": "the", "t": "0:16", "m": "as", "hidden": false},
            {"w": "words", "t": "0:17", "m": "palavras", "hidden": true},
            {"w": "inside", "t": "0:17", "m": "dentro", "hidden": false},
            {"w": "my", "t": "0:17", "m": "minha", "hidden": false},
            {"w": "head", "t": "0:18", "m": "cabeça", "hidden": false}
          ]
        }
      ]
    };
    
    await iaPasteArea.fill(JSON.stringify(jsonPayload));

    // Wait a bit to ensure it's filled
    await page.waitForTimeout(500);

    // Click the "Import AI Result" button - wait, _importarESalvar is bound to "Salvar Música" button
    // Let's find the save button
    const saveButton = page.locator('button:has-text("Salvar Música")');
    await expect(saveButton).toBeVisible();
    
    // Also, optionally attach the mp3 file
    const fileInput = page.locator('#can-audio-file');
    if (await fileInput.isVisible()) {
      try {
        await fileInput.setInputFiles('C:\\Users\\bruno\\Downloads\\Imagine Dragons - Believer (Official Music Video) - ImagineDragonsVEVO (youtube) (1).mp3');
      } catch (e) {
        console.log("Could not load mp3 file from Downloads, skipping audio file attach.");
      }
    }

    // Save
    await saveButton.click();

    // Verify it was added to the list
    const songCard = page.locator('.dialogo-card:has-text("Believer"):has-text("Imagine Dragons")').first();
    await expect(songCard).toBeVisible();

    // Open the song
    await songCard.click();

    // Verify the verse is visible
    const verse = page.locator('.can-verse:has-text("First things first")');
    await expect(verse).toBeVisible();
  });
});
