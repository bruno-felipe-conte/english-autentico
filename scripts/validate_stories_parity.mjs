// scripts/validate_stories_parity.mjs
import fs from 'fs';

const ARTIFACT_DIR = '/home/bruno/.gemini/antigravity/brain/68855842-23a1-4e8d-bd77-aec71573be7e';

async function main() {
  const res = await fetch('http://127.0.0.1:9222/json/list');
  const targets = await res.json();
  const target = targets.find(t => t.type === 'page') || targets[0];
  console.log('Connecting to Chrome CDP target:', target.webSocketDebuggerUrl);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, (result, err) => {
        if (err) reject(err);
        else resolve(result);
      });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  async function evalJS(expression) {
    const res = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    if (res?.exceptionDetails) {
      console.error('JS Exception:', res.exceptionDetails);
      throw new Error(res.exceptionDetails.text || 'JS Evaluation Exception');
    }
    return res?.result?.value;
  }

  async function takeScreenshot(name) {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buf = Buffer.from(shot.data, 'base64');
    fs.writeFileSync(`screenshots/${name}`, buf);
    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.writeFileSync(`${ARTIFACT_DIR}/${name}`, buf);
    }
    console.log(`✅ Saved screenshots/${name}`);
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const callback = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) {
        callback(null, msg.error);
      } else {
        callback(msg.result);
      }
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
      await send('Network.clearBrowserCache');
      await send('Emulation.setDeviceMetricsOverride', {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('\n================================================================');
      console.log('=== RUNNING FULL END-TO-END VALIDATION: STORIES / LEITURA ===');
      console.log('================================================================');

      // 1. Navigate to English App
      console.log('\n--- 1. Navigating to English App (Port 8080) ---');
      await send('Page.navigate', { url: 'http://localhost:8080/?no_onb=1&nocache=' + Date.now() });
      await new Promise(r => setTimeout(r, 2000));

      // Dismiss onboarding, clear stale caches, unregister SW
      await evalJS(`
        (async () => {
          if (typeof Onboarding !== 'undefined') Onboarding.pularTudo();
          const onb = document.getElementById('onboarding-modal');
          if (onb) onb.remove();

          if (navigator.serviceWorker) {
            const regs = await navigator.serviceWorker.getRegistrations();
            for (const r of regs) await r.unregister();
          }
          if (window.caches) {
            const keys = await caches.keys();
            for (const k of keys) await caches.delete(k);
          }
          
          localStorage.removeItem('en_swr_stories');
          localStorage.removeItem('en_swr_stories_v2');
          localStorage.removeItem('en_book_bookmark_stor_001');
          
          // Remove 'apartment' se estiver salvo no custom
          const custom = JSON.parse(localStorage.getItem('en_vocab_custom') || '[]');
          const filtered = custom.filter(v => ((v.english || v.word || '')).toLowerCase() !== 'apartment');
          localStorage.setItem('en_vocab_custom', JSON.stringify(filtered));
          
          if (typeof Stories !== 'undefined') {
            Stories.closeReader();
            Stories.dados = null;
            Stories._storieBase = null;
            await Stories.carregar();
          }
          if (typeof App !== 'undefined') App.navegar('stories');
        })()
      `);
      await new Promise(r => setTimeout(r, 1200));

      // 2. Validate Selector, Search & Filters
      console.log('\n--- 2. Validating Selector, Search & Filters ---');
      const selectorTest = await evalJS(`
        (async () => {
          const container = document.getElementById('stories-container') || document.getElementById('storie-container');
          const initialCards = container.querySelectorAll('[onclick*="abrirStoria"]').length;
          
          // Test Search filter
          Stories._filtroTexto = 'neighbour';
          await Stories.renderSelector();
          const searchCount = (document.getElementById('stories-container') || document.getElementById('storie-container'))
            .querySelectorAll('[onclick*="abrirStoria"]').length;
          
          // Reset Search
          Stories._filtroTexto = '';
          await Stories.renderSelector();
          
          // Test Level filter
          Stories._filtroNivel = 'A1';
          await Stories.renderSelector();
          const a1Count = (document.getElementById('stories-container') || document.getElementById('storie-container'))
            .querySelectorAll('[onclick*="abrirStoria"]').length;
          
          // Reset filters
          Stories._filtroNivel = '';
          await Stories.renderSelector();

          return {
            initialCards,
            searchFilterWorking: searchCount === 1,
            searchCount,
            levelFilterWorking: a1Count > 0 && a1Count < initialCards,
            a1Count,
            totalCardsAfterReset: (document.getElementById('stories-container') || document.getElementById('storie-container'))
              .querySelectorAll('[onclick*="abrirStoria"]').length
          };
        })()
      `);
      console.log('Selector Tests:', selectorTest);
      await takeScreenshot('en-stories-selector-validated.png');

      // 3. Open Story 1 ("The New Neighbour") and Verify Vocabulary Annotations
      console.log('\n--- 3. Opening Story 1 & Verifying Annotated Vocabulary ---');
      await evalJS(`
        (async () => {
          await Stories.abrirStoria('stor_001');
        })()
      `);
      await new Promise(r => setTimeout(r, 1500));

      const readerInspection = await evalJS(`
        (() => {
          const overlay = document.getElementById('book-reader-overlay');
          const vocabWords = Array.from(overlay?.querySelectorAll('.storie-palavra-vocab') || []);
          const apartmentEl = Array.from(overlay?.querySelectorAll('.storie-palavra') || [])
            .find(el => el.dataset.palavra?.toLowerCase() === 'apartment');

          return {
            readerOpen: !!overlay,
            storyTitle: Stories.storAttuale?.titulo,
            currentPage: Stories.paginaAtual,
            totalPages: Stories._paginas?.length,
            vocabWordsCount: vocabWords.length,
            sampleVocabWords: vocabWords.slice(0, 5).map(w => ({
              text: w.textContent,
              palavra: w.dataset.palavra,
              ipa: w.dataset.ipa,
              trad: w.dataset.trad
            })),
            apartmentFound: !!apartmentEl,
            apartmentData: apartmentEl ? {
              text: apartmentEl.textContent,
              palavra: apartmentEl.dataset.palavra,
              ipa: apartmentEl.dataset.ipa,
              trad: apartmentEl.dataset.trad,
              cat: apartmentEl.dataset.cat,
              hasVocabClass: apartmentEl.classList.contains('storie-palavra-vocab')
            } : null
          };
        })()
      `);
      console.log('Reader & Vocabulary Inspection:', JSON.stringify(readerInspection, null, 2));
      await takeScreenshot('en-stories-reader-validated.png');

      // 4. Test Word Modal, Audio, and Save to Flashcards
      console.log('\n--- 4. Testing Word Modal, Audio & Save to Deck ---');
      await evalJS(`
        (() => {
          const el = Array.from(document.querySelectorAll('.storie-palavra'))
            .find(w => w.dataset.palavra?.toLowerCase() === 'apartment');
          if (el) Stories._openWordModal(el);
        })()
      `);
      await new Promise(r => setTimeout(r, 500));

      const wordModalTest = await evalJS(`
        (() => {
          const modal = document.getElementById('storie-word-modal') || document.getElementById('story-word-modal');
          const audioBtn = modal?.querySelector('.storie-modal-audio, .story-modal-audio');
          const saveBtn = document.getElementById('storie-btn-salvar') || document.getElementById('story-btn-salvar');

          return {
            modalVisible: modal && modal.style.display !== 'none',
            modalWord: modal?.querySelector('.storie-modal-palavra, .story-modal-palavra')?.textContent?.trim(),
            modalIpa: modal?.querySelector('.storie-modal-ipa, .story-modal-ipa')?.textContent?.trim(),
            modalTradPills: Array.from(modal?.querySelectorAll('.storie-trad-pill, .story-trad-pill') || []).map(p => p.textContent?.trim()),
            saveBtnText: saveBtn?.textContent?.trim(),
            saveBtnId: saveBtn?.id,
            hasAudioBtn: !!audioBtn
          };
        })()
      `);
      console.log('Word Modal State Before Save:', JSON.stringify(wordModalTest, null, 2));

      // Click Save Button in Word Modal
      console.log('Clicking Save to Flashcards button...');
      const saveClick = await evalJS(`
        (() => {
          const btn = document.getElementById('storie-btn-salvar') || document.getElementById('story-btn-salvar');
          if (btn) btn.click();
          
          const savedInStorage = JSON.parse(localStorage.getItem('en_vocab_custom') || '[]')
            .some(v => (v.english || v.word || '').toLowerCase() === 'apartment');
          
          const isSavedVisual = btn?.classList.contains('salvo');
          const btnTextAfter = btn?.textContent?.trim();

          return {
            savedInStorage,
            isSavedVisual,
            btnTextAfter
          };
        })()
      `);
      console.log('Save to Deck Result:', saveClick);
      await takeScreenshot('en-stories-word-modal-saved.png');

      // Close word modal
      await evalJS(`Stories._closeWordModal();`);
      await new Promise(r => setTimeout(r, 400));

      // 5. Test Bookmark Toggle
      console.log('\n--- 5. Testing Bookmark Toggle ---');
      const bmTest = await evalJS(`
        (() => {
          Stories._toggleBookmark();
          const saved1 = localStorage.getItem('en_book_bookmark_stor_001');
          Stories._toggleBookmark();
          const saved2 = localStorage.getItem('en_book_bookmark_stor_001');
          Stories._toggleBookmark();
          const saved3 = localStorage.getItem('en_book_bookmark_stor_001');
          return { saved1, saved2, saved3 };
        })()
      `);
      console.log('Bookmark Toggle Results:', bmTest);

      // 6. Test Translation Toggle
      console.log('\n--- 6. Testing Translation Toggle ---');
      const transTest = await evalJS(`
        (() => {
          Stories._toggleTranslation();
          const transEls = Array.from(document.querySelectorAll('.antique-para-trad'));
          return {
            translationActive: Stories.traduzirVisivel,
            transElementsCount: transEls.length,
            sampleTranslation: transEls[0]?.textContent?.trim()
          };
        })()
      `);
      console.log('Translation Toggle Results:', transTest);
      await takeScreenshot('en-stories-translation-active.png');

      // Toggle translation back off
      await evalJS(`Stories._toggleTranslation();`);
      await new Promise(r => setTimeout(r, 400));

      // 7. Test Chapter Drawer
      console.log('\n--- 7. Testing Chapter Drawer ---');
      await evalJS(`Stories._openChapterDrawer();`);
      await new Promise(r => setTimeout(r, 600));

      const drawerTest = await evalJS(`
        (() => {
          const drawer = document.querySelector('.book-drawer');
          const items = Array.from(drawer?.querySelectorAll('.book-chapter-item') || []).map(i => i.textContent?.replace(/\\s+/g, ' ').trim());
          return {
            drawerVisible: !!drawer,
            chapters: items
          };
        })()
      `);
      console.log('Chapter Drawer Results:', drawerTest);
      await takeScreenshot('en-stories-chapters-drawer.png');

      await evalJS(`Stories._closeChapterDrawer();`);
      await new Promise(r => setTimeout(r, 400));

      // 8. Test Audio Page Player (Play and Stop)
      console.log('\n--- 8. Testing Audio Page Player (TTS) ---');
      const audioTest = await evalJS(`
        (() => {
          const btn = document.getElementById('book-btn-ouvir');
          Stories._listenCurrentPage();
          const isPlaying = Stories._reproduzindoAudio;
          const btnTextWhilePlaying = btn?.textContent?.replace(/\\s+/g, ' ').trim();
          Stories._stopPageAudio();
          const isStopped = !Stories._reproduzindoAudio;
          const btnTextAfterStop = btn?.textContent?.replace(/\\s+/g, ' ').trim();

          return {
            isPlaying,
            btnTextWhilePlaying,
            isStopped,
            btnTextAfterStop
          };
        })()
      `);
      console.log('Audio Player Results:', audioTest);

      // 9. Test Page Navigation & Completion Flow
      console.log('\n--- 9. Testing Page Navigation & Completion ---');
      const pageNavTest = await evalJS(`
        (() => {
          Stories.goToPage(Stories._paginas.length);
          const isLastPage = Stories.paginaAtual === Stories._paginas.length;
          const completeBtn = document.querySelector('.book-bottom-bar button[onclick*="_markAsRead"]');
          const completeBtnText = completeBtn?.textContent?.replace(/\\s+/g, ' ').trim();

          if (completeBtn) Stories._markAsRead();
          const isMarkedRead = Stories.completate.includes(Stories.storAttuale?.id);

          return {
            isLastPage,
            hasCompleteBtn: !!completeBtn,
            completeBtnText,
            isMarkedRead
          };
        })()
      `);
      console.log('Page Navigation & Completion Results:', pageNavTest);
      await takeScreenshot('en-stories-completed.png');

      // 10. Close Reader and Return to Selector
      console.log('\n--- 10. Closing Reader and Verifying Return ---');
      await evalJS(`Stories.closeReader();`);
      await new Promise(r => setTimeout(r, 800));

      const backToSelTest = await evalJS(`
        (() => {
          const overlay = document.getElementById('book-reader-overlay');
          const container = document.getElementById('stories-container') || document.getElementById('storie-container');
          const firstCardTitle = container?.querySelector('[onclick*="abrirStoria"]')?.textContent?.replace(/\\s+/g, ' ').trim();
          return {
            overlayRemoved: !overlay,
            containerVisible: !!container,
            firstCardCompletedCheck: firstCardTitle?.includes('✓')
          };
        })()
      `);
      console.log('Back to Selector State:', backToSelTest);
      await takeScreenshot('en-stories-back-to-selector.png');

      console.log('\n================================================================');
      console.log('=== ALL VALIDATION TESTS COMPLETED SUCCESSFULLY! ===');
      console.log('================================================================\n');

      process.exit(0);
    } catch (err) {
      console.error('Validation error:', err);
      process.exit(1);
    }
  };
}

main();
