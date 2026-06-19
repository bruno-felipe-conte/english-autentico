// ============================================================
// core.js — Global App state, data loading, navigation, XP
// ============================================================

const App = {
  // ── State ──────────────────────────────────────────────────
  estado: {
    secaoAtiva: 'templi',
    templosData: {},       // { 1: { templo, nome, cidade, nivel, palavras: [] }, ... }
    quizData: [],          // flat array of all quiz questions
    vocabCache: [],        // flat array of all words (with templo_num attached)
    conjugacoesData: [],   // verb conjugation data
    progresso: null,       // persisted in localStorage
    flashcardData: {}      // persisted in localStorage
  },

  // Temple gradient palettes (index = temple number, 1-based)
  TEMPLO_CORES: [
    null,
    'linear-gradient(135deg, #003E8A, #002D65)',   // 1  New York      — Royal Navy Blue
    'linear-gradient(135deg, #E65100, #BF360C)',   // 2  Los Angeles   — Sunset Orange
    'linear-gradient(135deg, #37474F, #263238)',   // 3  Chicago        — Steel Blue-Grey
    'linear-gradient(135deg, #1B5E20, #2E7D32)',   // 4  Nashville      — Tennessee Green
    'linear-gradient(135deg, #0277BD, #01579B)',   // 5  San Francisco  — Bay Blue
    'linear-gradient(135deg, #4A148C, #6A1B9A)',   // 6  Boston         — Harvard Crimson-Purple
    'linear-gradient(135deg, #880E4F, #AD1457)',   // 7  New Orleans    — Jazz Magenta
    'linear-gradient(135deg, #004D40, #00695C)',   // 8  Atlanta        — Southern Teal
    'linear-gradient(135deg, #BF360C, #E64A19)',   // 9  Austin         — Texas Burnt Orange
    'linear-gradient(135deg, #1A237E, #283593)',   // 10 Washington DC  — Capitol Blue
    'linear-gradient(135deg, #2C3E50, #1A252F)',   // 11
    'linear-gradient(135deg, #1ABC9C, #148F77)',   // 12
    'linear-gradient(135deg, #E74C3C, #CB4335)',   // 13
    'linear-gradient(135deg, #3498DB, #2980B9)',   // 14
    'linear-gradient(135deg, #27AE60, #1E8449)',   // 15
    'linear-gradient(135deg, #F39C12, #D68910)',   // 16
    'linear-gradient(135deg, #8E44AD, #7D3C98)',   // 17
    'linear-gradient(135deg, #16A085, #148F77)',   // 18
    'linear-gradient(135deg, #D35400, #BA4A00)',   // 19
    'linear-gradient(135deg, #2980B9, #1A5276)',   // 20
    'linear-gradient(135deg, #1565C0, #0D47A1)',   // 21
    'linear-gradient(135deg, #27AE60, #196F3D)',   // 22
    'linear-gradient(135deg, #8E44AD, #512E6D)',   // 23
    'linear-gradient(135deg, #E67E22, #CA6F1E)',   // 24
    'linear-gradient(135deg, #2E86C1, #154360)',   // 25
    'linear-gradient(135deg, #6C3483, #512E6D)',   // 26
    'linear-gradient(135deg, #1A5276, #0E3460)',   // 27
    'linear-gradient(135deg, #117A65, #0B5345)',   // 28
    'linear-gradient(135deg, #9B59B6, #7D3C98)',   // 29
    'linear-gradient(135deg, #B7950B, #7D6608)',   // 30
    'linear-gradient(135deg, #1F618D, #154360)',   // 31
    'linear-gradient(135deg, #922B21, #7B241C)',   // 32
    'linear-gradient(135deg, #1E8449, #196F3D)',   // 33
    'linear-gradient(135deg, #CA6F1E, #A04000)',   // 34
    'linear-gradient(135deg, #148F77, #0E6655)',   // 35
    'linear-gradient(135deg, #2980B9, #1F618D)',   // 36
    'linear-gradient(135deg, #6D4C41, #4E342E)',   // 37
    'linear-gradient(135deg, #455A64, #263238)',   // 38
    'linear-gradient(135deg, #283593, #1A237E)',   // 39
    'linear-gradient(135deg, #00695C, #004D40)',   // 40
    'linear-gradient(135deg, #4A148C, #38006B)',   // 41
    'linear-gradient(135deg, #BF360C, #870000)',   // 42
    'linear-gradient(135deg, #827717, #5D4037)',   // 43
    'linear-gradient(135deg, #1B5E20, #003300)',   // 44
    'linear-gradient(135deg, #0D47A1, #002171)',   // 45
    'linear-gradient(135deg, #880E4F, #560027)',   // 46
    'linear-gradient(135deg, #E65100, #BF360C)',   // 47
    'linear-gradient(135deg, #37474F, #1C313A)',   // 48
    'linear-gradient(135deg, #4E342E, #3E2723)',   // 49
    'linear-gradient(135deg, #0D47A1, #002171)',   // 50
  ],

  // Temple names (index = templo number, 1-50 — thematic English titles)
  TEMPLO_NOMES: [
    null,
    'The Foundations',          // 1
    'The Everyday Journey',     // 2
    'The Road Ahead',           // 3
    'Taste & Tradition',        // 4
    'Clockwork',                // 5
    'Structure & Syntax',       // 6
    'Conversation Flow',        // 7
    'Cultural Depths',          // 8
    'Professional Edge',        // 9
    'Literary Arts',            // 10
    'History Unveiled',         // 11
    'Life\'s Rhythm',           // 12
    'Everyday Moments',         // 13
    'The City Life',            // 14
    'Family & Home',            // 15
    'Creative Expression',      // 16
    'Business World',           // 17
    'Health & Wellness',        // 18
    'Workplace Success',        // 19
    'Travel Essentials',        // 20
    'Academic Focus',           // 21
    'Personal Growth',          // 22
    'Social Connections',       // 23
    'Technology Talk',          // 24
    'Dining Culture',           // 25
    'Sports & Recreation',      // 26
    'Arts & Music',             // 27
    'Environmental Awareness',  // 28
    'Financial Literacy',       // 29
    'Legal Basics',             // 30
    'Political Discourse',      // 31
    'Cultural Heritage',        // 32
    'Media & News',             // 33
    'Philosophy & Ethics',      // 34
    'Scientific Thinking',      // 35
    'Historical Events',        // 36
    'Geography Fundamentals',   // 37
    'Mythology & Legends',     // 38
    'Religious Studies',        // 39
    'Language Learning',        // 40
    'Memory Techniques',        // 41
    'Public Speaking',          // 42
    'Interview Skills',         // 43
    'Networking Mastery',       // 44
    'Leadership Principles',    // 45
    'Teamwork Dynamics',        // 46
    'Conflict Resolution',      // 47
    'Cross-Cultural Communication', // 48
    'Advanced Grammar',         // 49
    'English Mastery',          // 50
  ],

  // English city overrides — British/American cities for all 50 temples (cyclical distribution)
  TEMPLO_CIDADES: [
    null,
      'London',            // 1
    'Manchester',         // 2
    'Edinburgh',          // 3
    'Cardiff',            // 4
    'Belfast',            // 5
    'Dublin',             // 6
    'Glasgow',            // 7
    'Bristol',            // 8
    'Newcastle',          // 9
    'Leeds',              // 10
    'Birmingham',         // 11
    'Liverpool',          // 12
    'Coventry',           // 13
    'Leicester',          // 14
    'Sheffield',          // 15
    'Norwich',            // 16
    'Reading',            // 17
    'Oxford',             // 18
    'Cambridge',          // 19
    'Southampton',        // 20
    'London',             // 21 (cycle continues)
    'Manchester',         // 22
    'Edinburgh',          // 23
    'Cardiff',            // 24
    'Belfast',            // 25
    'Dublin',             // 26
    'Glasgow',            // 27
    'Bristol',            // 28
    'Newcastle',          // 29
    'Leeds',              // 30
    'Birmingham',         // 31
    'Liverpool',          // 32
    'Coventry',           // 33
    'Leicester',          // 34
    'Sheffield',          // 35
    'Norwich',            // 36
    'Reading',            // 37
    'Oxford',             // 38
    'Cambridge',          // 39
    'Southampton',        // 40
    'London',             // 41
    'Manchester',         // 42
    'Edinburgh',          // 43
    'Cardiff',            // 44
    'Belfast',            // 45
    'Dublin',             // 46
    'Glasgow',            // 47
    'Bristol',            // 48
    'Newcastle',          // 49
    'Leeds',              // 50
  ],

  // Minimum level to unlock each temple (matches Progressao.TEMPLO_NIVEL)
  TEMPLO_NIVEL_MINIMO: {
    1:1,  2:2,  3:4,  4:6,  5:8,  6:10, 7:13, 8:15, 9:17, 10:20,
    // T36 desativado — conteúdo inadequado (anglicismos)
    36:99,
    // A2 topics
    11:2, 12:2, 13:2, 14:2, 15:2, 17:2, 18:2, 19:2,
    22:2, 23:2, 25:2, 28:2, 33:2, 34:2,
    // B1 topics
    16:4, 20:4, 21:4, 24:4, 29:4, 32:4, 35:4,
    // B2 topics
    26:7, 27:7, 30:7, 31:7, 37:7, 38:7, 43:7, 46:7,
    // C1 topics
    39:11, 40:11, 42:11, 44:11, 45:11,
    // C2 topics
    41:15, 47:15, 48:15, 49:15, 50:15,
  },

  // Secret unlock code — change to your personal password
  UNLOCK_CODE: '2012',

  // English descriptions per temple (difficulty proportional to level)
  TEMPLO_DESC: [
    null,
    // 1 New York — A1
    'New York is where everything begins. In this temple you take your first steps in English: greetings, numbers, introductions. "Hello", "thank you", "excuse me" — the foundations of every conversation. The city that never sleeps is waiting for you.',
    // 2 Los Angeles — A1→A2
    'Los Angeles is sun, family, and everyday life. In this temple you talk about your home, your family, and daily routines. Who is your sister? Where do you live? What do you do on weekends? The language of life.',
    // 3 Chicago — A2
    'Chicago is always on the move. Here you master travel vocabulary: airports, trains, hotels, directions. This temple prepares you for any journey through the English-speaking world.',
    // 4 Nashville — A2→B1
    'Nashville is music, food, and culture. In this temple you discover American flavors and traditions: food, drinks, recipes, restaurants. To talk about food is to talk about a culture.',
    // 5 San Francisco — B1
    'San Francisco moves fast and thinks ahead. This temple teaches you to manage time in English — schedules, appointments, seasons — and to describe your routine with clarity and confidence.',
    // 6 Boston — B1→B2
    'Boston, home to some of the world\'s greatest universities, is the ideal place to study the structure of the language. Here you tackle complex grammar, relative clauses, and advanced structures. You learn to think in English.',
    // 7 New Orleans — B2
    'New Orleans is jazz, debate, and eloquence. In this temple you explore argumentation, formal conversation, and elegant expression. How do you defend an opinion? How do you negotiate with grace? Fluent English awaits.',
    // 8 Atlanta — B2
    'Atlanta is a crossroads of cultures, stories, and voices. This temple opens you to American cultural heritage — history, civil rights, music, regional traditions of a vast and fascinating country.',
    // 9 Austin — B1→B2
    'Austin is the city of tech, creativity, and work. This temple gives you professional vocabulary: resumes, meetings, negotiations, emails. The English of the workplace demands precision and respect.',
    // 10 Washington DC — B2
    'Washington DC is the home of American literature, rhetoric, and ideas. In the tenth temple you reach the summit: the language of literature, speeches, philosophy, and artistic expression. Words don\'t just communicate — they inspire.',
  ],

  // ── Initialization ─────────────────────────────────────────
  async init() {
    this.estado.progresso = this.carregarProgresso();
    this.estado.flashcardData = this.carregarFlashcards();
    if (typeof I18n !== 'undefined') I18n.inicializar();
    await this.carregarDados();
    this.atualizarStats();
    this.renderizarTemplos();
    // Kick off secondary modules once data is ready
    if (typeof Progressao !== 'undefined') Progressao.verificarDesbloqueioTemplos();
    if (typeof Quiz !== 'undefined') Quiz.renderizarSeletor();
    if (typeof Vocab !== 'undefined') {
      Vocab.popularCategorias();
      Vocab.renderizar();
    }
    if (typeof Flashcards !== 'undefined') Flashcards.atualizarSelectTemplo();
    // Render heatmap
    if (typeof Calor !== 'undefined') Calor.renderizar();
    // Init grammar module
    if (typeof Grammatica !== 'undefined') Grammatica.renderizarSeletor();
    // Init sound feedback
    if (typeof SomFeedback !== 'undefined') SomFeedback.init();
    if (typeof Notificacoes !== 'undefined') Notificacoes.init();
    // Pre-load speech synthesis voices so the first pronunciar() call is instant
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices(); // trigger async load
      speechSynthesis.onvoiceschanged = () => {
        this._getVozAmericana(); // cache American English voice on first load
        speechSynthesis.onvoiceschanged = null;
      };
    }
    // Init onboarding
    if (typeof Onboarding !== 'undefined' && Onboarding.deveExibir()) {
      Onboarding.mostrar();
    }

    // Set up keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === '1') this.navegar('templi');
      else if (e.key === '2') this.navegar('flashcard');
      else if (e.key === '3') this.navegar('quiz');
      else if (e.key === '4') this.navegar('vocabolario');
      else if (e.key === '5') this.navegar('grammatica');
    });
  },

  // ── Data loading ───────────────────────────────────────────
  async carregarDados() {
    const promises = [];
    // Load templo-1.json through templo-51.json; skip gracefully on 404
    for (let i = 1; i <= 51; i++) {
      promises.push(
        fetch(`data/templo-${i}.json`)
          .then(r => {
            if (!r.ok) return null;
            return r.json();
          })
          .then(data => {
            if (!data) return;
            // Normalize: JSON files use "vocabulario" or "palavras" — always expose as "palavras"
            const lista = data.palavras || data.vocabulario || [];
            data.palavras = lista.map(p => ({ ...p, templo_num: data.templo }));
            this.estado.vocabCache.push(...data.palavras);
            this.estado.templosData[data.templo] = data;
          })
          .catch(() => null) // network error — skip
      );
    }

    // Load quiz questions
    promises.push(
      fetch('data/quizzes.json')
        .then(r => r.ok ? r.json() : { perguntas: [] })
        .then(data => {
          this.estado.quizData = data.perguntas || [];
        })
        .catch(() => { this.estado.quizData = []; })
    );

    // Load verb conjugations
    promises.push(
      fetch('data/conjugacoes.json')
        .then(r => r.ok ? r.json() : { verbos: [] })
        .then(data => {
          this.estado.conjugacoesData = data.verbos || [];
        })
        .catch(() => { this.estado.conjugacoesData = []; })
    );

    // Load grammar data
    promises.push(
      fetch('data/grammar.json')
        .then(r => r.ok ? r.json() : { moduli: [] })
        .then(data => {
          this.estado.grammarData = data;
        })
        .catch(() => { this.estado.grammarData = { moduli: [] }; })
    );

    await Promise.all(promises);

    // Injeta vocabulário customizado (via IA Import)
    try {
      const custom = JSON.parse(localStorage.getItem('en_vocab_custom') || '[]');
      if (custom.length) {
        custom.forEach(w => { if (!w.templo_num) w.templo_num = 0; });
        this.estado.vocabCache.unshift(...custom);
      }
    } catch (e) {}

    // Update total_palavras in progress
    if (this.estado.progresso) {
      this.estado.progresso.total_palavras = this.estado.vocabCache.length;
      this.salvarProgresso();
    }
  },

  // ── Navigation ─────────────────────────────────────────────
  navegar(secao) {
    // 'home' é um alias para 'templi' (seção inicial)
    if (secao === 'home') secao = 'templi';
    this.estado.secaoAtiva = secao;

    // Update tab buttons
    document.querySelectorAll('.nav-tab').forEach(btn => {
      btn.classList.toggle('ativa', btn.dataset.section === secao);
    });

    // Update bottom nav buttons
    document.querySelectorAll('#bottom-nav button').forEach(btn => {
      btn.classList.toggle('ativa', btn.dataset.section === secao);
    });

    // Show/hide sections
    document.querySelectorAll('.section').forEach(sec => {
      sec.classList.toggle('active', sec.id === `sec-${secao}`);
    });

    // Persist last section visited
    if (this.estado.progresso) {
      this.estado.progresso.ultima_secao = secao;
      this.salvarProgresso();
    }

    // Lazy-render on first visit
    if (secao === 'dialoghi' && typeof Dialoghi !== 'undefined') {
      Dialoghi.renderizarSeletor();
    }
    if (secao === 'canzoni' && typeof Canzoni !== 'undefined') {
      Canzoni.renderizarSeletor();
    }
    if (secao === 'imitazione' && typeof Imitazione !== 'undefined') {
      Imitazione.renderizar();
    }
    if (secao === 'vocabolario' && typeof Vocab !== 'undefined') {
      Vocab.renderizar();
    }
    if (secao === 'quiz' && typeof Quiz !== 'undefined') {
      Quiz.renderizarSeletor();
    }
    if (secao === 'flashcard' && typeof Flashcards !== 'undefined') {
      Flashcards.atualizarSelectTemplo();
    }
    if (secao === 'grammatica' && typeof Grammatica !== 'undefined') {
      Grammatica.renderizarSeletor();
    }
    if (secao === 'storie' && typeof Storie !== 'undefined') {
      Storie._filtroNivel = '';
      Storie._filtroTexto = '';
      Storie.renderizarSeletor();
    }
    if (secao === 'profilo' && typeof Profilo !== 'undefined') {
      Profilo.renderizar();
    }
  },

  // ── localStorage ───────────────────────────────────────────
  carregarProgresso() {
    try {
      const raw = localStorage.getItem('en_progresso');
      if (raw) {
        const p = JSON.parse(raw);
        // Backward compatibility
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
    } catch (e) { /* ignore */ }
    // Default state
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
      localStorage.setItem('en_progresso', JSON.stringify(this.estado.progresso));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        alert(I18n.t('storage_limite'));
      }
    }
  },

  carregarFlashcards() {
    try {
      const raw = localStorage.getItem('en_flashcards');
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    return {};
  },

  salvarFlashcards() {
    try {
      localStorage.setItem('en_flashcards', JSON.stringify(this.estado.flashcardData));
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        alert(I18n.t('storage_limite_fc'));
        // Auto-cleanup simple GC: remove 20 oldest cards if possible
        if (this.estado.flashcardData && this.estado.flashcardData.cards) {
            this.estado.flashcardData.cards = this.estado.flashcardData.cards.slice(20);
            try { localStorage.setItem('en_flashcards', JSON.stringify(this.estado.flashcardData)); } catch(_) {}
        }
      }
    }
  },

  // ── Temple grid rendering ──────────────────────────────────
  // ── Parola del Giorno ─────────────────────────────────────
  renderizarParolaDia() {
    const container = document.getElementById('parola-del-giorno');
    if (!container) return;

    // Só palavras de templos desbloqueados pelo usuário
    const desbloqueados = (this.estado.progresso?.templos_desbloqueados) || [1];
    const vocab = [];
    desbloqueados.forEach(i => {
      const d = this.estado.templosData[i];
      if (d && d.palavras) d.palavras.forEach(p => vocab.push({ ...p, _templo: i }));
    });
    if (vocab.length === 0) { container.style.display = 'none'; return; }

    // Select deterministically by day of year (same word all day)
    const now   = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayN  = Math.floor((now - start) / 86400000);

    // Check localStorage cache
    let cached = null;
    try { cached = JSON.parse(localStorage.getItem('en_palavra_dia') || 'null'); } catch (_) {}
    const todayStr = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    let palavra;
    if (cached && cached.data === todayStr) {
      palavra = vocab.find(p => p.id === cached.id) || vocab[dayN % vocab.length];
    } else {
      palavra = vocab[dayN % vocab.length];
      try { localStorage.setItem('en_palavra_dia', JSON.stringify({ data: todayStr, id: palavra.id })); } catch (_) {}
    }
    if (!palavra) { container.style.display = 'none'; return; }

    const ipa = palavra.audio_ipa
      ? (palavra.audio_ipa.startsWith('/') ? palavra.audio_ipa : `/${palavra.audio_ipa}/`)
      : '';
    const data = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const isFav = this.estado.progresso && this.estado.progresso.favoritos && this.estado.progresso.favoritos.includes(palavra.id);
    const favEmoji = isFav ? '❤️' : '🤍';

    container.innerHTML = `
      <div class="pdd-header">
        <span class="pdd-label">${I18n.t('pdd_titulo_label')}</span>
        <span class="pdd-data">${data}</span>
      </div>
      <div class="pdd-body">
        <div class="pdd-palavra">${palavra.word || palavra.italiano || ''}</div>
        ${ipa ? `<div class="pdd-ipa">${ipa}</div>` : ''}
        <div class="pdd-traducao">${palavra.translation || palavra.portugues || ''}</div>
        ${palavra.category || palavra.categoria ? `<span class="pdd-cat">${palavra.category || palavra.categoria}</span>` : ''}
        ${palavra.example || palavra.exemplo ? `<div class="pdd-exemplo">"${palavra.example || palavra.exemplo}"${palavra.exemplo_pt ? ` — ${palavra.exemplo_pt}` : ''}</div>` : ''}
      </div>
      <div class="pdd-acoes">
        <button class="pdd-btn" onclick="App.pronunciar('${(palavra.word || palavra.italiano || '').replace(/'/g, "\\'")}')">${I18n.t('pdd_ouvir')}</button>
        <button class="pdd-btn pdd-btn-study" onclick="App.estudarPalavra('${palavra.id}',${palavra._templo})">${I18n.t('pdd_estudar')}</button>
        <button class="pdd-btn" style="color: ${isFav ? '#e74c3c' : 'inherit'}" onclick="App.toggleFavorito('${palavra.id}'); const fav = (App.estado.progresso?.favoritos || []).includes('${palavra.id}'); this.innerHTML = (fav ? '❤️' : '🤍') + ' Fav'; this.style.color = fav ? '#e74c3c' : 'inherit';">
          ${favEmoji} Fav
        </button>
      </div>
    `;
    container.style.display = 'block';
  },

  renderizarCardContinuar() {
    const p = this.estado.progresso;
    if (!p || !p.ultimo_estudo) return ''; // primeiro acesso

    const diffHoras = (Date.now() - p.ultimo_estudo) / 3600000;
    const quando = diffHoras < 0.1 ? I18n.t('cc_agora_mesmo')
                 : diffHoras < 1   ? I18n.t('cc_ha_minutos')
                 : diffHoras < 24  ? I18n.t('cc_ha_horas').replace('{n}', Math.round(diffHoras))
                 :                   I18n.t('cc_ha_dias').replace('{n}', Math.round(diffHoras/24));

    const ultimaSecao = p.ultima_secao || 'flashcard';
    let secaoNome = 'Flashcard';
    if (ultimaSecao === 'templi')      secaoNome = I18n.t('cc_secao_inicio');
    if (ultimaSecao === 'quiz')        secaoNome = 'Quiz';
    if (ultimaSecao === 'vocabolario') secaoNome = I18n.t('cc_secao_vocab');
    if (ultimaSecao === 'grammatica')  secaoNome = I18n.t('cc_secao_gram');
    if (ultimaSecao === 'profilo')     secaoNome = I18n.t('cc_secao_perfil');

    return `<div class="card-continuar" onclick="App.navegar('${ultimaSecao}')">
      <div>
        <div class="cc-label">${I18n.t('cc_continuar_label')}</div>
        <div class="cc-info">${I18n.t('cc_ultima_sessao')} <strong>${quando}</strong> (${secaoNome})</div>
      </div>
      <div class="cc-cta">${I18n.t('cc_retomar')}</div>
    </div>`;
  },

  _renderizarMetaPrazo() {
    const p = this.estado.progresso;
    if (!p || !p.meta_prazo) {
      return `<div class="card-meta-prazo card-meta-vazia" onclick="App.abrirModalMetaPrazo()">
        <span>🎯</span>
        <span>${I18n.t('meta_definir_prazo')}</span>
        <span class="cc-cta">→</span>
      </div>`;
    }
    const dados = Progressao.calcularMetaPrazo();
    if (!dados) return '';
    const cor = dados.atingeNoPrazo ? '#27AE60' : '#E74C3C';
    const emoji = dados.atingeNoPrazo ? '✅' : '⚠️';
    return `<div class="card-meta-prazo" onclick="App.abrirModalMetaPrazo()">
      <div class="meta-prazo-titulo">${emoji} ${I18n.idioma === 'en' ? 'Goal' : 'Meta'}: ${I18n.idioma === 'en' ? 'Level' : 'Nível'} ${dados.nivel_alvo} ${I18n.idioma === 'en' ? 'by' : 'até'} ${new Date(dados.data_alvo).toLocaleDateString(I18n.idioma === 'en' ? 'en-US' : 'pt-BR', {timeZone: 'UTC'})}</div>
      <div class="meta-prazo-info">
        <span style="color:${cor}">${dados.xpPorDia} ${I18n.t('meta_xp_necessarios')}</span>
        <span>·</span>
        <span>${I18n.t('meta_dias_restantes').replace('{n}', dados.diasRestantes)}</span>
      </div>
      <div class="meta-prazo-previsao">${I18n.t('meta_no_ritmo')} ${dados.dataPrevisao}</div>
    </div>`;
  },

  renderizarTemplos() {
    // Render card continuar
    const contContainer = document.getElementById('continuar-container');
    if (contContainer) {
      contContainer.innerHTML = this.renderizarCardContinuar();
    }

    // Render meta com prazo
    const metaContainer = document.getElementById('meta-prazo-container');
    if (metaContainer) {
      metaContainer.innerHTML = this._renderizarMetaPrazo();
    }

    const grid = document.getElementById('templos-grid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let i = 1; i <= 50; i++) {
      if (!this.estado.templosData[i] && !this.TEMPLO_NIVEL_MINIMO[i]) continue; // templo não existe
      const data = this.estado.templosData[i];
      const desbloqueado = this.estado.progresso.templos_desbloqueados.includes(i);
      const concluido = this.estado.progresso.templos_concluidos.includes(i);
      const nivelMinimo = this.TEMPLO_NIVEL_MINIMO[i] || i;
      const cor = this.TEMPLO_CORES[i] || this.TEMPLO_CORES[1];

      // If data not loaded but temple is unlocked, show placeholder
      const nome = (data && data.nome) ? data.nome : (this.TEMPLO_NOMES[i] || `Temple ${i}`);
      const cidade = this.TEMPLO_CIDADES[i] || (data ? data.cidade : '—');
      const nivel = data ? data.nivel : '—';
      const totalPalavras = data && data.palavras ? data.palavras.length : 0;

      // Calculate mastered words (FSRS: reps >= 3 or stability > 7d; SM-2: repeticoes >= 3)
      let dominadas = 0;
      if (data && data.palavras) {
        dominadas = data.palavras.filter(p => {
          const sm = this.estado.flashcardData[p.id];
          if (!sm) return false;
          return (sm.reps >= 3) || (sm.repeticoes >= 3) || (sm.stability > 7);
        }).length;
      }

      const progPercent = totalPalavras > 0 ? Math.round((dominadas / totalPalavras) * 100) : 0;

      const card = document.createElement('div');
      card.className = `templo-card${desbloqueado ? '' : ' bloqueado'}${concluido ? ' concluido' : ''}`;

      if (desbloqueado) {
        card.style.cursor = 'pointer';
        card.onclick = () => this.estudarTemplo(i);
        card.innerHTML = `
          <div class="templo-header" style="background:${cor}">
            <div class="templo-num">Temple ${i}</div>
            <div class="templo-nome">${nome}</div>
            <div class="templo-meta">
              <span class="templo-cidade">📍 ${cidade}</span>
              <span class="nivel-badge">${nivel}</span>
              ${concluido ? '<span class="nivel-badge">✅ Done</span>' : ''}
            </div>
          </div>
          <div class="templo-body">
            <div class="progresso-label">${dominadas}/${totalPalavras} words mastered</div>
            <div class="progresso-bar-container">
              <div class="progresso-bar-fill" style="width:${progPercent}%"></div>
            </div>
          </div>
        `;
      } else {
        card.style.cursor = 'pointer';
        card.onclick = () => this.abrirModalTemplo(i);
        card.innerHTML = `
          <div class="templo-header" style="background:${cor}; filter:grayscale(0.6)">
            <div class="templo-num">Temple ${i}</div>
            <div class="templo-nome">🔒 ${nome}</div>
            <div class="templo-meta">
              <span class="templo-cidade">📍 ${cidade}</span>
              <span class="nivel-badge">${nivel}</span>
            </div>
          </div>
          <div class="templo-body">
            <div class="lock-info">${I18n.t('templo_requer').replace('{n}', nivelMinimo)}</div>
            <div class="progresso-bar-container">
              <div class="progresso-bar-fill" style="width:0%"></div>
            </div>
          </div>
        `;
      }

      grid.appendChild(card);
    }

    // Render daily word
    this.renderizarParolaDia();
  },

  // Navigate to flashcards for a specific temple
  estudarTemplo(temploNum) {
    this.navegar('flashcard');
    const sel = document.getElementById('flashcard-templo-select');
    if (sel) sel.value = temploNum;
    if (typeof Flashcards !== 'undefined') Flashcards.init(temploNum);
  },

  // Abre flashcard do templo E posiciona na carta específica (Parola del Giorno)
  estudarPalavra(palavraId, temploNum) {
    this.navegar('flashcard');
    const sel = document.getElementById('flashcard-templo-select');
    if (sel) sel.value = temploNum;
    if (typeof Flashcards === 'undefined') return;
    Flashcards.init(temploNum);
    // Após init, move a carta alvo para o início do deck
    const idx = Flashcards.cartasDisponiveis.findIndex(p => p.id === palavraId);
    if (idx > 0) {
      const [carta] = Flashcards.cartasDisponiveis.splice(idx, 1);
      Flashcards.cartasDisponiveis.unshift(carta);
      Flashcards.indiceAtual = 0;
      Flashcards.mostrarCarta();
    }
  },

  // Navigate to quiz for a specific temple
  quizTemplo(temploNum) {
    this.navegar('quiz');
    if (typeof Quiz !== 'undefined') {
      Quiz.iniciar(temploNum);
    }
  },

  // ── Templo detail modal ────────────────────────────────────
  abrirModalTemplo(i) {
    const data = this.estado.templosData[i];
    const desbloqueado = this.estado.progresso.templos_desbloqueados.includes(i);
    const concluido    = this.estado.progresso.templos_concluidos.includes(i);
    const cor          = this.TEMPLO_CORES[i] || this.TEMPLO_CORES[1];
    const nome         = (data && data.nome) ? data.nome : (this.TEMPLO_NOMES[i] || `Temple ${i}`);
    const cidade       = this.TEMPLO_CIDADES[i] || (data ? data.cidade : '—');
    const nivel        = data ? data.nivel : '—';
    const desc         = this.TEMPLO_DESC[i] || '';
    const nivelMinimo  = this.TEMPLO_NIVEL_MINIMO[i] || i;
    const totalPalavras = data && data.palavras ? data.palavras.length : 0;

    let dominadas = 0;
    if (data && data.palavras) {
      dominadas = data.palavras.filter(p => {
        const sm = this.estado.flashcardData[p.id];
        if (!sm) return false;
        return (sm.reps >= 3) || (sm.repeticoes >= 3) || (sm.stability > 7);
      }).length;
    }
    const progPercent = totalPalavras > 0 ? Math.round((dominadas / totalPalavras) * 100) : 0;

    const body = document.getElementById('templo-modal-body');
    body.innerHTML = `
      <div class="tm-header" style="background:${cor}${!desbloqueado ? ';filter:grayscale(0.5)' : ''}">
        <button class="tm-close" onclick="App.fecharModalTemplo()" title="Close">✕</button>
        <div class="tm-num">Temple ${i}</div>
        <div class="tm-nome">${nome}</div>
        <div class="tm-meta">
          <span class="tm-badge">📍 ${cidade}</span>
          <span class="tm-badge">${nivel}</span>
          ${concluido ? '<span class="tm-badge">✅ Completed</span>' : ''}
        </div>
      </div>
      <div class="tm-content">
        ${desbloqueado ? `
          <div class="tm-progress-wrap">
            <div class="tm-progress-label">${dominadas} / ${totalPalavras} words mastered · ${progPercent}%</div>
            <div class="tm-progress-bar"><div class="tm-progress-fill" style="width:${progPercent}%"></div></div>
          </div>
        ` : `<div class="tm-lock-banner">🔒 Requires Level ${nivelMinimo}</div>`}
        <p class="tm-desc">${desc}</p>
        ${desbloqueado ? `
          <div class="tm-actions">
            <button class="tm-btn-primary" onclick="App.fecharModalTemplo();App.estudarTemplo(${i})">${I18n.t('tm_estudar_vocab')}</button>
            <button class="tm-btn-quiz" onclick="App.fecharModalTemplo();App.quizTemplo(${i})">${I18n.t('tm_take_quiz')}</button>
          </div>
        ` : `
          <details class="tm-unlock-area">
            <summary>${I18n.t('tm_access_code')}</summary>
            <div class="tm-unlock-form">
              <input id="tm-code-input" type="password" placeholder="${I18n.t('tm_code_placeholder')}" class="tm-code-input"
                onkeydown="if(event.key==='Enter')App.tentarDesbloquear(${i})">
              <button onclick="App.tentarDesbloquear(${i})" class="tm-btn-unlock">${I18n.t('tm_unlock')}</button>
            </div>
          </details>
        `}
      </div>
    `;

    document.getElementById('templo-modal').classList.add('ativo');
    document.body.style.overflow = 'hidden';
  },

  fecharModalTemplo() {
    document.getElementById('templo-modal').classList.remove('ativo');
    document.body.style.overflow = '';
  },

  pedirSenhaTemplo(temploNum) {
    const nome = this.TEMPLO_NOMES[temploNum] || `Temple ${temploNum}`;
    const codigo = prompt(`🔒 Temple ${temploNum} — ${nome}\n\nEnter access code:`);
    if (codigo === null) return; // cancelou
    if (codigo.trim() === this.UNLOCK_CODE) {
      const p = this.estado.progresso;
      if (!p.templos_desbloqueados.includes(temploNum)) {
        p.templos_desbloqueados.push(temploNum);
        p.templos_desbloqueados.sort((a, b) => a - b);
      }
      this.salvarProgresso();
      this.renderizarTemplos();
      this.atualizarStats();
      if (typeof Progressao !== 'undefined') Progressao.verificarDesbloqueioTemplos();
      this.notificar(I18n.t('notif_templo_sbloccato').replace('{n}', temploNum), 'sucesso');
    } else {
      this.notificar('notif_codice_errato', 'erro');
    }
  },

  tentarDesbloquear(temploNum) {
    const input = document.getElementById('tm-code-input');
    if (!input) return;
    if (input.value.trim() === this.UNLOCK_CODE) {
      const p = this.estado.progresso;
      if (!p.templos_desbloqueados.includes(temploNum)) {
        p.templos_desbloqueados.push(temploNum);
        p.templos_desbloqueados.sort((a, b) => a - b);
      }
      this.salvarProgresso();
      this.fecharModalTemplo();
      this.renderizarTemplos();
      this.atualizarStats();
      if (typeof Progressao !== 'undefined') Progressao.verificarDesbloqueioTemplos();
      this.notificar(I18n.t('notif_templo_sbloccato').replace('{n}', temploNum), 'sucesso');
    } else {
      input.style.borderColor = '#003E8A';
      input.value = '';
      input.placeholder = 'Incorrect code…';
      setTimeout(() => { input.style.borderColor = ''; input.placeholder = 'Enter code...'; }, 2000);
    }
  },

  // ── Header stats ───────────────────────────────────────────
  atualizarStats() {
    const p = this.estado.progresso;
    if (!p) return;

    const elNivel   = document.getElementById('stat-nivel');
    const elXp      = document.getElementById('stat-xp');
    const elTempli  = document.getElementById('stat-templi');
    const elParole  = document.getElementById('stat-parole');
    const elBarFill = document.getElementById('xp-bar-fill');
    const elStreak  = document.getElementById('stat-streak');

    // XP for current level progress
    // xpInicio = cumulative XP at START of current level
    // xpFim    = cumulative XP needed to reach NEXT level
    let xpInicio = 0;
    let xpFim = p.xp_proximo_nivel || 500;
    if (typeof Progressao !== 'undefined') {
      xpInicio = Progressao.xpParaNivel(p.nivel) || 0;
      xpFim    = Progressao.xpParaNivel(p.nivel + 1) || (xpInicio + 500);
    }
    const range = xpFim - xpInicio;
    const current = p.xp - xpInicio;
    const percent = range > 0 ? Math.min(100, Math.round((current / range) * 100)) : 0;

    const totalTemplos = Object.keys(this.TEMPLO_NIVEL_MINIMO || {}).length || 50;
    if (elNivel)   elNivel.textContent   = I18n.t('stats_level').replace('{n}', p.nivel);
    if (elXp)      elXp.textContent      = `XP: ${p.xp}/${xpFim}`;
    if (elTempli)  elTempli.textContent  = I18n.t('stats_temples').replace('{a}', p.templos_desbloqueados.length).replace('{b}', totalTemplos);
    if (elParole)  elParole.textContent  = I18n.t('stats_words').replace('{n}', p.total_palavras);
    if (elBarFill) elBarFill.style.width = percent + '%';
    const s = p.streak || 0;
    if (elStreak)  elStreak.textContent  = I18n.t(s !== 1 ? 'streak_dias' : 'streak_dia').replace('{n}', s);

    // Atualiza badge do botão Revisão Geral com total de cartas vencidas
    const btnRgCount = document.getElementById('btn-rg-count');
    if (btnRgCount) {
      const agora = Date.now();
      let vencidas = 0;
      p.templos_desbloqueados.forEach(num => {
        const data = this.estado.templosData[num];
        if (!data || !data.palavras) return;
        data.palavras.forEach(pw => {
          const f = this.estado.flashcardData[pw.id];
          if (!f || f.state === 'new' || (f.nextReview || 0) <= agora) vencidas++;
        });
      });
      btnRgCount.textContent = vencidas > 0 ? `${vencidas} card${vencidas !== 1 ? 's' : ''}` : '';
      const helper = document.getElementById('selector-helper');
      if (helper && !Flashcards.cartaAtual) helper.style.display = vencidas > 0 ? 'none' : '';
    }

    // Daily goal bar — reset xp_hoje when the date rolls over
    const now = new Date();
    const hoje = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    if (p.data_xp_hoje !== hoje) {
      p.xp_hoje = 0;
      p.data_xp_hoje = hoje;
      this.salvarProgresso(); // persist the reset so next page-load sees 0
    }
    const meta     = p.meta_diaria || 100;
    const ganhoHj  = p.xp_hoje || 0;
    const metaPct  = Math.min(100, Math.round((ganhoHj / meta) * 100));
    const elMetaFill  = document.getElementById('meta-bar-fill');
    const elMetaLabel = document.getElementById('meta-bar-label');
    const elMetaXp    = document.getElementById('meta-bar-xp');
    if (elMetaFill)  elMetaFill.style.width   = metaPct + '%';
    if (elMetaLabel) elMetaLabel.textContent  = I18n.t('meta_do_dia_label');
    if (elMetaXp)    elMetaXp.textContent     = `${ganhoHj}/${meta} XP${ganhoHj >= meta ? ' ✅' : ''}`;
  },

  // ── Favoritos ─────────────────────────────────────────────
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
  },

  // ── Meta Diária settings ──────────────────────────────────
  abrirMetaSettings() {
    const modal = document.getElementById('meta-settings-modal');
    if (!modal) return;
    // Highlight current goal
    const meta = (this.estado.progresso || {}).meta_diaria || 100;
    modal.querySelectorAll('.meta-op-btn').forEach(btn => {
      btn.classList.toggle('ativo', parseInt(btn.dataset.val) === meta);
    });
    modal.style.display = 'flex';
  },

  fecharMetaSettings() {
    const modal = document.getElementById('meta-settings-modal');
    if (modal) modal.style.display = 'none';
  },

  setMeta(valor) {
    if (!this.estado.progresso) return;
    this.estado.progresso.meta_diaria = valor;
    this.salvarProgresso();
    this.atualizarStats();
    this.fecharMetaSettings();
    this.notificar(I18n.t('notif_meta_definida').replace('{val}', valor), 'sucesso');
  },

  // ── Meta Prazo Modal ────────────────────────────────────────
  abrirModalMetaPrazo() {
    const modal = document.getElementById('modal-meta-prazo');
    if (!modal) return;
    const p = this.estado.progresso;
    if (p && p.meta_prazo) {
      document.getElementById('meta-nivel-alvo').value = p.meta_prazo.nivel_alvo;
      document.getElementById('meta-data-alvo').value = p.meta_prazo.data_alvo;
    }
    modal.style.display = 'flex';
  },

  fecharModalMetaPrazo() {
    const modal = document.getElementById('modal-meta-prazo');
    if (modal) modal.style.display = 'none';
  },

  confirmarMetaPrazo() {
    const nivelAlvo = parseInt(document.getElementById('meta-nivel-alvo').value);
    const dataAlvo = document.getElementById('meta-data-alvo').value;
    if (!nivelAlvo || !dataAlvo) return;
    
    // Validar se data é no futuro
    if (new Date(dataAlvo).getTime() <= Date.now()) {
      this.notificar('notif_data_futura', 'erro');
      return;
    }
    
    Progressao.definirMetaPrazo(nivelAlvo, dataAlvo);
    this.fecharModalMetaPrazo();
    this.renderizarTemplos();
  },

  // ── XP system ─────────────────────────────────────────────
  ganharXP(quantidade) {
    if (typeof Progressao !== 'undefined') {
      Progressao.ganhar(quantidade);
    } else {
      // Fallback if progression.js not yet loaded
      this.estado.progresso.xp += quantidade;
      this.salvarProgresso();
      this.atualizarStats();
    }
    this.notificar(`+${quantidade} XP`, 'alerta');
  },

  verificarNivelUp() {
    if (typeof Progressao !== 'undefined') {
      Progressao.verificarNivelUp();
    }
  },

  verificarDesbloqueioTemplos() {
    if (typeof Progressao !== 'undefined') {
      Progressao.verificarDesbloqueioTemplos();
    }
  },

  // ── Toast notifications ────────────────────────────────────
  notificar(mensagem, tipo = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    if (typeof I18n !== 'undefined' && I18n.dict[mensagem]) {
      mensagem = I18n.t(mensagem);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    toast.textContent = mensagem;
    container.appendChild(toast);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      toast.classList.add('saindo');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 320);
    }, 3000);
  },

  // ── Text-to-speech ─────────────────────────────────────────
  _vozAmericana: null,      // cache da voz americana (null = ainda não resolvido)
  _vozAmericanaResolvida: false, // true quando já procuramos (mesmo se não achou)

  _getVozAmericana() {
    // Reseta cache se as vozes mudaram desde a última busca
    if (!this._vozAmericanaResolvida) {
      const vozes = speechSynthesis.getVoices();
      if (!vozes.length) return null; // ainda carregando
      this._vozAmericana =
        vozes.find(v => v.lang === 'en-US') ||
        vozes.find(v => v.lang.startsWith('en')) ||
        null;
      this._vozAmericanaResolvida = true;
    }
    return this._vozAmericana;
  },

  // ResponsiveVoice — fallback garantido de voz americana
  _pronunciarRV(texto) {
    if (typeof responsiveVoice !== 'undefined' && responsiveVoice.voiceSupport()) {
      responsiveVoice.cancel();
      const speed = parseFloat(localStorage.getItem('en_audio_speed')) || 1.0;
      responsiveVoice.speak(texto, 'US English Female', { rate: speed, pitch: 1 });
    }
  },

  pronunciar(texto) {
    if (!texto) return;
    // Respeita o botão 🔕
    if (typeof SomFeedback !== 'undefined' && !SomFeedback.ativo) return;

    if (!('speechSynthesis' in window)) { this._pronunciarRV(texto); return; }

    speechSynthesis.cancel();

    const tentarFalar = () => {
      const voz = this._getVozAmericana();

      let speed = parseFloat(localStorage.getItem('en_audio_speed')) || 1.0;
      speed = Math.max(0.1, Math.min(2.0, speed)); // Previne crashes de bounds out-of-range no WebKit
      
      const u = new SpeechSynthesisUtterance(texto);
      u.lang  = 'en-US';
      u.rate  = speed;
      u.pitch = 1;
      if (voz) u.voice = voz;
      // Se não há voz americana específica, usa lang='en-US' sem voice explícita
      // (a maioria dos browsers ainda sintetiza com o melhor disponível)

      u.onerror = (e) => {
        speechSynthesis.cancel(); // Previne travamentos irreversíveis do buffer no iOS
        // Voz EN indisponível no browser → ResponsiveVoice
        if (['language-unavailable','synthesis-failed','not-allowed'].includes(e.error)) {
          this._pronunciarRV(texto);
        }
      };

      speechSynthesis.speak(u);

      // Também tenta RV em paralelo se não há voz americana nativa
      if (!voz && this._vozAmericanaResolvida) {
        this._pronunciarRV(texto);
      }
    };

    if (speechSynthesis.getVoices().length > 0) {
      tentarFalar();
    } else {
      // Vozes ainda não carregaram — aguarda e reseta cache
      speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.onvoiceschanged = null;
        this._vozAmericanaResolvida = false; // força nova busca com lista completa
        tentarFalar();
      };
    }
  },

  toggleAudioSpeed() {
    const SPEEDS = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5];
    const current = parseFloat(localStorage.getItem('en_audio_speed') || '1.0');
    let idx = SPEEDS.indexOf(current);
    if (idx === -1) idx = SPEEDS.indexOf(1.0);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    try {
      localStorage.setItem('en_audio_speed', next);
    } catch (e) {
      console.warn("Could not save audio speed to localStorage due to quota limits.");
    }
    this.atualizarAudioSpeedUI();
  },

  atualizarAudioSpeedUI() {
    const btn = document.getElementById('btn-audio-speed');
    if (!btn) return;
    const rate = parseFloat(localStorage.getItem('en_audio_speed') || '1.0');
    let label = rate % 1 === 0 ? rate.toFixed(0) : rate.toString().replace(/^0\./, '.');
    btn.textContent = label + 'x';
    // Sync profile slider if visible
    const slider = document.getElementById('audio-speed-slider');
    const display = document.getElementById('audio-speed-val');
    if (slider) slider.value = rate;
    if (display) display.textContent = rate + 'x';
  },
};

// ── Bootstrap ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Prevenir zoom indesejado em dispositivos iOS (Safari ignora user-scalable=no)
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });
});
