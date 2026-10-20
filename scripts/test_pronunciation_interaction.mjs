// scripts/test_pronunciation_interaction.mjs
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

      console.log('--- Testing Pronunciation Interactions ---');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      // Navigate to pronunciation
      await send('Runtime.evaluate', {
        awaitPromise: true,
        expression: `
          (async () => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            App.navegar('pronunciation');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1000));

      // Test 1: Click B2 filter
      console.log('Testing B2 filter pill...');
      const b2Test = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation._filtroNivel = 'B2';
            Pronunciation._applyFilter();
            const sec = document.getElementById('sec-pronunciation');
            return {
              itemAtual: Pronunciation.itemAtual,
              totalItems: Pronunciation._listaAtual?.length,
              isCompletedScreen: sec.innerHTML.includes('Awesome Job!') || sec.innerHTML.includes('Bravissimo!')
            };
          })()
        `,
        returnByValue: true
      });
      console.log('B2 Filter Test Result:', JSON.stringify(b2Test.result.value, null, 2));

      // Reset to all
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation._filtroNivel = '';
            Pronunciation._applyFilter();
          })()
        `
      });

      // Test 2: Simulate perfect pronunciation evaluation
      console.log('Testing evaluation result display...');
      const evalTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation.evaluatePronunciation("Oh my God!");
            const resEl = document.getElementById('pronunciation-result');
            const pills = Array.from(resEl.querySelectorAll('.dojo-word-pill')).map(p => ({
              text: p.textContent.trim(),
              cls: p.className
            }));
            const title = resEl.querySelector('div[style*="font-family"]')?.textContent.trim();
            const btns = Array.from(resEl.querySelectorAll('button')).map(b => b.textContent.trim());
            return {
              display: resEl.style.display,
              title,
              pills,
              buttons: btns
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Evaluation Test Result:', JSON.stringify(evalTest.result.value, null, 2));

      // Test 3: Click Next
      console.log('Testing Next button...');
      const nextTest = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Pronunciation.next();
            const sec = document.getElementById('sec-pronunciation');
            const frase = sec.querySelector('.dojo-hero-frase')?.textContent.trim();
            return {
              itemAtual: Pronunciation.itemAtual,
              frase
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Next Test Result:', JSON.stringify(nextTest.result.value, null, 2));

      ws.close();
      process.exit(0);
    } catch (err) {
      console.error(err);
      ws.close();
      process.exit(1);
    }
  };
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
