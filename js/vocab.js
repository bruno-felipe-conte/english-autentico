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
  _modoOutput: false, // modo digitar tradução (output produtivo)
  _vocabReviewAtivo: false, // sessão SRS de vocabulário ativa
  _verbReviewCards: [], // cartas atuais do vocab review
  _verbReviewIndex: 0,
  _vocabXP: 0,         // XP ganho na sessão atual
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
        this._buscaFuzzy(p.italiano || '', q) ||
        this._buscaFuzzy(p.portugues || '', q) ||
        this._buscaFuzzy(p.categoria || '', q)
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

    // Stats line + botão estudar filtro + chips ativos + exportar
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

      // Chips de filtros ativos
      const chips = [];
      if (this.filtroTexto) chips.push(`<span class="vocab-chip" style="display:inline-flex;align-items:center;gap:0.25rem;background:#E8D5F5;color:#5B2C8E;border-radius:999px;padding:0.15rem 0.5rem;font-size:0.72rem;font-weight:600">🔍 "${this._escapar(this.filtroTexto)}" <button onclick="Vocab.filtroTexto='';Vocab.renderizar();" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:#5B2C8E;padding:0 0.1rem" aria-label="Remover busca">✕</button></span>`);
      if (this.filtroTemplo) {
        const nomeTemplo = (App.TEMPLO_NOMES && App.TEMPLO_NOMES[parseInt(this.filtroTemplo)]) || `Templo ${this.filtroTemplo}`;
        chips.push(`<span class="vocab-chip" style="display:inline-flex;align-items:center;gap:0.25rem;background:#D4E6F1;color:#1A5276;border-radius:999px;padding:0.15rem 0.5rem;font-size:0.72rem;font-weight:600">⛩️ ${this._escapar(nomeTemplo)} <button onclick="Vocab.filtroTemplo='';Vocab.renderizar();" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:#1A5276;padding:0 0.1rem" aria-label="Remover filtro templo">✕</button></span>`);
      }
      if (this.filtroCategoria) chips.push(`<span class="vocab-chip" style="display:inline-flex;align-items:center;gap:0.25rem;background:#D5F5E3;color:#117A65;border-radius:999px;padding:0.15rem 0.5rem;font-size:0.72rem;font-weight:600">🏷️ ${this._escapar(this.filtroCategoria)} <button onclick="Vocab.filtroCategoria='';Vocab.renderizar();" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:#117A65;padding:0 0.1rem" aria-label="Remover filtro categoria">✕</button></span>`);
      if (this.filtroDificeis) chips.push(`<span class="vocab-chip" style="display:inline-flex;align-items:center;gap:0.25rem;background:#FADBD8;color:#922B21;border-radius:999px;padding:0.15rem 0.5rem;font-size:0.72rem;font-weight:600">⚠️ Difíceis <button onclick="Vocab.toggleDificeis();" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:#922B21;padding:0 0.1rem" aria-label="Remover filtro difíceis">✕</button></span>`);
      if (this.filtroFavoritos) chips.push(`<span class="vocab-chip" style="display:inline-flex;align-items:center;gap:0.25rem;background:#FDEBD0;color:#CA6F1E;border-radius:999px;padding:0.15rem 0.5rem;font-size:0.72rem;font-weight:600">❤️ Favoritos <button onclick="Vocab.toggleFavoritos();" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:#CA6F1E;padding:0 0.1rem" aria-label="Remover filtro favoritos">✕</button></span>`);
      if (this.filtroOrigem === 'custom') chips.push(`<span class="vocab-chip" style="display:inline-flex;align-items:center;gap:0.25rem;background:#E8DAEF;color:#6C3483;border-radius:999px;padding:0.15rem 0.5rem;font-size:0.72rem;font-weight:600">➕ Custom <button onclick="Vocab.filtroOrigem='';Vocab.renderizar();" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:#6C3483;padding:0 0.1rem" aria-label="Remover filtro origem">✕</button></span>`);
      if (this.filtroOrigem === 'nativo') chips.push(`<span class="vocab-chip" style="display:inline-flex;align-items:center;gap:0.25rem;background:#D4EFDF;color:#1E8449;border-radius:999px;padding:0.15rem 0.5rem;font-size:0.72rem;font-weight:600">📦 Nativo <button onclick="Vocab.filtroOrigem='';Vocab.renderizar();" style="background:none;border:none;cursor:pointer;font-size:0.7rem;color:#1E8449;padding:0 0.1rem" aria-label="Remover filtro origem">✕</button></span>`);

      const chipsHtml = chips.length > 0
        ? `<div style="margin-top:0.4rem;display:flex;flex-wrap:wrap;gap:0.35rem">${chips.join('')}</div>`
        : '';

      // Botão exportar + compartilhar
      const btnExportar = filtrados.length > 0
        ? `<button onclick="Vocab.exportarLista()" style="margin-left:0.5rem;padding:0.18rem 0.6rem;background:#1A5276;color:#fff;border:none;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer" title="Exportar lista filtrada">📥 Exportar</button>`
        : '';

      const btnCompartilhar = (App.estado.vocabCache || []).length > 0
        ? `<button onclick="Vocab.compartilharLista()" style="margin-left:0.4rem;padding:0.18rem 0.6rem;background:#7D3C98;color:#fff;border:none;border-radius:6px;font-size:0.72rem;font-weight:700;cursor:pointer" title="Compartilhar estatísticas">📤</button>`
        : '';

      statsEl.innerHTML = `<span>${textoStats}</span>${btnEstudar}${btnExportar}${btnCompartilhar}${chipsHtml}`;
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

    // Estatísticas por categoria
    const cats = {};
    filtrados.forEach(p => {
      const cat = p.categoria || 'Sem categoria';
      cats[cat] = (cats[cat] || 0) + 1;
    });

    listEl.innerHTML = '';

    // Modo expandido — mostra mais informações
    const modoExpandido = this._expandido;

    // Agrupamento por categoria (se ativado)
    const agrupado = this._agruparPorCategoria;
    let catAtual = '';

    visivel.forEach((p, idx) => {
      // Inserir header de categoria se agrupado
      if (agrupado && (p.categoria || 'Sem categoria') !== catAtual) {
        catAtual = p.categoria || 'Sem categoria';
        const catCor = this._corParaCategoria(catAtual);
        const header = document.createElement('div');
        header.className = 'vocab-cat-header';
        header.style.cssText = `padding:0.5rem 0.8rem;margin-top:0.6rem;font-weight:700;font-size:0.85rem;color:${catCor};border-bottom:2px solid ${catCor};border-radius:4px 4px 0 0;background:${catCor}15`;
        header.textContent = `${catAtual} (${cats[catAtual] || 0})`;
        header.setAttribute('role', 'heading');
        header.setAttribute('aria-level', '3');
        listEl.appendChild(header);
      }
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
        ${modoExpandido ? this.renderizarWordFamilies(p.italiano || '') : ''}
        ${modoExpandido ? `<div class="vocab-fonetica" style="font-size:0.72rem;color:var(--cor-pietra);margin-top:0.15rem;font-style:italic">/${this._fonSimplificada(p.italiano || '')}/</div>` : ''}
        ${this._modoOutput && !this._vocabReviewAtivo ? `<div style="margin-top:0.4rem"><input type="text" placeholder="Digite a tradução..." style="padding:0.3rem 0.6rem;border:2px solid #ddd;border-radius:6px;font-size:0.85rem;width:160px;outline:none" autocomplete="off" autocapitalize="none" onkeydown="if(event.key==='Enter'){Vocab._verificarOutput(this,'${p.id}')}" data-word-id="${p.id}"></div>` : ''}
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

  // ── NOVO: Exportar lista filtrada ───────────────────────────
  exportarLista(formato = 'json') {
    const todos = App.estado.vocabCache;
    let filtrados = todos;
    // Aplicar mesmos filtros do renderizar()
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
        (p.portugues || '').toLowerCase().includes(q)
      );
    }
    if (this.filtroDificeis) {
      filtrados = filtrados.filter(p => {
        const f = App.estado.flashcardData[p.id];
        return f && (f.erros || 0) >= 3;
      });
    }
    if (this.filtroFavoritos) {
      const favIds = (App.estado.progresso || {}).favoritos || [];
      filtrados = filtrados.filter(p => favIds.includes(p.id));
    }

    if (filtrados.length === 0) {
      App.notificar('Nenhuma palavra para exportar.', 'alerta');
      return;
    }

    let conteudo, mimeType, extensao;
    if (formato === 'txt') {
      conteudo = filtrados.map((p, i) =>
        `${i + 1}. ${p.italiano} → ${p.portugues}${p.categoria ? ' [' + p.categoria + ']' : ''}${p.exemplo ? ' — ' + p.exemplo : ''}`
      ).join('\n');
      mimeType = 'text/plain;charset=utf-8';
      extensao = 'txt';
    } else {
      conteudo = JSON.stringify(filtrados.map(p => ({
        italiano: p.italiano,
        portugues: p.portugues,
        categoria: p.categoria || '',
        templo: p.templo_num,
        exemplo: p.exemplo || ''
      })), null, 2);
      mimeType = 'application/json;charset=utf-8';
      extensao = 'json';
    }

    const blob = new Blob([conteudo], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vocab_${this.filtroCategoria || 'lista'}_${new Date().toISOString().slice(0, 10)}.${extensao}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    App.notificar(`✅ Exportadas ${filtrados.length} palavras!`, 'sucesso');
  },

  // ── NOVO: Dashboard de estatísticas por categoria ──────────
  estatisticasCategoria() {
    const todos = App.estado.vocabCache || [];
    const cats = {};
    todos.forEach(p => {
      const cat = p.categoria || 'Sem categoria';
      if (!cats[cat]) cats[cat] = { total: 0, dominadas: 0, aprendendo: 0, novas: 0, dificeis: 0 };
      cats[cat].total++;
      const sm = App.estado.flashcardData[p.id];
      const reps = sm ? (sm.reps || sm.repeticoes || 0) : 0;
      const erros = sm ? (sm.erros || 0) : 0;
      if (reps >= 3) cats[cat].dominadas++;
      else if (reps > 0) cats[cat].aprendendo++;
      else cats[cat].novas++;
      if (erros >= 3) cats[cat].dificeis++;
    });
    return cats;
  },

  renderizarEstatisticasCategoria() {
    const container = document.getElementById('vocab-categoria-stats');
    if (!container) return;
    const cats = this.estatisticasCategoria();
    const ordenadas = Object.entries(cats).sort((a, b) => b[1].total - a[1].total);
    const maxTotal = Math.max(...ordenadas.map(c => c[1].total), 1);

    container.innerHTML = ordenadas.map(([cat, stats]) => {
      const pct = Math.round((stats.dominadas / stats.total) * 100);
      const cor = this._corParaCategoria(cat);
      return `<div style="margin-bottom:0.6rem">
        <div style="display:flex;justify-content:space-between;font-size:0.78rem;margin-bottom:0.2rem">
          <span style="font-weight:600;color:${cor}">${this._escapar(cat)}</span>
          <span style="color:var(--cor-pietra)">${stats.dominadas}/${stats.total} (${pct}%)</span>
        </div>
        <div style="background:#e8e8e8;border-radius:4px;height:8px;overflow:hidden;display:flex">
          <div style="width:${pct}%;background:#27AE60;transition:width 0.4s" title="Dominadas"></div>
          <div style="width:${Math.round((stats.aprendendo / stats.total) * 100)}%;background:#F39C12;transition:width 0.4s" title="Aprendendo"></div>
          <div style="width:${Math.round((stats.novas / stats.total) * 100)}%;background:#bdc3c7;transition:width 0.4s" title="Novas"></div>
        </div>
        ${stats.dificeis > 0 ? `<div style="font-size:0.68rem;color:#C0392B;margin-top:0.15rem">⚠️ ${stats.dificeis} difíceis</div>` : ''}
      </div>`;
    }).join('');
  },

  // ── NOVO: Agrupamento por categoria ────────────────────────
  _agruparPorCategoria: false,
  alternarAgrupamento() {
    this._agruparPorCategoria = !this._agruparPorCategoria;
    this.renderizar();
  },

  // ── NOVO: Busca fuzzy (tolerância a erros de digitação) ──
  _buscaFuzzy(texto, termo) {
    if (!termo) return true;
    const t = termo.toLowerCase().trim();
    const alvo = texto.toLowerCase();
    if (alvo.includes(t)) return true;
    // Distância de Levenshtein simplificada para termos curtos
    if (t.length >= 3 && t.length <= 12) {
      const palavras = alvo.split(/\s+/);
      for (const palavra of palavras) {
        if (this._levenshtein(palavra, t) <= Math.floor(t.length / 3)) return true;
      }
    }
    return false;
  },
  _levenshtein(a, b) {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    matrix[0] = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }
    return matrix[a.length][b.length];
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
        this._buscaFuzzy(p.italiano || '', q) ||
        this._buscaFuzzy(p.portugues || '', q)
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
  },

  // ── SRS Vocab Review (micro-sessões próprias) ────────────
  iniciarVocabReview() {
    const todos = App.estado.vocabCache;
    let candidatas = todos;

    // Priorizar palavras com erros ou que nunca foram estudadas
    const comDados = candidatas.filter(p => {
      const sm = App.estado.flashcardData[p.id];
      return sm && (sm.reps || 0) < 3;
    });
    const semDados = candidatas.filter(p => !App.estado.flashcardData[p.id]);

    // Intercalar: 70% palavras não estudadas/revisando, 30% revisão espaçada
    const naoEstudadas = semDados.length > 0 ? semDados : comDados;
    const revisando = comDados.filter(p => {
      const sm = App.estado.flashcardData[p.id];
      return sm && (sm.reps || 0) > 0 && (sm.reps || 0) < 3;
    });

    const cards = [
      ...naoEstudadas.slice(0, 15),
      ...revisando.slice(0, 5)
    ].sort(() => Math.random() - 0.5).slice(0, 20);

    if (cards.length === 0) {
      App.notificar('🎉 Você já dominou todo o vocabulário desta seleção!', 'sucesso');
      return;
    }

    this._vocabReviewAtivo = true;
    this._vocabReviewCards = cards;
    this._vocabReviewIndex = 0;
    this._vocabXP = 0;
    this._renderizarVocabReview();
  },

  _renderizarVocabReview() {
    const listEl = document.getElementById('vocab-list');
    const statsEl = document.getElementById('vocab-stats');
    if (!listEl) return;

    const cards = this._vocabReviewCards;
    const idx = this._vocabReviewIndex;
    const total = cards.length;

    if (idx >= total) {
      // Sessão completa
      this._vocabReviewAtivo = false;
      const xpTotal = this._vocabXP;
      const acertos = Math.round(xpTotal / 10);
      listEl.innerHTML = `
        <div style="text-align:center;padding:2.5rem 1rem">
          <div style="font-size:3rem;margin-bottom:0.5rem">🎉</div>
          <div style="font-weight:700;font-size:1.1rem;margin-bottom:0.5rem">Sessão Completa!</div>
          <div style="color:var(--cor-pietra);margin-bottom:0.8rem">${acertos}/${total} palavras corretas • +${xpTotal} XP</div>
          <button onclick="Vocab.iniciarVocabReview()" style="padding:0.5rem 1.2rem;background:#27AE60;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;margin-right:0.5rem">Estudar mais</button>
          <button onclick="Vocab._vocabReviewAtivo=false;Vocab.renderizar();" style="padding:0.5rem 1.2rem;background:#aaa;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer">Voltar</button>
        </div>`;
      if (statsEl) statsEl.innerHTML = `<span>✅ Revisão concluída (+${xpTotal} XP)</span>`;
      // Atualizar streak
      this._atualizarStreakVocab();
      return;
    }

    const card = cards[idx];
    const sm = App.estado.flashcardData[card.id];
    const reps = sm ? (sm.reps || 0) : 0;
    const nivel = (App.estado.templosData[card.templo_num] || {}).nivel || '';
    const catCor = this._corParaCategoria(card.categoria);

    // Modo output produtivo: mostrar IT e pedir PT
    listEl.innerHTML = `
      <div style="text-align:center;padding:1rem 0.5rem 0.3rem;font-size:0.78rem;color:var(--cor-pietra)">
        Vocab Review — ${idx + 1}/${total} • +${this._vocabXP} XP
      </div>
      <div style="text-align:center;padding:1.5rem">
        <div style="display:inline-block;padding:1.5rem 2.5rem;border-radius:12px;background:var(--cor-card);border-left:4px solid ${catCor};box-shadow:0 2px 8px rgba(0,0,0,0.08);max-width:350px">
          <div style="font-size:0.7rem;color:var(--cor-pietra);margin-bottom:0.5rem">${card.categoria || ''} ${nivel ? '• ' + nivel : ''}</div>
          <div style="font-size:1.5rem;font-weight:700;margin-bottom:0.8rem">${this._escapar(card.italiano || '')}</div>
          <div class="vocab-review-resposta" style="min-height:2.5rem"></div>
          <div class="vocab-review-input" style="display:flex;gap:0.5rem;justify-content:center;margin-top:0.5rem">
            <input type="text" id="vocab-review-answer" placeholder="Digite a tradução..."
              style="padding:0.5rem 0.8rem;border:2px solid #ddd;border-radius:8px;font-size:0.95rem;width:220px;outline:none;box-sizing:border-box"
              autocomplete="off" autocapitalize="none" spellcheck="false"
              onkeydown="if(event.key==='Enter')Vocab._verificarVocabReview()">
            <button onclick="Vocab._verificarVocabReview()" style="padding:0.5rem 1rem;background:#27AE60;color:#fff;border:none;border-radius:8px;font-weight:700;cursor:pointer">✓</button>
          </div>
          <div class="vocab-review-feedback" style="margin-top:0.5rem;min-height:1.5rem;font-weight:600"></div>
          <div style="margin-top:0.8rem;display:flex;gap:0.4rem;justify-content:center">
            <button onclick="Vocab._responderVocabReview('again')" style="padding:0.3rem 0.8rem;background:#E74C3C;color:#fff;border:none;border-radius:6px;font-size:0.75rem;cursor:pointer;display:none" id="btn-vr-again">😕 Errei</button>
            <button onclick="Vocab._responderVocabReview('hard')" style="padding:0.3rem 0.8rem;background:#F39C12;color:#fff;border:none;border-radius:6px;font-size:0.75rem;cursor:pointer;display:none" id="btn-vr-hard">😐 Difícil</button>
            <button onclick="Vocab._responderVocabReview('good')" style="padding:0.3rem 0.8rem;background:#27AE60;color:#fff;border:none;border-radius:6px;font-size:0.75rem;cursor:pointer;display:none" id="btn-vr-good">😊 Certo</button>
          </div>
        </div>
      </div>`;
    setTimeout(() => {
      const inp = document.getElementById('vocab-review-answer');
      if (inp) inp.focus();
    }, 100);

    if (statsEl) statsEl.innerHTML = '';
  },

  _verificarVocabReview() {
    const input = document.getElementById('vocab-review-answer');
    if (!input) return;
    const resposta = input.value.trim().toLowerCase();
    const card = this._vocabReviewCards[this._vocabReviewIndex];
    const correto = (card.portugues || '').toLowerCase().trim();

    // Verificar se está correto (aceitar variações com/sem artigo)
    const acertou = resposta === correto ||
      resposta === correto.replace(/^o |^a |^os |^as |^um |^uma /, '') ||
      correto.split('/').some(alt => resposta === alt.trim().replace(/^o |^a |^os |^as |^um |^uma /, ''));

    const feedback = document.querySelector('.vocab-review-feedback');
    const respostaEl = document.querySelector('.vocab-review-resposta');
    const buttons = document.querySelectorAll('[id^="btn-vr-"]');

    if (acertou) {
      if (feedback) feedback.textContent = '✅ Correto!';
      if (feedback) feedback.style.color = '#27AE60';
      if (respostaEl) respostaEl.innerHTML = `<span style="color:#27AE60;font-weight:700">${this._escapar(card.portugues || '')}</span>`;
      this._vocabXP += 10;
    } else {
      if (feedback) feedback.textContent = `❌ Correto: ${card.portugues}`;
      if (feedback) feedback.style.color = '#E74C3C';
      if (respostaEl) respostaEl.innerHTML = `<span style="color:#E74C3C;font-weight:700">${this._escapar(card.portugues || '')}</span>`;
    }

    buttons.forEach(b => b.style.display = 'inline-block');
    input.disabled = true;
  },

  _responderVocabReview(qualidade) {
    const card = this._vocabReviewCards[this._vocabReviewIndex];
    const sm = App.estado.flashcardData[card.id] || { reps: 0, erros: 0 };

    if (!App.estado.flashcardData[card.id]) {
      App.estado.flashcardData[card.id] = { reps: 0, erros: 0 };
    }

    if (qualidade === 'again') {
      App.estado.flashcardData[card.id].erros = (sm.erros || 0) + 1;
      App.estado.flashcardData[card.id].reps = 0;
    } else if (qualidade === 'hard') {
      App.estado.flashcardData[card.id].reps = (sm.reps || 0) + 1;
      this._vocabXP += 5;
    } else {
      App.estado.flashcardData[card.id].reps = (sm.reps || 0) + 1;
      this._vocabXP += 10;
    }

    // Salvar no localStorage
    try {
      localStorage.setItem('en_flashcards', JSON.stringify(App.estado.flashcardData));
    } catch (_) {}

    this._vocabReviewIndex++;
    this._renderizarVocabReview();
  },

  // ── Vocab Streak ──────────────────────────────────────────
  _atualizarStreakVocab() {
    const hoje = new Date().toISOString().slice(0, 10);
    const prog = App.estado.progresso || {};
    const ultimoDia = prog.vocab_streak_ultimo || '';
    const streakAtual = prog.vocab_streak || 0;

    if (ultimoDia === hoje) return; // Já contabilizado hoje

    const ontem = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let novoStreak;
    if (ultimoDia === ontem) {
      novoStreak = streakAtual + 1;
    } else {
      novoStreak = 1;
    }

    App.estado.progresso.vocab_streak = novoStreak;
    App.estado.progresso.vocab_streak_ultimo = hoje;
    try {
      localStorage.setItem('en_progresso', JSON.stringify(App.estado.progresso));
    } catch (_) {}

    // Verificar conquistas
    this._verificarConquistasVocab(novoStreak);
  },

  _verificarConquistasVocab(streak) {
    const prog = App.estado.progresso || {};
    const conquistas = prog.vocab_conquistas || [];
    const novasConquistas = [];

    if (streak >= 3 && !conquistas.includes('streak3')) novasConquistas.push('streak3');
    if (streak >= 7 && !conquistas.includes('streak7')) novasConquistas.push('streak7');
    if (streak >= 30 && !conquistas.includes('streak30')) novasConquistas.push('streak30');

    const totalDominadas = Object.values(App.estado.flashcardData).filter(d => (d.reps || 0) >= 3).length;
    if (totalDominadas >= 10 && !conquistas.includes('dominou10')) novasConquistas.push('dominou10');
    if (totalDominadas >= 50 && !conquistas.includes('dominou50')) novasConquistas.push('dominou50');
    if (totalDominadas >= 100 && !conquistas.includes('dominou100')) novasConquistas.push('dominou100');

    if (novasConquistas.length > 0) {
      App.estado.progresso.vocab_conquistas = [...conquistas, ...novasConquistas];
      try {
        localStorage.setItem('en_progresso', JSON.stringify(App.estado.progresso));
      } catch (_) {}
      // Notificar conquistas
      const labels = {
        streak3: '🔥 3 dias de vocabulário!',
        streak7: '🔥🔥 1 semana de vocabulário!',
        streak30: '🏆 1 mês de vocabulário!',
        dominou10: '⭐ 10 palavras dominadas!',
        dominou50: '⭐⭐ 50 palavras dominadas!',
        dominou100: '🏅 100 palavras dominadas!'
      };
      novasConquistas.forEach(c => {
        App.notificar(`🏆 Conquista: ${labels[c] || c}`, 'sucesso');
      });
    }
  },

  // ── Modo Output Produtivo (toggle) ────────────────────────
  alternarModoOutput() {
    this._modoOutput = !this._modoOutput;
    this.renderizar();
  },

  // ── Colocações / Contexto ─────────────────────────────────
  _buscarColocacoes(palavra) {
    // Busca no dialogi e storie por frases que contêm a palavra
    const colocacoes = [];
    if (App.estado.dialoghi) {
      Object.values(App.estado.dialoghi).forEach(d => {
        if (d.frasi) {
          d.frasi.forEach(f => {
            if ((f.it || '').toLowerCase().includes(palavra.toLowerCase())) {
              colocacoes.push({ tipo: 'dialogo', texto: f.it, trad: f.pt || '' });
            }
          });
        }
      });
    }
    return colocacoes.slice(0, 3); // Máximo 3 colocações
  },

  // ── Word Families (agrupamento morfológico) ───────────────
  wordFamilies(palavra) {
    const families = {
      'giocare': ['giocare', 'gioco', 'giocatore', 'giocattolo', 'giocherebbe'],
      'mangiare': ['mangiare', 'mangio', 'mangiato', 'mangiatore', 'mangiabile'],
      'parlare': ['parlare', 'parlo', 'parlato', 'parlante', 'parlamento'],
      'leggere': ['leggere', 'leggo', 'letto', 'lettore', 'leggibile'],
      'scrivere': ['scrivere', 'scrivo', 'scritto', 'scrittore', 'scrivibile'],
      'correre': ['correre', 'corro', 'corso', 'corridore', 'corribile'],
      'dormire': ['dormire', 'dormo', 'dormito', 'dormiente', 'dormiglione'],
      'lavorare': ['lavorare', 'lavoro', 'lavorato', 'lavoratore', 'lavorativo'],
      'studiare': ['studiare', 'studio', 'studiato', 'studioso', 'studiante'],
      'pensare': ['pensare', 'penso', 'pensato', 'pensatore', 'pensieroso'],
      'vedere': ['vedere', 'vedo', 'visto', 'vedente', 'vedetta'],
      'sentire': ['sentire', 'sento', 'sentito', 'sentimento', 'sensibile'],
      'capire': ['capire', 'capisco', 'capito', 'capiente', 'incomprensibile'],
      'prendere': ['prendere', 'prendo', 'preso', 'prenditore', 'prendibile'],
      'dare': ['dare', 'do', 'dato', 'datore', 'dabile'],
      'fare': ['fare', 'faccio', 'fatto', 'fattore', 'fattibile'],
      'andare': ['andare', 'vado', 'andato', 'andatura', 'andante'],
      'venire': ['venire', 'vengo', 'venuto', 'venuta', 'prevenire'],
      'stare': ['stare', 'sto', 'stato', 'stante', 'stabile'],
      'avere': ['avere', 'ho', 'avuto', 'avente', 'avanzare'],
      'essere': ['essere', 'sono', 'stato', 'essenza', 'essenziale'],
    };
    const base = palavra.toLowerCase().replace(/are$|ere$|ire$/, '');
    for (const [key, family] of Object.entries(families)) {
      const keyBase = key.replace(/are$|ere$|ire$/, '');
      if (keyBase === base || family.some(w => w.toLowerCase().startsWith(base))) {
        return family;
      }
    }
    return [];
  },

  renderizarWordFamilies(palavra) {
    const family = this.wordFamilies(palavra);
    if (family.length <= 1) return '';
    const outros = family.filter(w => w.toLowerCase() !== palavra.toLowerCase());
    return `<div class="vocab-wordfamily" style="font-size:0.72rem;color:var(--cor-pietra);margin-top:0.2rem">
      <span style="font-weight:600">Família:</span> ${outros.map(w => `<span style="background:#f0f0f0;padding:0.1rem 0.3rem;border-radius:3px;margin-right:0.2rem">${this._escapar(w)}</span>`).join('')}
    </div>`;
  },

  // ── Daily Quest de Vocabulário ────────────────────────────
  dailyQuestVocab() {
    const prog = App.estado.progresso || {};
    const hoje = new Date().toISOString().slice(0, 10);
    const questData = prog.vocab_daily_quest || {};

    if (questData.data === hoje) {
      return questData; // Já gerada hoje
    }

    // Gerar nova quest
    const todos = App.estado.vocabCache;
    const palavras = todos.sort(() => Math.random() - 0.5).slice(0, 5);
    const quest = {
      data: hoje,
      palavras: palavras.map(p => p.id),
      completadas: 0,
      total: palavras.length,
      xpRecompensa: 25,
      tipo: 'vocab'
    };

    App.estado.progresso.vocab_daily_quest = quest;
    try {
      localStorage.setItem('en_progresso', JSON.stringify(App.estado.progresso));
    } catch (_) {}

    return quest;
  },

  renderizarDailyQuest() {
    const quest = this.dailyQuestVocab();
    const container = document.getElementById('vocab-daily-quest');
    if (!container) return;

    const pct = quest.total > 0 ? Math.round((quest.completadas / quest.total) * 100) : 0;
    const concluida = quest.completadas >= quest.total;

    container.innerHTML = `
      <div style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:12px;padding:1rem;color:#fff;margin-bottom:0.8rem">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
          <span style="font-weight:700;font-size:0.9rem">🎯 Daily Quest</span>
          <span style="font-size:0.75rem;opacity:0.9">${quest.completadas}/${quest.total}</span>
        </div>
        <div style="background:rgba(255,255,255,0.2);border-radius:4px;height:6px;overflow:hidden;margin-bottom:0.5rem">
          <div style="width:${pct}%;background:#fff;height:100%;border-radius:4px;transition:width 0.4s"></div>
        </div>
        <div style="font-size:0.75rem;opacity:0.9">
          ${concluida ? '✅ Completa! +' + quest.xpRecompensa + ' XP' : 'Estude ' + quest.total + ' palavras para ganhar ' + quest.xpRecompensa + ' XP'}
        </div>
      </div>`;
  },

  // ── Pronúncia Fonética simplificada ───────────────────────
  _fonSimplificada(palavra) {
    // Transcrição fonética simplificada para italiano
    const regras = [
      [/^gn/, 'ɲ'], [/^gl/, 'ʎ'], [/^sc(?=[ie])/, 'ʃ'],
      [/^c(?=[ie])/, 'tʃ'], [/^ch(?=[ei])/, 'k'], [/^gh(?=[ei])/, 'g'],
      [/^c(?=[aou])/, 'k'], [/^g(?=[aou])/, 'g'], [/^g(?=[ie])/, 'dʒ'],
      [/^z/, 'dz'], [/^s(?=[bcdfgmpqtvz])/, 'z'], [/^s(?=[aeiou])/, 's'],
      [/ci(?=[aou])/, 'tʃi'], [/gi(?=[aou])/, 'dʒi'], [/li(?=[aou])/, 'ʎi'],
      [/ni(?=[aou])/, 'ɲi'], [/^h/, ''], [/^(?=[aeiou])/, ''],
    ];
    let result = palavra.toLowerCase();
    regras.forEach(([pattern, replacement]) => {
      result = result.replace(pattern, replacement);
    });
    return result;
  },

  // ── Verificar Output Produtivo (digitar tradução) ──────────
  _verificarOutput(inputEl, palavraId) {
    const resposta = inputEl.value.trim().toLowerCase();
    const palavra = (App.estado.vocabCache || []).find(p => p.id == palavraId);
    if (!palavra) return;
    const correto = (palavra.portugues || '').toLowerCase().trim();
    const acertou = resposta === correto ||
      resposta === correto.replace(/^o |^a |^os |^as |^um |^uma /, '') ||
      correto.split('/').some(alt => resposta === alt.trim());

    if (acertou) {
      inputEl.style.borderColor = '#27AE60';
      inputEl.style.background = '#f0fff0';
      inputEl.placeholder = '✅ Correto!';
      // Atualizar flashcard data
      if (!App.estado.flashcardData[palavraId]) App.estado.flashcardData[palavraId] = { reps: 0, erros: 0 };
      App.estado.flashcardData[palavraId].reps = (App.estado.flashcardData[palavraId].reps || 0) + 1;
    } else {
      inputEl.style.borderColor = '#E74C3C';
      inputEl.style.background = '#fff0f0';
      inputEl.placeholder = `❌ Correto: ${correto}`;
    }
    inputEl.value = '';
    inputEl.focus();
  },

  // ── Social: Compartilhar lista ──────────────────────────────
  async compartilharLista(formato = 'texto') {
    const stats = this.estatisticasCategoria();
    const cats = Object.entries(stats).sort((a, b) => b[1].total - a[1].total);
    const prog = App.estado.progresso || {};
    const streak = prog.vocab_streak || 0;

    let conteudo, titulo;
    if (formato === 'json') {
      titulo = `Meu vocabulário — ${new Date().toLocaleDateString('pt-BR')}`;
      conteudo = JSON.stringify({
        data: new Date().toISOString(),
        total_palavras: (App.estado.vocabCache || []).length,
        streak_dias: streak,
        categorias: stats
      }, null, 2);
    } else {
      titulo = `📚 Meu vocabulário — Streak: ${streak} dias`;
      const linhas = cats.slice(0, 10).map(([cat, s]) =>
        `${cat}: ${s.dominadas}/${s.total} (${Math.round((s.dominadas / s.total) * 100)}%)`
      );
      conteudo = `${titulo}\n${'—'.repeat(30)}\n${linhas.join('\n')}\n${'—'.repeat(30)}\n🔥 Streak: ${streak} dias seguidos!`;
    }

    // Usar Web Share API se disponível
    if (navigator.share) {
      try {
        await navigator.share({ title: titulo, text: conteudo });
        App.notificar('✅ Compartilhado!', 'sucesso');
        return;
      } catch (e) {
        if (e.name === 'AbortError') return; // Usuário cancelou
      }
    }

    // Fallback: copiar para clipboard
    try {
      await navigator.clipboard.writeText(conteudo);
      App.notificar('📋 Copiado para a área de transferência!', 'sucesso');
    } catch (e) {
      // Fallback final: mostrar em diálogo
      prompt('Copie o conteúdo abaixo:', conteudo);
    }
  },

};

document.addEventListener('i18n:changed', () => {
  if (document.getElementById('vocab-list')) Vocab.renderizar();
});
