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
      for (const [oldKey, newKey] of Object.entries(keyMap)) {
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
    conjugacoesData: [],   // verb conjugation data
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

  // ── localStorage ───────────────────────────────────────────
  carregarProgresso() {
    try {
      const raw = localStorage.getItem('en_progress');
      if (raw) {
        const p = JSON.parse(raw);
        if (!p.grammatica_completadas) p.grammatica_completadas = [];
        if (p.meta_diaria === undefined) p.meta_diaria = 100;
        if (p.xp_hoje === undefined) p.xp_hoje = 0;
        if (p.data_xp_hoje === undefined) p.data_xp_hoje = null;
        if (!p.favoritos)   p.favoritos   = [];
        if (!p.conquistas)  p.conquistas  = [];
        if (!p.data_inicio) p.data_inicio = p.ultimo_estudo || Date.now();
        if (p.meta_prazo === undefined) p.meta_prazo = null;
        return p;
      }
    } catch (e) {
      console.error("[core:state] Error loading progress:", e);
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
      localStorage.setItem('en_progress', JSON.stringify(this.estado.progresso));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        if (typeof I18n !== 'undefined' && typeof alert === 'function') {
          alert(I18n.t('storage_limite'));
        }
      }
    }
  },

  carregarFlashcards() {
    try {
      const raw = localStorage.getItem('en_flashcards');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error("[core:state] Error loading flashcards:", e);
    }
    return {};
  },

  salvarFlashcards() {
    try {
      localStorage.setItem('en_flashcards', JSON.stringify(this.estado.flashcardData));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        if (typeof I18n !== 'undefined' && typeof alert === 'function') {
          alert(I18n.t('storage_limite_fc'));
        }
        if (this.estado.flashcardData && this.estado.flashcardData.cards) {
          this.estado.flashcardData.cards = this.estado.flashcardData.cards.slice(20);
          try { localStorage.setItem('en_flashcards', JSON.stringify(this.estado.flashcardData)); } catch (_) {}
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
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppState;
}
