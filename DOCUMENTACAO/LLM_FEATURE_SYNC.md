# Feature Sync: AI Handoff Instructions

**To the AI / LLM receiving this document:**
You are working on a Progressive Web App (PWA) focused on language learning (e.g., Italian, English, or another language). This codebase shares an architecture with a sister project. Your task is to implement two powerful features into your version of the app: **Dynamic Prompts (i+1)** and **Offline Push Notifications**.

Because this is a neutral document, please adapt any `localStorage` prefixes (e.g., if your app uses `it_progresso`, keep using `it_`; if it uses `en_progresso`, keep `en_`) and adapt the translated strings to the target language of your app.

---

## Feature 1: Dynamic Prompts (Modo i+1)

**Objective:** When the user opens the "🤖 via IA" modal for Dialogues, Stories, or Imitation, the app must read the Spaced Repetition (SRS) data, find words the user is struggling with, and inject a strict command into the LLM prompt to force the use of those words.

### Implementation Steps (`js/ia-import.js`)

1. **Create the `_obterPalavrasDificeis()` method** inside the `IAImport` object.
   This method should read `App.estado.flashcardData` and `App.estado.vocabCache` to extract up to 7 words where `erros > 0` or `stability < 15` (or `state === 'learning'`).
   
   *Example Logic:*
   ```javascript
   _obterPalavrasDificeis() {
     if (typeof App === 'undefined' || !App.estado?.flashcardData || !App.estado?.vocabCache) return [];
     const hardIds = [];
     for (const [id, f] of Object.entries(App.estado.flashcardData)) {
       // Adapt these condition checks to your specific SRS object structure
       if ((f.erros > 0) || (f.stability && f.stability < 15) || (f.state === 'learning') || (f.state === 'new')) {
         hardIds.push(id);
       }
     }
     const words = hardIds.map(id => {
       const v = App.estado.vocabCache.find(w => w.id === id);
       return v ? (v.italiano || v.word || v.frase) : null;
     }).filter(w => w);
     return words.sort(() => 0.5 - Math.random()).slice(0, 7);
   }
   ```

2. **Modify the `abrir(tipo)` method** inside `IAImport`.
   Instead of just setting the static prompt, append the dynamic vocabulary challenge if the type supports it (e.g., dialogues, stories).

   *Example Logic:*
   ```javascript
   abrir(tipo) {
     // ... UI setup ...
     let basePrompt = this.prompts[tipo] || '';
     
     if (tipo === 'dialogo' || tipo === 'storia' || tipo === 'imitazione') {
       const dificeis = this._obterPalavrasDificeis();
       if (dificeis.length > 0) {
         basePrompt += `\n\n🎯 MANDATORY VOCABULARY CHALLENGE:\nYou MUST organically include the following words in the target language text (they are words the student is currently struggling with):\n[ ${dificeis.join(', ')} ]`;
       }
     }
     document.getElementById('ia-prompt-text').textContent = basePrompt;
     // ... show modal ...
   }
   ```

---

## Feature 2: Offline Push Notifications

**Objective:** Since this app lacks a backend server, we use the Service Worker to trigger local push notifications based on a `setTimeout`.

### Implementation Steps

1. **Create/Update UI (`js/notificacoes.js` or equivalent)**
   You need a module that:
   - Requests `Notification.requestPermission()`.
   - Saves a preferred time in `localStorage` (e.g., `20:00`).
   - Calculates the delay in milliseconds from "now" to the next occurrence of that time.
   - Calculates how many cards are due from the SRS state.
   - Sends a `postMessage` to the active Service Worker with the payload.

   *Example Payload to send to SW:*
   ```javascript
   navigator.serviceWorker.ready.then(reg => {
     reg.active?.postMessage({
       type: 'AGENDAR_LEMBRETE',
       delayMs: 14000000, // Ms until target time
       titulo: 'Language App',
       corpo: '📚 15 cards due today!',
       tag: 'study-review'
     });
   });
   ```

2. **Update Service Worker (`sw.js`)**
   The Service Worker must listen to the `message` event, set a local timeout, and call `showNotification`. It must also handle `notificationclick` to focus or open the app.

   *Inject this into `sw.js`:*
   ```javascript
   // ── Push Notifications (No Server Required) ──
   self.addEventListener('message', event => {
     if (event.data && event.data.type === 'AGENDAR_LEMBRETE') {
       const { delayMs, titulo, corpo, tag } = event.data;
       setTimeout(() => {
         self.registration.showNotification(titulo, {
           body: corpo,
           icon: './icons/icon.svg',
           badge: './icons/icon.svg',
           tag: tag || 'study-reminder',
           renotify: true,
           data: { url: './' }
         });
       }, delayMs);
     }
   });

   self.addEventListener('notificationclick', event => {
     event.notification.close();
     event.waitUntil(
       clients.matchAll({ type: 'window', includeUncontrolled: true }).then(lista => {
         const existente = lista.find(c => c.url.includes(self.location.origin));
         if (existente) return existente.focus();
         return clients.openWindow(event.notification.data?.url || './');
       })
     );
   });
   ```

3. **Triggering the Scheduling**
   Ensure that the function to calculate and schedule the notification is called whenever the user opens the app (e.g., inside `App.init()`).

---

## Verification & QA Checklist

After implementing the above, the LLM MUST verify the following:

- [ ] **Prompt Verification:** Open the app, mark a flashcard as "Hard" (creating an entry in the SRS cache). Open the IA Import modal for a story. Verify that the strict `TARGET VOCABULARY` clause appears at the bottom of the prompt containing the hard word.
- [ ] **Empty State Safety:** Clear all `localStorage` data. Open the IA Import modal. Ensure the app does not crash trying to read `undefined` flashcard data.
- [ ] **Service Worker Sync:** Verify that adding the notification logic to `sw.js` did not break the `fetch` interception logic for the offline capabilities. 
- [ ] **Cache Busting:** Ensure `index.html` loads the updated JS files (bump `?v=X` parameters) and that the `CACHE` constant in `sw.js` was bumped.
