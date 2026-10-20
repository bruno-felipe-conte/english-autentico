// scripts/validate_songs_parity.mjs
import fs from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to Chrome CDP target:', target.webSocketDebuggerUrl);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  };

  ws.onopen = async () => {
    try {
      if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots', { recursive: true });
      }

      await send('Page.enable');
      await send('Runtime.enable');
      await send('Network.enable');
      await send('Network.setCacheDisabled', { cacheDisabled: true });
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('==================================================');
      console.log('STEP 1: INSPECTION OF ITALIAN REFERENCE (PORT 8000)');
      console.log('==================================================');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2200));

      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('canzoni');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const itShot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-canzoni-selector.png', Buffer.from(itShot1.data, 'base64'));
      console.log('Saved screenshots/it-canzoni-selector.png');

      // Open first Italian song (Bella Ciao)
      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Canzoni !== 'undefined') await Canzoni.abrirCanzone('canzone_1');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));
      const itShot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-canzoni-practice.png', Buffer.from(itShot2.data, 'base64'));
      console.log('Saved screenshots/it-canzoni-practice.png');

      console.log('==================================================');
      console.log('STEP 2: ENGLISH APPLICATION - SELECTOR & CATALOG');
      console.log('==================================================');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2500));

      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('songs');
            await Songs.carregar();
            Songs.renderizarSeletor();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      // Inspect selector state
      const selEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-songs');
            const cards = sec.querySelectorAll('.dialogo-card');
            const studioBtn = sec.querySelector('.btn-pill-add');
            const iaBtn = sec.querySelector('.btn-ia-add');
            const pills = Array.from(sec.querySelectorAll('button')).map(b => b.textContent.trim());
            const hasTypo = pills.some(p => p.includes('Inglêss'));
            const hasCorrectClassics = pills.some(p => p.includes('Clássicos em Inglês'));
            return {
              totalSongs: cards.length,
              hasStudioBtn: !!studioBtn,
              hasIABtn: !!iaBtn,
              pills: pills.slice(0, 10),
              hasTypo,
              hasCorrectClassics
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Selector inspection:', JSON.stringify(selEval.result.value, null, 2));

      const enShot1 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-songs-selector.png', Buffer.from(enShot1.data, 'base64'));
      console.log('Saved screenshots/en-songs-selector.png');

      console.log('==================================================');
      console.log('STEP 3: PRACTICE PLAYER & ENGLISH DISTRACTORS');
      console.log('==================================================');
      // Open Believer song (can_custom_999)
      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            await Songs.abrirCanzone('can_custom_999');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const pracEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-songs');
            const titleEl = sec.querySelector('.can-header-title');
            const modeTabs = Array.from(sec.querySelectorAll('.can-mode-tab')).map(t => t.textContent.trim());
            const choiceBtns = Array.from(sec.querySelectorAll('.can-choice-btn')).map(b => b.textContent.trim());
            const italianWords = ['sempre','cuore','notte','sole','vita','tempo','amore','cielo','mare','vento','giorno','mondo'];
            const foundItalianDistractor = choiceBtns.some(c => italianWords.includes(c.toLowerCase()));
            const currentVerse = Songs.canzonAtual?.estrofes?.[Songs.estrofeAtual];
            const correctWord = currentVerse?.palavra_oculta;
            const hasCorrectChoice = choiceBtns.includes(correctWord);

            return {
              title: titleEl?.textContent.trim(),
              modeTabs,
              choiceBtns,
              correctWord,
              hasCorrectChoice,
              foundItalianDistractor,
              audioSpeed: Songs.velocidadeAudio
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Practice player evaluation:', JSON.stringify(pracEval.result.value, null, 2));

      const enShot2 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-songs-practice.png', Buffer.from(enShot2.data, 'base64'));
      console.log('Saved screenshots/en-songs-practice.png');

      // Test answering correctly
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const currentVerse = Songs.canzonAtual?.estrofes?.[Songs.estrofeAtual];
            const correctWord = currentVerse?.palavra_oculta;
            const btn = Array.from(document.querySelectorAll('.can-choice-btn')).find(b => b.textContent.trim() === correctWord);
            if (btn) btn.click();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const postAnswerEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            return {
              acertos: Songs.acertos,
              erros: Songs.erros,
              estrofeAtual: Songs.estrofeAtual
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Post answer evaluation:', JSON.stringify(postAnswerEval.result.value, null, 2));

      console.log('==================================================');
      console.log('STEP 4: KARAOKÊ PLAYER & CONTROLS');
      console.log('==================================================');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Songs.mudarModo('karaoke');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      // Test speed toggle
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Songs.alternarVelocidade();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 500));

      const karaEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const speedBtn = document.getElementById('can-speed-btn');
            const playBtn = document.getElementById('can-btn-play-main');
            const ytBtn = document.querySelector('.can-ctrl-btn.yt');
            return {
              modoPlayer: Songs.modoPlayer,
              speedText: speedBtn?.textContent.trim(),
              playText: playBtn?.textContent.trim(),
              hasYtLink: !!ytBtn?.href
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Karaokê evaluation:', JSON.stringify(karaEval.result.value, null, 2));

      const enShot3 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-songs-karaoke.png', Buffer.from(enShot3.data, 'base64'));
      console.log('Saved screenshots/en-songs-karaoke.png');

      console.log('==================================================');
      console.log('STEP 5: LYRICS CLOZE PLAYER (WORD BANK & TIMINGS)');
      console.log('==================================================');
      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            await Songs.iniciarCloze('can_custom_999');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const clozeEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-songs');
            const accBadge = document.getElementById('cloze-acc-badge');
            const wordPills = Array.from(sec.querySelectorAll('.cloze-word-pill')).map(p => p.textContent.trim());
            const blanks = Array.from(sec.querySelectorAll('.cloze-blank')).length;
            const verses = Array.from(sec.querySelectorAll('.cloze-verse')).length;
            const modeTabs = Array.from(sec.querySelectorAll('.can-mode-tab')).map(t => t.textContent.trim());

            return {
              modoPlayer: Songs.modoPlayer,
              accBadge: accBadge?.textContent.trim(),
              totalWordPills: wordPills.length,
              sampleWords: wordPills.slice(0, 5),
              totalBlanks: blanks,
              totalVerses: verses,
              modeTabs
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Cloze evaluation:', JSON.stringify(clozeEval.result.value, null, 2));

      const enShot4 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-songs-cloze.png', Buffer.from(enShot4.data, 'base64'));
      console.log('Saved screenshots/en-songs-cloze.png');

      console.log('==================================================');
      console.log('STEP 6: CLOZE STUDIO & ENGLISH GEMINI PROMPT');
      console.log('==================================================');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Songs.abrirClozeStudio();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      const studioEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const promptBox = document.getElementById('cloze-gemini-prompt-text');
            const titleInput = document.getElementById('cloze-titulo');
            const artistInput = document.getElementById('cloze-artista');
            const letraTa = document.getElementById('cloze-letra');
            const promptText = promptBox ? promptBox.textContent : '';
            const isEnglishPrompt = promptText.includes('Role: Audio Transcriber') && promptText.includes('Imagine');
            const placeholderIsEnglish = letraTa?.placeholder?.includes('Imagine');

            return {
              isEnglishPrompt,
              placeholderIsEnglish,
              titlePlaceholder: titleInput?.placeholder,
              artistPlaceholder: artistInput?.placeholder
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Studio evaluation:', JSON.stringify(studioEval.result.value, null, 2));

      const enShot5 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-songs-studio.png', Buffer.from(enShot5.data, 'base64'));
      console.log('Saved screenshots/en-songs-studio.png');

      console.log('==================================================');
      console.log('STEP 7: RESULTS SCREEN & FLASHCARD INTEGRATION');
      console.log('==================================================');
      // Trigger results screen
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Songs.canzonAtual = Songs.allSongs().find(s => s.id === 'can_custom_999');
            Songs.acertos = 4;
            Songs.mostrarResultado();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      const resEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const sec = document.getElementById('sec-songs');
            const resScore = sec.querySelector('.can-result-score')?.textContent.trim();
            const resXP = sec.querySelector('.can-result-xp')?.textContent.trim();
            const btns = Array.from(sec.querySelectorAll('.can-restart-btn')).map(b => b.textContent.trim());
            const hasFlashcardBtn = btns.some(b => b.includes('Flashcards'));

            return {
              resScore,
              resXP,
              btns,
              hasFlashcardBtn
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Result screen evaluation:', JSON.stringify(resEval.result.value, null, 2));

      const enShot6 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-songs-result.png', Buffer.from(enShot6.data, 'base64'));
      console.log('Saved screenshots/en-songs-result.png');

      // Click Flashcards button
      console.log('Testing Flashcard export from song...');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Songs.adicionarFlashcardsDaMusica('can_custom_999');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const fcEval = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const secFC = document.getElementById('sec-flashcard');
            const isActive = secFC && secFC.classList.contains('ativa');
            const cardWord = document.getElementById('flashcard-frente-palavra')?.textContent.trim();
            const cardsCount = Flashcards.cartasDisponiveis?.length || 0;
            return {
              isActive,
              cardWord,
              cardsCount
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Flashcards session evaluation:', JSON.stringify(fcEval.result.value, null, 2));

      const enShot7 = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-songs-flashcard.png', Buffer.from(enShot7.data, 'base64'));
      console.log('Saved screenshots/en-songs-flashcard.png');

      console.log('==================================================');
      console.log('ALL VERIFICATION STEPS COMPLETED SUCCESSFULLY!');
      console.log('==================================================');
      ws.close();
      process.exit(0);
    } catch (err) {
      console.error('Validation error:', err);
      ws.close();
      process.exit(1);
    }
  };
}

main().catch(err => {
  console.error('Main error:', err);
  process.exit(1);
});
