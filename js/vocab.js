// ============================================================
// vocab.js — Vocabulary browser with search and filters
// ============================================================

const Vocab = {
  filtroTexto: '',
  filtroTemplo: '',
  filtroCategoria: '',
  filtroOrigem: '',   // '' | 'custom' | 'nativo'
  filtroDificeis:   false,
  filtroFavoritos:  false,
  blurColuna: null,   // null | 'pt' | 'it'
  _onboardingMostrado: false,
  _ordenarPor: '',    // '' | 'alfabetica' | 'nivel' | 'progresso' | 'categoria'
  _expandido: false,  // modo expandido (mais informações por palavra)

  // ── Render filtered word list ─────────────────────────────
  renderizar() {
    const listEl = document.getElementById('vocab-list');
    const statsEl = document.getElementById('vocab-stats');
    if (!listEl) return;

    const todos = App.estado.vocabCache;
    if (!todos || todos.length === 0) {
      // Empty state — nenhum vocabulário carregado
      listEl.innerHTML = `<div style="text-align:center;padding:2.5rem 1rem;color:var(--cor-inchiostro-claro)">
        <div style="font-size:2.5rem;margin-bottom:0.5rem">📚</div>
        <div style="font-weight:600;margin-bottom:0.3rem">No words yet</div>
        <div style="font-size:0.85rem;color:var(--cor-pietra)">Add words to your temples to build your vocabulary.</div>
      </div>`;
      if (statsEl) statsEl.textContent = '';
      return;
    }

    // Onboarding banner (primeira vez)
    if (!this._onboardingMostrado) {
      this._onboardingMostrado = true;
      setTimeout(() => {
        App.notificar('💡 Vocab tip: Use "Hide EN" or "Hide PT" to test yourself!', 'alerta');
      }, 800);
    }

    // Update origin pills active state
    const pillStyle = (active) => active
      ? 'padding:0.22rem 0.65rem;border-radius:999px;border:1.5px solid #7B68A0;background:#7B68A0;color:#fff;cursor:pointer;font-size:0.75rem;font-weight:600'
      : 'padding:0.22rem 0.65rem;border-radius:999px;border:1.5px solid #ddd;background:transparent;cursor:pointer;font-size:0.75rem;font-weight:600';
    const pT = document.getElementById('vocab-pill-todos');
    const pC = document.getElementById('vocab-pill-custom');
    const pN = document.getElementById('vocab-pill-nativo');
    if (pT) pT.style.cssText = pillStyle(this.filtroOrigem === '');
    if (pC) pC.style.cssText = pillStyle(this.filtroOrigem === 'custom');
    if (pN) pN.style.cssText = pillStyle(this.filtroOrigem === 'nativo');

    // Apply filters
    let filtrados = todos;

    if (this.filtroOrigem === 'custom') filtrados = filtrados.filter(p => p._custom || p.custom);
    if (this.filtroOrigem === 'nativo') filtrados = filtrados.filter(p => !p._custom && !p.custom);

    if (this.filtroTemplo) {
      const num = parseInt(this.filtroTemplo, 10);
      filtrados = filtrados.filter(p => p.templo_num === num);
    }

    if (this.filtroCategoria) {
      const cat = this.filtroCategoria.toLowerCase();
      filtrados = filtrados.filter(p => (p.categoria || '').toLowerCase() === cat);
    }

    if (this.filtroTexto) {
      const q = this.filtroTexto.toLowerCase().trim();
      filtrados = filtrados.filter(p =>
        (p.italiano || '').toLowerCase().includes(q) ||
        (p.portugues || '').toLowerCase().includes(q) ||
        (p.categoria || '').toLowerCase().includes(q)
      );
    }

    // Difficult words filter
    if (this.filtroDificeis) {
      filtrados = filtrados.filter(p => {
        const fsrs = App.estado.flashcardData[p.id];
        return fsrs && (fsrs.erros || 0) >= 3;
      });
    }

    // Favorites filter
    if (this.filtroFavoritos) {
      const favIds = (App.estado.progresso || {}).favoritos || [];
      filtrados = filtrados.filter(p => favIds.includes(p.id));
    }

    // NOVO: Ordenação
    if (this._ordenarPor) {
      filtrados = [...filtrados].sort((a, b) => {
        switch (this._ordenarPor) {
          case 'alfabetica':
            return (a.italiano || '').localeCompare(b.italiano || '', 'en');
          case 'categoria':
            return (a.categoria || '').localeCompare(b.categoria || '');
          case 'nivel': {
            const lvlA = (App.estado.templosData[a.templo_num]?.nivel || 'Z');
            const lvlB = (App.estado.templosData[b.templo_num]?.nivel || 'Z');
            return lvlA.localeCompare(lvlB);
          }
          case 'progresso': {
            const smA = App.estado.flashcardData[a.id];
            const smB = App.estado.flashcardData[b.id];
            const repsA = smA ? (smA.reps || smA.repeticoes || 0) : 0;
            const repsB = smB ? (smB.reps || smB.repeticoes || 0) : 0;
            return repsA - repsB; // menos estudadas primeiro
          }
          default:
            return 0;
        }
      });
    }

    // Count difficult words (for badge)
    const numDificeis = todos.filter(p => {
      const fsrs = App.estado.flashcardData[p.id];
      return fsrs && (fsrs.erros || 0) >= 3;
    }).length;
    const btnDif = document.getElementById('vocab-btn-dificeis');
    if (btnDif) {
      btnDif.classList.toggle('ativo', this.filtroDificeis);
      btnDif.innerHTML = numDificeis > 0
        ? `${I18n.t('vocab_dificeis')} <span class="dif-count">${numDificeis}</span>`
        : I18n.t('vocab_dificeis');
    }

    // Favorites badge
    const numFav = ((App.estado.progresso || {}).favoritos || []).length;
    const btnFav = document.getElementById('vocab-btn-favoritos');
    if (btnFav) {
      btnFav.classList.toggle('ativo', this.filtroFavoritos);
      btnFav.innerHTML = numFav > 0
        ? `${I18n.t('vocab_favoritos')} <span class="dif-count">${numFav}</span>`
        : I18n.t('vocab_favoritos');
    }

    // Stats line + botão estudar filtro
    if (statsEl) {
      const total = todos.length;
      const mostrando = Math.min(filtrados.length, 100);
      const textoStats = this.filtroDificeis
        ? I18n.t(filtrados.length !== 1 ? 'vocab_palavras_dificeis' : 'vocab_palavra_dificil').replace('{n}', filtrados.length)
        : filtrados.length === total
          ? I18n.t('vocab_palavras_total').replace('{n}', total)
          : I18n.t('vocab_resultados').replace('{m}', mostrando).replace('{f}', filtrados.length).replace('{t}', total);

      // Botão "estudar este filtro" só aparece quando há filtro ativo e resultados
      const temFiltro = this.filtroTexto || this.filtroTemplo || this.filtroCategoria || this.filtroDificeis || this.filtroFavoritos;
      const btnEstudar = (temFiltro && filtrados.length > 0)
        ? `<button onclick="Vocab.estudarFiltroAtual()" style="margin-left:0.5rem;padding:0.18rem 0.6rem;background:#9B2335;color:#fff;border:none;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer">${I18n.t('vocab_estudar_filtro')}</button>`
        : '';
      statsEl.innerHTML = `<span>${textoStats}</span>${btnEstudar}`;
    }

    // Limit display to 100
    const visivel = filtrados.slice(0, 100);

    if (visivel.length === 0) {
      // Empty state — filtro sem resultados
      const filtrosAtivos = [];
      if (this.filtroTexto) filtrosAtivos.push(`search: "${this.filtroTexto}"`);
      if (this.filtroTemplo) filtrosAtivos.push(`temple: ${this.filtroTemplo}`);
      if (this.filtroCategoria) filtrosAtivos.push(`category: ${this.filtroCategoria}`);
      if (this.filtroDificeis) filtrosAtivos.push('difficult words');
      if (this.filtroFavoritos) filtrosAtivos.push('favorites');
      listEl.innerHTML = `<div style="text-align:center;padding:2.5rem 1rem;color:var(--cor-inchiostro-claro)">
        <div style="font-size:2.5rem;margin-bottom:0.5rem">🔍</div>
        <div style="font-weight:600;margin-bottom:0.3rem">No words match your filters</div>
        <div style="font-size:0.85rem;color:var(--cor-pietra)">${filtrosAtivos.length > 0 ? 'Active filters: ' + filtrosAtivos.join(', ') : 'Try adjusting your filters'}</div>
        <button onclick="Vocab.limparFiltros()" style="margin-top:0.8rem;padding:0.4rem 1rem;background:var(--cor-veneziano);color:#fff;border:none;border-radius:8px;font-size:0.85rem;font-weight:600;cursor:pointer">Clear all filters</button>
      </div>`;
      return;
    }

    // NOVO: Estatísticas por categoria
    const cats = {};
    filtrados.forEach(p => {
      const cat = p.categoria || 'Uncategorized';
      cats[cat] = (cats[cat] || 0) + 1;
    });

    listEl.innerHTML = '';

    // NOVO: Modo expandido — mostra mais informações
    const modoExpandido = this._expandido;

    visivel.forEach((p, idx) => {
      const item = document.createElement('div');
      item.className = `vocab-item${modoExpandido ? ' vocab-item-expanded' : ''}`;
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'listitem');
      item.setAttribute('aria-label', `${p.italiano || ''} — ${p.portugues || ''}`);

      // Determine FSRS status
      const sm = App.estado.flashcardData[p.id];
      let sm2Icon = '🌱'; // new
      let sm2Pct = 0;
      if (sm) {
        const reps = sm.reps || sm.repeticoes || 0;
        const stability = sm.stability || 0;
        if ((reps >= 3) || (stability > 7)) { sm2Icon = '⭐'; sm2Pct = 100; }
        else if (reps > 0) { sm2Icon = '📚'; sm2Pct = Math.min(99, Math.round((reps / 3) * 100)); }
        else { sm2Pct = 0; }
      }
      const erros = sm ? (sm.erros || 0) : 0;

      // Temple data for level badge
      const temploData = App.estado.templosData[p.templo_num];
      const nivel = temploData ? temploData.nivel : '';

      // NOVO: Exemplo de uso (se disponível)
      const exemploHtml = p.exemplo
        ? `<div class="vocab-exemplo" style="font-size:0.78rem;color:var(--cor-pietra);font-style:italic;margin-top:0.2rem">"${this._escapar(p.exemplo)}"</div>`
        : '';

      // NOVO: Barra de progresso FSRS
      const progressoHtml = `<div class="vocab-progresso" style="width:40px;height:4px;background:#e0e0e0;border-radius:2px;margin-top:0.2rem;overflow:hidden"><div style="width:${sm2Pct}%;height:100%;background:${sm2Pct >= 100 ? '#27AE60' : sm2Pct > 0 ? '#F39C12' : '#ccc'};border-radius:2px;transition:width 0.3s"></div></div>`;

      // NOVO: Coluna categoria com cor
      const catCor = this._corParaCategoria(p.categoria);

      item.innerHTML = `
        <span class="vocab-it">${this._escapar(p.italiano || '—')}</span>
        <span class="vocab-seta">→</span>
        <span class="vocab-pt">${this._escapar(p.portugues || '—')}</span>
        ${p.categoria ? `<span class="vocab-cat-badge" style="${catCor ? 'border-left:3px solid ' + catCor + ';padding-left:4px' : ''}">${this._escapar(p.categoria)}</span>` : ''}
        ${nivel ? `<span class="vocab-nivel-badge">${this._escapar(nivel)}</span>` : ''}
        ${erros >= 3 ? `<span class="vocab-dif-badge" title="${erros} errors">⚠️ ${erros}</span>` : ''}
        ${App.ehFavorito(p.id) ? '<span class="vocab-fav-badge">❤️</span>' : ''}
        <span class="vocab-sm2-badge" title="${sm2Icon === '⭐' ? I18n.t('vocab_mastered') : sm2Icon === '📚' ? I18n.t('vocab_learning') : I18n.t('vocab_new')}">${sm2Icon}</span>
        ${progressoHtml}
        ${exemploHtml}
        ${p._custom ? `<button onclick="event.stopPropagation();IAImport.excluir('vocab','${p.id}')" class="ia-del-btn" title="Remove word" aria-label="Remove word">🗑️</button>` : ''}
      `;

      // Click: pronounce normally; in blur mode clicking blurred cell reveals it
      item.style.cursor = 'pointer';
      item.title = this.blurColuna ? I18n.t('fc_dica_revelar') : `${I18n.t('vocab_click_listen')} "${p.italiano}"`;
      item.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); } };
      if (this.blurColuna) {
        item.onclick = (e) => {
          const target = e.target.closest('.vocab-pt, .vocab-it');
          const isBluCol = (this.blurColuna === 'pt' && target?.classList.contains('vocab-pt'))
                        || (this.blurColuna === 'it' && target?.classList.contains('vocab-it'));
          if (isBluCol || !target) item.classList.toggle('revelada');
        };
      } else {
        item.onclick = () => App.pronunciar(p.italiano);
      }

      listEl.appendChild(item);
    });

    // Reapply blur class after re-render
    if (this.blurColuna) {
      listEl.classList.add(`blur-${this.blurColuna}`);
      const btnPt = document.getElementById('vocab-btn-blur-pt');
      const btnIt = document.getElementById('vocab-btn-blur-it');
      if (btnPt) btnPt.classList.toggle('ativo', this.blurColuna === 'pt');
      if (btnIt) btnIt.classList.toggle('ativo', this.blurColuna === 'it');
    }

    // Show "more results" hint if truncated
    if (filtrados.length > 100) {
      const more = document.createElement('p');
      more.style.cssText = 'text-align:center;color:#aaa;font-style:italic;padding:0.8rem;font-size:0.83rem;';
      more.textContent = I18n.t('vocab_e_mais').replace('{n}', filtrados.length - 100);
      listEl.appendChild(more);
    }
  },

  // ── Search handler ────────────────────────────────────────
  buscar(texto) {
    this.filtroTexto = texto;
    this.renderizar();
  },

  // ── Temple filter handler ─────────────────────────────────
  filtrarTemplo(valor) {
    this.filtroTemplo = valor;
    this.renderizar();
  },

  // ── Category filter handler ───────────────────────────────
  filtrarCategoria(valor) {
    this.filtroCategoria = valor;
    this.renderizar();
  },

  // ── Difficult words filter toggle ─────────────────────────
  toggleDificeis() {
    this.filtroDificeis  = !this.filtroDificeis;
    if (this.filtroDificeis) {
      this.filtroFavoritos = false;
      this.filtroTexto = this.filtroTemplo = this.filtroCategoria = '';
      ['vocab-busca','vocab-templo-filtro','vocab-categoria-filtro'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
      });
    }
    this.renderizar();
  },

  // ── Favorites filter toggle ───────────────────────────────
  toggleFavoritos() {
    this.filtroFavoritos = !this.filtroFavoritos;
    if (this.filtroFavoritos) {
      this.filtroDificeis  = false;
      this.filtroTexto = this.filtroTemplo = this.filtroCategoria = '';
      ['vocab-busca','vocab-templo-filtro','vocab-categoria-filtro'].forEach(id => {
        const el = document.getElementById(id); if (el) el.value = '';
      });
    }
    this.renderizar();
  },

  // ── Populate filter dropdowns ─────────────────────────────
  popularCategorias() {
    this._popularFiltroTemplo();
    this._popularFiltroCategoria();
  },

  _popularFiltroTemplo() {
    const sel = document.getElementById('vocab-templo-filtro');
    if (!sel) return;

    // Keep "Tutti i templi" option
    sel.innerHTML = `<option value="">${I18n.t('vocab_todos_templos')}</option>`;

    const desbloqueados = App.estado.progresso ? App.estado.progresso.templos_desbloqueados : [1];
    desbloqueados.forEach(num => {
      const data = App.estado.templosData[num];
      if (!data) return;
      const opt = document.createElement('option');
      opt.value = num;
      const nome = (App.TEMPLO_NOMES && App.TEMPLO_NOMES[num]) || data.nome || data.cidade || `Temple ${num}`;
      opt.textContent = `${num}. ${nome}`;
      sel.appendChild(opt);
    });
  },

  _popularFiltroCategoria() {
    const sel = document.getElementById('vocab-categoria-filtro');
    if (!sel) return;

    sel.innerHTML = `<option value="">${I18n.t('vocab_todas_cats')}</option>`;

    // Collect unique categories from vocab cache
    const categorias = new Set();
    (App.estado.vocabCache || []).forEach(p => {
      if (p.categoria) categorias.add(p.categoria);
    });

    // Sort alphabetically and add to dropdown
    [...categorias].sort().forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      sel.appendChild(opt);
    });
  },

  // ── Blur column toggle (self-test mode) ──────────────────
  toggleBlur(coluna) {
    // Se já está ativo nessa coluna → desativa; senão ativa
    this.blurColuna = this.blurColuna === coluna ? null : coluna;

    const listEl = document.getElementById('vocab-list');
    if (listEl) {
      listEl.classList.toggle('blur-pt', this.blurColuna === 'pt');
      listEl.classList.toggle('blur-it', this.blurColuna === 'it');
      // Resetar itens revelados ao trocar ou desativar
      listEl.querySelectorAll('.vocab-item.revelada').forEach(el => el.classList.remove('revelada'));
    }

    // Atualizar botões
    const btnPt = document.getElementById('vocab-btn-blur-pt');
    const btnIt = document.getElementById('vocab-btn-blur-it');
    if (btnPt) btnPt.classList.toggle('ativo', this.blurColuna === 'pt');
    if (btnIt) btnIt.classList.toggle('ativo', this.blurColuna === 'it');

    // Quando blur ativo, clicar no item revela aquela célula; clique normal pronuncia
    if (listEl) {
      listEl.querySelectorAll('.vocab-item').forEach(item => {
        item.onclick = this.blurColuna
          ? (e) => {
              // Não propaga se clicou na célula borrada → revela
              const target = e.target.closest('.vocab-pt, .vocab-it');
              const isBluCol = (this.blurColuna === 'pt' && target?.classList.contains('vocab-pt'))
                            || (this.blurColuna === 'it' && target?.classList.contains('vocab-it'));
              if (isBluCol || !target) {
                item.classList.toggle('revelada');
              }
            }
          : () => App.pronunciar(item.querySelector('.vocab-it')?.textContent || '');
      });
    }
  },

  // ── Escape HTML helper ────────────────────────────────────
  _escapar(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  },

  // ── NOVO: Cor por categoria ────────────────────────────────
  _coresCategorias: {},
  _coresDisponiveis: ['#1a5276','#117a65','#7d3c98','#c0392b','#d4a017','#2e86c1','#28b463','#8e44ad','#e67e22','#2c3e50'],
  _corCatIdx: 0,
  _corParaCategoria(cat) {
    if (!cat) return '';
    const key = cat.toLowerCase();
    if (!this._coresCategorias[key]) {
      this._coresCategorias[key] = this._coresDisponiveis[this._corCatIdx % this._coresDisponiveis.length];
      this._corCatIdx++;
    }
    return this._coresCategorias[key];
  },

  // ── Clear all filters ──────────────────────────────────────
  limparFiltros() {
    this.filtroTexto = '';
    this.filtroTemplo = '';
    this.filtroCategoria = '';
    this.filtroOrigem = '';
    this.filtroDificeis = false;
    this.filtroFavoritos = false;
    ['vocab-busca','vocab-templo-filtro','vocab-categoria-filtro'].forEach(id => {
      const el = document.getElementById(id); if (el) el.value = '';
    });
    this.renderizar();
  },

  // ── Inicia flashcards com as palavras do filtro atual ───────
  estudarFiltroAtual() {
    const todos = App.estado.vocabCache;
    let filtrados = todos;
    if (this.filtroTemplo) {
      const num = parseInt(this.filtroTemplo, 10);
      filtrados = filtrados.filter(p => p.templo_num === num);
    }
    if (this.filtroCategoria) {
      const cat = this.filtroCategoria.toLowerCase();
      filtrados = filtrados.filter(p => (p.categoria||'').toLowerCase() === cat);
    }
    if (this.filtroTexto) {
      const q = this.filtroTexto.toLowerCase().trim();
      filtrados = filtrados.filter(p =>
        (p.italiano||'').toLowerCase().includes(q) ||
        (p.portugues||'').toLowerCase().includes(q)
      );
    }
    if (this.filtroDificeis) {
      filtrados = filtrados.filter(p => {
        const f = App.estado.flashcardData[p.id];
        return f && (f.erros||0) >= 3;
      });
    }
    if (this.filtroFavoritos) {
      const favIds = (App.estado.progresso||{}).favoritos||[];
      filtrados = filtrados.filter(p => favIds.includes(p.id));
    }
    if (filtrados.length === 0) return;

    // Shuffle e cap 30
    const embaralhado = [...filtrados].sort(() => Math.random() - 0.5).slice(0, 30);

    App.navegar('flashcard');
    if (typeof Flashcards === 'undefined') return;

    Flashcards.temploAtual      = null;
    Flashcards.praticandoTodas  = false;
    Flashcards.sessaoStats      = { again:0, hard:0, good:0, easy:0, xp:0, novas:[] };
    Flashcards.cartasDisponiveis = embaralhado;
    Flashcards.indiceAtual      = 0;
    Flashcards.virada           = false;
    if (!Flashcards._swipeInitialized) { Flashcards._iniciarSwipe(); Flashcards._swipeInitialized = true; }

    const vazio = document.getElementById('flashcard-vazio');
    const resumo = document.getElementById('flashcard-resumo');
    const cardEl = document.getElementById('flashcard');
    const actions = document.getElementById('card-actions');
    if (vazio)   vazio.style.display   = 'none';
    if (resumo)  resumo.style.display  = 'none';
    if (cardEl)  cardEl.style.display  = '';
    if (actions) actions.style.display = 'none';

    App.notificar(I18n.t('vocab_parole_filtro').replace('{n}', embaralhado.length), 'alerta');
    Flashcards.mostrarCarta();
  }
};

document.addEventListener('i18n:changed', () => {
  if (document.getElementById('vocab-list')) Vocab.renderizar();
});
