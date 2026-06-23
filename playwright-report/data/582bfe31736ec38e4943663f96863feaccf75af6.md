# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: song.spec.js >> Canzoni (Songs) Feature >> Should be able to import a song via AI JSON and play it
- Location: tests\song.spec.js:19:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('button:has-text("Importar parte única")')
    - locator resolved to <button class="btn-secondario" onclick="Canzoni._mostrarCampoParteUnica()">📥 Importar parte única</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 100ms
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic [ref=e5]:
          - text: 🇺🇸
          - generic [ref=e6]: English Autentico
        - generic [ref=e7]:
          - button "PT | EN" [ref=e8] [cursor=pointer]:
            - generic [ref=e9]: PT
            - generic [ref=e10]: "|"
            - generic [ref=e11]: EN
          - button "☀️" [ref=e12] [cursor=pointer]
          - button ".85x" [ref=e13] [cursor=pointer]
          - button "🔕" [ref=e14] [cursor=pointer]
          - button "❓" [ref=e15] [cursor=pointer]
          - button "👤" [ref=e16] [cursor=pointer]
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: Level 1
          - generic [ref=e20]: "XP: 0/300"
          - generic [ref=e21]: 🔥 0 days
        - generic [ref=e22]:
          - generic [ref=e23]: "Temples: 1/51"
          - generic [ref=e24]: "Words: 1000"
  - navigation [ref=e26]:
    - button "🏛️ Temples" [ref=e27] [cursor=pointer]
    - button "💬 Dialogues" [ref=e28] [cursor=pointer]
    - button "🎵 Songs" [ref=e29] [cursor=pointer]
    - button "🗣️ Listen & Repeat" [ref=e30] [cursor=pointer]
    - button "🃏 Flashcards" [ref=e31] [cursor=pointer]
    - button "❓ Quiz" [ref=e32] [cursor=pointer]
    - button "📖 Vocabulary" [ref=e33] [cursor=pointer]
    - button "📚 Grammar" [ref=e34] [cursor=pointer]
    - button "📜 Reading" [ref=e35] [cursor=pointer]
  - generic [ref=e36]:
    - generic [ref=e37]: 🎯 Daily Goal
    - generic [ref=e39]: 0/100 XP
    - button "⚙️" [ref=e40] [cursor=pointer]
  - main [ref=e41]:
    - generic [ref=e42]:
      - heading "Song Mode" [level=2] [ref=e43]
      - generic [ref=e44]:
        - generic [ref=e45]:
          - searchbox "🔍 Title or artist..." [ref=e46]
          - button "➕ Add Song" [ref=e47] [cursor=pointer]
          - button "🤖 via IA" [ref=e48] [cursor=pointer]
        - generic [ref=e49]:
          - button "All (16)" [ref=e50] [cursor=pointer]
          - button "📚 Built-in (16)" [ref=e51] [cursor=pointer]
          - combobox [ref=e52] [cursor=pointer]:
            - option "🎯 Level" [selected]
            - option "A1 (4)"
            - option "A2 (5)"
            - option "B1 (4)"
            - option "B2 (3)"
        - generic [ref=e53]:
          - generic [ref=e54] [cursor=pointer]:
            - generic [ref=e55]: 🎵
            - generic [ref=e56]: Believer
            - generic [ref=e57]: Imagine Dragons
            - generic [ref=e58]:
              - generic [ref=e59]: A2
              - button "🗑️" [ref=e60]
          - generic [ref=e61] [cursor=pointer]:
            - generic [ref=e62]: 🕺
            - generic [ref=e63]: Billie Jean
            - generic [ref=e64]: Michael Jackson
            - generic [ref=e65]:
              - generic [ref=e66]: B1
              - button "🗑️" [ref=e67]
          - generic [ref=e68] [cursor=pointer]:
            - generic [ref=e69]: 🎸
            - generic [ref=e70]: Bohemian Rhapsody
            - generic [ref=e71]: Queen
            - generic [ref=e72]:
              - generic [ref=e73]: B2
              - button "🗑️" [ref=e74]
          - generic [ref=e75] [cursor=pointer]:
            - generic [ref=e76]: ❤️
            - generic [ref=e77]: Can't Help Falling in Love
            - generic [ref=e78]: Elvis Presley
            - generic [ref=e79]:
              - generic [ref=e80]: A2
              - button "🗑️" [ref=e81]
          - generic [ref=e82] [cursor=pointer]:
            - generic [ref=e83]: 🏨
            - generic [ref=e84]: Hotel California
            - generic [ref=e85]: Eagles
            - generic [ref=e86]:
              - generic [ref=e87]: B1
              - button "🗑️" [ref=e88]
          - generic [ref=e89] [cursor=pointer]:
            - generic [ref=e90]: 🕊️
            - generic [ref=e91]: Imagine
            - generic [ref=e92]: John Lennon
            - generic [ref=e93]:
              - generic [ref=e94]: A2
              - button "🗑️" [ref=e95]
          - generic [ref=e96] [cursor=pointer]:
            - generic [ref=e97]: ✨
            - generic [ref=e98]: Just The Way You Are
            - generic [ref=e99]: Bruno Mars
            - generic [ref=e100]:
              - generic [ref=e101]: A2
              - button "🗑️" [ref=e102]
          - generic [ref=e103] [cursor=pointer]:
            - generic [ref=e104]: 🎵
            - generic [ref=e105]: Let It Be
            - generic [ref=e106]: The Beatles
            - generic [ref=e107]:
              - generic [ref=e108]: A2
              - button "🗑️" [ref=e109]
          - generic [ref=e110] [cursor=pointer]:
            - generic [ref=e111]: 🔥
            - generic [ref=e112]: Rolling in the Deep
            - generic [ref=e113]: Adele
            - generic [ref=e114]:
              - generic [ref=e115]: B2
              - button "🗑️" [ref=e116]
          - generic [ref=e117] [cursor=pointer]:
            - generic [ref=e118]: 🥊
            - generic [ref=e119]: Shape of You
            - generic [ref=e120]: Ed Sheeran
            - generic [ref=e121]:
              - generic [ref=e122]: B2
              - button "🗑️" [ref=e123]
          - generic [ref=e124] [cursor=pointer]:
            - generic [ref=e125]: 💔
            - generic [ref=e126]: Someone Like You
            - generic [ref=e127]: Adele
            - generic [ref=e128]:
              - generic [ref=e129]: B1
              - button "🗑️" [ref=e130]
          - generic [ref=e131] [cursor=pointer]:
            - generic [ref=e132]: 🌙
            - generic [ref=e133]: Stand By Me
            - generic [ref=e134]: Ben E. King
            - generic [ref=e135]:
              - generic [ref=e136]: A1
              - button "🗑️" [ref=e137]
          - generic [ref=e138] [cursor=pointer]:
            - generic [ref=e139]: 🐦
            - generic [ref=e140]: Three Little Birds
            - generic [ref=e141]: Bob Marley
            - generic [ref=e142]:
              - generic [ref=e143]: A1
              - button "🗑️" [ref=e144]
          - generic [ref=e145] [cursor=pointer]:
            - generic [ref=e146]: 👑
            - generic [ref=e147]: Viva La Vida
            - generic [ref=e148]: Coldplay
            - generic [ref=e149]:
              - generic [ref=e150]: B1
              - button "🗑️" [ref=e151]
          - generic [ref=e152] [cursor=pointer]:
            - generic [ref=e153]: 🌍
            - generic [ref=e154]: What a Wonderful World
            - generic [ref=e155]: Louis Armstrong
            - generic [ref=e156]:
              - generic [ref=e157]: A1
              - button "🗑️" [ref=e158]
          - generic [ref=e159] [cursor=pointer]:
            - generic [ref=e160]: 🚢
            - generic [ref=e161]: Yellow Submarine
            - generic [ref=e162]: The Beatles
            - generic [ref=e163]:
              - generic [ref=e164]: A1
              - button "🗑️" [ref=e165]
  - contentinfo [ref=e166]:
    - paragraph [ref=e167]:
      - text: English Autentico •
      - emphasis [ref=e168]: Learn English with authenticity
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | test.describe('Canzoni (Songs) Feature', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Disable onboarding tour and Service Worker reloads
  6   |     await page.addInitScript(() => {
  7   |       window.localStorage.setItem('en_onboarding_done', 'true');
  8   |       if (navigator.serviceWorker) {
  9   |         navigator.serviceWorker.register = () => new Promise(() => {}); // No-op
  10  |         const originalAddEventListener = navigator.serviceWorker.addEventListener;
  11  |         navigator.serviceWorker.addEventListener = function(type, listener, options) {
  12  |           if (type === 'controllerchange') return;
  13  |           return originalAddEventListener.apply(this, arguments);
  14  |         };
  15  |       }
  16  |     });
  17  |   });
  18  | 
  19  |   test('Should be able to import a song via AI JSON and play it', async ({ page }) => {
  20  |     await page.goto('/');
  21  | 
  22  |     // Wait for boot
  23  |     await page.waitForSelector('.nav-tab');
  24  | 
  25  |     // Navigate to Canzoni
  26  |     await page.evaluate(() => App.navegar('canzoni'));
  27  |     
  28  |     // Wait for the canzoni view to be visible
  29  |     const canzoniView = page.locator('#sec-canzoni');
  30  |     await expect(canzoniView).toBeVisible();
  31  | 
  32  |     // Click the "Add via AI" button or the normal Add button
  33  |     // Let's use the normal add form which has the "Build AI prompt" and paste area
  34  |     await page.evaluate(() => Canzoni.abrirFormularioCriar());
  35  |     
  36  |     // Click the Import Single Part button to show the textarea
> 37  |     await page.locator('button:has-text("Importar parte única")').click();
      |                                                                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  38  | 
  39  |     // Wait for the form to appear
  40  |     const iaPasteArea = page.locator('#can-ia-resultado');
  41  |     await expect(iaPasteArea).toBeVisible();
  42  | 
  43  |     // Paste the JSON payload
  44  |     const jsonPayload = {
  45  |       "titulo": "Believer",
  46  |       "artista": "Imagine Dragons",
  47  |       "nivel": "A2",
  48  |       "icone": "🎵",
  49  |       "estrofes": [
  50  |         {
  51  |           "id": 1,
  52  |           "line": "First things first, I'ma say all the words inside my head",
  53  |           "translation": "Em primeiro lugar, vou dizer todas as palavras dentro da minha cabeça",
  54  |           "words": [
  55  |             {"w": "First", "t": "0:14", "m": "Primeiro", "hidden": false},
  56  |             {"w": "things", "t": "0:15", "m": "coisas", "hidden": false},
  57  |             {"w": "first,", "t": "0:15", "m": "primeiro", "hidden": false},
  58  |             {"w": "I'ma", "t": "0:15", "m": "Eu vou", "hidden": false},
  59  |             {"w": "say", "t": "0:16", "m": "dizer", "hidden": false},
  60  |             {"w": "all", "t": "0:16", "m": "todas", "hidden": false},
  61  |             {"w": "the", "t": "0:16", "m": "as", "hidden": false},
  62  |             {"w": "words", "t": "0:17", "m": "palavras", "hidden": true},
  63  |             {"w": "inside", "t": "0:17", "m": "dentro", "hidden": false},
  64  |             {"w": "my", "t": "0:17", "m": "minha", "hidden": false},
  65  |             {"w": "head", "t": "0:18", "m": "cabeça", "hidden": false}
  66  |           ]
  67  |         }
  68  |       ]
  69  |     };
  70  |     
  71  |     await iaPasteArea.fill(JSON.stringify(jsonPayload));
  72  | 
  73  |     // Wait a bit to ensure it's filled
  74  |     await page.waitForTimeout(500);
  75  | 
  76  |     // Click the "Import AI Result" button - wait, _importarESalvar is bound to "Salvar Música" button
  77  |     // Let's find the save button
  78  |     const saveButton = page.locator('button:has-text("Salvar Música")');
  79  |     await expect(saveButton).toBeVisible();
  80  |     
  81  |     // Also, optionally attach the mp3 file
  82  |     const fileInput = page.locator('#can-audio-file');
  83  |     if (await fileInput.isVisible()) {
  84  |       try {
  85  |         await fileInput.setInputFiles('C:\\Users\\bruno\\Downloads\\Imagine Dragons - Believer (Official Music Video) - ImagineDragonsVEVO (youtube) (1).mp3');
  86  |       } catch (e) {
  87  |         console.log("Could not load mp3 file from Downloads, skipping audio file attach.");
  88  |       }
  89  |     }
  90  | 
  91  |     // Save
  92  |     await saveButton.click();
  93  | 
  94  |     // Verify it was added to the list
  95  |     const songCard = page.locator('.dialogo-card:has-text("Believer"):has-text("Imagine Dragons")').first();
  96  |     await expect(songCard).toBeVisible();
  97  | 
  98  |     // Open the song
  99  |     await songCard.click();
  100 | 
  101 |     // Verify the verse is visible
  102 |     const verse = page.locator('.can-verse:has-text("First things first")');
  103 |     await expect(verse).toBeVisible();
  104 |   });
  105 | });
  106 | 
```