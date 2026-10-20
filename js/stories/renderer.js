// ============================================================
// js/stories/renderer.js — Antique Book UI & Reader Renderer
// ============================================================

const StoriesRenderer = {
  async renderSelector() {
    await this.carregar();
    const c = document.getElementById('stories-container') || document.getElementById('storie-container');
    if (!c) return;

    const todas = this.dados?.stories || this.dados?.storie || [];
    const niveis = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const counts = {};
    niveis.forEach(n => { counts[n] = todas.filter(s => s.nivel === n).length; });

    let filtrate = todas;
    if (this._filtroNivel) {
      filtrate = filtrate.filter(s => s.nivel === this._filtroNivel);
    }
    if (this._filtroTexto) {
      const q = this._filtroTexto.toLowerCase();
      filtrate = filtrate.filter(s =>
        (s.titulo && s.titulo.toLowerCase().includes(q)) ||
        (s.titulo_pt && s.titulo_pt.toLowerCase().includes(q)) ||
        (s.descricao && s.descricao.toLowerCase().includes(q)) ||
        (s.autor && s.autor.toLowerCase().includes(q))
      );
    }
    if (this._filtroOrigem === 'custom') {
      filtrate = filtrate.filter(s => s._custom || s.custom);
    } else if (this._filtroOrigem === 'nativo') {
      filtrate = filtrate.filter(s => !s._custom && !s.custom);
    }

    const corNivel = {
      A1: '#2A9D8F',
      A2: '#457B9D',
      B1: '#D4A017',
      B2: '#E76F51',
      C1: '#9B2335',
      C2: '#6B1D2F'
    };

    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const labels = {
      cerca: isEn ? 'Search stories or authors...' : 'Buscar histórias ou autores...',
      tut: isEn ? 'All' : 'Todas',
      added: isEn ? 'Custom' : 'Adicionadas',
      native: isEn ? 'Native' : 'Nativas',
      level: isEn ? 'Filter by level' : 'Filtrar por nível',
      risultato: isEn ? 'No stories match your search.' : 'Nenhuma história encontrada para esta busca.',
      nenhuma: isEn ? 'No stories available for this level.' : 'Nenhuma história disponível para este nível.'
    };

    let html = `
      <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.55rem">
        <input type="search" placeholder="${labels.cerca}" value="${this._escape(this._filtroTexto)}"
          oninput="Stories._filtroTexto=this.value;Stories.renderSelector()"
          style="flex:1;min-width:0;padding:0.45rem 0.8rem;border:1.5px solid var(--cor-pietra);border-radius:20px;font-size:0.88rem;background:var(--cor-marmore);color:var(--cor-inchiostro);font-family:inherit">
        <button class="btn-ia-add" onclick="IAImport.abrir('storia')">🤖 via IA</button>
      </div>
      <div style="display:flex;gap:0.35rem;flex-wrap:wrap;margin-bottom:1rem;align-items:center">
        ${(()=>{
          const nC=todas.filter(s=>s._custom||s.custom).length;
          const nN=todas.length-nC;
          const _o=this._filtroOrigem;
          const oP=(v,l,ct)=>`<button onclick="Stories._filtroOrigem='${v}';Stories.renderSelector()" style="padding:0.22rem 0.6rem;border-radius:999px;border:1.5px solid ${_o===v?'#7B68A0':'#ccc'};background:${_o===v?'#7B68A0':'transparent'};color:${_o===v?'#fff':'var(--cor-inchiostro)'};cursor:pointer;font-size:0.75rem;font-weight:600;white-space:nowrap;font-family:inherit">${l} (${ct})</button>`;
          return oP('', labels.tut, todas.length)+(nC?oP('custom', labels.added, nC):'')+oP('nativo', labels.native, nN);
        })()}
        <select class="nivel-select${this._filtroNivel?' ativo':''}"
          onchange="Stories._filtroNivel=this.value;Stories.renderSelector()">
          <option value="">${labels.level}</option>
          ${niveis.filter(n=>counts[n]).map(n=>`<option value="${n}" ${this._filtroNivel===n?'selected':''}>${n} (${counts[n]})</option>`).join('')}
        </select>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:1rem">`;

    for (const s of filtrate) {
      const isLida = this.completate.includes(s.id);
      const corN = corNivel[s.nivel] || '#9B2335';
      const safeId = this._escAttr(s.id);
      const safeIcone = this._escape(s.icone || '📜');
      const safeTitulo = this._escape(s.titulo);
      const safeAutor = this._escape(s.autor || '');
      html += `
        <div onclick="Stories.abrirStoria('${safeId}')"
          style="background:var(--cor-marmore);border-radius:14px;padding:1.2rem 1rem;text-align:center;
                 box-shadow:0 3px 12px rgba(0,0,0,0.09);cursor:pointer;border:2px solid transparent;
                 transition:transform 0.18s,box-shadow 0.18s,border-color 0.18s;
                 display:flex;flex-direction:column;align-items:center;gap:0.35rem"
          onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 8px 22px rgba(0,0,0,0.14)';this.style.borderColor='${corN}'"
          onmouseout="this.style.transform='';this.style.boxShadow='0 3px 12px rgba(0,0,0,0.09)';this.style.borderColor='transparent'">
          <div style="font-size:2.4rem;line-height:1.1">${safeIcone}</div>
          <div style="font-family:'Cinzel',serif;font-size:0.88rem;font-weight:700;color:var(--cor-veneziano-escuro);line-height:1.3">
            ${safeTitulo}${isLida?'<span style="font-size:0.6rem;background:#2A9D8F;color:#fff;padding:0.08rem 0.35rem;border-radius:4px;margin-left:0.3rem;vertical-align:middle">✓</span>':''}${s._custom?'<span class="ia-custom-badge">IA</span>':''}
          </div>
          ${s._custom?`<button class="ia-del-btn" onclick="event.stopPropagation();IAImport.excluir('storia','${safeId}')">🗑️ ${isEn ? 'Remove' : 'Remover'}</button>`:''}
          <div style="font-size:0.72rem;color:var(--cor-pietra);font-style:italic">${safeAutor}</div>
          <div style="display:flex;gap:0.4rem;align-items:center;margin-top:0.2rem">
            <span style="font-size:0.7rem;font-weight:800;padding:0.1rem 0.5rem;border-radius:6px;background:${corN};color:#fff">${s.nivel}</span>
            <span style="font-size:0.72rem;color:${corN};font-weight:700">+${s.xp_recompensa||50} XP</span>
          </div>
        </div>`;
    }

    if (filtrate.length === 0) {
      html += `<p style="text-align:center;color:#aaa;font-style:italic;grid-column:1/-1;padding:2rem 0">${this._filtroTexto?labels.risultato:labels.nenhuma}</p>`;
    }

    html += '</div>';
    c.innerHTML = html;
  },

  async abrirStoria(id) {
    await this.carregar();
    const lista = this.dados?.storie || [];
    const idx   = lista.findIndex(x => x.id === id);
    if (idx === -1) return;
    this.storAttuale   = lista[idx];
    this._storyIndex   = idx;
    this.traduzirVisivel = false;
    this._indiceAberto   = false;

    this._paginas = this._generatePages(this.storAttuale, this._isMobile());

    const bookmarkSalvo = localStorage.getItem('en_book_bookmark_' + id);
    let pagInicial = bookmarkSalvo ? parseInt(bookmarkSalvo, 10) : 1;
    if (isNaN(pagInicial) || pagInicial < 1) pagInicial = 1;
    if (pagInicial > this._paginas.length) pagInicial = this._paginas.length;

    if (!this._isMobile() && pagInicial % 2 === 0) {
      pagInicial = Math.max(1, pagInicial - 1);
    }
    this.paginaAtual = pagInicial;

    this._initReaderListeners();
    this._renderizarStoria();
  },

  _initReaderListeners() {
    if (this._keyListener) document.removeEventListener('keydown', this._keyListener);
    this._keyListener = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        this.nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevPage();
      } else if (e.key === 'Escape') {
        if (this._indiceAberto) {
          this._closeChapterDrawer();
        } else if ((document.getElementById('story-word-modal') || document.getElementById('storie-word-modal'))?.style.display === 'block') {
          this._closeWordModal();
        } else {
          this.closeReader();
        }
      }
    };
    document.addEventListener('keydown', this._keyListener);

    if (this._resizeListener) window.removeEventListener('resize', this._resizeListener);
    let resizeTimer = null;
    this._resizeListener = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!this.storAttuale) return;
        const totalAntigo = this._paginas.length || 1;
        const proporcao = this.paginaAtual / totalAntigo;
        this._paginas = this._generatePages(this.storAttuale, this._isMobile());
        let novaPag = Math.round(proporcao * this._paginas.length);
        if (novaPag < 1) novaPag = 1;
        if (!this._isMobile() && novaPag % 2 === 0) novaPag = Math.max(1, novaPag - 1);
        this.paginaAtual = Math.min(novaPag, this._paginas.length);
        this._renderizarStoria();
      }, 220);
    };
    window.addEventListener('resize', this._resizeListener);
  },

  closeReader() {
    this._stopPageAudio();
    this._animandoVirada = false;
    if (this._keyListener) {
      document.removeEventListener('keydown', this._keyListener);
      this._keyListener = null;
    }
    if (this._resizeListener) {
      window.removeEventListener('resize', this._resizeListener);
      this._resizeListener = null;
    }
    this._closeWordModal();
    const overlay = document.getElementById('book-reader-overlay');
    if (overlay) overlay.remove();
    this.renderSelector();
  },

  _renderizarStoria() {
    if (!this.storAttuale) return;
    const s = this.storAttuale;
    const total = this._paginas.length;
    const isMobile = this._isMobile();

    if (this.paginaAtual < 1) this.paginaAtual = 1;
    if (this.paginaAtual > total) this.paginaAtual = Math.max(1, total);
    if (!isMobile && this.paginaAtual % 2 === 0) this.paginaAtual -= 1;

    const pagEsq = isMobile ? null : (this._paginas[this.paginaAtual - 1] || null);
    const pagDir = isMobile
      ? (this._paginas[this.paginaAtual - 1] || null)
      : (this._paginas[this.paginaAtual] || null);

    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const tituloExibido = this._escape(isEn ? s.titulo : (s.titulo_pt || s.titulo));
    const autorExibido = this._escape(s.autor || (isEn ? 'Literature' : 'Literatura'));
    const bookmarkSalvo = parseInt(localStorage.getItem('en_book_bookmark_' + s.id) || '0', 10);
    const isBookmarkAtual = bookmarkSalvo === this.paginaAtual || (!isMobile && bookmarkSalvo === this.paginaAtual + 1);

    const textoProgresso = isMobile
      ? `${isEn ? 'Page' : 'Página'} ${this.paginaAtual} ${isEn ? 'of' : 'de'} ${total}`
      : `${isEn ? 'Pages' : 'Páginas'} ${this.paginaAtual}–${Math.min(this.paginaAtual + 1, total)} ${isEn ? 'of' : 'de'} ${total}`;

    const isFim = isMobile ? (this.paginaAtual >= total) : (this.paginaAtual + 1 >= total);

    let overlay = document.getElementById('book-reader-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'book-reader-overlay';
      overlay.className = 'book-reader-overlay';
      document.body.appendChild(overlay);
    }

    const html = `
      <header class="book-top-bar">
        <div class="book-top-left">
          <button class="book-btn-voltar" onclick="Stories.closeReader()" title="${isEn ? 'Close' : 'Fechar'}">
            ‹ <span>${isEn ? 'Stories' : 'Histórias'}</span>
          </button>
          <div class="book-top-title-wrap">
            <span class="book-top-title">${tituloExibido}</span>
            <span class="book-top-subtitle">${autorExibido} · ${s.nivel}</span>
          </div>
        </div>

        <div class="book-top-actions">
          <button class="book-action-btn" onclick="Stories._openChapterDrawer()" title="${isEn ? 'Table of Contents' : 'Índice de capítulos'}">
            📑 <span class="label">${isEn ? 'Chapters' : 'Capítulos'}</span>
          </button>
          <button class="book-action-btn${isBookmarkAtual ? ' active' : ''}" onclick="Stories._toggleBookmark()" title="${isEn ? 'Bookmark page' : 'Marcador de página'}">
            🔖 <span class="label">${isBookmarkAtual ? (isEn ? 'Saved' : 'Marcada') : (isEn ? 'Bookmark' : 'Marcar')}</span>
          </button>
          <button class="book-action-btn${this.traduzirVisivel ? ' active' : ''}" onclick="Stories._toggleTranslation()" title="${isEn ? 'Show/Hide translation' : 'Mostrar/Ocultar tradução'}">
            👁️ <span class="label">${isEn ? 'Translation' : 'Tradução'}</span>
          </button>
          <button id="book-btn-ouvir" class="book-action-btn${this._reproduzindoAudio ? ' active' : ''}" onclick="Stories._listenCurrentPage()" title="${this._reproduzindoAudio ? (isEn ? 'Stop reading' : 'Parar leitura') : (isEn ? 'Listen to page' : 'Ouvir página')}">
            ${this._reproduzindoAudio ? '⏹️' : '🔊'} <span class="label">${this._reproduzindoAudio ? (isEn ? 'Stop' : 'Parar') : (isEn ? 'Listen' : 'Ouvir')}</span>
          </button>
          <button class="book-btn-voltar" style="padding:0.32rem 0.5rem" onclick="Stories.closeReader()" title="${isEn ? 'Close' : 'Fechar'}">✕</button>
        </div>
      </header>

      <main class="book-stage">
        <div class="antique-book" id="antique-book-element">
          <div class="book-spine-crease"></div>
          ${!isMobile ? this._buildPageHTML(pagEsq, 'left', total) : ''}
          ${this._buildPageHTML(pagDir, 'right', total)}
        </div>
      </main>

      <footer class="book-bottom-bar">
        <button class="book-nav-btn" onclick="Stories.prevPage()" ${this.paginaAtual <= 1 ? 'disabled' : ''}>
          ◀ <span>${isEn ? 'Previous' : 'Anterior'}</span>
        </button>

        <div class="book-progress-wrap">
          <span class="book-progress-text">${textoProgresso}</span>
          <input type="range" class="book-progress-slider" min="1" max="${total}" value="${this.paginaAtual}"
            oninput="Stories.goToPage(parseInt(this.value, 10))">
        </div>

        ${isFim ? `
          <button class="book-nav-btn" style="background:#2A9D8F;border-color:#227D72" onclick="Stories._markAsRead()">
            ✓ <span>${this.completate.includes(s.id) ? (isEn ? 'Completed' : 'Concluída') : `+${s.xp_recompensa || 50} XP`}</span>
          </button>
        ` : `
          <button class="book-nav-btn" onclick="Stories.nextPage()">
            <span>${isEn ? 'Next' : 'Próxima'}</span> ▶
          </button>
        `}
      </footer>

      <div id="storie-word-modal" class="storie-word-modal story-word-modal" style="display:none"></div>
      <div id="storie-modal-overlay" class="storie-modal-overlay story-modal-overlay" onclick="Stories._closeWordModal()" style="display:none"></div>
      ${this._indiceAberto ? this._buildChapterDrawerHTML() : ''}
    `;

    overlay.innerHTML = html;

    overlay.querySelectorAll('.storie-texto-corrido').forEach(textoEl => {
      textoEl.addEventListener('click', (e) => {
        const wordEl = e.target.closest('.storie-palavra');
        if (wordEl) {
          e.stopPropagation();
          this._openWordModal(wordEl);
        } else {
          this._closeWordModal();
        }
      });
    });

    const bookEl = document.getElementById('antique-book-element');
    if (bookEl) {
      bookEl.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          this._touchStartX = e.touches[0].clientX;
          this._touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      bookEl.addEventListener('touchend', (e) => {
        if (!e.changedTouches || !e.changedTouches[0]) return;
        const diffX = e.changedTouches[0].clientX - this._touchStartX;
        const diffY = e.changedTouches[0].clientY - this._touchStartY;
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) this.nextPage();
          else this.prevPage();
        }
      }, { passive: true });
    }

    if (this.traduzirVisivel) {
      this._autoTraduzirPaginasVisiveis();
    }
  },

  _getPageContentHTML(pag, lado, total) {
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    if (!pag) {
      return `
        <div class="antique-page-header">
          <span class="antique-running-head">—</span>
        </div>
        <div class="antique-page-body" style="align-items:center;justify-content:center;opacity:0.65">
          <div style="font-size:2.2rem;margin-bottom:0.4rem">⚜️</div>
          <div class="antique-ornamento">— ✦ —</div>
          <div style="font-family:'EB Garamond',serif;font-style:italic;font-size:0.95rem;color:#8a7250">
            ${isEn ? 'End of book' : 'Fim do livro'}
          </div>
        </div>
        <div class="antique-page-footer">— ${total} —</div>
      `;
    }

    const s = this.storAttuale;
    const tituloExibido = this._escape(isEn ? s.titulo : (s.titulo_pt || s.titulo));

    let cabecalhoHtml = '';
    if (pag.isFirstPage) {
      cabecalhoHtml = `
        <div class="antique-cover-header">
          <span class="antique-cover-icon">${this._escape(s.icone || '📖')}</span>
          <h2 class="antique-cover-title">${tituloExibido}</h2>
          <div class="antique-cover-subtitle">${this._escape(s.autor || (isEn ? 'English Literature' : 'Literatura em Inglês'))} ${s.tema ? '· ' + this._escape(s.tema) : ''}</div>
          <div class="antique-ornamento">— ✦ —</div>
        </div>
      `;
    } else {
      cabecalhoHtml = `
        <div class="antique-page-header">
          <span class="antique-running-head">${this._escape(pag.capituloTitulo || tituloExibido)}</span>
        </div>
      `;
    }

    const blocosHtml = pag.blocos.map((bloco, bIdx) => {
      const textoMarcado = this._tokenizeWords((bloco.english || bloco.ingles || bloco.italiano || ""), (bloco.words || bloco.vocabulary || bloco.vocabulario || bloco.parole || []), bloco.parIdx, bloco.temCapitular && bIdx === 0);
      const ptText = this._escape(bloco.portugues || '');
      const noIndent = bloco.continua || (bloco.temCapitular && bIdx === 0);
      const loadingLabel = isEn ? "Translating..." : "Traduzindo...";
      return `
        <div class="antique-para-wrap">
          <p class="antique-para${noIndent ? ' no-indent' : ''}">${textoMarcado}</p>
          ${this.traduzirVisivel ? `
            <span class="antique-para-trad" data-bloco-id="${bloco.parIdx}">${ptText || '<span class="trad-loading">' + loadingLabel + '</span>'}</span>
          ` : ''}
        </div>
      `;
    }).join('');

    const isUltima = pag.numero === total;
    const finalizadorHtml = isUltima ? `
      <div style="margin-top:auto;text-align:center;padding:0.25rem 0">
        <div class="antique-ornamento">— ✦ —</div>
        <div style="font-family:'EB Garamond',serif;font-style:italic;font-size:0.85rem;color:#8a7250">
          ${isEn ? 'The End' : 'Fim'}
        </div>
      </div>
    ` : '';

    return `
      ${cabecalhoHtml}
      <div class="antique-page-body">
        ${blocosHtml}
        ${finalizadorHtml}
      </div>
      <div class="antique-page-footer">— ${pag.numero} —</div>
    `;
  },

  _buildPageHTML(pag, lado, total) {
    return `
      <div class="antique-page antique-page-${lado} storie-texto-corrido">
        ${this._getPageContentHTML(pag, lado, total)}
      </div>
    `;
  },

  _animatePageTurn(direcao, callbackFinal) {
    if (this._animandoVirada) return;

    const stage = document.getElementById('antique-book-element');
    if (!stage || this._isMobile()) {
      this._playPageTurnSound();
      callbackFinal();
      return;
    }

    this._animandoVirada = true;
    this._playPageTurnSound();

    const isNext = direcao === 'next';
    const total = this._paginas.length;
    const flippingContainer = document.createElement('div');
    flippingContainer.className = `page-flipping-container ${isNext ? 'right-to-left' : 'left-to-right'}`;

    const pageRightEl = stage.querySelector('.antique-page-right');
    const pageLeftEl  = stage.querySelector('.antique-page-left');

    let pagFrente = null;
    let pagVerso  = null;
    let ladoFrente = '';
    let ladoVerso  = '';

    if (isNext) {
      ladoFrente = 'right';
      ladoVerso  = 'left';
      pagFrente = this._paginas[this.paginaAtual] || null;
      pagVerso  = this._paginas[this.paginaAtual + 1] || null;
      const pagSubjacente = this._paginas[this.paginaAtual + 2] || null;
      if (pageRightEl) {
        pageRightEl.innerHTML = this._getPageContentHTML(pagSubjacente, 'right', total);
      }
    } else {
      ladoFrente = 'left';
      ladoVerso  = 'right';
      pagFrente = this._paginas[this.paginaAtual - 1] || null;
      pagVerso  = this._paginas[this.paginaAtual - 2] || null;
      const pagSubjacente = this._paginas[this.paginaAtual - 3] || null;
      if (pageLeftEl) {
        pageLeftEl.innerHTML = this._getPageContentHTML(pagSubjacente, 'left', total);
      }
    }

    const conteudoFrenteHtml = this._getPageContentHTML(pagFrente, ladoFrente, total);
    const conteudoVersoHtml  = this._getPageContentHTML(pagVerso, ladoVerso, total);

    flippingContainer.innerHTML = `
      <div class="flipping-face front antique-page antique-page-${ladoFrente}">
        ${conteudoFrenteHtml}
      </div>
      <div class="flipping-face back antique-page antique-page-${ladoVerso}">
        ${conteudoVersoHtml}
      </div>
    `;

    stage.appendChild(flippingContainer);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flippingContainer.classList.add(isNext ? 'turning-next' : 'turning-prev');
      });
    });

    setTimeout(() => {
      flippingContainer.remove();
      this._animandoVirada = false;
      callbackFinal();
    }, 880);
  },

  nextPage() {
    if (this._animandoVirada) return;
    this._stopPageAudio();
    const step = this._isMobile() ? 1 : 2;
    const total = this._paginas.length;
    if (this.paginaAtual + step > total && (this._isMobile() || this.paginaAtual >= total)) {
      return;
    }

    this._animatePageTurn('next', () => {
      this.paginaAtual = Math.min(this.paginaAtual + step, total);
      this._saveBookmarkSilently();
      this._renderizarStoria();
    });
  },

  prevPage() {
    if (this._animandoVirada) return;
    this._stopPageAudio();
    const step = this._isMobile() ? 1 : 2;
    if (this.paginaAtual <= 1) return;

    this._animatePageTurn('prev', () => {
      this.paginaAtual = Math.max(1, this.paginaAtual - step);
      if (!this._isMobile() && this.paginaAtual % 2 === 0) this.paginaAtual -= 1;
      this._saveBookmarkSilently();
      this._renderizarStoria();
    });
  },

  goToPage(num) {
    if (isNaN(num)) return;
    this._stopPageAudio();
    const total = this._paginas.length;
    let pag = Math.min(Math.max(1, num), total);
    if (!this._isMobile() && pag % 2 === 0) pag -= 1;
    if (pag === this.paginaAtual) return;
    this.paginaAtual = pag;
    this._playPageTurnSound();
    this._saveBookmarkSilently();
    this._renderizarStoria();
  },

  _saveBookmarkSilently() {
    if (this.storAttuale) {
      localStorage.setItem('en_book_bookmark_' + this.storAttuale.id, this.paginaAtual);
    }
  },

  _toggleBookmark() {
    if (!this.storAttuale) return;
    const id = this.storAttuale.id;
    const chave = 'en_book_bookmark_' + id;
    const salvo = parseInt(localStorage.getItem(chave) || '0', 10);
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';

    if (salvo === this.paginaAtual) {
      localStorage.removeItem(chave);
      if (typeof App !== 'undefined' && App.notificar) App.notificar(isEn ? 'Bookmark removed' : 'Marcador removido', 'info');
    } else {
      localStorage.setItem(chave, this.paginaAtual);
      if (typeof App !== 'undefined' && App.notificar) App.notificar(isEn ? `Bookmark saved to page ${this.paginaAtual}` : `Marcador salvo na página ${this.paginaAtual}`, 'sucesso');
    }
    this._renderizarStoria();
  },

  _toggleTranslation() {
    this._stopPageAudio();
    this.traduzirVisivel = !this.traduzirVisivel;
    const totalAntigo = this._paginas.length || 1;
    const prop = this.paginaAtual / totalAntigo;
    this._paginas = this._generatePages(this.storAttuale, this._isMobile());
    let novaPag = Math.round(prop * this._paginas.length);
    if (novaPag < 1) novaPag = 1;
    if (!this._isMobile() && novaPag % 2 === 0) novaPag = Math.max(1, novaPag - 1);
    this.paginaAtual = Math.min(novaPag, this._paginas.length);
    this._renderizarStoria();
  },

  _openChapterDrawer() {
    this._indiceAberto = true;
    this._renderizarStoria();
  },

  _closeChapterDrawer() {
    this._indiceAberto = false;
    this._renderizarStoria();
  },

  _buildChapterDrawerHTML() {
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const capitulos = [];
    const capsVistos = new Set();
    this._paginas.forEach(p => {
      const capNome = p.capituloTitulo || (isEn ? 'Chapter' : 'Capítulo');
      if (!capsVistos.has(capNome)) {
        capsVistos.add(capNome);
        capitulos.push({ titulo: capNome, pagina: p.numero });
      }
    });

    const itensHtml = capitulos.map(c => {
      const ativo = this.paginaAtual >= c.pagina;
      return `
        <div class="book-chapter-item${ativo ? ' active' : ''}" onclick="Stories.goToPage(${c.pagina});Stories._closeChapterDrawer();">
          <span>📖 ${this._escape(c.titulo)}</span>
          <span style="font-size:0.75rem;opacity:0.8">${isEn ? 'page' : 'pág.'} ${c.pagina}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="book-drawer-overlay" onclick="Stories._closeChapterDrawer()">
        <div class="book-drawer" onclick="event.stopPropagation()">
          <div class="book-drawer-header">
            <span class="book-drawer-title">📑 ${isEn ? 'Table of Contents' : 'Índice de Capítulos'}</span>
            <button class="book-btn-voltar" style="padding:0.25rem 0.5rem" onclick="Stories._closeChapterDrawer()" title="${isEn ? 'Close' : 'Fechar'}">✕</button>
          </div>
          <div class="book-drawer-list">
            ${itensHtml}
          </div>
        </div>
      </div>
    `;
  }
};

if (typeof window !== 'undefined') {
  window.StoriesRenderer = StoriesRenderer;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoriesRenderer;
}
