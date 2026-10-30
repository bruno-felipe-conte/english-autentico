// ============================================================
// quiz.js — Quiz system with multiple choice questions
// ============================================================

const Quiz = {
  temploAtual: null,
  perguntas: [],       // 10 questions for this session
  perguntaAtual: 0,
  pontuacao: 0,
  xpTotal: 0,
  respondido: false,
  combo: 0,
  abaSeletor: 'templos', // 'templos' | 'morfologia' | 'listening' | 'gramatica' | 'verbi' | 'phrasal'
  _indiceAtual: 0,     // para restauração i18n
  _autoAdvanceTimer: null,

  // ── Smart Retractable Quiz Bar (Zero-Scroll UX) ─────────────
  toggleSeletor() {
    const seletor = document.getElementById('quiz-templo-selector');
    if (!seletor) return;
    const visivel = seletor.style.display !== 'none';
    if (visivel) {
      seletor.style.display = 'none';
    } else {
      this.renderizarSeletor();
      seletor.style.display = 'grid';
    }
    this._sincronizarBarraCompacta();
  },

  _sincronizarBarraCompacta() {
    const bar       = document.getElementById('quiz-compact-bar');
    const container = document.getElementById('quiz-container');
    const seletor   = document.getElementById('quiz-templo-selector');
    if (!bar) return;

    const quizAtivo = container && container.style.display !== 'none' && this.perguntas && this.perguntas.length > 0;
    if (!quizAtivo) {
      bar.style.display = 'none';
      return;
    }

    bar.style.display = 'flex';
    const elNome = document.getElementById('quiz-compact-nome');
    if (elNome) {
      let nomeQuiz = '🏛️ Quiz';
      if (this.temploAtual === 'misto') {
        nomeQuiz = '⚡ Quick Mix';
      } else if (this.temploAtual === 'revisao') {
        nomeQuiz = '🔁 Error Review';
      } else if (this.temploAtual === 'phrasal') {
        nomeQuiz = '🧩 Phrasal Verbs';
      } else if (this.temploAtual) {
        const tData = App.estado?.templosData?.[this.temploAtual];
        const tNome = tData?.nome || `Temple ${this.temploAtual}`;
        nomeQuiz = `🏛️ T${this.temploAtual} · ${tNome}`;
      }
      elNome.textContent = nomeQuiz;
    }

    const elCount = document.getElementById('quiz-compact-count');
    if (elCount) {
      elCount.textContent = `${this.perguntaAtual + 1}/${this.perguntas.length}`;
    }

    const btnToggle = document.getElementById('quiz-compact-toggle-btn');
    if (btnToggle) {
      const seletorAberto = seletor && seletor.style.display !== 'none';
      btnToggle.innerHTML = seletorAberto
        ? '<span>✕ Ocultar</span><span class="quiz-compact-chevron">▴</span>'
        : '<span>⚙️ Trocar</span><span class="quiz-compact-chevron">▾</span>';
    }
  },

  // ── Start quiz for a temple ────────────────────────────────
  iniciar(temploNum) {
    if (!Progressao.temploDesbloqueado(temploNum)) {
      App.notificar('notif_quiz_bloqueado', 'erro');
      return;
    }

    // Restaura sessão parcial se for o mesmo templo
    const salvo = this._carregarSessao();
    if (salvo && salvo.temploAtual === temploNum && salvo.perguntaAtual > 0 && salvo.perguntas?.length > 0) {
      Object.assign(this, salvo);
      this._indiceAtual = this.perguntaAtual;
      const container = document.getElementById('quiz-container');
      const resultado  = document.getElementById('quiz-resultado');
      const seletor    = document.getElementById('quiz-templo-selector');
      if (container) container.style.display = 'block';
      if (resultado)  resultado.style.display  = 'none';
      if (seletor)    seletor.style.display     = 'none';
      App.notificar(I18n.t('quiz_resume_notif').replace('{n}', this.perguntaAtual + 1), 'alerta');
      this.mostrarPergunta();
      return;
    }

    this.temploAtual = temploNum;
    this.perguntaAtual = 0;
    this.pontuacao = 0;
    this.xpTotal = 0;
    this.respondido = false;
    this.combo = 0;
    this._indiceAtual = 0;

    // Try to get quiz questions for this temple from the JSON data
    let pool = App.estado.quizData.filter(q => q.templo === temploNum);

    // If no quiz JSON data for this temple, generate questions from vocabulary
    if (pool.length === 0) {
      pool = this._gerarPerguntas(temploNum);
    }

    // Shuffle and take up to 10
    this.perguntas = this._embaralhar(pool).slice(0, 10);

    if (this.perguntas.length === 0) {
      App.notificar('notif_quiz_sem_perguntas', 'alerta');
      return;
    }

    // Show quiz container, hide selector and resultado
    const container = document.getElementById('quiz-container');
    const resultado = document.getElementById('quiz-resultado');
    const seletor = document.getElementById('quiz-templo-selector');
    if (container) container.style.display = 'block';
    if (resultado) resultado.style.display = 'none';
    if (seletor) seletor.style.display = 'none';

    this.mostrarPergunta();
  },

  // ── Start mixed quiz (all unlocked temples) ────────────────
  iniciarPhrasal() {
    this.temploAtual = 'phrasal';
    this.perguntaAtual = 0;
    this.pontuacao = 0;
    this.xpTotal = 0;
    this.respondido = false;
    this.combo = 0;
    this.respostasHistorico = [];

    const todas = (App.estado?.quizData || []).filter(q => q.templo === 'phrasal' || q.categoria === 'phrasal_verbs');
    this.perguntas = [...todas].sort(() => Math.random() - 0.5).slice(0, 10);

    const seletor = document.getElementById('quiz-templo-selector');
    const container = document.getElementById('quiz-container');
    if (seletor) seletor.style.display = 'none';
    if (container) container.style.display = 'block';

    this.mostrarPergunta();
  },

  iniciarMisto() {
    this.temploAtual = 'misto';
    this.perguntaAtual = 0;
    this.pontuacao = 0;
    this.xpTotal = 0;
    this.respondido = false;
    this.combo = 0;

    let pool = [];
    const desbloqueados = App.estado.progresso ? App.estado.progresso.templos_desbloqueados : [1];
    
    desbloqueados.forEach(temploNum => {
      let tPool = App.estado.quizData.filter(q => q.templo === temploNum);
      if (tPool.length === 0) tPool = this._gerarPerguntas(temploNum);
      pool = pool.concat(tPool);
    });

    this.perguntas = this._embaralhar(pool).slice(0, 10);

    if (this.perguntas.length === 0) {
      App.notificar('notif_quiz_sem_perguntas_todos', 'alerta');
      return;
    }

    const container = document.getElementById('quiz-container');
    const resultado = document.getElementById('quiz-resultado');
    const seletor = document.getElementById('quiz-templo-selector');
    if (container) container.style.display = 'block';
    if (resultado) resultado.style.display = 'none';
    if (seletor) seletor.style.display = 'none';

    this.mostrarPergunta();
  },

  // ── Generate vocab questions if no JSON quiz data ──────────
  _gerarPerguntas(temploNum) {
    const data = App.estado.templosData[temploNum];
    if (!data || !data.palavras || data.palavras.length < 4) return [];

    const palavras = data.palavras;
    const perguntas = [];

    palavras.forEach(p => {
      // Build 3 wrong alternatives from other words in the same temple
      const outras = palavras.filter(o => o.id !== p.id);
      const erradas = this._embaralhar(outras).slice(0, 3).map(o => o.portugues);
      const alternativas = this._embaralhar([p.portugues, ...erradas]);

      const termoStr = p.ingles;
      perguntas.push({
        id: `gen_${p.id}`,
        templo: temploNum,
        tipo: 'vocabulario',
        nivel: data.nivel || 'A1',
        ingles: termoStr,
        pergunta: I18n.t('quiz_what_does_mean').replace('{w}', termoStr),
        resposta_correta: p.portugues,
        alternativas: alternativas,
        explicacao: p.exemplo
          ? I18n.t('quiz_means_example').replace('{w}', termoStr).replace('{t}', p.portugues).replace('{e}', p.exemplo)
          : I18n.t('quiz_means_simple').replace('{w}', termoStr).replace('{t}', p.portugues),
        xp_recompensa: 20
      });
    });

    return perguntas;
  },

  // ── Display current question ───────────────────────────────
  mostrarPergunta() {
    if (this.perguntaAtual >= this.perguntas.length) {
      this.mostrarResultado();
      return;
    }

    const p = this.perguntas[this.perguntaAtual];
    this.respondido = false;
    this._indiceAtual = this.perguntaAtual;
    this._atualizarCombo();

    // Update progress bar
    const total = this.perguntas.length;
    const pct = Math.round(((this.perguntaAtual) / total) * 100);
    const barFill = document.getElementById('quiz-barra-fill');
    const numLabel = document.getElementById('quiz-num-pergunta');
    if (barFill) barFill.style.width = Math.max(5, pct) + '%';
    if (numLabel) numLabel.textContent = I18n.t('quiz_pergunta_de').replace('{a}', this.perguntaAtual + 1).replace('{b}', total);

    this._sincronizarBarraCompacta();

    // Question type badge
    const tipoBadge = document.getElementById('quiz-tipo');
    const rawTipo = (p.tipo || 'vocabulario').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (tipoBadge) tipoBadge.textContent = I18n.t('quiz_tipo_' + rawTipo) || p.tipo || I18n.t('quiz_tipo_vocabulario');

    // Question text
    const perguntaEl = document.getElementById('quiz-pergunta');
    if (perguntaEl) {
      perguntaEl.textContent = p.pergunta;
      const tLang = p.ingles || (p.tipo === 'vocabulario' ? p.pergunta.match(/"([^"]+)"/)?.[1] : null) || p.resposta_correta;
      if (tLang) perguntaEl.dataset.ingles = tLang;
      else delete perguntaEl.dataset.ingles;
    }

    const btnOuvir = document.getElementById('btn-ouvir-quiz');
    if (btnOuvir) {
      if (p.tipo === 'listening' || p.tipo === 'vocabulario') {
        btnOuvir.style.display = 'flex';
        if (p.tipo === 'listening') {
          const tLang = p.ingles || p.resposta_correta;
          if (tLang) setTimeout(() => { if (typeof App !== 'undefined' && App.pronunciar) App.pronunciar(tLang); }, 400);
        }
      } else {
        btnOuvir.style.display = 'none';
      }
    }

    // Hide explanation
    const explicacaoContainer = document.getElementById('explicacao-container');
    if (explicacaoContainer) explicacaoContainer.style.display = 'none';

    // Render options with accessibility
    const grid = document.getElementById('opcoes-grid');
    if (!grid) return;
    grid.innerHTML = '';
    grid.setAttribute('role', 'radiogroup');
    grid.setAttribute('aria-label', 'Answer options');

    // Shuffle alternatives for display
    const alternativas = this._embaralhar([...(p.alternativas || [])]);
    alternativas.forEach((alt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'opcao-btn';
      btn.textContent = alt;
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', 'false');
      btn.setAttribute('tabindex', '0');
      btn.dataset.alt = alt;
      btn.onclick = () => this.checarResposta(alt);
      btn.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.checarResposta(alt); } };
      grid.appendChild(btn);
    });

    // QW: Timer bar (visual only, 30s countdown)
    const timerBar = document.getElementById('quiz-timer-bar');
    if (timerBar) {
      timerBar.style.display = 'block';
      timerBar.style.transition = 'none';
      timerBar.style.width = '100%';
      // Force reflow
      void timerBar.offsetWidth;
      timerBar.style.transition = 'width 30s linear';
      timerBar.style.width = '0%';
    }
  },

  // ── Check the selected answer ─────────────────────────────
  checarResposta(escolha) {
    if (this.respondido) return;
    this.respondido = true;

    const p = this.perguntas[this.perguntaAtual];
    const correto = escolha === p.resposta_correta;

    // Mark all buttons with accessibility
    const grid = document.getElementById('opcoes-grid');
    if (grid) {
      const correta = (p.resposta_correta || '').trim();
      const escolhida = (escolha || '').trim();

      grid.querySelectorAll('.opcao-btn').forEach(btn => {
        btn.disabled = true;
        const btnText = (btn.dataset.alt || btn.textContent || '').trim();
        const ehCorreta = btnText === correta;
        const foiEscolhida = btnText === escolhida;

        btn.setAttribute('aria-checked', ehCorreta ? 'true' : 'false');
        if (ehCorreta) {
          btn.classList.add('correta');
        } else if (foiEscolhida && !correto) {
          btn.classList.add('errada');
        } else {
          // Zero-scroll in-place transition
          btn.classList.add('opcao-recolhida');
        }
      });
    }

    if (correto) {
      this.pontuacao++;
      this.combo++;
      // XP multiplier: combo 1-2 = ×1, combo 3-4 = ×2, combo 5+ = ×3
      const mult = this.combo >= 5 ? 3 : this.combo >= 3 ? 2 : 1;
      const xpBase = p.xp_recompensa || 20;
      this.xpTotal += xpBase * mult;
      if (typeof SomFeedback !== 'undefined') SomFeedback.correto();
      // Remove da fila SRS se acertou durante revisão
      if (this.temploAtual === 'revisao') {
        try {
          const fila = JSON.parse(localStorage.getItem('en_quiz_erros') || '[]');
          localStorage.setItem('en_quiz_erros', JSON.stringify(fila.filter(e => e.id !== p.id)));
        } catch (_) {}
      }
    } else {
      this.combo = 0;
      if (typeof SomFeedback !== 'undefined') SomFeedback.errado();
      // M-5: Salvar erro para revisão futura (SRS)
      this._salvarErro(p);
    }
    this._atualizarCombo();

    // Show explanation with improved feedback
    const explicacaoContainer = document.getElementById('explicacao-container');
    const explicacaoEl = document.getElementById('quiz-explicacao');
    if (explicacaoContainer) explicacaoContainer.style.display = 'block';
    if (explicacaoEl) {
      let explicacao = p.explicacao || '';
      if (!explicacao) {
        if (correto) {
          explicacao = I18n.t('quiz_correto') + '!';
        } else {
          explicacao = `${I18n.t('quiz_resposta_correta_era')} "${p.resposta_correta}"`;
        }
      }
      // Add combo info
      if (correto && this.combo >= 3) {
        explicacao += ' ' + I18n.t('quiz_combo_fire').replace('{n}', this.combo);
      }
      // M-5: Indicar que erro será revisado
      if (!correto) {
        explicacao += ' ' + I18n.t('quiz_review_later');
      }
      explicacaoEl.textContent = explicacao;
    }

    // Auto-advance after delay (shorter if correct)
    // Store ref so proximaPergunta() can cancel it if user clicks Continuar first
    const delay = correto ? 1500 : 2500;
    if (this._autoAdvanceTimer) {
      clearTimeout(this._autoAdvanceTimer);
      this._autoAdvanceTimer = null;
    }
    const timerBar = document.getElementById('quiz-timer-bar');
    if (timerBar) {
      timerBar.style.transition = "none";
      timerBar.style.width = "100%";
      void timerBar.offsetWidth;
      timerBar.style.transition = "width " + delay + "ms linear";
      timerBar.style.width = "0%";
      timerBar.dataset.start = Date.now();
    }
    this._autoAdvanceTimer = setTimeout(() => {
      this._autoAdvanceTimer = null;
      this.proximaPergunta();
    }, delay);
  },

  // ── Advance to next question ───────────────────────────────
  proximaPergunta() {
    if (this._autoAdvanceTimer) {
      clearTimeout(this._autoAdvanceTimer);
      this._autoAdvanceTimer = null;
    }
    const timerBar = document.getElementById('quiz-timer-bar');
    if (timerBar) {
      timerBar.style.transition = 'none';
      timerBar.style.width = '100%';
    }
    this.perguntaAtual++;
    if (this.perguntaAtual >= this.perguntas.length) {
      this.mostrarResultado();
    } else {
      this._salvarSessao(); // persiste progresso parcial
      this.mostrarPergunta();
    }
  },

  // ── Show final result screen ───────────────────────────────
  // ── Persiste / restaura sessão parcial ────────────────────
  _salvarSessao() {
    try {
      sessionStorage.setItem('en_quiz_sessao', JSON.stringify({
        temploAtual:   this.temploAtual,
        perguntas:     this.perguntas,
        perguntaAtual: this.perguntaAtual,
        pontuacao:     this.pontuacao,
        xpTotal:       this.xpTotal,
        combo:         this.combo,
      }));
    } catch(_) {}
  },

  _carregarSessao() {
    try {
      const raw = sessionStorage.getItem('en_quiz_sessao');
      return raw ? JSON.parse(raw) : null;
    } catch(_) { return null; }
  },

  _limparSessao() {
    try { sessionStorage.removeItem('en_quiz_sessao'); } catch(_) {}
  },

  mostrarResultado(somenteUI = false) {
    if (!somenteUI) {
      this._limparSessao(); // sessão concluída — limpa
    }
    const container = document.getElementById('quiz-container');
    const resultado = document.getElementById('quiz-resultado');
    const bar = document.getElementById('quiz-compact-bar');
    if (bar) bar.style.display = 'none';
    if (container) container.style.display = 'none';

    // Log quiz completion to heatmap diary (apenas na primeira chamada real)
    if (!somenteUI && typeof Calor !== 'undefined') Calor.registrar(this.perguntas.length || 1);
    if (!resultado) return;
    resultado.style.display = 'block';

    const total = this.perguntas.length;
    const pct = total > 0 ? Math.round((this.pontuacao / total) * 100) : 0;

    // Choose message based on score
    let msg = '';
    if (pct >= 90) msg = I18n.t('quiz_perfeito');
    else if (pct >= 70) msg = I18n.t('quiz_muito_bom');
    else if (pct >= 50) msg = I18n.t('quiz_bom_resultado');
    else msg = I18n.t('quiz_nao_desista');

    const scoreEl = document.getElementById('resultado-score');
    const xpEl = document.getElementById('resultado-xp');
    const msgEl = document.getElementById('resultado-msg');
    if (scoreEl) scoreEl.textContent = `${this.pontuacao}/${total}`;
    if (xpEl) xpEl.textContent = I18n.t('quiz_xp_ganhos').replace('{n}', this.xpTotal);
    if (msgEl) msgEl.textContent = msg;

    let acoesContainer = document.getElementById('quiz-resumo-acoes');
    if (!acoesContainer && resultado) {
      acoesContainer = document.createElement('div');
      acoesContainer.id = 'quiz-resumo-acoes';
      acoesContainer.className = 'resumo-acoes';
      acoesContainer.style.cssText = 'display: flex; gap: 0.5rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;';
      resultado.appendChild(acoesContainer);
    }

    if (acoesContainer) {
      const errosPendentes = this._getErrosPendentes ? this._getErrosPendentes() : [];
      const reviewBtn = errosPendentes.length > 0 
        ? `<button class="btn-secondario" style="background:var(--cor-fogo);color:white;border-color:var(--cor-fogo);" onclick="Quiz.iniciarRevisao(Quiz._getErrosPendentes())">${I18n.t('quiz_review_mistakes').replace('{n}', errosPendentes.length)}</button>` 
        : '';

      acoesContainer.innerHTML = `
        <button class="btn-primario" onclick="Quiz.voltarSelector()" data-i18n="quiz_voltar">${I18n.t('quiz_voltar') || '← Voltar ao Seletor'}</button>
        ${reviewBtn}
        <button class="btn-secondario" onclick="Quiz._proximoTemploDisponivel()" data-i18n="fc_resumo_proximo_templo">${I18n.t('fc_resumo_proximo_templo') || 'Próximo Templo'}</button>
        <button class="btn-secondario" onclick="App.navegar('home')" data-i18n="fc_resumo_inicio">${I18n.t('fc_resumo_inicio') || 'Início'}</button>
      `;
    }

    // Give XP e streak apenas na primeira chamada (não em re-renders por i18n)
    if (!somenteUI) {
      if (this.xpTotal > 0) Progressao.ganhar(this.xpTotal);
      this._atualizarStreak();
    }

    // Conquistas e histórico apenas na primeira chamada (não em re-renders por i18n)
    if (!somenteUI) {
      if (typeof Conquistas !== 'undefined') {
        const p = App.estado.progresso;
        if (p) {
          if (pct >= 80) p.quiz_consecutivos_80 = (p.quiz_consecutivos_80 || 0) + 1;
          else p.quiz_consecutivos_80 = 0;
          App.salvarProgresso();
        }
        if (pct === 100) Conquistas.ganharQuizPerfetto();
        Conquistas.verificar();
      }

      try {
        const historico = JSON.parse(localStorage.getItem('en_quiz_history') || localStorage.getItem('en_quiz_historico') || '[]');
        historico.unshift({
          templo: this.temploAtual,
          pontuacao: pct,
          xp_ganho: this.xpTotal,
          acertos: this.pontuacao,
          total: total,
          data: Date.now()
        });
        const histJson = JSON.stringify(historico.slice(0, 50));
        localStorage.setItem('en_quiz_history', histJson);
        localStorage.setItem('en_quiz_historico', histJson);
      } catch (e) { /* ignore */ }
    }
  },

  // ── Return to temple selector ──────────────────────────────
  voltarSelector() {
    const resultado = document.getElementById('quiz-resultado');
    const seletor = document.getElementById('quiz-templo-selector');
    if (resultado) resultado.style.display = 'none';
    if (seletor) seletor.style.display = 'grid';
    this._sincronizarBarraCompacta();
    this.renderizarSeletor();
  },

  // ── Render the temple selector buttons (Italian App Standard) ──
  renderizarSeletor() {
    const seletor = document.getElementById('quiz-templo-selector');
    if (!seletor) return;
    seletor.innerHTML = '';
    seletor.style.display = 'grid';

    // Barra de categorias (Tabs inteligentes padronizadas com o App Italiano)
    const tabs = [
      { id: 'templos', label: '🏛️ Templos' },
      { id: 'morfologia', label: '🔤 Morfologia' },
      { id: 'listening', label: '🎧 Listening' },
      { id: 'gramatica', label: '📚 Gramática' },
      { id: 'verbi', label: '⏱️ Conjugação' },
      { id: 'phrasal', label: '🧩 Phrasal Verbs' }
    ];

    const tabNav = document.createElement('div');
    tabNav.className = 'quiz-tabs-nav';

    tabs.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const ativa = this.abaSeletor === t.id;
      btn.className = `quiz-tab-pill${ativa ? ' ativo' : ''}`;
      btn.textContent = t.label;
      btn.onclick = () => {
        this.abaSeletor = t.id;
        this.renderizarSeletor();
      };
      tabNav.appendChild(btn);
    });
    seletor.appendChild(tabNav);

    // Usa a lista de templos carregados (1-76), ordenados sequencialmente
    const todosTemplos = Object.keys(App.estado?.templosData || {})
      .map(Number).sort((a, b) => a - b);

    if (todosTemplos.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'grid-column:1/-1;text-align:center;padding:2rem;color:#aaa;';
      empty.innerHTML = `<div style="font-size:2.5rem;margin-bottom:0.5rem">📭</div><div style="font-weight:600;margin-bottom:0.3rem">${I18n.t('quiz_empty_no_temples')}</div><div style="font-size:0.85rem">${I18n.t('quiz_empty_no_temples_d')}</div>`;
      seletor.appendChild(empty);
      return;
    }

    // Calcular histórico por templo para estatísticas de acerto
    let historico = [];
    try { historico = JSON.parse(localStorage.getItem('en_quiz_history') || localStorage.getItem('en_quiz_historico') || '[]'); } catch (_) {}

    const temploStats = {};
    historico.forEach(h => {
      const key = String(h.templo);
      if (!temploStats[key]) temploStats[key] = { total: 0, acertos: 0, totalPerguntas: 0, lastScore: 0 };
      temploStats[key].total++;
      temploStats[key].acertos += h.acertos || 0;
      temploStats[key].totalPerguntas += h.total || 10;
      temploStats[key].lastScore = h.pontuacao || 0;
    });

    // ── Aba Templos ───────────────────────────────────────
    if (this.abaSeletor === 'templos') {
      if (Progressao.temploDesbloqueado(1)) {
        const btnMisto = document.createElement('button');
        btnMisto.className = 'quiz-templo-btn';
        btnMisto.innerHTML = '🌍 Quiz Geral<br><small>Todos os templos mistos</small>';
        btnMisto.style.gridColumn = '1 / -1';
        btnMisto.style.background = 'linear-gradient(135deg, #2C3E50, #3498DB)';
        btnMisto.style.color = 'white';
        btnMisto.onclick = () => this.iniciarMisto();
        seletor.appendChild(btnMisto);
      }

      todosTemplos.forEach(i => {
        const desbloqueado = Progressao.temploDesbloqueado(i);
        const data = App.estado.templosData[i];
        const nome = (data && data.nome) || `Temple ${i}`;
        const nivel = data ? data.nivel : '—';
        const stats = temploStats[String(i)];

        const btn = document.createElement('button');
        btn.className = `quiz-templo-btn${desbloqueado ? '' : ' bloqueado'}`;

        let statusHtml = '';
        if (desbloqueado && stats) {
          const avgPct = stats.totalPerguntas > 0 ? Math.round((stats.acertos / stats.totalPerguntas) * 100) : 0;
          const stars = avgPct >= 90 ? '⭐⭐⭐' : avgPct >= 70 ? '⭐⭐' : avgPct >= 50 ? '⭐' : '☆';
          statusHtml = `<div style="font-size:0.7rem;color:#27AE60;margin-top:0.2rem">${stars} ${avgPct}% avg</div>`;
        }

        btn.innerHTML = desbloqueado
          ? `🏛️ ${i}. ${nome}<br><small>${nivel}</small>${statusHtml}`
          : `🔒 ${i}. ${nome}<br><small>Nível ${Progressao.TEMPLO_NIVEL[i] || i}</small>`;

        if (desbloqueado) btn.onclick = () => this.iniciar(i);
        else btn.disabled = true;
        seletor.appendChild(btn);
      });
      return;
    }

    // ── Aba Morfologia ────────────────────────────────────
    if (this.abaSeletor === 'morfologia') {
      todosTemplos.forEach(i => {
        const desbloqueado = Progressao.temploDesbloqueado(i);
        const data = App.estado.templosData[i];
        const nome = (data && data.nome) || `Temple ${i}`;
        const temMorf = data && data.palavras && data.palavras.some(p => p.genero || p.plural);

        const btn = document.createElement('button');
        btn.className = `quiz-templo-btn quiz-morf-btn${desbloqueado && temMorf ? '' : ' bloqueado'}`;
        btn.innerHTML = `🔤 ${i}. ${nome}`;

        if (desbloqueado && temMorf) btn.onclick = () => this.iniciarMorfologia(i);
        else btn.disabled = true;
        seletor.appendChild(btn);
      });
      return;
    }

    // ── Aba Listening ─────────────────────────────────────
    if (this.abaSeletor === 'listening') {
      todosTemplos.forEach(i => {
        const desbloqueado = Progressao.temploDesbloqueado(i);
        const data = App.estado.templosData[i];
        const nome = (data && data.nome) || `Temple ${i}`;
        const temVocab = data && data.palavras && data.palavras.length >= 4;

        const btn = document.createElement('button');
        btn.className = `quiz-templo-btn quiz-list-btn${desbloqueado && temVocab ? '' : ' bloqueado'}`;
        btn.innerHTML = `🎧 ${i}. ${nome}`;

        if (desbloqueado && temVocab) btn.onclick = () => this.iniciarListening(i);
        else btn.disabled = true;
        seletor.appendChild(btn);
      });
      return;
    }

    // ── Aba Gramática ─────────────────────────────────────
    if (this.abaSeletor === 'gramatica') {
      const gramData = App.estado.grammarData || { moduli: [] };
      if (!gramData.moduli || gramData.moduli.length === 0) {
        const msg = document.createElement('p');
        msg.style.cssText = 'grid-column: 1 / -1; text-align:center;color:var(--cor-inchiostro-claro,#5A4535);font-weight:500;font-style:italic;padding:0.5rem;font-size:0.85rem;';
        msg.textContent = I18n.t('quiz_gram_nao_carregado') || 'Nenhum módulo de gramática carregado.';
        seletor.appendChild(msg);
      } else {
        gramData.moduli.forEach(mod => {
          const btn = document.createElement('button');
          btn.className = 'quiz-templo-btn quiz-gram-btn';
          const nivelId = mod.id || mod.livello || 'A1';
          btn.innerHTML = `📚 Nível ${nivelId}<br><small>${mod.nome || ''}</small>`;
          btn.onclick = () => this.iniciarGramatica(nivelId);
          seletor.appendChild(btn);
        });
      }
      return;
    }

    // ── Aba Conjugação ────────────────────────────────────
    if (this.abaSeletor === 'verbi') {
      const verbosDisponiveis = (App.estado.conjugacoesData || []);
      if (verbosDisponiveis.length === 0) {
        const msg = document.createElement('p');
        msg.style.cssText = 'grid-column: 1 / -1; text-align:center;color:var(--cor-inchiostro-claro,#5A4535);font-weight:500;font-style:italic;padding:0.5rem;font-size:0.85rem;';
        msg.textContent = I18n.t('quiz_verbi_nao_carregado') || 'Nenhum verbo carregado no momento.';
        seletor.appendChild(msg);
      } else {
        const tempos = ['Present', 'Past Simple', 'Future'];
        tempos.forEach(tempo => {
          const btn = document.createElement('button');
          btn.className = 'quiz-templo-btn quiz-verbi-btn';
          const emoji = tempo === 'Present' ? '⏱️' : tempo === 'Past Simple' ? '⏪' : '⏩';
          const labelStr = tempo === 'Present' ? (I18n.t('quiz_tense_present') || 'Present') : tempo === 'Past Simple' ? (I18n.t('quiz_tense_past') || 'Past Simple') : (I18n.t('quiz_tense_future') || 'Future');
          btn.innerHTML = `${emoji} ${labelStr}`;
          btn.onclick = () => this.iniciarConjugacao(tempo);
          seletor.appendChild(btn);
        });
      }

      // Card Phrasal Verbs integrado
      const btnPhrasal = document.createElement('button');
      btnPhrasal.className = 'quiz-templo-btn quiz-verbi-btn';
      btnPhrasal.style.gridColumn = '1 / -1';
      btnPhrasal.style.background = 'linear-gradient(135deg, #003E8A, #002855)';
      btnPhrasal.style.color = '#fff';
      btnPhrasal.innerHTML = '🧩 Phrasal Verbs<br><small>Partículas & Pronomes</small>';
      btnPhrasal.onclick = () => this.iniciarPhrasal();
      seletor.appendChild(btnPhrasal);
      return;
    }

    // ── Aba Phrasal Verbs ─────────────────────────────────
    if (this.abaSeletor === 'phrasal') {
      const btnPhrasal = document.createElement('button');
      btnPhrasal.className = 'quiz-templo-btn';
      btnPhrasal.style.gridColumn = '1 / -1';
      btnPhrasal.style.background = 'linear-gradient(135deg, #003E8A, #002855)';
      btnPhrasal.style.color = '#fff';
      btnPhrasal.style.fontWeight = '700';
      btnPhrasal.innerHTML = '🧩 Quiz Especial: Phrasal Verbs<br><small>Partículas, Pronomes & Contexto</small>';
      btnPhrasal.onclick = () => this.iniciarPhrasal();
      seletor.appendChild(btnPhrasal);
      return;
    }
  },

  // ── M-6: Quiz Streak calculator ───────────────────────────
  _getQuizStreak() {
    try {
      const streak = parseInt(localStorage.getItem('en_quiz_streak') || '0');
      const lastDate = localStorage.getItem('en_quiz_streak_date');
      if (!lastDate) return 0;

      const hoje = new Date().toISOString().slice(0, 10);
      const ontem = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

      if (lastDate === hoje || lastDate === ontem) return streak;
      return 0; // quebrou o streak
    } catch (_) { return 0; }
  },

  // ── M-6: Incrementa streak após quiz ──────────────────────
  _atualizarStreak() {
    try {
      const hoje = new Date().toISOString().slice(0, 10);
      const lastDate = localStorage.getItem('en_quiz_streak_date');
      const ontem = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

      let streak = parseInt(localStorage.getItem('en_quiz_streak') || '0');
      if (lastDate === hoje) return; // já fez hoje
      if (lastDate === ontem) streak++;
      else streak = 1; // novo streak

      localStorage.setItem('en_quiz_streak', String(streak));
      localStorage.setItem('en_quiz_streak_date', hoje);

      // Conquista de streak
      if (streak === 7 && typeof Conquistas !== 'undefined') {
        App.notificar(I18n.t('quiz_streak_achieved'), 'sucesso');
      }
    } catch (_) {}
  },

  // ── M-5: Get pending review items (SRS simples) ───────────
  _getErrosPendentes() {
    try {
      const fila = JSON.parse(localStorage.getItem('en_quiz_erros') || '[]');
      const agora = Date.now();
      return fila.filter(e => e.proximaRevisao <= agora);
    } catch (_) { return []; }
  },

  // ── M-5: Salva erro para revisão futura ────────────────────
  _salvarErro(pergunta) {
    try {
      const fila = JSON.parse(localStorage.getItem("en_quiz_erros") || "[]");
      // Conta tentativas ANTES de remover o duplicado
      const existing = fila.find(e => e.id === pergunta.id);
      const tentativas = existing ? (existing.tentativas || 1) : 0;
      const idx = fila.findIndex(e => e.id === pergunta.id);
      if (idx >= 0) fila.splice(idx, 1);

      // Usa FSRS para calcular intervalo após erro (rating=1 = Again)
      let intervalo = 60000; // fallback 1min
      if (typeof window.FSRS !== "undefined") {
        // Converte para formato FSRS card
        const cardFSRS = {
          difficulty: existing?.difficulty || 5,
          stability: existing?.stability || 0,
          lapses: existing?.lapses || 0,
          reps: existing?.reps || 0,
          state: existing?.state || "new",
          lastReview: existing?.lastReview || null
        };
        const reviewed = window.FSRS.review(cardFSRS, 1); // rating=1 = Again
        intervalo = window.FSRS.nextInterval(reviewed.stability);
        // Salva dados FSRS no item para próximas revisões
        Object.assign(pergunta, {
          difficulty: reviewed.difficulty,
          stability: reviewed.stability,
          lapses: reviewed.lapses,
          reps: reviewed.reps,
          state: reviewed.state,
          lastReview: reviewed.lastReview
        });
      } else {
        // Fallback: intervalos fixos
        const intervalos = [60000, 600000, 3600000, 86400000, 259200000];
        intervalo = intervalos[Math.min(tentativas, intervalos.length - 1)];
      }

      fila.push({
        ...pergunta,
        proximaRevisao: Date.now() + intervalo,
        tentativas: tentativas + 1,
        ultimoErro: Date.now()
      });

      // Mantém máximo 100 itens
      localStorage.setItem("en_quiz_erros", JSON.stringify(fila.slice(-100)));
    } catch (_) {}
  },

  // ── M-5: Iniciar quiz de revisão de erros ──────────────────
  iniciarRevisao(erros) {
    this.temploAtual = 'revisao';
    this.perguntaAtual = 0;
    this.pontuacao = 0;
    this.xpTotal = 0;
    this.respondido = false;
    this.combo = 0;
    this.perguntas = this._embaralhar(erros).slice(0, 10);

    if (this.perguntas.length === 0) {
      App.notificar(I18n.t('quiz_no_items_review'), 'alerta');
      return;
    }

    const container = document.getElementById('quiz-container');
    const resultado = document.getElementById('quiz-resultado');
    const seletor = document.getElementById('quiz-templo-selector');
    if (container) container.style.display = 'block';
    if (resultado) resultado.style.display = 'none';
    if (seletor) seletor.style.display = 'none';

    App.notificar(I18n.t('quiz_reviewing_items').replace('{n}', this.perguntas.length), 'alerta');
    this.mostrarPergunta();
  },

  // ── Morphology quiz (gênero & plural) ────────────────────
  iniciarMorfologia(temploNum) {
    if (!Progressao.temploDesbloqueado(temploNum)) {
      App.notificar('notif_quiz_bloqueado', 'erro');
      return;
    }
    this.temploAtual   = temploNum;
    this.perguntaAtual = 0;
    this.pontuacao     = 0;
    this.xpTotal       = 0;
    this.respondido    = false;
    this.combo         = 0;

    this.perguntas = this._embaralhar(this._gerarMorfologia(temploNum)).slice(0, 10);
    if (this.perguntas.length === 0) {
      App.notificar('notif_quiz_morf_insuf', 'alerta');
      return;
    }
    const container = document.getElementById('quiz-container');
    const resultado = document.getElementById('quiz-resultado');
    const seletor   = document.getElementById('quiz-templo-selector');
    if (container) container.style.display = 'block';
    if (resultado) resultado.style.display = 'none';
    if (seletor)   seletor.style.display   = 'none';
    this.mostrarPergunta();
  },

  _gerarMorfologia(temploNum) {
    const data = App.estado.templosData[temploNum];
    if (!data || !data.palavras || data.palavras.length < 2) return [];
    const palavras = data.palavras;
    const perguntas = [];

    // Gender questions
    const comGenero = palavras.filter(p => p.genero === 'm' || p.genero === 'f');
    comGenero.forEach(p => {
      const termoStr = p.ingles;
      const corretoPT = p.genero === 'm' ? 'masculino' : 'feminino';
      const corretoIT = p.genero === 'm' ? I18n.t('quiz_morf_genero_masc') : I18n.t('quiz_morf_genero_fem');
      perguntas.push({
        id: `morf_g_${p.id}`, templo: temploNum, tipo: 'morfologia',
        nivel: data.nivel || 'A1',
        pergunta: I18n.t('quiz_morf_genero_pergunta').replace('{w}', termoStr),
        resposta_correta: corretoIT,
        alternativas: [I18n.t('quiz_morf_genero_masc'), I18n.t('quiz_morf_genero_fem')],
        explicacao: I18n.t('quiz_morf_genero_exp').replace('{w}', termoStr).replace('{g}', corretoIT) + (p.plural ? ` (plural: ${p.plural})` : '') + '.',
        xp_recompensa: 20
      });
    });

    // Plural questions — need at least 4 words with plural for wrong options
    const comPlural = palavras.filter(p => p.plural && p.plural !== p.ingles);
    const todoPlurais = comPlural.map(p => p.plural);
    if (todoPlurais.length >= 4) {
      comPlural.forEach(p => {
        const termoStr = p.ingles;
        const erradas = this._embaralhar(todoPlurais.filter(pl => pl !== p.plural)).slice(0, 3);
        perguntas.push({
          id: `morf_p_${p.id}`, templo: temploNum, tipo: 'morfologia',
          nivel: data.nivel || 'A1',
          pergunta: I18n.t('quiz_morf_plural_pergunta').replace('{w}', termoStr),
          resposta_correta: p.plural,
          alternativas: this._embaralhar([p.plural, ...erradas]),
          explicacao: I18n.t('quiz_morf_plural_exp').replace('{w}', termoStr).replace('{p}', p.plural),
          xp_recompensa: 20
        });
      });
    }

    return perguntas;
  },

  // ── Conjugação quiz ───────────────────────────────────────
  iniciarConjugacao(tempo) {
    this.temploAtual   = 0; // special: 0 = conjugação
    this.perguntaAtual = 0;
    this.pontuacao     = 0;
    this.xpTotal       = 0;
    this.respondido    = false;
    this.combo         = 0;

    this.perguntas = this._embaralhar(this._gerarConjugacao(tempo)).slice(0, 10);
    if (this.perguntas.length === 0) {
      App.notificar('notif_quiz_conj_insuf', 'alerta');
      return;
    }
    const container = document.getElementById('quiz-container');
    const resultado = document.getElementById('quiz-resultado');
    const seletor   = document.getElementById('quiz-templo-selector');
    if (container) container.style.display = 'block';
    if (resultado) resultado.style.display = 'none';
    if (seletor)   seletor.style.display   = 'none';
    this.mostrarPergunta();
  },

  _gerarConjugacao(tempo) {
    const verbos = App.estado.conjugacoesData || [];
    const perguntas = [];
    const pronomes = ['I','you','he/she/it','we','they'];

    // Collect all forms for this tense (for distractors)
    const todasFormas = [];
    verbos.forEach(v => {
      const t = v.tempos && v.tempos[tempo];
      if (t) pronomes.forEach(pr => { if (t[pr]) todasFormas.push(t[pr]); });
    });

    verbos.forEach(v => {
      const t = v.tempos && v.tempos[tempo];
      if (!t) return;

      pronomes.forEach(pr => {
        const correta = t[pr];
        if (!correta) return;

        // Use other forms of THIS verb as primary distractors, fill from all verbs
        const erradasVerbo = pronomes
          .filter(p => p !== pr && t[p] && t[p] !== correta)
          .map(p => t[p]);
        const erradasGlobal = todasFormas.filter(f => f !== correta);
        const pool = this._embaralhar([...new Set([...erradasVerbo, ...erradasGlobal])]);
        const erradas = pool.slice(0, 3);
        if (erradas.length < 3) return; // skip if not enough distractors

        const pronomeLabel = pr;
        perguntas.push({
          id: `conj_${v.infinitivo}_${tempo}_${pr}`,
          templo: 0,
          tipo: 'conjugação',
          nivel: 'A1',
          pergunta: `"${v.infinitivo}" (${v.traducao}) — ${pronomeLabel} — ${tempo}`,
          resposta_correta: correta,
          alternativas: this._embaralhar([correta, ...erradas]),
          explicacao: `${pronomeLabel} ${v.infinitivo} (${tempo}): "${correta}"`,
          xp_recompensa: 20
        });
      });
    });

    return perguntas;
  },

  // ── Listening Quiz ───────────────────────────────────────
  iniciarListening(temploNum) {
    if (!Progressao.temploDesbloqueado(temploNum)) return;
    this.temploAtual = temploNum;
    this.perguntaAtual = 0;
    this.pontuacao = 0;
    this.xpTotal = 0;
    this.respondido = false;
    this.combo = 0;

    this.perguntas = this._embaralhar(this._gerarListening(temploNum)).slice(0, 10);
    if (this.perguntas.length === 0) {
      App.notificar('notif_quiz_listen_insuf', 'alerta');
      return;
    }
    
    const cont1 = document.getElementById('quiz-container');
    const res1  = document.getElementById('quiz-resultado');
    const sel1  = document.getElementById('quiz-templo-selector');
    if (cont1) cont1.style.display = 'block';
    if (res1)  res1.style.display  = 'none';
    if (sel1)  sel1.style.display  = 'none';
    this.mostrarPergunta();
  },

  _gerarListening(temploNum) {
    const data = App.estado.templosData[temploNum];
    if (!data || !data.palavras || data.palavras.length < 4) return [];
    
    const palavras = data.palavras;
    const perguntas = [];

    palavras.forEach(p => {
      const termoStr = p.ingles;
      const outras = palavras.filter(o => o.id !== p.id);
      const erradas = this._embaralhar(outras).slice(0, 3).map(o => o.ingles);
      const alternativas = this._embaralhar([termoStr, ...erradas]);

      perguntas.push({
        id: `list_${p.id}`, templo: temploNum, tipo: 'listening',
        nivel: data.nivel || 'A1',
        ingles: termoStr,
        pergunta: I18n.t('quiz_what_was_said').replace('{p}', p.portugues),
        resposta_correta: termoStr,
        alternativas: alternativas,
        explicacao: I18n.t('quiz_was_said_exp').replace('{w}', termoStr),
        xp_recompensa: 25
      });
    });
    return perguntas;
  },

  // ── Gramática Quiz ───────────────────────────────────────
  iniciarGramatica(livello) {
    this.temploAtual = 'gramatica_' + livello;
    this.perguntaAtual = 0;
    this.pontuacao = 0;
    this.xpTotal = 0;
    this.respondido = false;
    this.combo = 0;

    this.perguntas = this._embaralhar(this._gerarGramatica(livello)).slice(0, 10);
    if (this.perguntas.length === 0) {
      App.notificar('notif_quiz_gram_insuf', 'alerta');
      return;
    }
    
    const cont2 = document.getElementById('quiz-container');
    const res2  = document.getElementById('quiz-resultado');
    const sel2  = document.getElementById('quiz-templo-selector');
    if (cont2) cont2.style.display = 'block';
    if (res2)  res2.style.display  = 'none';
    if (sel2)  sel2.style.display  = 'none';
    this.mostrarPergunta();
  },

  _gerarGramatica(livello) {
    const data = App.estado.grammarData || { moduli: [] };
    const modulo = data.moduli.find(m => m.id === livello);
    if (!modulo || !modulo.lezioni) return [];

    const perguntas = [];
    
    modulo.lezioni.forEach(lez => {
      (lez.exercicios || []).forEach(ex => {
        if (ex.tipo === 'escolha') {
          const correta = ex.opcoes[ex.resposta];
          perguntas.push({
            id: `gram_${livello}_${ex.pergunta.slice(0,32).replace(/\s+/g,'_')}`,
            tipo: 'gramatica',
            nivel: livello,
            pergunta: ex.pergunta,
            resposta_correta: correta,
            alternativas: this._embaralhar([...ex.opcoes]),
            explicacao: ex.explicacao || '',
            xp_recompensa: 30
          });
        }
      });
    });
    return perguntas;
  },

  // ── Update combo badge display ────────────────────────────
  _atualizarCombo() {
    const badge = document.getElementById('quiz-combo-badge');
    if (!badge) return;
    if (this.combo >= 3) {
      badge.textContent = `🔥 ×${this.combo} combo`;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  },

  // ── Utility: Fisher-Yates shuffle ─────────────────────────
  _embaralhar(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // ── Navegação ─────────────────────────────────────────────
  _proximoTemploDisponivel() {
    if (typeof this.temploAtual !== 'number') { App.navegar('home'); return; }
    const templos = Object.keys(App.estado.templosData || {});
    if (templos.length === 0) { App.navegar('home'); return; }
    const idx = templos.indexOf(String(this.temploAtual));
    const proximo = templos[idx + 1] ? parseInt(templos[idx + 1]) : null;
    if (proximo && App.estado.templosData[proximo] && Progressao.temploDesbloqueado(proximo)) {
      Quiz.iniciar(proximo);
    } else {
      App.navegar('home');
    }
  }
};

document.addEventListener('i18n:changed', () => {
  const seletor   = document.getElementById('quiz-templo-selector');
  const resultado = document.getElementById('quiz-resultado');
  const pergunta  = document.getElementById('quiz-pergunta');
  if (!seletor && !resultado && !pergunta) return;

  if (resultado && resultado.style.display !== 'none') {
    Quiz.mostrarResultado(true); // somenteUI — não regrava XP/streak/histórico
  } else if (document.getElementById('quiz-container')?.style.display !== 'none') {
    Quiz.mostrarPergunta();
  } else {
    Quiz.renderizarSeletor();
  }
});


window.Quiz = Quiz;

if (typeof document !== 'undefined') {
  const initQuiz = () => {
    const sec = document.getElementById('sec-quiz');
    const c = document.getElementById('quiz-templo-selector');
    if (sec && (sec.classList?.contains?.('active') || window?.location?.hash?.includes('quiz')) && c) {
      Quiz.renderizarSeletor();
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuiz);
  } else {
    initQuiz();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Quiz;
}
