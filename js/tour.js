// tour.js — Interactive walkthrough via Driver.js
// English Autêntico — Complete Modern Tour

const Tour = {
  STORAGE_KEY: "en_tour_done",
  _driverObj: null,

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

    if (this._driverObj) {
      try { this._driverObj.destroy(); } catch (_) {}
      this._driverObj = null;
    }

    // 13 Passos completos do Tour do English Autêntico
    const passos = [
      // 1. Header & Controles Globais
      {
        sec: "temples",
        selector: ".app-header",
        prep: () => window.scrollTo(0, 0),
        titleKey: "tour_welcome_title",
        descKey: "tour_welcome_desc",
        side: "bottom",
        align: "center"
      },
      // 2. Estatísticas & Meta Diária
      {
        sec: "temples",
        selector: "#stats-bar, .header-stats, #daily-goal-bar",
        prep: () => window.scrollTo(0, 0),
        titleKey: "tour_stats_title",
        descKey: "tour_stats_desc",
        side: "bottom",
        align: "center"
      },
      // 3. Menu Lateral Retrátil
      {
        sec: "temples",
        selector: "#app-sidebar",
        prep: null,
        titleKey: "tour_sidebar_title",
        descKey: "tour_sidebar_desc",
        side: "right",
        align: "start"
      },
      // 4. Templos do Conhecimento
      {
        sec: "temples",
        selector: "#temples-grid, #templos-grid",
        prep: () => {
          const grid = document.getElementById("temples-grid") || document.getElementById("templos-grid");
          if (grid) grid.scrollIntoView({ behavior: "instant", block: "center" });
        },
        titleKey: "tour_templi_title",
        descKey: "tour_templi_desc",
        side: "top",
        align: "center"
      },
      // 5. Flashcards Inteligentes (FSRS)
      {
        sec: "flashcards",
        selector: ".card-selecao-templo, #flashcard-arena, #sec-flashcards",
        prep: () => {
          if (typeof Flashcards !== "undefined" && Flashcards.atualizarSelectTemplo) {
            Flashcards.atualizarSelectTemplo();
          }
        },
        titleKey: "tour_flashcard_title",
        descKey: "tour_flashcard_desc",
        side: "bottom",
        align: "center"
      },
      // 6. 5 Modos de Estudo nos Flashcards
      {
        sec: "flashcards",
        selector: "#btn-modos-wrapper, .fc-mode-pills",
        prep: null,
        titleKey: "tour_modes_title",
        descKey: "tour_modes_desc",
        side: "bottom",
        align: "center"
      },
      // 7. Avaliação Honesta no FSRS
      {
        sec: "flashcards",
        selector: "#card-actions, .card-actions",
        prep: () => {
          const a = document.getElementById("card-actions");
          if (a) {
            a.style.display = "grid";
            a.style.visibility = "visible";
          }
        },
        titleKey: "tour_rate_title",
        descKey: "tour_rate_desc",
        side: "top",
        align: "center"
      },
      // 8. Quiz de Fixação Ativa
      {
        sec: "quiz",
        selector: "#quiz-templo-selector, #sec-quiz",
        prep: () => {
          if (typeof Quiz !== "undefined" && Quiz.renderizarSeletor) {
            Quiz.renderizarSeletor();
          }
        },
        titleKey: "tour_quiz_title",
        descKey: "tour_quiz_desc",
        side: "top",
        align: "center"
      },
      // 9. Pronunciation Dojo
      {
        sec: "pronunciation",
        selector: "#pronunciation-container, #sec-pronunciation",
        prep: () => {
          if (typeof Pronunciation !== "undefined") {
            if (Pronunciation.renderizar) Pronunciation.renderizar();
            else if (Pronunciation.render) Pronunciation.render();
          }
        },
        titleKey: "tour_pronun_title",
        descKey: "tour_pronun_desc",
        side: "top",
        align: "center"
      },
      // 10. Phrasal Verbs Lab
      {
        sec: "phrasal",
        selector: ".phrasal-container, #sec-phrasal",
        prep: () => {
          if (typeof PhrasalVerbs !== "undefined" && PhrasalVerbs.renderizar) {
            PhrasalVerbs.renderizar();
          }
        },
        titleKey: "tour_phrasal_title",
        descKey: "tour_phrasal_desc",
        side: "top",
        align: "center"
      },
      // 11. Vocabulário Completo & Auto-Teste
      {
        sec: "vocab",
        selector: "#vocab-blur-btns, .vocab-filtros, #sec-vocab",
        prep: () => {
          if (typeof Vocab !== "undefined" && Vocab.renderizar) {
            Vocab.renderizar();
          }
        },
        titleKey: "tour_vocabolario_title",
        descKey: "tour_vocabolario_desc",
        side: "bottom",
        align: "center"
      },
      // 12. Gramática Autêntica (A1 ao C1)
      {
        sec: "grammar",
        selector: "#grammatica-container, #sec-grammar",
        prep: () => {
          if (typeof Grammatica !== "undefined" && Grammatica.renderizarSeletor) {
            Grammatica.renderizarSeletor();
          }
        },
        titleKey: "tour_grammatica_title",
        descKey: "tour_grammatica_desc",
        side: "top",
        align: "center"
      },
      // 13. Diálogos, Leituras & Músicas
      {
        sec: "dialogues",
        selector: "#dialogues-container, #sec-dialogues",
        prep: () => {
          if (typeof Dialogues !== "undefined" && Dialogues.renderizarSeletor) {
            Dialogues.renderizarSeletor();
          }
        },
        titleKey: "tour_immersion_title",
        descKey: "tour_immersion_desc",
        side: "top",
        align: "center"
      }
    ];

    const stepsConfig = passos.map(p => ({
      element: p.selector,
      popover: {
        title: (typeof I18n !== 'undefined' ? I18n.t(p.titleKey) : '') || p.titleKey,
        description: (typeof I18n !== 'undefined' ? I18n.t(p.descKey) : '') || p.descKey,
        side: p.side || "bottom",
        align: p.align || "center"
      }
    }));

    const irParaPasso = (targetIdx) => {
      if (targetIdx < 0) return;
      if (targetIdx >= passos.length) {
        if (driverObj) driverObj.destroy();
        try { localStorage.setItem(Tour.STORAGE_KEY, "1"); } catch(e) {}
        return;
      }

      const p = passos[targetIdx];
      if (p && p.sec && typeof App !== 'undefined' && App.navegar) {
        App.navegar(p.sec);
        if (p.prep) {
          try { p.prep(); } catch (err) { console.warn("[tour] prep error:", err); }
        }
      }

      try {
        const el = document.querySelector(p.selector);
        if (el) {
          el.scrollIntoView({ behavior: "instant", block: "center" });
        }
      } catch (_) {}

      if (driverObj) {
        driverObj.moveTo(targetIdx);
      }
    };

    const driverObj = drv({
      showProgress: true,
      animate: true,
      allowClose: true,
      nextBtnText: (typeof I18n !== 'undefined' ? I18n.t('tour_next_btn') : 'Próximo →'),
      prevBtnText: (typeof I18n !== 'undefined' ? I18n.t('tour_prev_btn') : '← Voltar'),
      doneBtnText: (typeof I18n !== 'undefined' ? I18n.t('tour_done_btn') : '🎉 Vamos lá!'),
      progressText: (typeof I18n !== 'undefined' ? I18n.t('tour_progress') : '{{current}} de {{total}}'),
      popoverClass: "app-tour-theme",
      steps: stepsConfig,
      onNextClick: () => {
        const cur = driverObj.getActiveIndex() ?? 0;
        if (cur >= passos.length - 1) {
          driverObj.destroy();
          try { localStorage.setItem(Tour.STORAGE_KEY, "1"); } catch(e) {}
          return;
        }
        irParaPasso(cur + 1);
      },
      onPrevClick: () => {
        const cur = driverObj.getActiveIndex() ?? 0;
        if (cur <= 0) return;
        irParaPasso(cur - 1);
      },
      onDestroyStarted: () => {
        try { localStorage.setItem(Tour.STORAGE_KEY, "1"); } catch(e) {}
        driverObj.destroy();
      }
    });

    this._driverObj = driverObj;

    // Inicia no passo 0
    irParaPasso(0);
    setTimeout(() => {
      driverObj.drive(0);
    }, 150);
  }
};

if (typeof window !== 'undefined') {
  window.Tour = Tour;
}
