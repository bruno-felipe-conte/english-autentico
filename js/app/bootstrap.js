// ============================================================
// js/app/bootstrap.js — Application Bootstrap & Event Setup
// ============================================================

const AppBootstrap = {
  notificar(mensagem, tipo = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    if (typeof I18n !== 'undefined' && I18n.dict && I18n.dict[mensagem]) {
      mensagem = I18n.t(mensagem);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.setAttribute("aria-live", "polite");
    toast.textContent = mensagem;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('saindo');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 320);
    }, 3000);
  },

  toast(mensagem, tipo = 'info') {
    this.notificar(mensagem, tipo);
  },

  async carregarDados() {
    const promises = [];
    for (let i = 1; i <= 76; i++) {
      promises.push(
        fetch(`data/temple-${i}.json`)
          .then(r => {
            if (!r.ok) return null;
            return r.json();
          })
          .then(data => {
            if (!data) return;
            const lista = data.palavras || data.vocabulario || [];
            data.palavras = lista.map(p => ({ ...p, templo_num: data.templo }));
            this.estado.vocabCache.push(...data.palavras);
            this.estado.templosData[data.templo] = data;
          })
          .catch(() => null)
      );
    }

    promises.push(
      fetch('data/quizzes.json')
        .then(r => r.ok ? r.json() : { perguntas: [] })
        .then(data => {
          this.estado.quizData = data.perguntas || [];
        })
        .catch(() => { this.estado.quizData = []; })
    );

    promises.push(
      fetch('data/conjugacoes.json')
        .then(r => r.ok ? r.json() : { verbos: [] })
        .then(data => {
          this.estado.conjugacoesData = data.verbos || [];
        })
        .catch(() => { this.estado.conjugacoesData = []; })
    );

    promises.push(
      fetch('data/phrasal_verbs.json')
        .then(r => r.ok ? r.json() : { verbos: [] })
        .then(data => {
          this.estado.phrasalVerbsData = data.verbos || [];
        })
        .catch(() => { this.estado.phrasalVerbsData = []; })
    );

    promises.push(
      fetch('data/grammar.json')
        .then(r => r.ok ? r.json() : { moduli: [] })
        .then(data => {
          this.estado.grammarData = data;
        })
        .catch(() => { this.estado.grammarData = { moduli: [] }; })
    );

    await Promise.all(promises);

    try {
      const custom = JSON.parse(localStorage.getItem('en_vocab_custom') || '[]');
      if (custom.length) {
        custom.forEach(w => { if (!w.templo_num) w.templo_num = 0; });
        this.estado.vocabCache.unshift(...custom);
      }
    } catch (e) {
      console.error("[core:bootstrap] Vocab custom error:", e);
    }

    if (this.estado.progresso) {
      this.estado.progresso.total_palavras = this.estado.vocabCache.length;
      this.salvarProgresso();
    }
  },

  async init() {
    if (typeof this._migrateLegacyStorage === 'function') this._migrateLegacyStorage();
    if (typeof this.initSidebarPin === 'function') this.initSidebarPin();

    if (typeof this.carregarProgresso === 'function') this.estado.progresso = this.carregarProgresso();
    if (typeof this.carregarEnergia === 'function') this.carregarEnergia();
    if (typeof this.salvarEnergia === 'function') this.salvarEnergia();
    if (typeof this.carregarFlashcards === 'function') this.estado.flashcardData = this.carregarFlashcards();
    if (typeof I18n !== 'undefined' && typeof I18n.inicializar === 'function') I18n.inicializar();
    await this.carregarDados();
    if (typeof this.atualizarStats === 'function') this.atualizarStats();
    if (typeof this.renderizarTemplos === 'function') this.renderizarTemplos();

    // FSRS Due Cards Alert
    setTimeout(() => {
      let due = 0;
      const now = Date.now();
      const fd = this.estado.flashcardData;
      if (fd) {
        for (const k in fd) {
          if (fd[k].due && fd[k].due <= now) due++;
        }
      }
      if (due >= 15 && typeof App.notificar === 'function') {
        const warning = typeof I18n !== 'undefined' ? I18n.t('fsrs_due_warning') : 'You have {num} cards due for review!';
        App.notificar(warning.replace('{num}', due), 'erro');
      }
    }, 1500);

    // Kick off secondary modules once data is ready
    if (typeof Progressao !== 'undefined') Progressao.verificarDesbloqueioTemplos();
    if (typeof Quiz !== 'undefined') Quiz.renderizarSeletor();
    if (typeof Vocab !== 'undefined') {
      Vocab.popularCategorias();
      Vocab.renderizar();
    }
    if (typeof Flashcards !== 'undefined') Flashcards.atualizarSelectTemplo();
    if (typeof Calor !== 'undefined') Calor.renderizar();
    if (typeof Grammatica !== 'undefined') Grammatica.renderizarSeletor();
    if (typeof SomFeedback !== 'undefined') SomFeedback.init();
    if (typeof Notificacoes !== 'undefined') Notificacoes.init();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (typeof window.speechSynthesis.addEventListener === 'function') {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          if (typeof this._getVozAmericana === 'function') this._getVozAmericana();
        });
      } else {
        const prevVoicesChanged = window.speechSynthesis.onvoiceschanged;
        window.speechSynthesis.onvoiceschanged = (e) => {
          if (typeof prevVoicesChanged === 'function') prevVoicesChanged(e);
          if (typeof this._getVozAmericana === 'function') this._getVozAmericana();
        };
      }
    }

    if (typeof Onboarding !== 'undefined' && Onboarding.deveExibir()) {
      Onboarding.mostrar();
    }

    if (typeof BackupReminder !== 'undefined') {
      BackupReminder.verificarLembrete();
    }

    // Hash routing & deep linking
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) this.navegar(hash);
    };
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash) handleHash();

    // Keyboard shortcuts (F15: Guard numeric keys 1-5 during active study sessions)
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      if (e.ctrlKey || e.metaKey) return;
      const inStudySession = document.querySelector('#sec-flashcards.active, #sec-quiz.active');
      if (inStudySession && !e.altKey) return;
      if (e.key === '1') this.navegar('temples');
      else if (e.key === '2') this.navegar('flashcards');
      else if (e.key === '3') this.navegar('quiz');
      else if (e.key === '4') this.navegar('vocab');
      else if (e.key === '5') this.navegar('grammar');
    });

    // F20: Subtle Haptic Feedback on card flip, rating clicks, and quiz answer selections
    document.addEventListener('click', (e) => {
      const target = e.target && e.target.closest && e.target.closest('#flashcard, .btn-rating, .opcao-btn, [data-rating]');
      if (target && 'vibrate' in navigator) {
        try { navigator.vibrate(15); } catch (_) {}
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.AppBootstrap = AppBootstrap;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppBootstrap;
}
