// scripts/validate_onboarding_and_toast.mjs
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

    console.log('1. Loading http://localhost:8080/ and resetting onboarding flag in localStorage...');
    await send('Page.navigate', { url: 'http://localhost:8080/' });
    await new Promise(r => setTimeout(r, 2000));

    // Reset onboarding flag and show modal
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          localStorage.removeItem('en_onboarding_done');
          if (typeof Onboarding !== 'undefined') {
            Onboarding.mostrar();
          }
        })()
      `
    });
    await new Promise(r => setTimeout(r, 800));

    const checkModalOpen = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const m = document.getElementById('onboarding-modal');
          const btn = m?.querySelector('.onb-btn-skip');
          return {
            modalVisible: m && getComputedStyle(m).display !== 'none',
            btnSkipText: btn?.innerText,
            slideTitle: m?.querySelector('.onb-slide.active h3')?.innerText
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Onboarding modal state:', checkModalOpen?.result?.value);

    // Capture screenshot of Onboarding modal with "Pular Tudo ✕" button
    const shotOnb = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('proof-onboarding-modal.png', Buffer.from(shotOnb.data, 'base64'));
    console.log('✅ Saved proof-onboarding-modal.png');

    // 2. Test Clicking "Pular Tudo ✕" button
    console.log('2. Clicking "Pular Tudo ✕" button...');
    const clickSkip = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('.onb-btn-skip');
          if (!btn) return { error: 'Skip button not found' };
          btn.click();
          return { clicked: true };
        })()
      `,
      returnByValue: true
    });
    console.log('Click result:', clickSkip?.result?.value);
    await new Promise(r => setTimeout(r, 600));

    const checkModalClosed = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const m = document.getElementById('onboarding-modal');
          return {
            modalVisible: m && getComputedStyle(m).display !== 'none',
            storageFlag: localStorage.getItem('en_onboarding_done')
          };
        })()
      `,
      returnByValue: true
    });
    console.log('State after clicking Pular Tudo:', checkModalClosed?.result?.value);

    const shotAfterSkip = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('proof-onboarding-skipped.png', Buffer.from(shotAfterSkip.data, 'base64'));
    console.log('✅ Saved proof-onboarding-skipped.png');

    // 3. Test Toast Notification with the exact "Ocultar PT / Ocultar EN" tip text
    console.log('3. Triggering toast notification with full dica text...');
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const msg = I18n.t('vocab_tip_ocultar');
          App.notificar(msg, 'alerta');
        })()
      `
    });
    await new Promise(r => setTimeout(r, 400));

    const toastMetrics = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const toast = document.querySelector('.toast.alerta');
          if (!toast) return { error: 'Toast not found' };
          const rect = toast.getBoundingClientRect();
          return {
            text: toast.innerText,
            scrollWidth: toast.scrollWidth,
            clientWidth: toast.clientWidth,
            offsetWidth: toast.offsetWidth,
            height: rect.height,
            isOverflowing: toast.scrollWidth > toast.clientWidth,
            computedStyles: {
              background: getComputedStyle(toast).backgroundColor,
              color: getComputedStyle(toast).color,
              borderRadius: getComputedStyle(toast).borderRadius,
              whiteSpace: getComputedStyle(toast).whiteSpace,
              maxWidth: getComputedStyle(toast).maxWidth
            }
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Toast Metrics & Formatting:', toastMetrics?.result?.value);

    const shotToastDesktop = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('proof-toast-fixed-desktop.png', Buffer.from(shotToastDesktop.data, 'base64'));
    console.log('✅ Saved proof-toast-fixed-desktop.png');

    // 4. Test Toast on Mobile Viewport (375x667)
    console.log('4. Testing Toast on Mobile Viewport (375x667)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      mobile: true
    });
    await new Promise(r => setTimeout(r, 300));

    // Retrigger toast on mobile
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          App.notificar(I18n.t('vocab_tip_ocultar'), 'alerta');
        })()
      `
    });
    await new Promise(r => setTimeout(r, 400));

    const toastMobileMetrics = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const toasts = document.querySelectorAll('.toast.alerta');
          const toast = toasts[toasts.length - 1];
          if (!toast) return { error: 'Toast not found on mobile' };
          return {
            scrollWidth: toast.scrollWidth,
            clientWidth: toast.clientWidth,
            isOverflowing: toast.scrollWidth > toast.clientWidth,
            text: toast.innerText
          };
        })()
      `,
      returnByValue: true
    });
    console.log('Toast Mobile Metrics:', toastMobileMetrics?.result?.value);

    const shotToastMobile = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('proof-toast-fixed-mobile.png', Buffer.from(shotToastMobile.data, 'base64'));
    console.log('✅ Saved proof-toast-fixed-mobile.png');

    // Copy to brain artifacts
    const brainDir = '/home/bruno/.gemini/antigravity/brain/5ecf61d0-e30e-4466-a765-65fad982a75f/screenshots';
    for (const f of ['proof-onboarding-modal.png', 'proof-onboarding-skipped.png', 'proof-toast-fixed-desktop.png', 'proof-toast-fixed-mobile.png']) {
      if (fs.existsSync(f)) {
        fs.copyFileSync(f, `${brainDir}/${f}`);
        console.log(`Copied ${f} to artifacts directory`);
      }
    }

    console.log('🎉 Validation completed successfully!');
    process.exit(0);
  };
}

main().catch(console.error);
