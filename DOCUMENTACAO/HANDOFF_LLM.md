# English Autentico — System Context & Handoff Instructions
**To the AI / LLM taking over this project:** You are stepping into an advanced, Vanilla JS-based Progressive Web App (PWA) designed for English language learning. This document outlines the architecture, data structures, recent critical fixes, and instructions for publishing/scaling.

## 1. Project Background
This app was originally a fork of a project called "Italiano Autentico". It has been fully converted into **English Autentico**, offering a curriculum from A1 to C2. The app is entirely client-side, persisting data via `localStorage`, and functions 100% offline via a Service Worker.

## 2. Tech Stack & Architecture
- **Frontend:** Pure HTML5, Vanilla CSS3 (Glassmorphism, CSS Variables), Vanilla JS (No React/Vue).
- **Offline / PWA:** Managed by `sw.js` (CacheFirst strategy). The `v` parameter on script tags and the `CACHE` variable in `sw.js` must be bumped simultaneously to force updates.
- **Storage:** `localStorage` (keys prefixed with `en_` like `en_progresso`, `en_flashcards`).
- **Text-to-Speech (TTS):** Uses native browser `speechSynthesis` API (`en-US` voices) with a fallback to `ResponsiveVoice.js`.
- **Audio Speed Settings:** Integrated into the TTS logic and Profile UI, allowing users to slow down or speed up pronunciations.

## 3. Core Modules
The app has 8 distinct learning tabs:
1. **Temples (`templo-*.json`):** 51 thematic vocabulary sets based on US/UK cities.
2. **Grammar (`grammar.json`):** 90 lessons spanning A1 to C2. Built on the "NMA Method" (Nova Metodologia Autêntica) which uses a 7-step pedagogical flow.
3. **Dialogues / Songs / Listen:** Interactive fill-in-the-blanks and shadowing exercises.
4. **Flashcards:** Spaced repetition system (SRS) based on user interaction.
5. **Profile (`js/profilo.js`):** User stats, weekly heatmaps, manual backup export/import, and Audio Speed Configuration.

## 4. Crucial Data Structures
### The Grammar JSON (`data/grammar.json`)
The `grammar.json` file is a massive compiled file. 
**CRITICAL RULE:** The array of lessons inside each module MUST use the key `"lezioni"` (legacy Italian naming convention), NOT `"unidades"` or `"lessons"`. If changed, the UI renderer (`js/grammar.js`) will crash with a selector error.

```json
{
  "versao": "4.0",
  "moduli": [
    {
      "id": "A1",
      "nome": "A1 — Foundations",
      "lezioni": [
        {
          "id": "a1-lez1",
          "titulo": "Verb To Be",
          "alerta": "Motivational text...",
          "observacao_cards": [
            { "italiano": "I am", "traducao": "Eu sou", "genero": "Pronoun", "motivo": "Rule..." }
          ]
        }
      ]
    }
  ]
}
```
*Note: The key `italiano` is still used throughout the JSON and JS to store the English target sentences to maintain compatibility with the legacy engine.*

## 5. Critical Fixes & Gotchas (DO NOT REVERT)
If you are modifying or compiling data, you **MUST** be aware of the following solved bugs:

1. **The Mojibake / UTF-8 Corruption Bug:**
   - **Problem:** When assembling JSON chunks using Python and piping them to PowerShell (`python script.py | Out-File data.json`), the Windows code pages corrupted emojis and accents (e.g., `🔍` became `ðŸ”`).
   - **Solution:** JSON assembly is now strictly done via a Node.js script (`assemble.js`) utilizing `fs.writeFileSync(..., 'utf8')`. **Never use PowerShell pipes to generate JSON files in this project.**
2. **The Missing Charset Bug:**
   - **Problem:** Because `assemble.js` writes UTF-8 without BOM, some local dev servers or browsers fallback to Latin-1 for `.js` files, corrupting emojis inside JS strings (like in `js/dialoghi.js`).
   - **Solution:** Every `<script>` tag in `index.html` has been hardcoded with `charset="UTF-8"`. **Ensure any new script tags include this attribute.**
3. **Language Toggle Live Reload:**
   - **Feature:** The user can toggle between PT-BR and English immersion.
   - **Fix:** An event listener (`document.addEventListener('i18n:changed')`) was added to `grammar.js` so the grammar UI correctly re-renders its localized strings when the language button is toggled.

## 6. Instructions for Publishing / Next Steps
To continue the work and publish the app:
1. **GitHub Pages Deployment:** The app is designed to be served statically. All pushes should be made to `master`, and then merged into the `gh-pages` branch using `git merge master --ff-only`.
2. **Cache Busting:** Before publishing, ALWAYS open `sw.js` and increment `const CACHE = 'english-vXX';`, and do the same for the Service Worker registration query parameter in `index.html`.
3. **App Store / Google Play:** Since it's a PWA, it can be wrapped using **Trusted Web Activities (TWA)** for Google Play or **PWABuilder** for Microsoft Store/iOS. 
4. **Data Expansion:** If adding new grammar or vocabulary, generate the JSON chunks separately and use `node assemble.js` to compile them safely.

Good luck!
