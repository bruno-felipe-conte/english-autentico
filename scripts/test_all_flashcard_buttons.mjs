// scripts/test_all_flashcard_buttons.mjs
import fs from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];

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
      await send('Page.enable');
      await send('Runtime.enable');
      await send('Network.enable');
      await send('Network.setCacheDisabled', { cacheDisabled: true });
      await send('Network.setBypassServiceWorker', { bypass: true });
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      // Init Flashcard 1
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            App.navegar('flashcards');
            Flashcards.init(1);
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      console.log('Testing each button and interactive element on English Flashcards...');

      const results = await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            const log = [];
            const test = (name, fn) => {
              try {
                const res = fn();
                log.push({ name, pass: true, detail: res });
              } catch (e) {
                log.push({ name, pass: false, error: e.message, stack: e.stack });
              }
            };

            // 1. btn-modo-normal
            test('btn-modo-normal click', () => {
              const b = document.getElementById('btn-modo-normal');
              b.click();
              return {
                isNormal: !Flashcards.modoReverso && !Flashcards.modoContexto && !Flashcards.modoEscuta,
                hasAtivoClass: b.classList.contains('ativo')
              };
            });

            // 2. btn-reverso click
            test('btn-reverso click', () => {
              const b = document.getElementById('btn-reverso');
              b.click();
              const rev = Flashcards.modoReverso;
              const hasAtivo = b.classList.contains('ativo');
              // restore
              document.getElementById('btn-modo-normal').click();
              return { rev, hasAtivo };
            });

            // 3. btn-contexto click
            test('btn-contexto click', () => {
              const b = document.getElementById('btn-contexto');
              b.click();
              const ctx = Flashcards.modoContexto;
              const hasAtivo = b.classList.contains('ativo');
              // restore
              document.getElementById('btn-modo-normal').click();
              return { ctx, hasAtivo };
            });

            // 4. btn-escuta click
            test('btn-escuta click', () => {
              const b = document.getElementById('btn-escuta');
              b.click();
              const esc = Flashcards.modoEscuta;
              const hasAtivo = b.classList.contains('ativo');
              // restore
              document.getElementById('btn-modo-normal').click();
              return { esc, hasAtivo };
            });

            // 5. btn-audio click
            test('btn-audio click (pronunciar)', () => {
              const b = document.getElementById('btn-audio');
              b.click();
              return { exists: !!b, called: typeof Flashcards.pronunciar === 'function' };
            });

            // 6. btn-audio-slow click (pronunciarLento)
            test('btn-audio-slow click (pronunciarLento)', () => {
              const b = document.getElementById('btn-audio-slow');
              b.click();
              return { exists: !!b, called: typeof Flashcards.pronunciarLento === 'function' };
            });

            // 7. btn-dica click (progressive hints)
            test('btn-dica click', () => {
              const b = document.getElementById('btn-dica');
              b.click();
              const pearls = document.getElementById('dica-pearls')?.textContent;
              const nivel = Flashcards.nivelDica;
              return { nivel, pearls };
            });

            // 8. btn-favorito click
            test('btn-favorito click', () => {
              const b = document.getElementById('btn-favorito');
              const beforeFav = App.ehFavorito(Flashcards.cartaAtual.id);
              b.click();
              const afterFav = App.ehFavorito(Flashcards.cartaAtual.id);
              // restore
              b.click();
              return { beforeFav, afterFav, labelPreserved: b.querySelector('.btn-tool-label') !== null };
            });

            // 9. Card flip click
            test('Flashcard card flip click', () => {
              const card = document.getElementById('flashcard');
              card.click();
              const virada = Flashcards.virada;
              const actionsVisible = document.getElementById('card-actions').style.display !== 'none';
              return { virada, actionsVisible };
            });

            // 10. Rating button Good (3) click
            test('btn-good (rating 3) click', () => {
              const b = document.getElementById('btn-good');
              const idxBefore = Flashcards.indiceAtual;
              b.click();
              const idxAfter = Flashcards.indiceAtual;
              return { idxBefore, idxAfter };
            });

            // 11. btn-revisao-geral click
            test('btn-revisao-geral click', () => {
              const b = document.getElementById('btn-revisao-geral');
              b.click();
              return {
                praticandoTodas: Flashcards.praticandoTodas,
                totalCartas: Flashcards.cartasDisponiveis.length
              };
            });

            // 12. Temple selector change
            test('Temple selector change', () => {
              const sel = document.getElementById('flashcard-temple-select') || document.getElementById('flashcard-templo-select');
              sel.value = '1';
              sel.dispatchEvent(new Event('change'));
              return {
                temploAtual: Flashcards.temploAtual,
                cartasCount: Flashcards.cartasDisponiveis.length
              };
            });

            return log;
          })()
        `,
        returnByValue: true
      });

      console.log('Test Results:\n', JSON.stringify(results?.result?.value, null, 2));
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  };
}

main();
