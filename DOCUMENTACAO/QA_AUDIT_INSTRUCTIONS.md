# QA & Bug Audit Instructions for English Autentico
**To the AI / LLM auditor:** You are tasked with conducting an **extremely rigorous, pixel-perfect, and logical audit** of the "English Autentico" Progressive Web App (PWA). Your goal is to find edge cases, race conditions, data inconsistencies, and UI bugs. Leave no stone unturned.

Below is the definitive checklist and system architecture you must evaluate. 

---

## 1. LocalStorage & State Management (`js/core.js` & `js/profilo.js`)
The app uses a singleton pattern (`App`) and stores all data in the browser's `localStorage` using the `en_` prefix.
- [ ] **Data Corruption:** What happens if a user imports a malformed JSON backup? Audit the `Profilo.importarDados` function. Does it catch all exceptions? 
- [ ] **Initialization Race Conditions:** In `js/core.js`, the `App.init()` fetches multiple JSON files asynchronously. If `flashcardsData` loads before `templesData`, does the state sync correctly?
- [ ] **Storage Quota:** Are there safeguards if `localStorage` hits the 5MB limit? (Specifically regarding the custom audio strings or large IA imports).
- [ ] **Reset Progress:** Verify `Profilo.resetProgresso()`. Does it clear exactly all `en_*` keys and leave no orphan data behind?

## 2. Text-to-Speech (TTS) Engine (`js/core.js` & `js/audio.js`)
The `App.pronunciar(texto)` method uses native `SpeechSynthesis` with a fallback to `ResponsiveVoice`.
- [ ] **Audio Speed Setting:** In version `v15`, an audio speed slider was added. Verify that `parseFloat(localStorage.getItem('en_audio_speed'))` correctly falls back to `0.85` if the value is `NaN` or null.
- [ ] **Voice Loading Bug:** The `speechSynthesis.getVoices()` API is notoriously asynchronous in Chrome/Safari. Does `_getVozAmericana()` properly handle the `onvoiceschanged` event?
- [ ] **Feedback Toggle:** Check if the global mute button (`SomFeedback.ativo`) correctly blocks TTS execution.

## 3. Dynamic IA Prompt Injection (`js/ia-import.js`)
- [ ] **Empty State Crash Check:** In `_obterPalavrasDificeis()`, if the user has **never** studied a flashcard, `App.estado.flashcardData` will be empty. Does the code gracefully handle an empty object or undefined without throwing `TypeError: Cannot convert undefined or null to object`?
- [ ] **Cache Sync:** Does `App.estado.vocabCache` correctly index all custom imported vocabulary (`en_vocab_custom`), or will the IA prompt fail to find the English translation for custom hard words?

## 4. Service Worker & Offline Cache (`sw.js` & `index.html`)
- [ ] **Cache Busting Strategy:** The app uses query parameters (e.g., `js/core.js?v=16`) and `const CACHE = 'english-v16'`. Check if the `activate` event in `sw.js` correctly deletes ALL older cache versions.
- [ ] **Fetch Interception:** Audit the `fetch` event listener. Does the `network-first` strategy for `/data/*.json` correctly fallback to `caches.match` if the user is completely offline?
- [ ] **Notification Triggers:** Does the `AGENDAR_LEMBRETE` message inside `sw.js` safely handle the `setTimeout`? (Note: Chrome may kill idle Service Workers. Audit if the web push approach is stable or if it requires the Background Sync API).

## 5. UI/UX and DOM Rendering
- [ ] **Encoding & Mojibake:** Previous versions suffered from Windows-1252 encoding issues rendering emojis as `ðŸ”`. Ensure every single `<script>` tag in `index.html` has `charset="UTF-8"`.
- [ ] **Event Listener Leaks:** In modules like `js/grammar.js`, `js/flashcards.js`, and `js/quiz.js`, DOM elements are repeatedly generated via `innerHTML`. Are there attached event listeners (e.g., `document.addEventListener('i18n:changed')`) that duplicate every time the tab is switched, causing memory leaks? 
- [ ] **Mobile Responsiveness:** Audit the CSS (`css/english.css`). Do the modal popups (`#ia-import-modal`, `#quiz-modal`) have CSS `max-height` and `overflow-y: auto` to prevent content from overflowing off-screen on small iOS/Android devices?

## 6. The "Grammar Renderer" (`js/grammar.js` & `data/grammar.json`)
- [ ] **The "lezioni" Key Rule:** The core logic iterates over `modulo.lezioni`. If the JSON uses `unidades` instead, the app crashes. Audit the parser to ensure it has robust error handling (`modulo.lezioni || modulo.unidades || []`).
- [ ] **HTML Injection Security:** Is the content from `grammar.json` properly sanitized, or is it vulnerable to XSS if a user imports a malicious custom grammar file? (Evaluate the `_escAttr` helper functions).

## 7. SRS Algorithm (Spaced Repetition in `js/flashcards.js`)
- [ ] **Interval Logic:** Does the algorithm properly increase the interval (e.g., 1d -> 3d -> 7d) when the user clicks "Good" or "Easy"? 
- [ ] **Timezone Bugs:** Does `Date.now()` logic correctly compute daily limits without timezone shifting issues at midnight?

---
**ACTION REQUIRED BY AUDITING LLM:** 
Read the source code corresponding to the checkpoints above. Report back with a severity-ranked list of vulnerabilities, memory leaks, and logical flaws. Provide the exact JavaScript or HTML patches needed to harden the application.
