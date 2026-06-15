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
      { sec: "templi",     prep: () => window.scrollTo(0,0) },
      { sec: "templi",     prep: () => window.scrollTo(0,0) },
      { sec: "templi",     prep: null },
      { sec: "templi",     prep: () => window.scrollTo(0,0) },
      { sec: "flashcard",  prep: null },
      { sec: "flashcard",  prep: null },
      { sec: "flashcard",  prep: () => { const a = document.getElementById("card-actions"); if (a) a.style.display = "grid"; }},
      { sec: "quiz",       prep: () => { if (typeof Quiz !== "undefined") Quiz.renderizarSeletor(); }},
      { sec: "grammatica", prep: () => { if (typeof Grammatica !== "undefined") Grammatica.renderizarSeletor(); }},
      { sec: "vocabolario",prep: () => { if (typeof Vocab !== "undefined") Vocab.renderizar(); }},
      { sec: "storie",     prep: () => { if (typeof Storie !== "undefined") Storie.renderizarSeletor(); }},
      { sec: "dialoghi",   prep: () => { if (typeof Dialoghi !== "undefined") Dialoghi.renderizarSeletor(); }},
      { sec: "canzoni",    prep: () => { if (typeof Canzoni !== "undefined") Canzoni.renderizarSeletor(); }},
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
      "#storie-container",
      ".dialogo-card",
      "#canzoni-container",
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
      nextBtnText: "Next →", prevBtnText: "← Back", doneBtnText: "🎉 Let's go!",
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
        { element: ".app-header",         popover: { title: "👋 Welcome to English Autentico!",     description: "This 13-step tour shows you the main features. It takes less than 2 minutes — let's go!",                                                                                      side: "bottom", align: "center" } },
        { element: ".stats-bar",           popover: { title: "🏅 Level, XP & Streak",               description: "Every activity earns XP. Accumulate enough and your level rises, unlocking new temples. Keep your 🔥 streak alive by studying every day!",                                   side: "bottom", align: "center" } },
        { element: "#templos-grid .templo-card:first-child", popover: { title: "🏛️ Temples — Your Vocabulary Packs", description: "Each temple is a set of ~20 words from an English-speaking city. Start with Temple 1 (New York). New temples unlock as your level grows.",               side: "bottom", align: "center" } },
        { element: "#meta-prazo-container",popover: { title: "🎯 Set a Goal with a Deadline",       description: "Pick a target level and a deadline date. The app calculates how many XP per day you need and shows your daily progress bar at the top.",                                   side: "bottom", align: "center" } },
        { element: ".card-selecao-templo", popover: { title: "🃏 Smart Flashcards (FSRS)",          description: "Select a temple and study its words with Spaced Repetition. The FSRS-4.5 algorithm schedules each word so you review it just before you would forget it.",               side: "bottom", align: "center" } },
        { element: "#btn-modos-wrapper",   popover: { title: "🔄 Four Study Modes",                 description: "Normal (EN→PT) · Reverse (PT→EN) · Context (fill the gap) · Listen (guess from audio). Switch modes to build all-round mastery!",                                       side: "bottom", align: "center" } },
        { element: ".card-actions",        popover: { title: "⭐ Rate Every Card Honestly",          description: "Again = tomorrow · Hard = 1 day · Good = 3 days · Easy = 2 weeks. The algorithm adjusts future intervals based on your answer — honesty beats the system!",            side: "top",    align: "center" } },
        { element: ".quiz-templo-btn:not(.bloqueado)", popover: { title: "❓ Quiz — 4 Exercise Types", description: "Vocabulary, Grammar, Listening and Spelling. Complete a quiz to unlock the next temple and earn bonus XP!",                                                           side: "top",    align: "center" } },
        { element: ".gram-nivel-banner",   popover: { title: "📚 Grammar — A1 to B2",               description: "90 lessons from beginner to upper-intermediate. Each lesson has theory cards, examples, common traps and exercises — all in English.",                                   side: "bottom", align: "center" } },
        { element: "#vocab-blur-btns",     popover: { title: "📖 Vocabulary — Self-Test Mode",      description: "Tap 'Hide EN' or 'Hide PT' to cover a column and test yourself. Filter by temple or category and click any word to hear it.",                                          side: "bottom", align: "center" } },
        { element: "#storie-container",    popover: { title: "📜 Reading — Authentic Texts",        description: "Real English stories at A1–B2 level. Tap any word to see its translation. Use Immersion Mode to hide the Portuguese and challenge yourself!",                           side: "bottom", align: "center" } },
        { element: ".dialogo-card",        popover: { title: "💬 Dialogues — Real Conversations",   description: "Practise everyday English scenarios: coffee shops, airports, job interviews. Listen, read and respond — or import your own via the 🤖 AI button!",                      side: "bottom", align: "center" } },
        { element: "#canzoni-container",   popover: { title: "🎵 Songs — Learn with Music",         description: "Follow English song lyrics and fill in the missing words. Add any song with the 🤖 AI Import button. Music makes vocabulary stick!",                                     side: "bottom", align: "center" } },
      ]
    });

    navegar(0, () => driverObj.drive());
  }
};
