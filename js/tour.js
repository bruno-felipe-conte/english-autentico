// tour.js — Interactive walkthrough via Driver.js

const Tour = {
  STORAGE_KEY: "en_tour_done",

  reiniciar() {
    try { localStorage.removeItem(this.STORAGE_KEY); } catch(e) {}
    this.iniciar(true);
  },

  iniciar(forcar = false) {
    if (!window.driver || !window.driver.js) return;
    try {
      if (!forcar && localStorage.getItem(this.STORAGE_KEY)) return;
    } catch(e) {}

    const drv = window.driver.js.driver;

    const passos = [
      { sec: "temples",    prep: () => window.scrollTo(0,0) },
      { sec: "temples",    prep: () => window.scrollTo(0,0) },
      { sec: "temples",    prep: null },
      { sec: "temples",    prep: () => window.scrollTo(0,0) },
      { sec: "flashcards", prep: null },
      { sec: "flashcards", prep: null },
      { sec: "flashcards", prep: () => { const a = document.getElementById("card-actions"); if (a) a.style.display = "grid"; }},
      { sec: "quiz",       prep: () => { if (typeof Quiz !== "undefined") (Quiz.renderizarSeletor || Quiz.render)?.(); }},
      { sec: "grammar",    prep: () => { if (typeof Grammar !== "undefined") (Grammar.renderizarSeletor || Grammar.render)?.(); }},
      { sec: "vocab",      prep: () => { if (typeof Vocab !== "undefined") Vocab.renderizar?.(); }},
      { sec: "stories",    prep: () => { if (typeof Stories !== "undefined") (Stories.renderizarSeletor || Stories.render)?.(); }},
      { sec: "dialogues",  prep: () => { if (typeof Dialogues !== "undefined") (Dialogues.renderizarSeletor || Dialogues.render)?.(); }},
      { sec: "songs",      prep: () => { if (typeof Songs !== "undefined") (Songs.renderizarSeletor || Songs.render)?.(); }},
    ];

    const stepSelectors = [
      ".app-header",
      ".stats-bar",
      "#temples-grid .templo-card:first-child, #templos-grid .templo-card:first-child",
      "#meta-prazo-container",
      ".card-selecao-templo",
      "#btn-modos-wrapper",
      ".card-actions",
      ".quiz-templo-btn:not(.bloqueado)",
      ".gram-nivel-banner",
      "#vocab-blur-btns",
      "#stories-container, #storie-container",
      ".dialogo-card",
      "#songs-container, #canzoni-container",
    ];

    const navegar = (idx, cb) => {
      const p = passos[idx];
      if (!p) { cb(); return; }
      App.navegar(p.sec);
      if (p.prep) p.prep();
      setTimeout(() => {
        const sel = stepSelectors[idx];
        if (sel) { const el = document.querySelector(sel); if (el) el.scrollIntoView({ behavior: "instant", block: "center" }); }
        setTimeout(cb, 60);
      }, 120);
    };

    let driverObj;
    driverObj = drv({
      showProgress: true, animate: true, allowClose: true,
      nextBtnText: I18n.t('tour_next_btn'), 
      prevBtnText: I18n.t('tour_prev_btn'), 
      doneBtnText: I18n.t('tour_done_btn'),
      progressText: I18n.t('tour_progress'),
      popoverClass: "app-tour-theme",
      onNextClick: () => { const cur = driverObj.getActiveIndex() ?? 0; navegar(cur + 1, () => driverObj.moveNext()); },
      onPrevClick: () => { const cur = driverObj.getActiveIndex() ?? 0; navegar(cur - 1, () => driverObj.movePrevious()); },
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm(I18n.t('tour_confirm_exit'))) {
          driverObj.destroy();
          try { localStorage.setItem(Tour.STORAGE_KEY, "1"); } catch(e) {}
        }
      },
      steps: [
        { element: ".app-header",         popover: { title: I18n.t('tour_welcome_title'),     description: I18n.t('tour_welcome_desc'),    side: "bottom", align: "center" } },
        { element: ".stats-bar",           popover: { title: I18n.t('tour_stats_title'),       description: I18n.t('tour_stats_desc'),      side: "bottom", align: "center" } },
        { element: "#temples-grid .templo-card:first-child, #templos-grid .templo-card:first-child", popover: { title: I18n.t('tour_templi_title'), description: I18n.t('tour_templi_desc'), side: "bottom", align: "center" } },
        { element: "#meta-prazo-container",popover: { title: I18n.t('tour_goal_title'),       description: I18n.t('tour_goal_desc'),       side: "bottom", align: "center" } },
        { element: ".card-selecao-templo", popover: { title: I18n.t('tour_flashcard_title'),  description: I18n.t('tour_flashcard_desc'),  side: "bottom", align: "center" } },
        { element: "#btn-modos-wrapper",   popover: { title: I18n.t('tour_modes_title'),      description: I18n.t('tour_modes_desc'),      side: "bottom", align: "center" } },
        { element: ".card-actions",        popover: { title: I18n.t('tour_rate_title'),       description: I18n.t('tour_rate_desc'),       side: "top",    align: "center" } },
        { element: ".quiz-templo-btn:not(.bloqueado)", popover: { title: I18n.t('tour_quiz_title'),  description: I18n.t('tour_quiz_desc'), side: "top",    align: "center" } },
        { element: ".gram-nivel-banner",   popover: { title: I18n.t('tour_grammatica_title'),  description: I18n.t('tour_grammatica_desc'), side: "bottom", align: "center" } },
        { element: "#vocab-blur-btns",     popover: { title: I18n.t('tour_vocabolario_title'),  description: I18n.t('tour_vocabolario_desc'), side: "bottom", align: "center" } },
        { element: "#stories-container, #storie-container",    popover: { title: I18n.t('tour_reading_title'),     description: I18n.t('tour_reading_desc'),    side: "bottom", align: "center" } },
        { element: ".dialogo-card",        popover: { title: I18n.t('tour_dialoghi_title'),    description: I18n.t('tour_dialoghi_desc'),   side: "bottom", align: "center" } },
        { element: "#songs-container, #canzoni-container",   popover: { title: I18n.t('tour_canzoni_title'),     description: I18n.t('tour_canzoni_desc'),    side: "bottom", align: "center" } },
      ]
    });

    navegar(0, () => driverObj.drive());
  }
};
