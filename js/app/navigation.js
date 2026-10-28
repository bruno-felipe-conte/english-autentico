// ============================================================
// js/app/navigation.js — Navigation & Sidebar Management
// ============================================================

const AppNavigation = {
  toggleSidebarPin(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const isPinned = document.body.classList.contains('sidebar-pinned');
    const newState = !isPinned;
    localStorage.setItem('en_sidebar_pinned', newState ? 'true' : 'false');
    this.initSidebarPin();
  },

  initSidebarPin() {
    const isPinned = localStorage.getItem('en_sidebar_pinned') === 'true';
    const pinBtn = document.getElementById('sidebar-pin-btn');
    const pinIcon = document.getElementById('sidebar-pin-icon');
    const svgUnpinned = '<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg>';
    const svgPinned = '<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg>';

    const sidebar = document.getElementById('app-sidebar');

    if (isPinned) {
      document.body.classList.add('sidebar-pinned');
      if (sidebar) sidebar.classList.add('pinned');
      if (pinBtn) {
        pinBtn.classList.add('pinned', 'ativo');
        pinBtn.setAttribute('title', 'Desafixar menu lateral (recolher)');
        pinBtn.setAttribute('aria-label', 'Desafixar menu lateral (recolher)');
      }
      if (pinIcon) pinIcon.innerHTML = svgPinned;
    } else {
      document.body.classList.remove('sidebar-pinned');
      if (sidebar) sidebar.classList.remove('pinned');
      if (pinBtn) {
        pinBtn.classList.remove('pinned', 'ativo');
        pinBtn.setAttribute('title', 'Fixar menu lateral');
        pinBtn.setAttribute('aria-label', 'Fixar menu lateral');
      }
      if (pinIcon) pinIcon.innerHTML = svgUnpinned;
    }
  },

  navegar(secao) {
    const sectionMap = {
      'home': 'temples',
      'templi': 'temples', 'templo': 'temples',
      'dialoghi': 'dialogues', 'dialogo': 'dialogues',
      'canzoni': 'songs', 'canzone': 'songs',
      'imitazione': 'pronunciation',
      'flashcard': 'flashcards',
      'vocabolario': 'vocab',
      'grammatica': 'grammar',
      'storie': 'stories',
      'phrasal_verbs': 'phrasal', 'phrasal': 'phrasal',
      'profilo': 'profile'
    };
    secao = sectionMap[secao] || secao;
    if (this.estado) this.estado.secaoAtiva = secao;

    if (window.location.hash !== '#' + secao) {
      try { history.replaceState(null, '', '#' + secao); } catch (e) { console.error("[core:nav] history error:", e); }
    }

    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(btn => {
      const s = sectionMap[btn.dataset.section] || btn.dataset.section;
      btn.classList.toggle('ativa', s === secao);
    });

    // Update bottom nav buttons
    document.querySelectorAll('#bottom-nav button').forEach(btn => {
      const s = sectionMap[btn.dataset.section] || btn.dataset.section;
      btn.classList.toggle('ativa', s === secao);
    });

    // Show/hide sections
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `sec-${secao}`);
    });

    // Persist last section visited
    if (this.estado && this.estado.progresso) {
      this.estado.progresso.ultima_secao = secao;
      this.salvarProgresso();
    }

    // Lazy-render on first visit (supports English and legacy module names)
    if ((secao === 'dialogues' || secao === 'dialoghi') && typeof Dialogues !== 'undefined') {
      if (Dialogues.renderizarSeletor) Dialogues.renderizarSeletor();
      else if (Dialogues.render) Dialogues.render();
    }
    if ((secao === 'songs' || secao === 'canzoni') && typeof Songs !== 'undefined') {
      if (Songs.renderizarSeletor) Songs.renderizarSeletor();
      else if (Songs.render) Songs.render();
    }
    if ((secao === 'pronunciation' || secao === 'imitazione') && typeof Pronunciation !== 'undefined') {
      if (Pronunciation.render) Pronunciation.render();
      else if (Pronunciation.renderizar) Pronunciation.renderizar();
    }
    if ((secao === 'vocab' || secao === 'vocabolario') && typeof Vocab !== 'undefined') {
      Vocab.renderizar ? Vocab.renderizar() : (Vocab.render ? Vocab.render() : null);
    }
    if (secao === 'quiz' && typeof Quiz !== 'undefined') {
      Quiz.renderizarSeletor ? Quiz.renderizarSeletor() : (Quiz.renderSelector ? Quiz.renderSelector() : null);
    }
    if ((secao === 'flashcards' || secao === 'flashcard') && typeof Flashcards !== 'undefined') {
      Flashcards.atualizarSelectTemplo ? Flashcards.atualizarSelectTemplo() : null;
    }
    if ((secao === 'grammar' || secao === 'grammatica') && typeof Grammatica !== 'undefined') {
      Grammatica.renderizarSeletor ? Grammatica.renderizarSeletor() : null;
    }
    if (secao === 'phrasal' && typeof PhrasalVerbs !== 'undefined') {
      if (PhrasalVerbs.renderizar) PhrasalVerbs.renderizar();
    }
    if ((secao === 'stories' || secao === 'storie') && typeof Stories !== 'undefined') {
      Stories._filtroNivel = '';
      Stories._filtroTexto = '';
      if (Stories.renderizarSeletor) Stories.renderizarSeletor();
      else if (Stories.renderSelector) Stories.renderSelector();
    }
    if ((secao === 'profile' || secao === 'profilo') && typeof Profile !== 'undefined') {
      if (Profile.render) Profile.render();
      else if (Profile.renderizar) Profile.renderizar();
    }
  }
};

if (typeof window !== 'undefined') {
  window.AppNavigation = AppNavigation;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppNavigation;
}
