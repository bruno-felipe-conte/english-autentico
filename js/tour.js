// tour.js -- Interactive walkthrough via Driver.js

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
      { sec: "templi",    prep: () => window.scrollTo(0,0) },
      { sec: "templi",    prep: () => window.scrollTo(0,0) },
      { sec: "templi",    prep: null },
      { sec: "templi",    prep: () => window.scrollTo(0,0) },
      { sec: "flashcard", prep: null },
      { sec: "flashcard", prep: null },
      { sec: "flashcard", prep: () => { const a = document.getElementById("card-actions"); if (a) a.style.display = "grid"; }},
      { sec: "quiz", prep: () => { if (typeof Quiz !== "undefined") Quiz.renderizarSeletor(); }},
      { sec: "grammatica", prep: () => { if (typeof Grammatica !== "undefined") Grammatica.renderizarSeletor(); }},
      { sec: "vocabolario", prep: () => { if (typeof Vocab !== "undefined") Vocab.renderizar(); }},
      { sec: "storie",   prep: null },
      { sec: "dialoghi", prep: null },
      { sec: "canzoni",  prep: null },
    ];

    const stepSelectors = [
      ".app-header",
      ".stats-bar",
      "#templos-grid .templo-card:first-child",
      "#meta-prazo-container",
      ".card-selecao-templo",
      "#btn-modos-wrapper",
      ".card-actions",
      ".quiz-templo-btn:not(.bloqueado)",
      ".gram-nivel-banner",
      "#vocab-blur-btns",
      "#storie-lista",
      ".dialogo-card",
      ".canzone-card",
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
      }, 100);
    };

    let driverObj;
    driverObj = drv({
      showProgress: true, animate: true, allowClose: true,
      nextBtnText: "Next →", prevBtnText: "← Back", doneBtnText: "🎉 Start!",
      progressText: "{{current}} of {{total}}",
      popoverClass: "app-tour-theme",
      onNextClick: () => { const cur = driverObj.getActiveIndex() ?? 0; navegar(cur + 1, () => driverObj.moveNext()); },
      onPrevClick: () => { const cur = driverObj.getActiveIndex() ?? 0; navegar(cur - 1, () => driverObj.movePrevious()); },
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm("Exit the tour?")) {
          driverObj.destroy();
          try { localStorage.setItem(Tour.STORAGE_KEY, "1"); } catch(e) {}
        }
      },
      steps: [
        { element: ".app-header", popover: { title: "👋 Welcome to English Autentico!", description: "This 13-step tour introduces the main features of the app. It takes less than 2 minutes.", side: "bottom", align: "center" } },
        { element: ".stats-bar", popover: { title: "🏅 Level, XP and Streak", description: "Track your progress here. Every activity earns XP. Reach enough XP and your level goes up, unlocking new temples.", side: "bottom", align: "center" } },
        { element: "#templos-grid .templo-card:first-child", popover: { title: "🏛️ Temple 1 - Start Here!", description: "Each temple is a vocabulary pack from an English-speaking city. Start with Temple 1 (New York). The rest unlock as you level up.", side: "bottom", align: "center" } },
        { element: "#meta-prazo-container", popover: { title: "🎯 Set a Goal with a Deadline", description: "Choose a target level and a deadline date. The app calculates how much XP per day you need.", side: "bottom", align: "center" } },
        { element: ".card-selecao-templo", popover: { title: "🃏 Flashcards with Spaced Repetition", description: "Select a temple and study its words. The FSRS-4.5 algorithm decides when each word needs review.", side: "bottom", align: "center" } },
        { element: "#btn-modos-wrapper", popover: { title: "🔄 Three Study Modes", description: "Reverse (PT to EN) | Context (complete the sentence) | Listen (guess from audio). Use all three for full mastery!", side: "bottom", align: "center" } },
        { element: ".card-actions", popover: { title: "How to Rate Cards", description: "Forgot = tomorrow | Hard = 1 day | Good = 3 days | Easy = 2 weeks. Be honest - the system learns with you!", side: "top", align: "center" } },
        { element: ".quiz-templo-btn:not(.bloqueado)", popover: { title: "Quiz - 4 Exercise Types", description: "Vocabulary, Grammar, Listening and Spelling. Every correct answer earns XP!", side: "top", align: "center" } },
        { element: ".gram-nivel-banner", popover: { title: "📚 Grammar - A1 to B2", description: "Click a level banner to expand its lessons. Theory, examples, traps, and exercises - all in English.", side: "bottom", align: "center" } },
        { element: "#vocab-blur-btns", popover: { title: "📖 Vocabulary - Train Your Memory", description: "Hide PT or Hide EN to cover a column and test yourself. Search, filter by temple, and click to hear pronunciation!", side: "bottom", align: "center" } },
        { element: "#storie-lista", popover: { title: "Reading - Authentic Texts", description: "Real English texts at A1-B2 difficulty. Activate Immersion Mode to hide the translation!", side: "bottom", align: "center" } },
        { element: ".dialogo-card", popover: { title: "Dialogues - Real Conversations", description: "Practise everyday English dialogues. Listen, read and repeat.", side: "bottom", align: "center" } },
        { element: ".canzone-card", popover: { title: "Songs - Learn with Music", description: "English songs with full lyrics. Listen and follow along!", side: "bottom", align: "center" } },
      ]
    });

    navegar(0, () => driverObj.drive());
  }
};