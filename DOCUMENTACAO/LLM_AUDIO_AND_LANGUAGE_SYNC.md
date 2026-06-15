# Feature Sync & Audit: Audio Speed & Language Toggle

**To the AI / LLM receiving this document:**
You are working on a Progressive Web App (PWA) focused on language learning. This app is part of a multi-language ecosystem (e.g., English, Italian, etc.). Your task is to implement the **Audio Speed Control** feature and conduct a rigorous audit on the **Language Toggle (Immersion Mode)** feature to ensure it is robust and efficient.

Please adapt any `localStorage` prefixes (e.g., use `it_` instead of `en_`) to match your specific app's namespace.

---

## Part 1: Implementing the Audio Speed Control

**Objective:** Add a UI slider in the Profile tab to let the user control the Text-to-Speech (TTS) playback speed, and inject this speed into the global audio engine.

### 1. UI Implementation (`js/profilo.js` or equivalent)
Add the slider UI inside the profile settings area.
```javascript
// Add this chunk inside the render() method of the Profile UI:
const currentSpeed = parseFloat(localStorage.getItem('PREFIX_audio_speed')) || 0.85;

const htmlSpeedControl = `
  <div class="perfil-card">
    <div class="perfil-card-titulo">🎧 Velocidade do Áudio (Audio Speed)</div>
    <div style="display:flex; align-items:center; gap:10px; margin-top:10px;">
      <span style="font-size:1.5rem">🐢</span>
      <input type="range" id="audio-speed-slider" min="0.5" max="1.5" step="0.1" value="${currentSpeed}" 
             onchange="Profilo.salvarAudioSpeed(this.value)" style="flex:1;">
      <span style="font-size:1.5rem">🐇</span>
    </div>
    <div style="text-align:center; margin-top:5px; font-weight:bold;" id="audio-speed-display">${currentSpeed}x</div>
    <button class="btn-secundario" onclick="App.pronunciar('This is a test of the audio speed.')" style="margin-top:10px; width:100%;">
      🔊 Testar Áudio
    </button>
  </div>
`;
```

Add the saving logic:
```javascript
// Add inside the Profilo object:
salvarAudioSpeed(valor) {
  localStorage.setItem('PREFIX_audio_speed', valor);
  const display = document.getElementById('audio-speed-display');
  if (display) display.textContent = valor + 'x';
}
```

### 2. Audio Engine Integration (`js/core.js`)
Locate the global pronunciation function (usually `App.pronunciar`).
Update the `rate` parameter to dynamically read the saved speed.

```javascript
// Inside App.pronunciar(texto):
const speedStr = localStorage.getItem('PREFIX_audio_speed');
let speechRate = parseFloat(speedStr);
if (isNaN(speechRate)) speechRate = 0.85; // Default fallback

// Native SpeechSynthesis fallback:
const u = new SpeechSynthesisUtterance(texto);
// ... assign voice ...
u.rate = speechRate; 
window.speechSynthesis.speak(u);

// If using ResponsiveVoice fallback:
if (typeof responsiveVoice !== 'undefined') {
  responsiveVoice.speak(texto, "US English Female", { rate: speechRate * 1.1 }); // Adjust multiplier if needed
}
```

---

## Part 2: Rigorous Audit of the Language Toggle (Immersion Mode)

**Objective:** The app features a button to toggle the UI language between the user's native language (e.g., PT-BR) and the target language (e.g., IT/EN). You must audit this system to ensure it is bug-free, efficient, and does not leak memory.

### Audit Checklist for the LLM:

1. **Memory Leak Check (Crucial):**
   - The toggle system relies on a global event: `document.dispatchEvent(new CustomEvent('i18n:changed'))`.
   - **The Bug to Catch:** Do individual modules (Grammar, Quiz, Profile) attach an event listener to `document` every time their tab is rendered? If they do `document.addEventListener('i18n:changed', render)`, opening the Grammar tab 10 times will attach 10 duplicate listeners, causing the app to crash or lag severely when the language is toggled.
   - **The Fix:** Ensure event listeners are attached *only once* during the module's initialization (`init()`), NOT inside the `render()` function. 

2. **Hardcoded Strings Check:**
   - Scan `js/grammar.js`, `js/flashcards.js`, and `js/profilo.js`.
   - Ensure that ALL user-facing UI strings (buttons, tooltips, headers) are wrapped in the translation function (e.g., `i18n.t('key')`).
   - Flag any hardcoded Portuguese strings (e.g., `innerHTML = "Iniciar Quiz"`) and replace them with `i18n.t('btn_start_quiz')`.

3. **Performance of the Re-Render:**
   - When the `i18n:changed` event fires, does the app efficiently re-render ONLY the active tab? 
   - If the event forces a reload of the entire DOM, verify that it doesn't interrupt audio playback or cause the scroll position to jump aggressively to the top.

4. **LocalStorage Syncing:**
   - Verify that the language preference is immediately saved to `localStorage` when toggled, so that if the user refreshes the page (Ctrl+F5), the app loads entirely in the chosen language.
   - Verify the initial load logic in `js/i18n.js`: `this.lang = localStorage.getItem('PREFIX_lang') || 'pt';`

5. **Icon / Flag State Integrity:**
   - Verify that the button visually representing the toggle accurately reflects the *current* state. Clicking the American/Italian flag should change it to the Brazilian flag, and vice versa. 

**Action Item for the LLM:** After running this audit, execute the fixes using code replacement tools and report back confirming that the `i18n:changed` listeners are safely isolated in the `init()` methods.
