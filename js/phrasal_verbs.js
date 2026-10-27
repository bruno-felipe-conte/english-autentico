/**
 * js/phrasal_verbs.js
 * English Autêntico - Phrasal Verbs Lab & Cross-modal Hub
 * Complete corpus of 415 English phrasal verbs with syntactic classifications,
 * pronoun rules, pronunciation, FSRS practice, and interactive mini-game.
 */

window.PhrasalVerbs = {
  dados: [],
  carregado: false,
  filtroBase: '',
  filtroTipo: 'todos',
  filtroParticula: 'todos',
  filtroNivel: 'todos',
  busca: '',
  
  // Mini-Game State
  miniGame: {
    ativo: false,
    pontuacao: 0,
    streak: 0,
    perguntaAtual: null,
    respondido: false
  },

  async init() {
    await this.carregarDados();
    this.renderizar();
  },

  async carregarDados() {
    if (this.carregado && this.dados && this.dados.length > 0) return this.dados;

    // Check if bootstrap already populated App.estado.phrasalVerbsData
    if (window.App && window.App.estado && window.App.estado.phrasalVerbsData && window.App.estado.phrasalVerbsData.length > 0) {
      this.dados = window.App.estado.phrasalVerbsData;
      this.carregado = true;
      return this.dados;
    }

    try {
      const res = await fetch('data/phrasal_verbs.json');
      if (res.ok) {
        const json = await res.json();
        this.dados = json.verbos || [];
        if (window.App && window.App.estado) {
          window.App.estado.phrasalVerbsData = this.dados;
        }
        this.carregado = true;
      }
    } catch (err) {
      console.error('Erro ao carregar data/phrasal_verbs.json:', err);
      this.dados = [];
    }
    return this.dados;
  },

  renderizar() {
    const sec = document.getElementById('sec-phrasal');
    if (!sec) return;

    if (!this.carregado || !this.dados || this.dados.length === 0) {
      sec.innerHTML = `
        <div class="phrasal-container">
          <div class="phrasal-empty-state">
            <div class="phrasal-empty-icon">⏳</div>
            <p>Carregando acervo de Phrasal Verbs...</p>
          </div>
        </div>
      `;
      this.carregarDados().then(() => this.renderizar());
      return;
    }

    // Filter list
    const filtrados = this._aplicarFiltros();

    // Unique base verbs with counts
    const baseVerbCounts = {};
    this.dados.forEach(v => {
      const b = v.verbo_base || 'outros';
      baseVerbCounts[b] = (baseVerbCounts[b] || 0) + 1;
    });
    const baseVerbsList = Object.keys(baseVerbCounts).sort((a, b) => baseVerbCounts[b] - baseVerbCounts[a]);

    // Unique particles
    const particulas = Array.from(new Set(this.dados.map(v => v.particula))).filter(Boolean).sort();

    // Stats
    const total = this.dados.length;
    const separaveis = this.dados.filter(v => v.tipo === 'separavel').length;
    const inseparaveis = this.dados.filter(v => v.tipo === 'inseparavel').length;
    const intransitivos = this.dados.filter(v => v.tipo === 'intransitivo').length;
    const tresPalavras = this.dados.filter(v => v.tipo === 'tres_palavras').length;

    sec.innerHTML = `
      <div class="phrasal-container">
        <!-- Hero Header -->
        <header class="phrasal-hero">
          <div class="phrasal-hero-top">
            <div class="phrasal-hero-title-group">
              <h2>🧩 Phrasal Verbs Lab</h2>
              <p class="phrasal-hero-subtitle">Domine os verbos frasais em inglês com regras de sintaxe, posição de pronomes e prática espaçada FSRS.</p>
            </div>
            <div class="phrasal-stats-bar">
              <span class="phrasal-stat-pill" title="Total no acervo">📚 <strong>${total}</strong> Verbos</span>
              <span class="phrasal-stat-pill" title="Separáveis: pronome no meio">↔️ <strong>${separaveis}</strong> Separáveis</span>
              <span class="phrasal-stat-pill" title="Inseparáveis: preposição grudada">🔒 <strong>${inseparaveis}</strong> Inseparáveis</span>
              <span class="phrasal-stat-pill" title="Intransitivos: sem objeto direto">⚡ <strong>${intransitivos}</strong> Intransitivos</span>
              <span class="phrasal-stat-pill" title="Três palavras (Phrasal-Prepositional)">🔗 <strong>${tresPalavras}</strong> 3 Palavras</span>
            </div>
          </div>
        </header>

        <!-- Pronoun in the Middle Educational Banner -->
        <div class="phrasal-pronoun-banner">
          <div class="phrasal-pronoun-text">
            <div class="phrasal-pronoun-title">
              💡 Regra de Ouro: O Pronome no Meio
            </div>
            <p class="phrasal-pronoun-desc">
              Em Phrasal Verbs Separáveis, se o objeto for um pronome (<em>it, them, him, her, me, us</em>), ele <strong>DEVE</strong> ficar entre o verbo e a partícula!
            </p>
          </div>
          <div class="phrasal-pronoun-examples">
            <span class="pronoun-badge-good" title="Correto: pronome no meio">✅ Turn <u>it</u> off</span>
            <span class="pronoun-badge-bad" title="Incorreto: pronome no fim">❌ Turn off it</span>
          </div>
          <button class="phrasal-minigame-btn" onclick="PhrasalVerbs.abrirMiniGame()">
            🎮 Treinar Regra
          </button>
        </div>

        <!-- Controls / Search / Filters -->
        <section class="phrasal-controls" aria-label="Filtros de pesquisa">
          <div class="phrasal-search-row">
            <div class="phrasal-search-box">
              <input type="text"
                id="phrasal-search-input"
                class="phrasal-search-input"
                placeholder="Buscar por verbo, partícula ou significado (ex: turn, off, desistir)..."
                value="${this._escapeHtml(this.busca)}"
                oninput="PhrasalVerbs.buscar(this.value)"
                aria-label="Buscar phrasal verb"
              />
              ${this.busca ? `<button class="phrasal-clear-btn" onclick="PhrasalVerbs.buscar('')" title="Limpar">✕</button>` : ''}
            </div>

            <div class="phrasal-filter-selects">
              <select class="phrasal-select" onchange="PhrasalVerbs.filtrarParticula(this.value)" aria-label="Filtrar por partícula">
                <option value="todos" ${this.filtroParticula === 'todos' ? 'selected' : ''}>Todas as partículas</option>
                ${particulas.map(p => `<option value="${p}" ${this.filtroParticula === p ? 'selected' : ''}>Partícula: ${p}</option>`).join('')}
              </select>

              <select class="phrasal-select" onchange="PhrasalVerbs.filtrarNivel(this.value)" aria-label="Filtrar por nível CEFR">
                <option value="todos" ${this.filtroNivel === 'todos' ? 'selected' : ''}>Todos os níveis CEFR</option>
                <option value="A1" ${this.filtroNivel === 'A1' ? 'selected' : ''}>Nível A1 (Iniciante)</option>
                <option value="A2" ${this.filtroNivel === 'A2' ? 'selected' : ''}>Nível A2 (Básico)</option>
                <option value="B1" ${this.filtroNivel === 'B1' ? 'selected' : ''}>Nível B1 (Intermediário)</option>
                <option value="B2" ${this.filtroNivel === 'B2' ? 'selected' : ''}>Nível B2 (Intermediário Superior)</option>
                <option value="C1" ${this.filtroNivel === 'C1' ? 'selected' : ''}>Nível C1 (Avançado)</option>
              </select>

              <button class="phrasal-action-btn" style="flex:none;padding:0.55rem 0.9rem;" onclick="PhrasalVerbs.praticarTodosNoFlashcard()" title="Praticar verbos filtrados nos Flashcards FSRS">
                🗂️ Praticar Filtro (${filtrados.length})
              </button>
            </div>
          </div>

          <!-- Syntax Type Pills -->
          <div class="phrasal-type-pills" role="tablist">
            <button class="phrasal-type-pill ${this.filtroTipo === 'todos' ? 'ativo' : ''}" onclick="PhrasalVerbs.filtrarTipo('todos')">
              Todos (${total})
            </button>
            <button class="phrasal-type-pill ${this.filtroTipo === 'separavel' ? 'ativo' : ''}" onclick="PhrasalVerbs.filtrarTipo('separavel')">
              ↔️ Tipo 2: Separáveis (${separaveis})
            </button>
            <button class="phrasal-type-pill ${this.filtroTipo === 'inseparavel' ? 'ativo' : ''}" onclick="PhrasalVerbs.filtrarTipo('inseparavel')">
              🔒 Tipo 3: Inseparáveis (${inseparaveis})
            </button>
            <button class="phrasal-type-pill ${this.filtroTipo === 'intransitivo' ? 'ativo' : ''}" onclick="PhrasalVerbs.filtrarTipo('intransitivo')">
              ⚡ Tipo 1: Intransitivos (${intransitivos})
            </button>
            <button class="phrasal-type-pill ${this.filtroTipo === 'tres_palavras' ? 'ativo' : ''}" onclick="PhrasalVerbs.filtrarTipo('tres_palavras')">
              🔗 Tipo 4: Três Palavras (${tresPalavras})
            </button>
          </div>

          <!-- Base Verbs Chips -->
          <div class="phrasal-base-verbs-bar" aria-label="Verbos base mais comuns">
            <button class="phrasal-base-chip ${!this.filtroBase ? 'ativo' : ''}" onclick="PhrasalVerbs.filtrarBase('')">
              Todos os verbos
            </button>
            ${baseVerbsList.map(base => `
              <button class="phrasal-base-chip ${this.filtroBase === base ? 'ativo' : ''}" onclick="PhrasalVerbs.filtrarBase('${base}')">
                ${base} <span class="phrasal-chip-badge">${baseVerbCounts[base]}</span>
              </button>
            `).join('')}
          </div>
        </section>

        <!-- Grid of Cards -->
        <main class="phrasal-grid" id="phrasal-cards-grid">
          ${filtrados.length === 0 ? `
            <div class="phrasal-empty-state">
              <div class="phrasal-empty-icon">🔍</div>
              <p>Nenhum phrasal verb encontrado para os filtros selecionados.</p>
              <button class="phrasal-action-btn" style="margin:1rem auto;display:inline-flex;" onclick="PhrasalVerbs.limparFiltros()">Limpar Filtros</button>
            </div>
          ` : filtrados.map(v => this._renderCard(v)).join('')}
        </main>
      </div>

      <!-- Modal Mini Game -->
      <div id="phrasal-modal-container"></div>
    `;
  },

  _renderCard(v) {
    const safeVerb = this._escapeHtml(v.phrasal_verb);
    const safePt = this._escapeHtml(v.significado_pt);
    const safeEn = this._escapeHtml(v.significado_en || '');
    const safeEx = this._escapeHtml(v.exemplo || '');
    const safeExPt = this._escapeHtml(v.exemplo_pt || '');
    const safeIpa = this._escapeHtml(v.audio_ipa || '');
    const safeRule = this._escapeHtml(v.regra_pronome || '');
    const tipo = v.tipo || 'separavel';

    const tipoLabels = {
      'separavel': '↔️ Separável (Tipo 2)',
      'inseparavel': '🔒 Inseparável (Tipo 3)',
      'intransitivo': '⚡ Intransitivo (Tipo 1)',
      'tres_palavras': '🔗 3 Palavras (Tipo 4)'
    };

    return `
      <article class="phrasal-card" id="card-${v.id}">
        <div>
          <div class="phrasal-card-header">
            <h3 class="phrasal-card-verb">
              ${safeVerb}
              <button class="phrasal-audio-btn" onclick="PhrasalVerbs.ouvir('${safeVerb.replace(/'/g, "\\'")}', event)" title="Ouvir pronúncia de ${safeVerb}" aria-label="Ouvir pronúncia">
                🔊
              </button>
            </h3>
            <div class="phrasal-card-meta">
              <span class="phrasal-type-tag ${tipo}">${tipoLabels[tipo] || tipo}</span>
              ${v.nivel ? `<span class="phrasal-cefr-badge">${v.nivel}</span>` : ''}
            </div>
          </div>

          ${safeIpa ? `<div class="phrasal-card-ipa">${safeIpa}</div>` : ''}

          <div class="phrasal-card-pt">${safePt}</div>
          ${safeEn ? `<div class="phrasal-card-en-def">${safeEn}</div>` : ''}

          ${safeEx ? `
            <div class="phrasal-card-example-box" onclick="PhrasalVerbs.ouvir('${safeEx.replace(/'/g, "\\'")}', event)" title="Clique para ouvir o exemplo" style="cursor:pointer;">
              <div class="phrasal-example-en">🗣️ "${safeEx}"</div>
              ${safeExPt ? `<div class="phrasal-example-pt">(${safeExPt})</div>` : ''}
            </div>
          ` : ''}

          ${safeRule ? `
            <div class="phrasal-card-rule">
              <strong>Regra:</strong> ${safeRule}
            </div>
          ` : ''}
        </div>

        <div class="phrasal-card-actions">
          <button class="phrasal-action-btn" onclick="PhrasalVerbs.ouvir('${safeVerb.replace(/'/g, "\\'")}', event)">
            🔊 Ouvir
          </button>
          <button class="phrasal-action-btn" id="btn-fc-${v.id}" onclick="PhrasalVerbs.praticarNoFlashcard('${v.id}')" title="Praticar nos Flashcards">
            🗂️ Flashcard
          </button>
        </div>
      </article>
    `;
  },

  _aplicarFiltros() {
    return this.dados.filter(v => {
      // Base verb filter
      if (this.filtroBase && v.verbo_base !== this.filtroBase) {
        return false;
      }
      // Type filter
      if (this.filtroTipo !== 'todos' && v.tipo !== this.filtroTipo) {
        return false;
      }
      // Particle filter
      if (this.filtroParticula !== 'todos' && v.particula !== this.filtroParticula) {
        return false;
      }
      // CEFR level filter
      if (this.filtroNivel !== 'todos' && v.nivel !== this.filtroNivel) {
        return false;
      }
      // Search term
      if (this.busca) {
        const termo = this.busca.toLowerCase().trim();
        const noVerbo = (v.phrasal_verb || '').toLowerCase().includes(termo);
        const naTraducao = (v.significado_pt || '').toLowerCase().includes(termo);
        const naDef = (v.significado_en || '').toLowerCase().includes(termo);
        const noExemplo = (v.exemplo || '').toLowerCase().includes(termo);
        if (!noVerbo && !naTraducao && !naDef && !noExemplo) {
          return false;
        }
      }
      return true;
    });
  },

  filtrarBase(verbo) {
    this.filtroBase = this.filtroBase === verbo ? '' : verbo;
    this.renderizar();
  },

  filtrarTipo(tipo) {
    this.filtroTipo = tipo;
    this.renderizar();
  },

  filtrarParticula(particula) {
    this.filtroParticula = particula;
    this.renderizar();
  },

  filtrarNivel(nivel) {
    this.filtroNivel = nivel;
    this.renderizar();
  },

  buscar(termo) {
    this.busca = termo;
    const grid = document.getElementById('phrasal-cards-grid');
    if (!grid) {
      this.renderizar();
      return;
    }
    const filtrados = this._aplicarFiltros();
    if (filtrados.length === 0) {
      grid.innerHTML = `
        <div class="phrasal-empty-state">
          <div class="phrasal-empty-icon">🔍</div>
          <p>Nenhum phrasal verb encontrado para "${this._escapeHtml(termo)}".</p>
          <button class="phrasal-action-btn" style="margin:1rem auto;display:inline-flex;" onclick="PhrasalVerbs.limparFiltros()">Limpar Filtros</button>
        </div>
      `;
    } else {
      grid.innerHTML = filtrados.map(v => this._renderCard(v)).join('');
    }
  },

  limparFiltros() {
    this.filtroBase = '';
    this.filtroTipo = 'todos';
    this.filtroParticula = 'todos';
    this.filtroNivel = 'todos';
    this.busca = '';
    this.renderizar();
  },

  ouvir(texto, e) {
    if (e && e.stopPropagation) e.stopPropagation();
    if (window.App && typeof window.App.pronunciar === 'function') {
      window.App.pronunciar(texto);
    } else if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = 'en-US';
      window.speechSynthesis.speak(u);
    }
  },

  praticarNoFlashcard(id) {
    const v = this.dados.find(item => item.id === id);
    if (!v) return;

    const itemFlashcard = {
      id: v.id,
      ingles: v.phrasal_verb,
      portugues: v.significado_pt,
      exemplo: v.exemplo + (v.exemplo_pt ? ` — ${v.exemplo_pt}` : ''),
      audio_ipa: v.audio_ipa,
      categoria: 'phrasal_verb',
      nivel: v.nivel || 'B1'
    };

    if (window.Flashcards && typeof window.Flashcards.iniciarComPalavrasCustom === 'function') {
      if (window.App && typeof window.App.navegar === 'function') {
        window.App.navegar('flashcards');
      }
      setTimeout(() => {
        window.Flashcards.iniciarComPalavrasCustom([itemFlashcard], `Phrasal Verb: ${v.phrasal_verb}`);
      }, 100);
    } else if (window.App && typeof window.App.toast === 'function') {
      window.App.toast(`Phrasal verb ${v.phrasal_verb} pronto para estudo!`, 'sucesso');
    }
  },

  praticarTodosNoFlashcard() {
    const filtrados = this._aplicarFiltros();
    if (filtrados.length === 0) {
      if (window.App && typeof window.App.toast === 'function') {
        window.App.toast('Nenhum verbo selecionado no momento!', 'alerta');
      }
      return;
    }

    const cartas = filtrados.slice(0, 30).map(v => ({
      id: v.id,
      ingles: v.phrasal_verb,
      portugues: v.significado_pt,
      exemplo: v.exemplo + (v.exemplo_pt ? ` — ${v.exemplo_pt}` : ''),
      audio_ipa: v.audio_ipa,
      categoria: 'phrasal_verb',
      nivel: v.nivel || 'B1'
    }));

    if (window.Flashcards && typeof window.Flashcards.iniciarComPalavrasCustom === 'function') {
      if (window.App && typeof window.App.navegar === 'function') {
        window.App.navegar('flashcards');
      }
      setTimeout(() => {
        const titulo = this.filtroBase ? `Phrasals: ${this.filtroBase.toUpperCase()}` : 'Phrasal Verbs Selecionados';
        window.Flashcards.iniciarComPalavrasCustom(cartas, titulo);
      }, 100);
    }
  },

  // ── Mini-Game "O Pronome no Meio" ──────────────────────────────
  abrirMiniGame() {
    this.miniGame.ativo = true;
    this.miniGame.pontuacao = 0;
    this.miniGame.streak = 0;
    this._proximaQuestaoMiniGame();
  },

  _proximaQuestaoMiniGame() {
    this.miniGame.respondido = false;

    // Filter separable verbs that have examples
    const separaveis = this.dados.filter(v => v.tipo === 'separavel' && v.verbo_base && v.particula);
    if (separaveis.length === 0) return;

    const v = separaveis[Math.floor(Math.random() * separaveis.length)];
    const base = v.verbo_base;
    const particula = v.particula;
    const pronome = ['it', 'them', 'him', 'her', 'me', 'us'][Math.floor(Math.random() * 6)];

    const formaCorreta = `${base} ${pronome} ${particula}`;
    const formaIncorreta = `${base} ${particula} ${pronome}`;

    const opcoes = [
      { texto: formaCorreta, correta: true, explicacao: `Correto! Em verbos separáveis com pronomes (${pronome}), o pronome fica SEMPRE no meio: "${formaCorreta}".` },
      { texto: formaIncorreta, correta: false, explicacao: `Incorreto! Você nunca deve dizer "${formaIncorreta}". O pronome deve ficar no meio: "${formaCorreta}".` }
    ];

    // Shuffle options
    opcoes.sort(() => Math.random() - 0.5);

    this.miniGame.perguntaAtual = {
      verbo: v.phrasal_verb,
      significado: v.significado_pt,
      pronome,
      opcoes
    };

    this._renderModalMiniGame();
  },

  _renderModalMiniGame() {
    const container = document.getElementById('phrasal-modal-container');
    if (!container) return;

    const q = this.miniGame.perguntaAtual;
    if (!q) return;

    container.innerHTML = `
      <div class="phrasal-modal-overlay" onclick="PhrasalVerbs.fecharMiniGame(event)">
        <div class="phrasal-modal-card" onclick="event.stopPropagation()">
          <div class="phrasal-modal-header">
            <h3 class="phrasal-modal-title">🎮 O Pronome no Meio</h3>
            <button class="phrasal-modal-close" onclick="PhrasalVerbs.fecharMiniGame()" title="Fechar">✕</button>
          </div>

          <div class="phrasal-game-prompt">
            Substitua o objeto pelo pronome <strong>"${q.pronome}"</strong> no phrasal verb:<br/>
            <span style="font-size:1.15rem;font-weight:700;color:var(--cor-primaria,#003E8A);display:inline-block;margin-top:0.35rem;">
              ${q.verbo}
            </span> 
            <span style="font-size:0.9rem;opacity:0.85;">(${q.significado})</span>
          </div>

          <div class="phrasal-game-options">
            ${q.opcoes.map((opt, idx) => `
              <button class="phrasal-game-option-btn" id="game-opt-${idx}" onclick="PhrasalVerbs.responderMiniGame(${idx})">
                ${opt.texto}
              </button>
            `).join('')}
          </div>

          <div class="phrasal-game-feedback" id="game-feedback"></div>

          <div class="phrasal-game-score">
            <span>Pontos: <strong>${this.miniGame.pontuacao}</strong></span>
            <span>Sequência 🔥: <strong>${this.miniGame.streak}</strong></span>
          </div>
        </div>
      </div>
    `;
  },

  responderMiniGame(idx) {
    if (this.miniGame.respondido) return;
    this.miniGame.respondido = true;

    const q = this.miniGame.perguntaAtual;
    const escolhida = q.opcoes[idx];
    const fb = document.getElementById('game-feedback');
    const btn = document.getElementById(`game-opt-${idx}`);

    if (escolhida.correta) {
      if (btn) btn.classList.add('correto');
      this.miniGame.pontuacao += 10;
      this.miniGame.streak += 1;
      if (window.App && typeof window.App.ganharXP === 'function') {
        window.App.ganharXP(3);
      }
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#dcfce7';
        fb.style.color = '#15803d';
        fb.innerHTML = `✅ ${escolhida.explicacao} <strong>+3 XP</strong>`;
      }
    } else {
      if (btn) btn.classList.add('errado');
      this.miniGame.streak = 0;
      if (fb) {
        fb.style.display = 'block';
        fb.style.background = '#fee2e2';
        fb.style.color = '#991b1b';
        fb.innerHTML = `❌ ${escolhida.explicacao}`;
      }
      // Highlight the correct one
      q.opcoes.forEach((opt, oIdx) => {
        if (opt.correta) {
          const cBtn = document.getElementById(`game-opt-${oIdx}`);
          if (cBtn) cBtn.classList.add('correto');
        }
      });
    }

    // Advance to next question after 2.2 seconds
    setTimeout(() => {
      if (this.miniGame.ativo) {
        this._proximaQuestaoMiniGame();
      }
    }, 2200);
  },

  fecharMiniGame(e) {
    if (e && e.target !== e.currentTarget && !e.target.classList.contains('phrasal-modal-close')) return;
    this.miniGame.ativo = false;
    const container = document.getElementById('phrasal-modal-container');
    if (container) container.innerHTML = '';
  },

  _escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};
