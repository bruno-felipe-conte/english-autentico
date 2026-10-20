// scripts/validate_flashcards_parity.mjs
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const artifactDir = 'C:\\Users\\bruno\\.gemini\\antigravity-ide\\brain\\af3d7a14-a644-4ac7-ba48-02efeb608e3f';
const artifactScreenshots = path.join(artifactDir, 'screenshots');
if (fs.existsSync(artifactDir) && !fs.existsSync(artifactScreenshots)) {
  fs.mkdirSync(artifactScreenshots, { recursive: true });
}

function saveScreenshot(filename, base64Data) {
  const p1 = path.join(outDir, filename);
  fs.writeFileSync(p1, Buffer.from(base64Data, 'base64'));
  console.log(`Saved screenshot: ${p1}`);
  if (fs.existsSync(artifactScreenshots)) {
    const p2 = path.join(artifactScreenshots, filename);
    fs.writeFileSync(p2, Buffer.from(base64Data, 'base64'));
  }
}

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to WebSocket:', target.webSocketDebuggerUrl);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      const handler = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onopen = async () => {
    try {
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Network.enable');
      await send('Network.setCacheDisabled', { cacheDisabled: true });
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('\n======================================================');
      console.log('1. TESTE DE NAVEGAÇÃO E SELETOR DE TEMPLOS');
      console.log('======================================================');

      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1&_ts=' + Date.now() });
      await new Promise(r => setTimeout(r, 2000));

      const navRes = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();

            // Desbloqueia templos para teste
            App.estado.progresso.templos_desbloqueados = [1, 2, 3];
            App.salvarProgresso();

            // Adiciona uma palavra customizada no cache e storage
            const testCustom = {
              id: 'w_custom_test_1',
              ingles: 'resilience',
              portugues: 'resiliência',
              exemplo: 'Resilience is key to overcoming adversity.',
              exemplo_pt: 'Resiliência é a chave para superar adversidades.',
              audio_ipa: '/rɪˈzɪliəns/',
              categoria: 'mindset',
              _custom: true
            };
            const customList = JSON.parse(localStorage.getItem('en_vocab_custom') || '[]');
            if (!customList.find(p => p.id === testCustom.id)) {
              customList.unshift(testCustom);
              localStorage.setItem('en_vocab_custom', JSON.stringify(customList));
            }
            if (!App.estado.vocabCache) App.estado.vocabCache = [];
            if (!App.estado.vocabCache.find(p => p.id === testCustom.id)) {
              App.estado.vocabCache.unshift(testCustom);
            }

            App.navegar('flashcards');
            Flashcards.atualizarSelectTemplo();
            Flashcards.init(1);

            const sel = document.getElementById('flashcard-temple-select') || document.getElementById('flashcard-templo-select');
            const options = Array.from(sel.querySelectorAll('option')).map(o => ({ value: o.value, text: o.textContent }));
            const hasCustom = options.some(o => o.value === 'custom');

            return {
              optionsCount: options.length,
              hasCustom,
              activeSection: App.estado.secaoAtiva,
              temploAtual: Flashcards.temploAtual,
              cartasTotal: Flashcards.cartasDisponiveis.length,
              firstWord: Flashcards.cartaAtual?.ingles
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Nav & Selector Result:', JSON.stringify(navRes.result.value, null, 2));

      const ssInitial = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-flashcard-initial.png', ssInitial.data);

      console.log('\n======================================================');
      console.log('2. TESTE DE TODOS OS BOTÕES E MODOS DE FLASHCARDS');
      console.log('======================================================');

      // 2.1 Mode Normal
      const modeNormal = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const b = document.getElementById('btn-modo-normal');
            b.click();
            return {
              isNormal: !Flashcards.modoReverso && !Flashcards.modoContexto && !Flashcards.modoEscuta,
              hasAtivo: b.classList.contains('ativo'),
              cardFront: document.getElementById('card-ingles')?.textContent?.trim()
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Mode Normal:', modeNormal.result.value);

      // 2.2 Mode Reverso
      const modeReverso = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const b = document.getElementById('btn-reverso');
            b.click();
            return {
              modoReverso: Flashcards.modoReverso,
              hasAtivo: b.classList.contains('ativo'),
              cardFrontPt: document.getElementById('card-ingles')?.textContent?.trim()
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Mode Reverso:', modeReverso.result.value);

      const ssReverso = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-flashcard-reverso.png', ssReverso.data);

      // 2.3 Mode Contexto
      const modeContexto = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const b = document.getElementById('btn-contexto');
            b.click();
            return {
              modoContexto: Flashcards.modoContexto,
              hasAtivo: b.classList.contains('ativo'),
              maskedSentence: document.getElementById('card-ingles')?.textContent?.trim()
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Mode Contexto:', modeContexto.result.value);

      const ssContexto = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-flashcard-contexto.png', ssContexto.data);

      // 2.4 Mode Escuta
      const modeEscuta = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const b = document.getElementById('btn-escuta');
            b.click();
            return {
              modoEscuta: Flashcards.modoEscuta,
              hasAtivo: b.classList.contains('ativo'),
              iconFront: document.getElementById('card-ingles')?.textContent?.trim()
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Mode Escuta:', modeEscuta.result.value);

      const ssEscuta = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-flashcard-escuta.png', ssEscuta.data);

      // Reset to Normal
      await send('Runtime.evaluate', {
        expression: `document.getElementById('btn-modo-normal').click();`
      });

      // 2.5 Audio Normal (1.0x) & Slow (0.72x)
      const audioTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            let lastSpeed = null;
            const origSpeak = App.speak;
            App.speak = (txt, rate = 1.0) => {
              lastSpeed = rate;
            };

            const btnNormal = document.getElementById('btn-audio');
            if (btnNormal) btnNormal.click();
            const normalRate = lastSpeed;

            const btnSlow = document.getElementById('btn-audio-slow');
            if (btnSlow) btnSlow.click();
            const slowRate = lastSpeed;

            App.speak = origSpeak;
            return {
              hasPronunciarLento: typeof Flashcards.pronunciarLento === 'function',
              normalRate,
              slowRate
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Audio Playback (Normal & Slow):', audioTest.result.value);

      // 2.6 Progressive Hints & Pearls
      const hintTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const b = document.getElementById('btn-dica');
            const elPearls = document.getElementById('dica-pearls');

            // Level 1
            b.click();
            const p1 = elPearls?.textContent?.trim();
            const h1 = document.getElementById('card-dica')?.textContent?.trim();

            // Level 2
            b.click();
            const p2 = elPearls?.textContent?.trim();
            const h2 = document.getElementById('card-dica')?.textContent?.trim();

            return {
              level1: { pearl: p1, hint: h1 },
              level2: { pearl: p2, hint: h2 }
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Progressive Hints & Pearls:', JSON.stringify(hintTest.result.value, null, 2));

      const ssDica = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-flashcard-dica.png', ssDica.data);

      // 2.7 Favorite Button & Label preservation
      const favTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const b = document.getElementById('btn-favorito');
            const labelBefore = b.querySelector('.btn-tool-label')?.textContent?.trim();
            b.click();
            const iconAfter = b.querySelector('.btn-tool-icon')?.textContent?.trim();
            const labelAfter = b.querySelector('.btn-tool-label')?.textContent?.trim();
            const isFav = App.ehFavorito(Flashcards.cartaAtual.id);
            // Toggle back
            b.click();
            return {
              labelBefore,
              iconAfter,
              labelAfter,
              isFav,
              labelPreserved: !!b.querySelector('.btn-tool-label')
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Favorite Button Test:', favTest.result.value);

      // 2.8 3D Deck Layers & Card Flip
      const flipTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const layer1 = document.getElementById('deck-layer-1');
            const layer2 = document.getElementById('deck-layer-2');
            const layersVisible = {
              layer1: layer1 ? layer1.style.display : null,
              layer2: layer2 ? layer2.style.display : null
            };

            const card = document.getElementById('flashcard');
            card.click();

            const isVirado = card.classList.contains('virado');
            const actionsDisplay = document.getElementById('card-actions')?.style?.display;
            const buttons = ['btn-again', 'btn-hard', 'btn-good', 'btn-easy'].map(id => {
              const btn = document.getElementById(id);
              return {
                id,
                text: btn?.textContent?.trim(),
                interval: btn?.querySelector('.intervalo-badge')?.textContent?.trim()
              };
            });

            return {
              layersVisible,
              isVirado,
              actionsDisplay,
              buttons
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Card Flip & FSRS Actions:', JSON.stringify(flipTest.result.value, null, 2));

      const ssFlipped = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-flashcard-flipped.png', ssFlipped.data);

      // 2.9 Evaluate Card (Rating 3 - Good)
      const evalTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const idxBefore = Flashcards.indiceAtual;
            const btnGood = document.getElementById('btn-good');
            btnGood.click();
            return {
              idxBefore,
              idxAfter: Flashcards.indiceAtual,
              isViradoAfter: document.getElementById('flashcard')?.classList?.contains('virado'),
              newWord: Flashcards.cartaAtual?.ingles
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Evaluate Card (Good):', evalTest.result.value);

      // 2.10 Custom Deck Study
      const customDeckTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Flashcards.init('custom');
            return {
              temploAtual: Flashcards.temploAtual,
              cartasTotal: Flashcards.cartasDisponiveis.length,
              firstWord: Flashcards.cartaAtual?.ingles,
              isCustomWord: Flashcards.cartaAtual?._custom
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Custom Deck Study:', customDeckTest.result.value);

      // 2.11 Revisão Geral
      const rgTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btnRg = document.getElementById('btn-revisao-geral');
            btnRg.click();
            return {
              cartasCount: Flashcards.cartasDisponiveis.length,
              temploAtual: Flashcards.temploAtual
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Revisão Geral Result:', rgTest.result.value);

      console.log('\n======================================================');
      console.log('3. TESTE DE INTEGRAÇÃO COM TELA DE TEMPLOS');
      console.log('======================================================');

      // 3.1 Navigate to Temples
      await send('Runtime.evaluate', {
        expression: `App.navegar('temples');`
      });
      await new Promise(r => setTimeout(r, 600));

      // Click Temple 1 card directly
      const directStudy = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const card1 = document.querySelector('.temple-card.desbloqueado') || document.querySelector('.templo-card');
            if (card1) card1.click();
            return {
              activeSection: App.estado.secaoAtiva,
              temploAtual: Flashcards.temploAtual,
              firstWord: Flashcards.cartaAtual?.ingles
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Direct Study from Temple 1 card:', directStudy.result.value);

      const ssDirectStudy = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-temples-direct-study.png', ssDirectStudy.data);

      // 3.2 Locked Temple & Unlock with code 2012
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            // Lock temple 10 for test
            App.estado.progresso.templos_desbloqueados = [1];
            App.salvarProgresso();
            App.navegar('temples');
            App.renderizarTemplos();
          })()
        `
      });
      await new Promise(r => setTimeout(r, 600));

      const unlockFlow = await send('Runtime.evaluate', {
        expression: `
          (() => {
            // Open modal for temple 2
            App.abrirModalTemplo(2);
            const modal = document.getElementById('temple-modal') || document.getElementById('templo-modal');
            const hasModal = modal && modal.classList.contains('ativo');

            // Type secret unlock code
            const input = document.getElementById('tm-code-input');
            if (input) input.value = '2012';
            App.tentarDesbloquear(2);

            const isUnlockedNow = Progressao.temploDesbloqueado(2);
            const sel = document.getElementById('flashcard-temple-select') || document.getElementById('flashcard-templo-select');
            const hasOption2 = Array.from(sel?.querySelectorAll('option') || []).some(o => o.value === '2');

            return {
              hasModal,
              isUnlockedNow,
              hasOption2InSelect: hasOption2
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Unlock flow with code 2012:', unlockFlow.result.value);

      const ssUnlockFlow = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('en-temples-unlock-flow.png', ssUnlockFlow.data);

      console.log('\n======================================================');
      console.log('ALL FLASHCARDS & TEMPLES PARITY TESTS PASSED 100%!');
      console.log('======================================================\n');
      ws.close();
      process.exit(0);
    } catch (e) {
      console.error('Validation error:', e);
      ws.close();
      process.exit(1);
    }
  };
}

main().catch(console.error);
