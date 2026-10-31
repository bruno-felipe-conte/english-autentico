// ============================================================
// js/app/state.js — Global State & Storage Persistence
// ============================================================

const AppState = {
  _migrateLegacyStorage() {
    try {
      const keyMap = {
        'en_progresso': 'en_progress',
        'en_voz_preferida': 'en_preferred_voice',
        'en_storie_lidas': 'en_stories_read',
        'en_quiz_historico': 'en_quiz_history',
        'en_canzoni_custom': 'en_songs_custom',
        'en_dialoghi_custom': 'en_dialogues_custom',
        'en_storie_custom': 'en_stories_custom',
        'en_imitazioni_custom': 'en_pronunciation_custom',
        'en_canzoni_ocultas': 'en_songs_hidden'
      };

      // F12: Mescla dados de en_progresso para en_progress se en_progress já existir
      const oldProg = localStorage.getItem('en_progresso');
      if (oldProg) {
        const newProg = localStorage.getItem('en_progress');
        if (newProg === null) {
          localStorage.setItem('en_progress', oldProg);
        } else {
          try {
            const pOld = JSON.parse(oldProg);
            const pNew = JSON.parse(newProg);
            let merged = false;
            ['vocab_streak', 'vocab_streak_ultimo', 'vocab_conquistas', 'vocab_daily_quest'].forEach(k => {
              if (pOld[k] !== undefined && pNew[k] === undefined) {
                pNew[k] = pOld[k];
                merged = true;
              }
            });
            if (merged) {
              localStorage.setItem('en_progress', JSON.stringify(pNew));
            }
          } catch (_) {}
        }
        localStorage.removeItem('en_progresso');
      }

      // F10: Limpa cache estático de gramática legado do localStorage
      if (localStorage.getItem('en_swr_grammar')) {
        localStorage.removeItem('en_swr_grammar');
      }

      for (const [oldKey, newKey] of Object.entries(keyMap)) {
        if (oldKey === 'en_progresso') continue;
        const val = localStorage.getItem(oldKey);
        if (val !== null && localStorage.getItem(newKey) === null) {
          localStorage.setItem(newKey, val);
          localStorage.removeItem(oldKey);
        }
      }
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('en_book_bm_')) {
          const newK = k.replace('en_book_bm_', 'en_book_bookmark_');
          if (localStorage.getItem(newK) === null) {
            localStorage.setItem(newK, localStorage.getItem(k));
            localStorage.removeItem(k);
          }
        }
      }
    } catch (e) {
      console.error("[core:state] Storage migration error:", e);
    }
  },

  estado: {
    secaoAtiva: 'temples',
    templosData: {},       // { 1: { templo, nome, cidade, nivel, palavras: [] }, ... }
    quizData: [],          // flat array of all quiz questions
    vocabCache: [],        // flat array of all words (with templo_num attached)
    conjugacoesData: [],
    phrasalVerbsData: [],   // verb conjugation data
    progresso: null,       // persisted in localStorage
    flashcardData: {}      // persisted in localStorage
  },

  // === ENERGY SYSTEM ===
  energiaAtual: 50,
  maxEnergia: 50,
  lastEnergyUpdate: 0,

  carregarEnergia() {
    try {
      const data = JSON.parse(localStorage.getItem('en_energia') || '{}');
      this.energiaAtual = data.energia !== undefined ? data.energia : 50;
      this.lastEnergyUpdate = data.lastUpdate || Date.now();
      this.processarRegeneracao();
    } catch (e) {
      this.energiaAtual = 50;
      this.lastEnergyUpdate = Date.now();
    }
  },

  salvarEnergia() {
    try {
      localStorage.setItem('en_energia', JSON.stringify({
        energia: this.energiaAtual,
        lastUpdate: Date.now()
      }));
      const el = document.getElementById('stat-energy');
      if (el) el.textContent = `⚡ ${Math.floor(this.energiaAtual)}/50`;
    } catch (e) {
      console.error("[core:state] Error saving energy:", e);
    }
  },

  processarRegeneracao() {
    const now = Date.now();
    const diffMin = (now - this.lastEnergyUpdate) / (1000 * 60);
    // Recupera 1 energia a cada 5 minutos
    if (diffMin > 5 && this.energiaAtual < this.maxEnergia) {
      const ganho = Math.floor(diffMin / 5);
      this.energiaAtual = Math.min(this.maxEnergia, this.energiaAtual + ganho);
      this.lastEnergyUpdate = now;
      this.salvarEnergia();
    }
  },

  gastarEnergia(qtd) {
    if (this.energiaAtual < qtd) return false;
    this.energiaAtual -= qtd;
    this.lastEnergyUpdate = Date.now();
    this.salvarEnergia();
    return true;
  },

  // === CROSS MODULE: Descobrir Palavra ===
  descobrirPalavra(wordStr) {
    if (!this.estado.vocabCache) return false;
    const word = wordStr.toLowerCase().trim();
    const hit = this.estado.vocabCache.find(v => (v.ingles || '').toLowerCase() === word);
    if (!hit) return false;

    // Injeta na fila do Flashcard como NEW
    if (!this.estado.flashcardData) this.estado.flashcardData = {};
    if (!this.estado.flashcardData[hit.id]) {
      this.estado.flashcardData[hit.id] = {
        state: 'new',
        due: Date.now(),
        stability: 0,
        difficulty: 0,
        reps: 0,
        lapses: 0
      };
      this.salvarFlashcards();
      this.notificar(`💡 Nova palavra "${hit.ingles}" descoberta e enviada para o FSRS!`, 'sucesso');
    }
    return true;
  },

  // === SOCIAL: Compartilhar ===
  compartilharProgresso() {
    const nivel = this.estado.progresso ? (this.estado.progresso.nivel || 1) : 1;
    const texto = `Estou no Nível ${nivel} aprendendo Inglês com o English Autentico! 🔥 Junte-se a mim!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'English Autentico', text: texto }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(texto);
      this.notificar('Copiado para a área de transferência!', 'sucesso');
    }
  },

  // === MULTI-TAB SYNCHRONIZATION & OBSERVERS (F13) ===
  _subscribers: [],
  _syncInitialized: false,

  subscribe(fn) {
    if (typeof fn === 'function') {
      this._subscribers.push(fn);
      return () => {
        const idx = this._subscribers.indexOf(fn);
        if (idx !== -1) this._subscribers.splice(idx, 1);
      };
    }
    return () => {};
  },

  _notifySubscribers(key, data) {
    for (const fn of this._subscribers) {
      try { fn(key, data); } catch (err) { console.error("[core:state] Subscriber error:", err); }
    }
  },

  initMultiTabSync() {
    if (typeof window === 'undefined' || this._syncInitialized) return;
    this._syncInitialized = true;
    window.addEventListener('storage', (e) => {
      this._handleStorageEvent(e);
    });
  },

  _handleStorageEvent(e) {
    if (!e || !e.key || e.newValue === null) return;
    try {
      if (e.key === 'en_progress') {
        const novoProgresso = JSON.parse(e.newValue);
        if (novoProgresso && typeof novoProgresso === 'object') {
          this.estado.progresso = novoProgresso;
          if (typeof App !== 'undefined' && App.estado) {
            App.estado.progresso = novoProgresso;
          }
          if (typeof App !== 'undefined' && typeof App.atualizarStats === 'function') {
            App.atualizarStats();
          }
          this._notifySubscribers('en_progress', novoProgresso);
        }
      } else if (e.key === 'en_flashcards') {
        const novosCards = JSON.parse(e.newValue);
        if (novosCards && typeof novosCards === 'object') {
          this.estado.flashcardData = novosCards;
          if (typeof App !== 'undefined' && App.estado) {
            App.estado.flashcardData = novosCards;
          }
          if (typeof Flashcards !== 'undefined' && typeof Flashcards.atualizarEbbinghaus === 'function') {
            Flashcards.atualizarEbbinghaus();
          }
          this._notifySubscribers('en_flashcards', novosCards);
        }
      } else if (e.key === 'en_som') {
        if (typeof SomFeedback !== 'undefined' && typeof SomFeedback.init === 'function') {
          SomFeedback.init();
        }
        this._notifySubscribers('en_som', e.newValue);
      } else if (e.key === 'en_tema') {
        if (typeof document !== 'undefined' && document.body) {
          document.body.classList.toggle('dark-mode', e.newValue === 'dark');
        }
        this._notifySubscribers('en_tema', e.newValue);
      }
    } catch (err) {
      console.warn("[core:state] Multi-tab sync parsing error:", err);
    }
  },

  // ── localStorage ───────────────────────────────────────────
  notificar(msg, tipo) {
    if (typeof console !== 'undefined' && console.log) {
      console.log(`[core:state] notification (${tipo || 'info'}): ${msg}`);
    }
  },

  carregarProgresso() {
    const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('en_progress') : null;
    if (raw) {
      try {
        const p = JSON.parse(raw);
        if (!p || typeof p !== 'object' || Array.isArray(p)) {
          throw new Error('Invalid progress data structure');
        }
        if (!p.grammatica_completadas) p.grammatica_completadas = [];
        if (p.meta_diaria === undefined) p.meta_diaria = 100;
        if (p.xp_hoje === undefined) p.xp_hoje = 0;
        if (p.data_xp_hoje === undefined) p.data_xp_hoje = null;
        if (!p.favoritos)   p.favoritos   = [];
        if (!p.conquistas)  p.conquistas  = [];
        if (!p.data_inicio) p.data_inicio = p.ultimo_estudo || Date.now();
        if (p.meta_prazo === undefined) p.meta_prazo = null;

        // F11: Mantém cópia de segurança em en_progress_bak
        try {
          if (!localStorage.getItem('en_progress_bak')) {
            localStorage.setItem('en_progress_bak', raw);
          }
        } catch (_) {}

        return p;
      } catch (e) {
        console.error("[core:state] SyntaxError loading en_progress, attempting recovery from backup:", e);
        // F11: Quarentena de dados corrompidos para evitar perda
        try {
          const timestamp = Date.now();
          localStorage.setItem('en_corrupt_progress', raw);
          localStorage.setItem(`en_corrupt_progress_${timestamp}`, raw);
        } catch (_) {}

        // Restauração a partir do backup
        try {
          const bak = localStorage.getItem('en_progress_bak');
          if (bak) {
            const pBak = JSON.parse(bak);
            console.warn("[core:state] Successfully recovered en_progress from en_progress_bak");
            try { localStorage.setItem('en_progress', bak); } catch (_) {}
            if (!pBak.grammatica_completadas) pBak.grammatica_completadas = [];
            if (pBak.meta_diaria === undefined) pBak.meta_diaria = 100;
            if (pBak.xp_hoje === undefined) pBak.xp_hoje = 0;
            if (pBak.data_xp_hoje === undefined) pBak.data_xp_hoje = null;
            if (!pBak.favoritos)   pBak.favoritos   = [];
            if (!pBak.conquistas)  pBak.conquistas  = [];
            if (!pBak.data_inicio) pBak.data_inicio = pBak.ultimo_estudo || Date.now();
            if (pBak.meta_prazo === undefined) pBak.meta_prazo = null;
            return pBak;
          }
        } catch (bakErr) {
          console.error("[core:state] Progress backup restoration failed:", bakErr);
        }
      }
    } else {
      // Se primário for nulo, tenta resgatar backup
      try {
        const bak = (typeof localStorage !== 'undefined') ? localStorage.getItem('en_progress_bak') : null;
        if (bak) {
          const pBak = JSON.parse(bak);
          try { localStorage.setItem('en_progress', bak); } catch (_) {}
          return pBak;
        }
      } catch (_) {}
    }

    return {
      nivel: 1,
      xp: 0,
      xp_proximo_nivel: 500,
      templos_desbloqueados: [1],
      templos_concluidos: [],
      total_palavras: 0,
      streak: 0,
      ultimo_estudo: null,
      grammatica_completadas: [],
      meta_diaria: 100,
      xp_hoje: 0,
      data_xp_hoje: null,
      favoritos:   [],
      conquistas:  [],
      data_inicio: Date.now(),
      meta_prazo: null
    };
  },

  salvarProgresso() {
    try {
      const jsonStr = JSON.stringify(this.estado.progresso);
      JSON.parse(jsonStr);

      // F11: Write-ahead backup
      const current = localStorage.getItem('en_progress');
      if (current) {
        try { localStorage.setItem('en_progress_bak', current); } catch (_) {}
      }

      localStorage.setItem('en_progress', jsonStr);

      if (!current) {
        try { localStorage.setItem('en_progress_bak', jsonStr); } catch (_) {}
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || (e.message && e.message.includes('QuotaExceededError'))) {
        if (typeof alert === 'function') {
          const msg = (typeof I18n !== 'undefined' && typeof I18n.t === 'function')
            ? I18n.t('storage_limite')
            : 'Limite de armazenamento atingido!';
          try { alert(msg); } catch (_) {}
        }
      }
    }
  },

  carregarFlashcards() {
    const raw = (typeof localStorage !== 'undefined') ? localStorage.getItem('en_flashcards') : null;
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new Error('Invalid flashcard data structure');
        }
        // F11: Mantém backup atualizado
        try {
          if (!localStorage.getItem('en_flashcards_bak')) {
            localStorage.setItem('en_flashcards_bak', raw);
          }
        } catch (_) {}
        return parsed;
      } catch (e) {
        console.error("[core:state] SyntaxError loading en_flashcards, attempting backup recovery:", e);
        // F11: Quarentena de dados corrompidos para evitar perda
        try {
          const timestamp = Date.now();
          localStorage.setItem('en_corrupt_flashcards', raw);
          localStorage.setItem(`en_corrupt_flashcards_${timestamp}`, raw);
        } catch (_) {}

        // Restauração a partir do backup
        try {
          const bak = localStorage.getItem('en_flashcards_bak');
          if (bak) {
            const restored = JSON.parse(bak);
            if (restored && typeof restored === 'object' && !Array.isArray(restored)) {
              console.warn("[core:state] Successfully recovered en_flashcards from en_flashcards_bak");
              try { localStorage.setItem('en_flashcards', bak); } catch (_) {}
              return restored;
            }
          }
        } catch (bakErr) {
          console.error("[core:state] Flashcard backup restoration failed:", bakErr);
        }
      }
    } else {
      // Se primário for nulo, tenta resgatar backup
      try {
        const bak = (typeof localStorage !== 'undefined') ? localStorage.getItem('en_flashcards_bak') : null;
        if (bak) {
          const restored = JSON.parse(bak);
          if (restored && typeof restored === 'object' && !Array.isArray(restored)) {
            try { localStorage.setItem('en_flashcards', bak); } catch (_) {}
            return restored;
          }
        }
      } catch (_) {}
    }
    return {};
  },

  salvarFlashcards() {
    try {
      const jsonStr = JSON.stringify(this.estado.flashcardData);
      JSON.parse(jsonStr); // Verificação preventiva de integridade

      // F11: Write-ahead backup
      const current = localStorage.getItem('en_flashcards');
      if (current) {
        try { localStorage.setItem('en_flashcards_bak', current); } catch (_) {}
      }

      localStorage.setItem('en_flashcards', jsonStr);

      if (!current) {
        try { localStorage.setItem('en_flashcards_bak', jsonStr); } catch (_) {}
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || (e.message && e.message.includes('QuotaExceededError'))) {
        if (typeof alert === 'function') {
          const msg = (typeof I18n !== 'undefined' && typeof I18n.t === 'function')
            ? I18n.t('storage_limite_fc')
            : 'Limite de armazenamento! Executando limpeza automática...';
          try { alert(msg); } catch (_) {}
        }

        let modified = false;

        // F9: Compatibilidade com formato legado array (e.g. tests/storage.spec.js)
        if (this.estado.flashcardData && Array.isArray(this.estado.flashcardData.cards)) {
          this.estado.flashcardData.cards = this.estado.flashcardData.cards.slice(20);
          modified = true;
          try {
            const savedStr = JSON.stringify(this.estado.flashcardData);
            localStorage.setItem('en_flashcards', savedStr);
            try { localStorage.setItem('en_flashcards_bak', savedStr); } catch (_) {}
            return;
          } catch (_) {}
        }

        // F9: Formato canônico da aplicação (object map { [id]: card })
        if (this.estado.flashcardData && typeof this.estado.flashcardData === 'object') {
          // Etapa 1: Poda de arrays history para no máximo 3 entradas por carta
          for (const k of Object.keys(this.estado.flashcardData)) {
            const card = this.estado.flashcardData[k];
            if (card && Array.isArray(card.history) && card.history.length > 3) {
              card.history = card.history.slice(-3);
              modified = true;
            }
          }

          if (modified) {
            try {
              const prunedStr = JSON.stringify(this.estado.flashcardData);
              localStorage.setItem('en_flashcards', prunedStr);
              try { localStorage.setItem('en_flashcards_bak', prunedStr); } catch (_) {}
              return;
            } catch (_) {
              // Cota ainda excedida: prossegue para poda de cartas inativas
            }
          }

          // Etapa 2: Poda de cartas mais antigas/inativas
          const keys = Object.keys(this.estado.flashcardData);
          if (keys.length > 0) {
            keys.sort((a, b) => {
              const cardA = this.estado.flashcardData[a] || {};
              const cardB = this.estado.flashcardData[b] || {};
              const dueA = cardA.due || 0;
              const dueB = cardB.due || 0;
              return dueA - dueB;
            });

            const toRemove = Math.min(keys.length, Math.max(1, Math.min(20, Math.ceil(keys.length * 0.2))));
            for (let i = 0; i < toRemove; i++) {
              delete this.estado.flashcardData[keys[i]];
            }

            try {
              const prunedStr = JSON.stringify(this.estado.flashcardData);
              localStorage.setItem('en_flashcards', prunedStr);
              try { localStorage.setItem('en_flashcards_bak', prunedStr); } catch (_) {}
            } catch (_) {}
          }
        }
      }
    }
  },

  toggleFavorito(id) {
    const p = this.estado.progresso;
    if (!p) return false;
    if (!p.favoritos) p.favoritos = [];
    const idx = p.favoritos.indexOf(id);
    const adicionado = idx === -1;
    if (adicionado) p.favoritos.push(id);
    else            p.favoritos.splice(idx, 1);
    this.salvarProgresso();
    return adicionado;
  },

  ehFavorito(id) {
    const p = this.estado.progresso;
    return !!(p && p.favoritos && p.favoritos.includes(id));
  }
};

if (typeof window !== 'undefined') {
  window.AppState = AppState;
  try {
    AppState.initMultiTabSync();
  } catch (_) {}
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppState;
}
