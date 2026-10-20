// scripts/inspect_stories_parity.mjs
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

      console.log('\n======================================================');
      console.log('=== STEP 1: INSPECTION OF ITALIAN STORIES (PORT 8000) ===');
      console.log('======================================================');
      await send('Page.navigate', { url: 'http://localhost:8000/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      // Dismiss onboarding and navigate to Storie
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('storie');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const itShotSelector = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-stories-selector.png', Buffer.from(itShotSelector.data, 'base64'));
      console.log('Saved screenshots/it-stories-selector.png');

      const itSelectorData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const container = document.getElementById('storie-container');
            const cards = Array.from(container?.querySelectorAll('[onclick*="abrirStoria"]') || []);
            const filterBtns = Array.from(container?.querySelectorAll('button') || []).map(b => ({
              text: b.innerText.trim(),
              onclick: b.getAttribute('onclick')
            }));
            const searchInput = container?.querySelector('input[type="search"]');
            const levelSelect = container?.querySelector('select');
            return {
              activeSection: App.estado?.secaoAtiva,
              storiesCount: Storie.dados?.storie?.length || 0,
              renderedCardsCount: cards.length,
              filterButtons: filterBtns,
              hasSearchInput: !!searchInput,
              hasLevelSelect: !!levelSelect,
              firstStoryTitle: cards[0]?.querySelector('div:nth-child(2)')?.innerText?.trim()
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Stories Selector Data:', JSON.stringify(itSelectorData?.result?.value, null, 2));

      // Open first story in Italian
      console.log('\n--- Opening Story 1 in Italian App ---');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const firstStory = Storie.dados?.storie?.[0];
            if (firstStory) Storie.abrirStoria(firstStory.id);
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1500));

      const itShotReader = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/it-stories-reader.png', Buffer.from(itShotReader.data, 'base64'));
      console.log('Saved screenshots/it-stories-reader.png');

      const itReaderData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const overlay = document.getElementById('book-reader-overlay');
            const topBar = overlay?.querySelector('.book-top-bar');
            const actionBtns = Array.from(topBar?.querySelectorAll('.book-top-actions button, .book-btn-voltar') || []).map(b => ({
              text: b.innerText.replace(/\\n/g, ' ').trim(),
              title: b.title,
              className: b.className,
              onclick: b.getAttribute('onclick')
            }));
            const bottomBar = overlay?.querySelector('.book-bottom-bar');
            const navBtns = Array.from(bottomBar?.querySelectorAll('button') || []).map(b => ({
              text: b.innerText.replace(/\\n/g, ' ').trim(),
              onclick: b.getAttribute('onclick'),
              disabled: b.disabled
            }));
            const words = Array.from(overlay?.querySelectorAll('.storie-palavra') || []);
            const slider = bottomBar?.querySelector('input[type="range"]');

            return {
              isOpen: overlay?.style.display !== 'none',
              currentStory: Storie.storAttuale?.titulo,
              currentPage: Storie.paginaAtual,
              totalPages: Storie._paginas?.length,
              topActionButtons: actionBtns,
              bottomNavButtons: navBtns,
              wordsClickableCount: words.length,
              sampleWords: words.slice(0, 5).map(w => ({
                text: w.textContent,
                palavra: w.dataset.palavra,
                ipa: w.dataset.ipa,
                trad: w.dataset.trad
              })),
              sliderMax: slider ? slider.max : null
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Reader Data:', JSON.stringify(itReaderData?.result?.value, null, 2));

      // Test clicking on a word in Italian
      console.log('\n--- Clicking word in Italian Reader ---');
      const itWordClick = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const w = document.querySelector('.storie-palavra');
            if (w) {
              w.click();
              const modal = document.getElementById('storie-word-modal');
              return {
                clickedWord: w.textContent.trim(),
                modalVisible: modal && modal.style.display !== 'none',
                modalText: modal?.innerText?.replace(/\\n/g, ' | '),
                buttons: Array.from(modal?.querySelectorAll('button') || []).map(b => ({
                  text: b.innerText.trim(),
                  onclick: b.getAttribute('onclick'),
                  id: b.id,
                  className: b.className
                }))
              };
            }
            return { error: 'No word element found' };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Word Modal Click:', JSON.stringify(itWordClick?.result?.value, null, 2));

      // Test Chapter Drawer in Italian
      console.log('\n--- Opening Chapter Drawer in Italian ---');
      await send('Runtime.evaluate', {
        expression: `Storie._abrirIndiceCapitulos();`
      });
      await new Promise(r => setTimeout(r, 600));

      const itDrawerData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const drawer = document.querySelector('.book-drawer');
            const items = Array.from(drawer?.querySelectorAll('.book-chapter-item') || []).map(i => i.innerText.replace(/\\n/g, ' '));
            return {
              drawerVisible: !!drawer,
              chapterCount: items.length,
              chapters: items.slice(0, 5)
            };
          })()
        `,
        returnByValue: true
      });
      console.log('Italian Chapter Drawer:', JSON.stringify(itDrawerData?.result?.value, null, 2));

      // Close reader in Italian
      await send('Runtime.evaluate', { expression: `Storie.fecharLeitor();` });
      await new Promise(r => setTimeout(r, 600));

      console.log('\n======================================================');
      console.log('=== STEP 2: INSPECTION OF ENGLISH STORIES (PORT 8080) ===');
      console.log('======================================================');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1' });
      await new Promise(r => setTimeout(r, 2000));

      // Dismiss onboarding and navigate to Stories
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
            const onb = document.getElementById('onboarding-modal');
            if (onb) onb.remove();
            if (typeof App !== 'undefined') App.navegar('stories');
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1200));

      const enShotSelector = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-stories-selector.png', Buffer.from(enShotSelector.data, 'base64'));
      console.log('Saved screenshots/en-stories-selector.png');

      const enSelectorData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const container = document.getElementById('stories-container') || document.getElementById('storie-container');
            const cards = Array.from(container?.querySelectorAll('[onclick*="abrirStoria"], [onclick*="openStory"]') || []);
            const filterBtns = Array.from(container?.querySelectorAll('button') || []).map(b => ({
              text: b.innerText.trim(),
              onclick: b.getAttribute('onclick')
            }));
            const searchInput = container?.querySelector('input[type="search"]');
            const levelSelect = container?.querySelector('select');
            return {
              activeSection: App.estado?.secaoAtiva,
              storiesCount: (Stories.dados?.stories || Stories.dados?.storie)?.length || 0,
              renderedCardsCount: cards.length,
              filterButtons: filterBtns,
              hasSearchInput: !!searchInput,
              hasLevelSelect: !!levelSelect,
              firstStoryTitle: cards[0]?.querySelector('div:nth-child(2)')?.innerText?.trim(),
              secStoriesTitle: document.querySelector('#sec-stories .section-titulo')?.innerText
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Stories Selector Data:', JSON.stringify(enSelectorData?.result?.value, null, 2));

      // Open first story in English
      console.log('\n--- Opening Story 1 in English App ---');
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const firstStory = (Stories.dados?.stories || Stories.dados?.storie)?.[0];
            if (firstStory) Stories.abrirStoria(firstStory.id);
          })()
        `
      });
      await new Promise(r => setTimeout(r, 1500));

      const enShotReader = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('screenshots/en-stories-reader.png', Buffer.from(enShotReader.data, 'base64'));
      console.log('Saved screenshots/en-stories-reader.png');

      const enReaderData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const overlay = document.getElementById('book-reader-overlay');
            const topBar = overlay?.querySelector('.book-top-bar');
            const actionBtns = Array.from(topBar?.querySelectorAll('.book-top-actions button, .book-btn-voltar') || []).map(b => ({
              text: b.innerText.replace(/\\n/g, ' ').trim(),
              title: b.title,
              className: b.className,
              onclick: b.getAttribute('onclick')
            }));
            const bottomBar = overlay?.querySelector('.book-bottom-bar');
            const navBtns = Array.from(bottomBar?.querySelectorAll('button') || []).map(b => ({
              text: b.innerText.replace(/\\n/g, ' ').trim(),
              onclick: b.getAttribute('onclick'),
              disabled: b.disabled
            }));
            const words = Array.from(overlay?.querySelectorAll('.storie-palavra, .story-word') || []);
            const slider = bottomBar?.querySelector('input[type="range"]');

            return {
              isOpen: overlay?.style.display !== 'none',
              currentStory: Stories.storAttuale?.titulo,
              currentPage: Stories.paginaAtual,
              totalPages: Stories._paginas?.length,
              topActionButtons: actionBtns,
              bottomNavButtons: navBtns,
              wordsClickableCount: words.length,
              sampleWords: words.slice(0, 5).map(w => ({
                text: w.textContent,
                palavra: w.dataset.palavra,
                ipa: w.dataset.ipa,
                trad: w.dataset.trad
              })),
              sliderMax: slider ? slider.max : null
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Reader Data:', JSON.stringify(enReaderData?.result?.value, null, 2));

      // Test clicking on a word in English
      console.log('\n--- Clicking word in English Reader ---');
      const enWordClick = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const w = document.querySelector('.storie-palavra, .story-word');
            if (w) {
              w.click();
              const modal = document.getElementById('story-word-modal') || document.getElementById('storie-word-modal');
              return {
                clickedWord: w.textContent.trim(),
                modalVisible: modal && modal.style.display !== 'none',
                modalText: modal?.innerText?.replace(/\\n/g, ' | '),
                buttons: Array.from(modal?.querySelectorAll('button') || []).map(b => ({
                  text: b.innerText.trim(),
                  onclick: b.getAttribute('onclick'),
                  id: b.id,
                  className: b.className
                }))
              };
            }
            return { error: 'No word element found' };
          })()
        `,
        returnByValue: true
      });
      console.log('English Word Modal Click:', JSON.stringify(enWordClick?.result?.value, null, 2));

      // Test Chapter Drawer in English
      console.log('\n--- Opening Chapter Drawer in English ---');
      await send('Runtime.evaluate', {
        expression: `Stories._openChapterDrawer();`
      });
      await new Promise(r => setTimeout(r, 600));

      const enDrawerData = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const drawer = document.querySelector('.book-drawer');
            const items = Array.from(drawer?.querySelectorAll('.book-chapter-item') || []).map(i => i.innerText.replace(/\\n/g, ' '));
            return {
              drawerVisible: !!drawer,
              chapterCount: items.length,
              chapters: items.slice(0, 5)
            };
          })()
        `,
        returnByValue: true
      });
      console.log('English Chapter Drawer:', JSON.stringify(enDrawerData?.result?.value, null, 2));

      // Test Bookmark Toggle in English
      console.log('\n--- Testing Bookmark Toggle in English ---');
      const bmResult = await send('Runtime.evaluate', {
        expression: `
          (() => {
            Stories._toggleBookmark();
            const id = Stories.storAttuale?.id;
            const saved = localStorage.getItem('en_book_bookmark_' + id);
            return { savedBookmarkPage: saved };
          })()
        `,
        returnByValue: true
      });
      console.log('Bookmark Test Result:', bmResult?.result?.value);

      // Close reader in English
      await send('Runtime.evaluate', { expression: `Stories.closeReader();` });
      await new Promise(r => setTimeout(r, 600));

      console.log('\n=== INSPECTION COMPLETED SUCCESSFULLY ===');
      process.exit(0);
    } catch (err) {
      console.error('Inspection failed:', err);
      process.exit(1);
    }
  };
}

main();
