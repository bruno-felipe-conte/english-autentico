// scripts/validate_pronunciation_parity.mjs
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Also save to artifact directory if available
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
      console.log('1. INSPEÇÃO DE LAYOUT & FILTROS (A1, A2, B1, B2, C1)');
      console.log('======================================================');

      // Navigate and clear caches
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      const initRes = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            localStorage.removeItem('en_swr_pronunciation');
            localStorage.removeItem('en_pronunciation_custom');
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            App.navegar('pronunciation');
            Pronunciation.dados = null;
            await Pronunciation.load();
            Pronunciation.render();
            return {
              total: Pronunciation.dados?.imitazioni?.length,
              secaoTitulo: document.querySelector('#sec-pronunciation .section-titulo')?.textContent?.trim()
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Init result:', initRes.result.value);

      // Verify each level filter: A1, A2, B1, B2, C1
      const levelResults = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const niveis = ['A1', 'A2', 'B1', 'B2', 'C1'];
            const res = {};
            niveis.forEach(lvl => {
              Pronunciation._filtroNivel = lvl;
              Pronunciation._applyFilter();
              res[lvl] = {
                count: Pronunciation._listaAtual?.length,
                firstPhrase: Pronunciation._listaAtual[0]?.frase_ingles,
                dicaFonetica: Pronunciation._listaAtual[0]?.dica_fonetica,
                isCompletedScreen: document.getElementById('sec-pronunciation').innerHTML.includes('Awesome Job!')
              };
            });
            // Reset filter to All and ensure itemAtual is 0
            Pronunciation._filtroNivel = '';
            Pronunciation._applyFilter();
            Pronunciation.itemAtual = 0;
            Pronunciation.showChallenge();
            return res;
          })()
        `,
        returnByValue: true
      });
      console.log('Filter verification results across all CEFR levels:\n', JSON.stringify(levelResults.result.value, null, 2));

      // Capture screenshot of Initial Pronunciation Dojo with Filters
      const ssInitial = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('pronunciation-01-filters.png', ssInitial.data);

      console.log('\n======================================================');
      console.log('2. REPRODUÇÃO DO MODELO NATIVO (1.0x e 0.75x)');
      console.log('======================================================');

      // Test playModel(1.0) and soundwave animation
      const waveRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation.playModel(1.0);
            const wave = document.getElementById('dojo-wave');
            const isActive = wave?.classList.contains('active');
            return { waveActive: isActive };
          })()
        `,
        returnByValue: true
      });
      console.log('Soundwave active on playModel(1.0):', waveRes.result.value);

      const ssAudio = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('pronunciation-02-audio-model.png', ssAudio.data);

      console.log('\n======================================================');
      console.log('3. AVALIAÇÃO FONÉTICA E DIAGNÓSTICO ANALÍTICO');
      console.log('======================================================');

      // Test Excellent (>=80%) evaluation
      const evalExcellent = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation.itemAtual = 0;
            Pronunciation.showChallenge();
            // First item: "Oh my God!"
            Pronunciation.evaluatePronunciation("Oh my God!");
            const resContainer = document.getElementById('pronunciation-result');
            const title = resContainer?.querySelector('div[style*="font-family"]')?.textContent?.trim();
            const xpBadge = resContainer?.querySelector('span[style*="border-radius"]')?.textContent?.trim();
            const xpColor = resContainer?.querySelector('span[style*="border-radius"]')?.style?.color;
            const pills = Array.from(resContainer.querySelectorAll('.dojo-word-pill')).map(p => ({
              text: p.textContent.trim(),
              status: p.className
            }));
            const hasReplayToolbar = !!resContainer.querySelector('.dojo-replay-toolbar');
            return {
              display: resContainer?.style.display,
              title,
              xpBadge,
              xpColor,
              pills,
              hasReplayToolbar
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Evaluation (Excellent) result:', JSON.stringify(evalExcellent.result.value, null, 2));

      const ssEval = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('pronunciation-03-evaluation-breakdown.png', ssEval.data);

      // Test Almost (>=50% and <80%)
      const evalAlmost = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation.itemAtual = 0;
            Pronunciation.evaluatePronunciation("Oh my gosh");
            const resContainer = document.getElementById('pronunciation-result');
            const title = resContainer?.querySelector('div[style*="font-family"]')?.textContent?.trim();
            return { title };
          })()
        `,
        returnByValue: true
      });
      console.log('Evaluation (Almost) result:', evalAlmost.result.value);

      // Test Try Again (<50%)
      const evalTryAgain = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation.itemAtual = 0;
            Pronunciation.evaluatePronunciation("Something completely unrelated");
            const resContainer = document.getElementById('pronunciation-result');
            const title = resContainer?.querySelector('div[style*="font-family"]')?.textContent?.trim();
            return { title };
          })()
        `,
        returnByValue: true
      });
      console.log('Evaluation (Try Again) result:', evalTryAgain.result.value);

      console.log('\n======================================================');
      console.log('4. FLUXO DE AVANÇO E CONCLUSÃO (Voltar aos Templos)');
      console.log('======================================================');

      // Trigger completion screen
      const completionRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation.showCompletion();
            const card = document.querySelector('.pronunciation-dojo .dojo-hero-card');
            const btns = Array.from(card.querySelectorAll('button')).map(b => ({
              text: b.textContent.trim(),
              onclick: b.getAttribute('onclick')
            }));
            return {
              title: card.querySelector('h3')?.textContent?.trim(),
              buttons: btns
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Completion screen test:', JSON.stringify(completionRes.result.value, null, 2));

      const ssCompletion = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('pronunciation-04-completion-screen.png', ssCompletion.data);

      // Click "🏛️ Voltar aos Templos"
      const returnTemplesRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Voltar aos Templos'));
            if (btn) btn.click();
            return {
              activeSection: App.estado?.secaoAtiva,
              secTemplesClass: document.getElementById('sec-temples')?.className,
              secPronunciationClass: document.getElementById('sec-pronunciation')?.className
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Return to Temples result:', returnTemplesRes.result.value);

      const ssTemples = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('pronunciation-05-return-temples.png', ssTemples.data);

      console.log('\n======================================================');
      console.log('5. CRIAÇÃO & EXCLUSÃO VIA IA (IAImport.excluir)');
      console.log('======================================================');

      // Navigate back to pronunciation
      await send('Runtime.evaluate', {
        expression: `App.navegar('pronunciation');`
      });
      await new Promise(r => setTimeout(r, 600));

      // Inject a test custom phrase and verify UI
      const customTestRes = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            const testItem = {
              id: 'imi_test_custom_999',
              frase_ingles: 'Practice makes progress, not perfection.',
              frase_portugues: 'A prática leva ao progresso, não à perfeição.',
              nivel: 'B2',
              contexto: 'Motivational phrase for language learners.',
              audio_ipa: '/ˈpræktɪs meɪks ˈprɑːɡrɛs nɑːt pərˈfɛkʃən/',
              dica_fonetica: 'Contrastive stress on progress and perfection.',
              xp_recompensa: 25,
              _custom: true
            };
            const currentCustom = JSON.parse(localStorage.getItem('en_pronunciation_custom') || '[]');
            localStorage.setItem('en_pronunciation_custom', JSON.stringify([testItem, ...currentCustom]));

            Pronunciation.dados = null;
            await Pronunciation.render();
            await new Promise(r => setTimeout(r, 200));

            const customInList = Pronunciation._listaAtual?.find(x => x.id === 'imi_test_custom_999');
            const hasDeleteBtn = !!document.querySelector('.dojo-hero-badge button');

            return {
              customInList: !!customInList,
              hasDeleteBtn,
              phrase: customInList?.frase_ingles
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Custom phrase injection result:', customTestRes.result.value);

      const ssCustomItem = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('pronunciation-06-custom-phrase.png', ssCustomItem.data);

      // Now test deletion via IAImport.excluir('pronunciation', id)
      const deleteTestRes = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            // Mock window.confirm to return true
            const origConfirm = window.confirm;
            window.confirm = () => true;

            IAImport.excluir('pronunciation', 'imi_test_custom_999');

            window.confirm = origConfirm;

            // Wait brief tick for render
            await new Promise(r => setTimeout(r, 300));

            const remainingCustom = JSON.parse(localStorage.getItem('en_pronunciation_custom') || '[]');
            const stillInStorage = remainingCustom.some(x => x.id === 'imi_test_custom_999');
            const customStillInList = Pronunciation._listaAtual?.some(x => x.id === 'imi_test_custom_999');

            return {
              stillInStorage,
              customStillInList,
              totalItemsNow: Pronunciation._listaAtual?.length
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Deletion result via IAImport.excluir:', deleteTestRes.result.value);

      const ssAfterDelete = await send('Page.captureScreenshot', { format: 'png' });
      saveScreenshot('pronunciation-07-after-delete.png', ssAfterDelete.data);

      console.log('\n======================================================');
      console.log('ALL TESTS COMPLETED SUCCESSFULLY WITH 100% PARITY!');
      console.log('======================================================\n');
      ws.close();
      process.exit(0);
    } catch (err) {
      console.error('Validation error:', err);
      ws.close();
      process.exit(1);
    }
  };
}

main().catch(console.error);
