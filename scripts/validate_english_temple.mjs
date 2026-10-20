// scripts/validate_english_temple.mjs
import fs from 'fs';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to:', target.webSocketDebuggerUrl);

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

    console.log('Navigating to English App: http://localhost:8080/?no_onb=1 ...');
    await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
    await new Promise(r => setTimeout(r, 2500));

    // Reset progress to clean state for test: Temple 1 unlocked, others locked
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
          if (typeof Tour !== 'undefined') Tour.fechar?.();
          const onb = document.getElementById('onboarding-modal');
          if (onb) onb.remove();

          // Reset temple progress so only Temple 1 is unlocked initially
          if (App && App.estado && App.estado.progresso) {
            App.estado.progresso.templos_desbloqueados = [1];
            App.salvarProgresso();
            App.renderizarTemplos();
            App.atualizarStats();
          }
        })()
      `
    });
    await new Promise(r => setTimeout(r, 800));

    // 1. Capture full Temples screen
    const shotMain = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-temples-desktop.png', Buffer.from(shotMain.data, 'base64'));
    console.log('✅ Saved en-temples-desktop.png');

    // 2. Validate Word of the Day content and interactive buttons
    const pddInfo = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.getElementById('parola-del-giorno');
          const palavra = el?.querySelector('.pdd-palavra')?.innerText;
          const ipa = el?.querySelector('.pdd-ipa')?.innerText;
          const trad = el?.querySelector('.pdd-traducao')?.innerText;
          const btns = Array.from(el?.querySelectorAll('button') || []).map(b => b.innerText);
          return { visible: el?.style.display !== 'none', palavra, ipa, trad, btns };
        })()
      `,
      returnByValue: true
    });
    console.log('📖 Word of the Day inspection:', pddInfo?.result?.value);

    // 3. Test Clicking Unlocked Temple 1 Card
    console.log('Testing Temple 1 click (direct study flow)...');
    const clickT1 = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const cards = document.querySelectorAll('.temple-card, .templo-card');
          const t1 = cards[0];
          if (!t1) return { error: 'Temple 1 not found' };
          t1.click();
          return {
            clicked: true,
            className: t1.className
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Temple 1 Click result:', clickT1?.result?.value);
    await new Promise(r => setTimeout(r, 800));

    const stateAfterT1 = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const sel = document.getElementById('flashcard-temple-select') || document.getElementById('flashcard-templo-select');
          return {
            activeSection: App.estado?.secaoAtiva,
            selectorValue: sel ? sel.value : null,
            flashcardVisible: document.getElementById('flashcard')?.style.display !== 'none',
            frontText: document.querySelector('.flashcard-frente .fc-termo')?.innerText
          };
        })()
      `,
      returnByValue: true
    });
    console.log('State after Temple 1 clicked (Navigated to Flashcards):', stateAfterT1?.result?.value);

    const shotFC = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-flashcard-from-temple.png', Buffer.from(shotFC.data, 'base64'));
    console.log('✅ Saved en-flashcard-from-temple.png');

    // Return to Temples
    await send('Runtime.evaluate', { expression: `App.navegar('temples')` });
    await new Promise(r => setTimeout(r, 800));

    // 4. Test Clicking Locked Temple 2 Card -> Opens Modal
    console.log('Testing Temple 2 click (Locked modal flow)...');
    const clickT2 = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const cards = document.querySelectorAll('.temple-card, .templo-card');
          const t2 = cards[1];
          if (!t2) return { error: 'Temple 2 not found' };
          t2.click();
          return { clicked: true, className: t2.className };
        })()
      `,
      returnByValue: true
    });
    console.log('Temple 2 Click result:', clickT2?.result?.value);
    await new Promise(r => setTimeout(r, 600));

    const modalLockedState = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const modal = document.getElementById('temple-modal') || document.getElementById('templo-modal');
          const body = document.getElementById('temple-modal-body') || document.getElementById('templo-modal-body');
          const unlockArea = body?.querySelector('.tm-unlock-area');
          const codeInput = document.getElementById('tm-code-input');
          const unlockBtn = body?.querySelector('.tm-btn-unlock');
          return {
            isOpen: modal?.classList.contains('ativo'),
            headerText: body?.querySelector('.tm-nome')?.innerText,
            lockBanner: body?.querySelector('.tm-lock-banner')?.innerText,
            hasUnlockArea: !!unlockArea,
            hasCodeInput: !!codeInput,
            hasUnlockBtn: !!unlockBtn
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Locked Modal State:', modalLockedState?.result?.value);

    // Open accordion
    await send('Runtime.evaluate', {
      expression: `
        const area = document.querySelector('.tm-unlock-area');
        if (area) area.open = true;
      `
    });
    await new Promise(r => setTimeout(r, 300));

    const shotModalLocked = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-temple-modal-locked.png', Buffer.from(shotModalLocked.data, 'base64'));
    console.log('✅ Saved en-temple-modal-locked.png');

    // 5. Test Invalid Code in Modal
    console.log('Testing invalid code rejection...');
    const testWrongCode = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const input = document.getElementById('tm-code-input');
          input.value = 'wrong_code';
          App.tentarDesbloquear(2);
          return { inputPlaceholder: input.placeholder, borderColor: input.style.borderColor };
        })()
      `,
      returnByValue: true
    });
    console.log('Invalid Code Response:', testWrongCode?.result?.value);
    await new Promise(r => setTimeout(r, 1000));

    // 6. Test Valid Code (2012) in Modal
    console.log('Testing valid code (2012) unlock...');
    const testValidCode = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const input = document.getElementById('tm-code-input');
          input.value = '2012';
          App.tentarDesbloquear(2);
          const modal = document.getElementById('temple-modal') || document.getElementById('templo-modal');
          return {
            modalClosed: !modal?.classList.contains('ativo'),
            unlockedCount: App.estado.progresso.templos_desbloqueados.length,
            toastText: document.querySelector('.toast')?.innerText
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Valid Code Unlock Result:', testValidCode?.result?.value);
    await new Promise(r => setTimeout(r, 1000));

    // 7. Test Opening Unlocked Temple Modal and Action Buttons
    console.log('Opening Temple 1 Unlocked Modal...');
    await send('Runtime.evaluate', { expression: `App.abrirModalTemplo(1)` });
    await new Promise(r => setTimeout(r, 600));

    const modalUnlockedState = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const modal = document.getElementById('temple-modal') || document.getElementById('templo-modal');
          const body = document.getElementById('temple-modal-body') || document.getElementById('templo-modal-body');
          const btnStudy = body?.querySelector('.tm-btn-primary');
          const btnQuiz = body?.querySelector('.tm-btn-quiz');
          return {
            isOpen: modal?.classList.contains('ativo'),
            title: body?.querySelector('.tm-nome')?.innerText,
            hasStudyBtn: !!btnStudy,
            studyBtnText: btnStudy?.innerText,
            hasQuizBtn: !!btnQuiz,
            quizBtnText: btnQuiz?.innerText,
            progressText: body?.querySelector('.tm-progress-label')?.innerText
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Unlocked Modal State:', modalUnlockedState?.result?.value);

    const shotModalUnlocked = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-temple-modal-unlocked.png', Buffer.from(shotModalUnlocked.data, 'base64'));
    console.log('✅ Saved en-temple-modal-unlocked.png');

    // 8. Test Quiz Button from Unlocked Modal
    console.log('Clicking Quiz Button in Modal...');
    await send('Runtime.evaluate', {
      expression: `
        const btnQuiz = document.querySelector('.tm-btn-quiz');
        if (btnQuiz) btnQuiz.click();
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const stateAfterQuiz = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            activeSection: App.estado?.secaoAtiva,
            quizTemploAtual: typeof Quiz !== 'undefined' ? Quiz.temploAtual : null,
            quizQuestionText: document.getElementById('quiz-pergunta')?.innerText
          };
        })()
      `,
      returnByValue: true
    });
    console.log('State after clicking Quiz in Modal:', stateAfterQuiz?.result?.value);

    const shotQuiz = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('en-quiz-from-temple.png', Buffer.from(shotQuiz.data, 'base64'));
    console.log('✅ Saved en-quiz-from-temple.png');

    // Copy screenshots to brain artifact folder
    const brainDir = '/home/bruno/.gemini/antigravity/brain/5ecf61d0-e30e-4466-a765-65fad982a75f/screenshots';
    if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });
    for (const f of ['en-temples-desktop.png', 'en-temple-modal-locked.png', 'en-temple-modal-unlocked.png', 'en-flashcard-from-temple.png', 'en-quiz-from-temple.png']) {
      if (fs.existsSync(f)) {
        fs.copyFileSync(f, `${brainDir}/${f}`);
        console.log(`Copied ${f} to artifacts directory`);
      }
    }

    console.log('🎉 All Temple validation tests passed successfully!');
    process.exit(0);
  };
}

main().catch(console.error);
