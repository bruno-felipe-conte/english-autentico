// ============================================================
// js/stories/translator.js — Translation APIs, Rate Limiting & Word Modal
// ============================================================

const StoriesTranslator = {
  _tradCache: {},
  _tradQueue: [],
  _tradProcessing: false,

  async _tradRateLimit() {
    return new Promise(resolve => {
      this._tradQueue.push(resolve);
      this._processTradQueue();
    });
  },

  async _processTradQueue() {
    if (this._tradProcessing || this._tradQueue.length === 0) return;
    this._tradProcessing = true;
    while (this._tradQueue.length > 0) {
      const resolve = this._tradQueue.shift();
      resolve();
      await new Promise(r => setTimeout(r, 500));
    }
    this._tradProcessing = false;
  },

  async _fetchComRetry(url, options = {}, maxTentativas = 3, backoffInicial = 500) {
    let tentativa = 0;
    let atraso = backoffInicial;
    while (tentativa < maxTentativas) {
      try {
        const res = await fetch(url, options);
        if ((res.status === 429 || res.status >= 500) && tentativa < maxTentativas - 1) {
          tentativa++;
          await new Promise(r => setTimeout(r, atraso));
          atraso = atraso * 2 + Math.floor(Math.random() * 200);
          continue;
        }
        return res;
      } catch (err) {
        tentativa++;
        if (tentativa >= maxTentativas) throw err;
        await new Promise(r => setTimeout(r, atraso));
        atraso = atraso * 2 + Math.floor(Math.random() * 200);
      }
    }
  },

  async _traduzirParagrafoAPI(texto) {
    await this._tradRateLimit();
    if (!texto || !texto.trim()) return '';
    const norm = texto.trim();
    if (this._tradCache[norm]) return this._tradCache[norm];

    // Google Translate GTX (English to Portuguese)
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(norm)}`;
      const res = await this._fetchComRetry(url, { signal: AbortSignal.timeout(4500) });
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && Array.isArray(data[0])) {
          const trad = data[0].map(item => item[0]).join('');
          if (trad) {
            this._tradCache[norm] = trad;
            return trad;
          }
        }
      }
    } catch (_) {}

    // Fallback: MyMemory API (English to pt-BR)
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(norm.slice(0, 480))}&langpair=en|pt-BR`;
      const res = await this._fetchComRetry(url, { signal: AbortSignal.timeout(4500) });
      if (res && res.ok) {
        const json = await res.json();
        const t = json?.responseData?.translatedText;
        if (t && t.toLowerCase() !== norm.toLowerCase()) {
          this._tradCache[norm] = t;
          return t;
        }
      }
    } catch (_) {}

    return '';
  },

  async _autoTraduzirPaginasVisiveis() {
    if (!this.traduzirVisivel || !this.storAttuale) return;
    const isMobile = this._isMobile();
    const pag1 = this._paginas[this.paginaAtual - 1];
    const pag2 = isMobile ? null : this._paginas[this.paginaAtual];
    const blocosSemTrad = [];

    const coletar = (pag) => {
      if (!pag || !pag.blocos) return;
      pag.blocos.forEach(b => {
        if (!b.portugues && (b.english || b.ingles || b.italiano || "")) blocosSemTrad.push(b);
      });
    };
    coletar(pag1);
    coletar(pag2);

    if (blocosSemTrad.length === 0) return;

    for (const b of blocosSemTrad) {
      try {
        const trad = await this._traduzirParagrafoAPI((b.english || b.ingles || b.italiano || ""));
        if (trad && this.traduzirVisivel) {
          b.portugues = trad;
          if (this.storAttuale.testo && this.storAttuale.testo[b.parIdx]) {
            this.storAttuale.testo[b.parIdx].portugues = trad;
          }
          this._saveCustomStoryUpdated(this.storAttuale);
        }
      } catch (_) {}
    }

    if (this.traduzirVisivel) {
      this._updateTranslationTextsDOM();
    }
  },

  _updateTranslationTextsDOM() {
    const overlay = document.getElementById('book-reader-overlay');
    if (!overlay) return;
    const isMobile = this._isMobile();
    const pag1 = this._paginas[this.paginaAtual - 1];
    const pag2 = isMobile ? null : this._paginas[this.paginaAtual];

    const atualizar = (pag) => {
      if (!pag || !pag.blocos) return;
      pag.blocos.forEach(b => {
        if (b.portugues) {
          const els = overlay.querySelectorAll(`.antique-para-trad[data-bloco-id="${b.parIdx}"]`);
          els.forEach(el => {
            if (el.innerHTML.includes('trad-loading') || !el.textContent.trim()) {
              el.textContent = b.portugues;
              el.style.opacity = '0';
              requestAnimationFrame(() => {
                el.style.transition = 'opacity 0.25s ease';
                el.style.opacity = '1';
              });
            }
          });
        }
      });
    };
    atualizar(pag1);
    atualizar(pag2);
  },

  _openWordModal(wordEl) {
    this._closeWordModal(false);

    const palavra = wordEl.dataset.palavra || wordEl.textContent.trim();
    let ipa  = wordEl.dataset.ipa  || '';
    let trad = wordEl.dataset.trad || '';
    let cat  = wordEl.dataset.cat  || '';

    if (!trad && this.storAttuale) {
      for (const p of (this.storAttuale.testo || [])) {
        const paroleList = (p.words || p.vocabulary || p.vocabulario || p.parole || []) || [];
        const found = paroleList.find(pw =>
          this._normWord(pw.ingles || pw.english || pw.parola || pw.word) === this._normWord(palavra)
        );
        if (found) {
          ipa  = ipa  || found.ipa        || '';
          trad = trad || found.traducao_portugues || found.traducao || found.portugues || found.traduzione || '';
          cat  = cat  || found.categoria  || found.category || '';
          break;
        }
      }
    }

    const isEn    = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const jaSalva = this._verificarSalva(palavra);
    const tradInicial = trad;

    this._modalData = {
      palavra,
      ipa,
      trad: tradInicial,
      cat
    };

    const buildPills = (t) => t
      ? t.split(/[;,]/).map(s => s.trim()).filter(Boolean)
          .map(s => `<span class="storie-trad-pill story-trad-pill">${this._escape(s)}</span>`).join('')
      : '';

    const renderModal = (tradAtual, carregando = false) => {
      const pills = buildPills(tradAtual);
      return `
        <button class="storie-modal-close story-modal-close" onclick="Stories._closeWordModal()" title="${isEn ? 'Close' : 'Fechar'}">×</button>
        <div class="storie-modal-palavra story-modal-palavra">${this._escape(palavra)}</div>
        ${ipa ? `<div class="storie-modal-ipa story-modal-ipa">${this._escape(ipa)}</div>` : ''}
        <button class="storie-modal-audio story-modal-audio" data-palavra="${this._escAttr(palavra)}" onclick="event.stopPropagation(); App.speak(this.dataset.palavra || Stories._modalData?.palavra)">🔊 ${isEn ? 'Listen' : 'Ouvir'}</button>
        <div class="storie-modal-traducoes story-modal-traducoes" id="storie-modal-pills">
          ${pills || (carregando ? '<span class="storie-trad-loading story-trad-loading">…</span>' : '')}
        </div>
        ${cat ? `<div style="margin-top:0.45rem"><span class="storie-modal-cat story-modal-cat">${this._escape(cat)}</span></div>` : ''}
        <button class="storie-modal-salvar story-modal-salvar${jaSalva ? ' salvo' : ''}" id="storie-btn-salvar"
          onclick="Stories._saveModalDeck()">
          ${jaSalva
            ? `✅ ${isEn ? 'Already saved' : 'Já salva'}`
            : `⭐ ${isEn ? 'Save for review' : 'Salvar para revisão'}`}
        </button>`;
    };

    const modal = document.getElementById('storie-word-modal') || document.getElementById('story-word-modal');
    if (!modal) return;

    modal.innerHTML = renderModal(tradInicial, !tradInicial);
    modal.style.display = 'block';
    this._posicionarModal(modal, wordEl);

    const overlay = document.getElementById('storie-modal-overlay') || document.getElementById('story-modal-overlay');
    if (overlay) overlay.style.display = 'block';

    if (!tradInicial) {
      this._buscarTradAPI(palavra).then(tradAPI => {
        const pillsEl = document.getElementById('storie-modal-pills') || document.getElementById('story-modal-pills');
        if (!pillsEl) return;
        if (tradAPI) {
          if (this._modalData && this._modalData.palavra === palavra) {
            this._modalData.trad = tradAPI;
          }
          pillsEl.innerHTML = buildPills(tradAPI);
        } else {
          pillsEl.innerHTML = '';
        }
      });
    }
  },

  _saveModalDeck() {
    if (!this._modalData || !this._modalData.palavra) return;
    this._saveWordToFlashcards(this._modalData.palavra, {
      ipa: this._modalData.ipa,
      trad: this._modalData.trad,
      cat: this._modalData.cat
    });
  },

  async _buscarTradAPI(palavra) {
    const norm = this._normWord(palavra);
    if (this._tradCache[norm]) return this._tradCache[norm];
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(palavra)}&langpair=en|pt-BR`;
      const res  = await this._fetchComRetry(url, { signal: AbortSignal.timeout(4000) });
      if (res && res.ok) {
        const json = await res.json();
        const t    = json?.responseData?.translatedText || '';
        const boa  = t && t.toLowerCase() !== palavra.toLowerCase() && t.split(' ').length <= 4;
        const val  = boa ? t : '';
        this._tradCache[norm] = val;
        return val;
      }
      return '';
    } catch { return ''; }
  },

  _posicionarModal(modal, wordEl) {
    modal.style.visibility = 'hidden';
    modal.classList.remove('seta-baixo', 'seta-cima');

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const rect = wordEl.getBoundingClientRect();
      const mW   = modal.offsetWidth  || 260;
      const mH   = modal.offsetHeight || 200;
      const vW   = document.documentElement.clientWidth;
      const vH   = document.documentElement.clientHeight;
      const SETA = 9;
      const PAD  = 8;

      const wordCX = rect.left + rect.width / 2;
      let left = wordCX - mW / 2;
      if (left < PAD)           left = PAD;
      if (left + mW > vW - PAD) left = vW - mW - PAD;
      if (left < 0) left = PAD;

      const arrowLeft = Math.min(Math.max(wordCX - left, 16), mW - 16);
      modal.style.setProperty('--arrow-left', `${arrowLeft}px`);

      let top;
      let setaDir;
      if (rect.top - mH - SETA - PAD >= 0) {
        top     = rect.top - mH - SETA;
        setaDir = 'seta-baixo';
        modal.style.setProperty('--modal-origin-y', '100%');
      } else {
        top     = rect.bottom + SETA;
        setaDir = 'seta-cima';
        modal.style.setProperty('--modal-origin-y', '0%');
      }

      if (top + mH > vH - PAD) top = vH - mH - PAD;
      if (top < PAD)            top = PAD;

      modal.style.setProperty('--modal-origin-x', `${arrowLeft}px`);
      modal.classList.add(setaDir);
      modal.style.left       = `${left}px`;
      modal.style.top        = `${top}px`;
      modal.style.visibility = 'visible';
    }));
  },

  _closeWordModal(removeEsc = true) {
    const modal   = document.getElementById('story-word-modal') || document.getElementById('storie-word-modal');
    const overlay = document.getElementById('story-modal-overlay') || document.getElementById('storie-modal-overlay');
    if (modal)   modal.style.display   = 'none';
    if (overlay) overlay.style.display = 'none';
    if (removeEsc && this._escListener) {
      document.removeEventListener('keydown', this._escListener);
      this._escListener = null;
    }
  },

  _saveWordToFlashcards(palavra, dados) {
    if (this._verificarSalva(palavra)) return;

    const id = 'story_' + this._normWord(palavra).replace(/\W/g, '_') + '_' + Date.now();
    const entrada = {
      id,
      english:   palavra,
      ingles:    palavra,
      word:      palavra,
      portugues: dados?.trad || '',
      categoria: dados?.cat  || 'vocabulary',
      templo_num: 0,
      _custom:    true,
      _from_story: true,
    };

    try {
      const keys = ['en_vocab_custom', 'en_vocabulary_custom'];
      keys.forEach(k => {
        const custom = JSON.parse(localStorage.getItem(k) || '[]');
        if (!custom.find(v => ((v.english || v.word || v.ingles || v.italiano) || '').toLowerCase() === palavra.toLowerCase())) {
          custom.push(entrada);
          localStorage.setItem(k, JSON.stringify(custom));
        }
      });
    } catch(e) {}

    if (typeof App !== 'undefined' && App.estado?.vocabCache) {
      if (!App.estado.vocabCache.find(v => ((v.english || v.word || v.ingles || v.italiano) || '').toLowerCase() === palavra.toLowerCase())) {
        App.estado.vocabCache.unshift(entrada);
        if (App.estado.progresso) {
          App.estado.progresso.total_palavras = App.estado.vocabCache.length;
          App.salvarProgresso();
          App.atualizarStats();
        }
      }
    }

    if (typeof App !== 'undefined' && App.estado?.flashcardData) {
      if (!App.estado.flashcardData[id]) {
        App.estado.flashcardData[id] = {
          state: 'new', reps: 0, lapses: 0,
          stability: 0, difficulty: 5,
          nextReview: Date.now(),
        };
        if (App.salvarFlashcards) App.salvarFlashcards();
      }
    }

    const btn = document.getElementById('storie-btn-salvar') || document.getElementById('story-btn-salvar') || document.getElementById('story-btn-save');
    if (btn) {
      const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
      btn.textContent = `✅ ${isEn ? 'Already saved' : 'Já salva'}`;
      btn.classList.add('salvo');
    }

    this._markWordSavedInDOM(palavra);
  },

  _verificarSalva(palavra) {
    if (typeof App === 'undefined' || !App.estado?.vocabCache) return false;
    const norm = (palavra || '').toLowerCase();
    return App.estado.vocabCache.some(v => ((v.english || v.word || v.italiano) || '').toLowerCase() === norm);
  },

  _markWordSavedInDOM(palavra) {
    const norm = (palavra || '').toLowerCase();
    document.querySelectorAll('.storie-palavra').forEach(el => {
      if ((el.dataset.palavra || '').toLowerCase() === norm) {
        el.classList.add('storie-palavra-salva');
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.StoriesTranslator = StoriesTranslator;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoriesTranslator;
}
