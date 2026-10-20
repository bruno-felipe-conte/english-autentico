# scripts/apply_stories_fixes.py
import re

with open('js/stories.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. State property: add _modalData to Stories object
if '_modalData: null,' not in code:
    code = code.replace(
        "  _tradCache: {},   // cache in-memory: palavra → tradução\n",
        "  _tradCache: {},   // cache in-memory: palavra → tradução\n  _modalData: null,\n"
    )

# 2. Localize renderSelector
old_render_labels = """    const labels = I18n.idioma === 'it'
      ? { tut: 'Tutte', cerca: '🔍 Titolo o autore...', nenhuma: 'Nessuna storia ancora.', resultado: 'Nessun resultado.' }
      : { tut: 'Todas', cerca: '🔍 Título ou autor...', nenhuma: 'Nenhuma história ainda.', resultado: 'Nenhum resultado.' };"""

new_render_labels = """    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const labels = isEn
      ? { tut: 'All', added: '🤖 Added', native: '📚 Native', level: '🎯 Level', cerca: '🔍 Title or author...', nenhuma: 'No stories yet.', resultado: 'No results found.' }
      : { tut: 'Todas', added: '🤖 Adicionadas', native: '📚 Nativas', level: '🎯 Nível', cerca: '🔍 Título ou autor...', nenhuma: 'Nenhuma história ainda.', resultado: 'Nenhum resultado.' };"""

if old_render_labels in code:
    code = code.replace(old_render_labels, new_render_labels)
    print("Updated renderSelector labels")
else:
    print("renderSelector labels not matched directly, checking normalized...")

# Origin pills and Level in renderSelector
old_pills = "return oP('','Todas',todas.length)+(nC?oP('custom','🤖 Adicionadas',nC):'')+oP('nativo','📚 Nativas',nN);"
new_pills = "return oP('', labels.tut, todas.length)+(nC?oP('custom', labels.added, nC):'')+oP('nativo', labels.native, nN);"
if old_pills in code:
    code = code.replace(old_pills, new_pills)
    print("Updated origin pills")

old_opt = '<option value="">🎯 Nível</option>'
new_opt = '<option value="">${labels.level}</option>'
if old_opt in code:
    code = code.replace(old_opt, new_opt)
    print("Updated level select option")

old_del = "🗑️ Remover</button>"
new_del = "🗑️ ${isEn ? 'Remove' : 'Remover'}</button>"
if old_del in code:
    code = code.replace(old_del, new_del)
    print("Updated delete button in card")

# 3. _renderizarStoria header & bottom bar localization
old_render_header = """    const total = this._paginas.length;
    const isMobile = this._isMobile();

    // Garante que paginaAtual está nos limites válidos
    if (this.paginaAtual < 1) this.paginaAtual = 1;
    if (this.paginaAtual > total) this.paginaAtual = Math.max(1, total);
    if (!isMobile && this.paginaAtual % 2 === 0) this.paginaAtual -= 1;

    // Páginas a exibir
    const pagEsq = isMobile ? null : (this._paginas[this.paginaAtual - 1] || null);
    const pagDir = isMobile
      ? (this._paginas[this.paginaAtual - 1] || null)
      : (this._paginas[this.paginaAtual] || null);

    const tituloExibido = il ? s.titulo : (s.titulo_pt || s.titulo);
    const bookmarkSalvo = parseInt(localStorage.getItem('en_book_bookmark_' + s.id) || '0', 10);
    const isBookmarkAtual = bookmarkSalvo === this.paginaAtual || (!isMobile && bookmarkSalvo === this.paginaAtual + 1);

    // Contagem da barra inferior
    const textoProgresso = isMobile
      ? `${il ? 'Pagina' : 'Página'} ${this.paginaAtual} ${il ? 'di' : 'de'} ${total}`
      : `${il ? 'Pagine' : 'Páginas'} ${this.paginaAtual}–${Math.min(this.paginaAtual + 1, total)} ${il ? 'di' : 'de'} ${total}`;"""

new_render_header = """    const total = this._paginas.length;
    const isMobile = this._isMobile();

    // Garante que paginaAtual está nos limites válidos
    if (this.paginaAtual < 1) this.paginaAtual = 1;
    if (this.paginaAtual > total) this.paginaAtual = Math.max(1, total);
    if (!isMobile && this.paginaAtual % 2 === 0) this.paginaAtual -= 1;

    // Páginas a exibir
    const pagEsq = isMobile ? null : (this._paginas[this.paginaAtual - 1] || null);
    const pagDir = isMobile
      ? (this._paginas[this.paginaAtual - 1] || null)
      : (this._paginas[this.paginaAtual] || null);

    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const tituloExibido = isEn ? s.titulo : (s.titulo_pt || s.titulo);
    const bookmarkSalvo = parseInt(localStorage.getItem('en_book_bookmark_' + s.id) || '0', 10);
    const isBookmarkAtual = bookmarkSalvo === this.paginaAtual || (!isMobile && bookmarkSalvo === this.paginaAtual + 1);

    // Contagem da barra inferior
    const textoProgresso = isMobile
      ? `${isEn ? 'Page' : 'Página'} ${this.paginaAtual} ${isEn ? 'of' : 'de'} ${total}`
      : `${isEn ? 'Pages' : 'Páginas'} ${this.paginaAtual}–${Math.min(this.paginaAtual + 1, total)} ${isEn ? 'of' : 'de'} ${total}`;"""

if old_render_header in code:
    code = code.replace(old_render_header, new_render_header)
    print("Updated _renderizarStoria header progress calculation")

old_top_bar = """        <div class="book-top-left">
          <button class="book-btn-voltar" onclick="Stories.closeReader()" title="${il ? 'Chiudi' : 'Fechar'}">
            ‹ <span>${il ? 'Storie' : 'Histórias'}</span>
          </button>
          <div class="book-top-title-wrap">
            <span class="book-top-title">${tituloExibido}</span>
            <span class="book-top-subtitle">${s.autor || 'Letteratura'} · ${s.nivel}</span>
          </div>
        </div>

        <div class="book-top-actions">
          <button class="book-action-btn" onclick="Stories._openChapterDrawer()" title="${il ? 'Indice dei capitoli' : 'Índice de capítulos'}">
            📑 <span class="label">${il ? 'Indice' : 'Capítulos'}</span>
          </button>
          <button class="book-action-btn${isBookmarkAtual ? ' active' : ''}" onclick="Stories._toggleBookmark()" title="${il ? 'Segnalibro' : 'Marcador de página'}">
            🔖 <span class="label">${isBookmarkAtual ? (il ? 'Salvato' : 'Marcada') : (il ? 'Segna' : 'Marcar')}</span>
          </button>
          <button class="book-action-btn${this.traduzirVisivel ? ' active' : ''}" onclick="Stories._toggleTranslation()" title="${il ? 'Mostra/Nascondi traduzione' : 'Mostrar/Ocultar tradução'}">
            👁️ <span class="label">${il ? 'Traduzione' : 'Tradução'}</span>
          </button>
          <button id="book-btn-ouvir" class="book-action-btn${this._reproduzindoAudio ? ' active' : ''}" onclick="Stories._listenCurrentPage()" title="${this._reproduzindoAudio ? (il ? 'Ferma lettura' : 'Parar leitura') : (il ? 'Ascolta pagina' : 'Ouvir página')}">
            ${this._reproduzindoAudio ? '⏹️' : '🔊'} <span class="label">${this._reproduzindoAudio ? (il ? 'Ferma' : 'Parar') : (il ? 'Ascolta' : 'Ouvir')}</span>
          </button>
          <button class="book-btn-voltar" style="padding:0.32rem 0.5rem" onclick="Stories.closeReader()">✕</button>
        </div>"""

new_top_bar = """        <div class="book-top-left">
          <button class="book-btn-voltar" onclick="Stories.closeReader()" title="${isEn ? 'Close' : 'Fechar'}">
            ‹ <span>${isEn ? 'Stories' : 'Histórias'}</span>
          </button>
          <div class="book-top-title-wrap">
            <span class="book-top-title">${tituloExibido}</span>
            <span class="book-top-subtitle">${s.autor || (isEn ? 'Literature' : 'Literatura')} · ${s.nivel}</span>
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
        </div>"""

if old_top_bar in code:
    code = code.replace(old_top_bar, new_top_bar)
    print("Updated book top bar")

old_bottom_bar = """        <button class="book-nav-btn" onclick="Stories.prevPage()" ${this.paginaAtual <= 1 ? 'disabled' : ''}>
          ◀ <span>${il ? 'Precedente' : 'Anterior'}</span>
        </button>

        <div class="book-progress-wrap">
          <span class="book-progress-text">${textoProgresso}</span>
          <input type="range" class="book-progress-slider" min="1" max="${total}" value="${this.paginaAtual}"
            oninput="Stories.goToPage(parseInt(this.value, 10))">
        </div>

        ${isFim ? `
          <button class="book-nav-btn" style="background:#2A9D8F;border-color:#227D72" onclick="Stories._markAsRead()">
            ✓ <span>${this.completate.includes(s.id) ? (il ? 'Completata' : 'Concluída') : `+${s.xp_recompensa || 50} XP`}</span>
          </button>
        ` : `
          <button class="book-nav-btn" onclick="Stories.nextPage()">
            <span>${il ? 'Successiva' : 'Próxima'}</span> ▶
          </button>
        `}\n      </footer>"""

new_bottom_bar = """        <button class="book-nav-btn" onclick="Stories.prevPage()" ${this.paginaAtual <= 1 ? 'disabled' : ''}>
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
        `}\n      </footer>"""

if old_bottom_bar in code:
    code = code.replace(old_bottom_bar, new_bottom_bar)
    print("Updated book bottom bar")

# Word modal container IDs
old_containers = """      <!-- Modal flutuante de palavra -->
      <div id="story-word-modal" class="story-word-modal storie-word-modal" style="display:none"></div>
      <div id="story-modal-overlay" class="story-modal-overlay storie-modal-overlay" onclick="Stories._closeWordModal()" style="display:none"></div>"""

new_containers = """      <!-- Modal flutuante de palavra -->
      <div id="storie-word-modal" class="storie-word-modal story-word-modal" style="display:none"></div>
      <div id="storie-modal-overlay" class="storie-modal-overlay story-modal-overlay" onclick="Stories._closeWordModal()" style="display:none"></div>"""

if old_containers in code:
    code = code.replace(old_containers, new_containers)
    print("Updated word modal containers in reader overlay")

# 4. _getPageContentHTML content localization
old_content_head = """  _getPageContentHTML(pag, lado, total) {
    const il = I18n.idioma === 'it';
    if (!pag) {
      return `
        <div class="antique-page-header">
          <span class="antique-running-head">—</span>
        </div>
        <div class="antique-page-body" style="align-items:center;justify-content:center;opacity:0.65">
          <div style="font-size:2.2rem;margin-bottom:0.4rem">⚜️</div>
          <div class="antique-ornamento">— ✦ —</div>
          <div style="font-family:'EB Garamond',serif;font-style:italic;font-size:0.95rem;color:#8a7250">
            ${il ? 'Fine del volume' : 'Fim do livro'}
          </div>
        </div>
        <div class="antique-page-footer">— ${total} —</div>
      `;
    }

    const s = this.storAttuale;
    const tituloExibido = il ? s.titulo : (s.titulo_pt || s.titulo);

    let cabecalhoHtml = '';
    if (pag.isFirstPage) {
      cabecalhoHtml = `
        <div class="antique-cover-header">
          <span class="antique-cover-icon">${s.icone || '📖'}</span>
          <h2 class="antique-cover-title">${tituloExibido}</h2>
          <div class="antique-cover-subtitle">${s.autor || 'Letteratura Italiana'} ${s.tema ? '· ' + s.tema : ''}</div>
          <div class="antique-ornamento">— ✦ —</div>
        </div>
      `;
    } else {
      cabecalhoHtml = `
        <div class="antique-page-header">
          <span class="antique-running-head">${pag.capituloTitulo || tituloExibido}</span>
        </div>
      `;
    }"""

new_content_head = """  _getPageContentHTML(pag, lado, total) {
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
    const tituloExibido = isEn ? s.titulo : (s.titulo_pt || s.titulo);

    let cabecalhoHtml = '';
    if (pag.isFirstPage) {
      cabecalhoHtml = `
        <div class="antique-cover-header">
          <span class="antique-cover-icon">${s.icone || '📖'}</span>
          <h2 class="antique-cover-title">${tituloExibido}</h2>
          <div class="antique-cover-subtitle">${s.autor || (isEn ? 'English Literature' : 'Literatura em Inglês')} ${s.tema ? '· ' + s.tema : ''}</div>
          <div class="antique-ornamento">— ✦ —</div>
        </div>
      `;
    } else {
      cabecalhoHtml = `
        <div class="antique-page-header">
          <span class="antique-running-head">${pag.capituloTitulo || tituloExibido}</span>
        </div>
      `;
    }"""

if old_content_head in code:
    code = code.replace(old_content_head, new_content_head)
    print("Updated _getPageContentHTML cover and headers")

old_para_trad = '<span class="trad-loading">Traduzione in corso...</span>'
new_para_trad = '<span class="trad-loading">${isEn ? "Translating..." : "Traduzindo..."}</span>'
if old_para_trad in code:
    code = code.replace(old_para_trad, new_para_trad)
    print("Updated translation loading text")

old_fine = "${il ? 'Fine' : 'Fim'}"
new_fine = "${isEn ? 'The End' : 'Fim'}"
if old_fine in code:
    code = code.replace(old_fine, new_fine)
    print("Updated fine/fim text")

# 5. _toggleBookmark localization
old_bm = """    const il = I18n.idioma === 'it';

    if (salvo === this.paginaAtual) {
      localStorage.removeItem(chave);
      App.notificar(il ? 'Segnalibro rimosso' : 'Marcador removido', 'info');
    } else {
      localStorage.setItem(chave, this.paginaAtual);
      App.notificar(il ? `Segnalibro salvato alla pagina ${this.paginaAtual}` : `Marcador salvo na página ${this.paginaAtual}`, 'sucesso');
    }"""

new_bm = """    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';

    if (salvo === this.paginaAtual) {
      localStorage.removeItem(chave);
      App.notificar(isEn ? 'Bookmark removed' : 'Marcador removido', 'info');
    } else {
      localStorage.setItem(chave, this.paginaAtual);
      App.notificar(isEn ? `Bookmark saved to page ${this.paginaAtual}` : `Marcador salvo na página ${this.paginaAtual}`, 'sucesso');
    }"""

if old_bm in code:
    code = code.replace(old_bm, new_bm)
    print("Updated _toggleBookmark notifications")

# 6. _listenCurrentPage & _playNextSentence
old_listen_init = """  _listenCurrentPage() {
    if (!this.storAttuale || !this._paginas || this._paginas.length === 0) return;
    const il = typeof I18n !== 'undefined' && I18n.idioma === 'it';"""

new_listen_init = """  _listenCurrentPage() {
    if (!this.storAttuale || !this._paginas || this._paginas.length === 0) return;
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';"""

if old_listen_init in code:
    code = code.replace(old_listen_init, new_listen_init)
    print("Updated _listenCurrentPage init")

old_listen_no_text = "App.notificar(il ? 'Nessun testo da ascoltare' : 'Nenhum texto para ouvir nesta página', 'info');"
new_listen_no_text = "App.notificar(isEn ? 'No text to read on this page' : 'Nenhum texto para ouvir nesta página', 'info');"
if old_listen_no_text in code:
    code = code.replace(old_listen_no_text, new_listen_no_text)
    print("Updated _listenCurrentPage no text notification")

old_btn_ferma = """    const btn = document.getElementById('book-btn-ouvir');
    if (btn) {
      btn.innerHTML = `⏹️ <span class="label">${il ? 'Ferma' : 'Parar'}</span>`;
      btn.classList.add('active');
    }"""

new_btn_ferma = """    const btn = document.getElementById('book-btn-ouvir');
    if (btn) {
      btn.innerHTML = `⏹️ <span class="label">${isEn ? 'Stop' : 'Parar'}</span>`;
      btn.classList.add('active');
    }"""

if old_btn_ferma in code:
    code = code.replace(old_btn_ferma, new_btn_ferma)
    print("Updated book-btn-ouvir stop state")

# Fix TTS voice and language in _playNextSentence
old_tts_voice = """    // Busca a melhor voz italiana
    let voz = null;
    if (typeof VoiceEngine !== 'undefined') {
      voz = VoiceEngine.obterVozSelecionada();
    }
    if (!voz && typeof App !== 'undefined' && App._getVozItaliana) {
      voz = App._getVozItaliana();
    }

    let rate = parseFloat(localStorage.getItem('en_audio_speed'));
    if (isNaN(rate) || rate <= 0) rate = 0.88;
    rate = Math.max(0.5, Math.min(1.8, rate));

    // Usa o motor neural com cache IndexedDB e fallback nativo
    if (typeof VoiceEngine !== 'undefined' && typeof VoiceEngine.falarNeural === 'function') {
      VoiceEngine.falarNeural(fraseOriginal, {
        rate: rate,
        onend: () => {
          if (!this._reproduzindoAudio) return;
          this._audioIndexSentenca++;
          setTimeout(() => {
            if (this._reproduzindoAudio) {
              this._playNextSentence();
            }
          }, 110);
        },
        onerror: (e) => {
          console.warn('[Storie Audio Error]', e);
          if (!this._reproduzindoAudio) return;
          this._audioIndexSentenca++;
          setTimeout(() => {
            if (this._reproduzindoAudio) {
              this._playNextSentence();
            }
          }, 90);
        }
      });
      return;
    }

    const u = new SpeechSynthesisUtterance(fraseNormalizada || fraseOriginal);
    u.lang = (voz && voz.lang) ? voz.lang : 'it-IT';"""

new_tts_voice = """    // Busca a melhor voz inglesa
    let voz = null;
    if (typeof VoiceEngine !== 'undefined') {
      voz = VoiceEngine.obterVozSelecionada();
    }
    if (!voz && typeof App !== 'undefined') {
      if (typeof App._getVozAmericana === 'function') voz = App._getVozAmericana();
      else if (typeof App._getEnglishVoice === 'function') voz = App._getEnglishVoice();
    }

    let rate = parseFloat(localStorage.getItem('en_audio_speed'));
    if (isNaN(rate) || rate <= 0) rate = 0.88;
    rate = Math.max(0.5, Math.min(1.8, rate));

    // Usa o motor neural com cache IndexedDB e fallback nativo
    if (typeof VoiceEngine !== 'undefined' && typeof VoiceEngine.falarNeural === 'function') {
      VoiceEngine.falarNeural(fraseOriginal, {
        rate: rate,
        onend: () => {
          if (!this._reproduzindoAudio) return;
          this._audioIndexSentenca++;
          setTimeout(() => {
            if (this._reproduzindoAudio) {
              this._playNextSentence();
            }
          }, 110);
        },
        onerror: (e) => {
          console.warn('[Stories Audio Error]', e);
          if (!this._reproduzindoAudio) return;
          this._audioIndexSentenca++;
          setTimeout(() => {
            if (this._reproduzindoAudio) {
              this._playNextSentence();
            }
          }, 90);
        }
      });
      return;
    }

    const u = new SpeechSynthesisUtterance(fraseNormalizada || fraseOriginal);
    u.lang = (voz && voz.lang) ? voz.lang : 'en-US';"""

if old_tts_voice in code:
    code = code.replace(old_tts_voice, new_tts_voice)
    print("Updated TTS voice and language in _playNextSentence")

old_stop_audio = """    const il = typeof I18n !== 'undefined' && I18n.idioma === 'it';
    const btn = document.getElementById('book-btn-ouvir');
    if (btn) {
      btn.innerHTML = `🔊 <span class="label">${il ? 'Ascolta' : 'Ouvir'}</span>`;
      btn.classList.remove('active');
    }"""

new_stop_audio = """    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const btn = document.getElementById('book-btn-ouvir');
    if (btn) {
      btn.innerHTML = `🔊 <span class="label">${isEn ? 'Listen' : 'Ouvir'}</span>`;
      btn.classList.remove('active');
    }"""

if old_stop_audio in code:
    code = code.replace(old_stop_audio, new_stop_audio)
    print("Updated _stopPageAudio button label")

# 7. Chapter Drawer
old_drawer = """  _buildChapterDrawerHTML() {
    const il = I18n.idioma === 'it';
    // Mapeia onde cada capítulo começa
    const capitulos = [];
    const capsVistos = new Set();
    this._paginas.forEach(p => {
      const capNome = p.capituloTitulo || (il ? 'Capitolo' : 'Capítulo');
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
          <span style="font-size:0.75rem;opacity:0.8">${il ? 'pag.' : 'pág.'} ${c.pagina}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="book-drawer-overlay" onclick="Stories._closeChapterDrawer()">
        <div class="book-drawer" onclick="event.stopPropagation()">
          <div class="book-drawer-header">
            <span class="book-drawer-title">📑 ${il ? 'Indice dei Capitoli' : 'Índice de Capítulos'}</span>
            <button class="book-btn-voltar" style="padding:0.25rem 0.5rem" onclick="Stories._closeChapterDrawer()">✕</button>
          </div>
          <div class="book-drawer-list">
            ${itensHtml}
          </div>
        </div>
      </div>
    `;
  },"""

new_drawer = """  _buildChapterDrawerHTML() {
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    // Mapeia onde cada capítulo começa
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
  },"""

if old_drawer in code:
    code = code.replace(old_drawer, new_drawer)
    print("Updated _buildChapterDrawerHTML")

# 8. _openWordModal, _modalData, _saveModalDeck and _saveWordToFlashcards
old_word_modal_block = """  // ── Modal flutuante de palavra ─────────────────────────────
  _openWordModal(wordEl) {
    this._closeWordModal(false);

    const palavra = wordEl.dataset.palavra || wordEl.textContent.trim();
    let ipa  = wordEl.dataset.ipa  || '';
    let trad = wordEl.dataset.trad || '';
    let cat  = wordEl.dataset.cat  || '';

    // Busca global em todos os parágrafos da história
    if (!trad && this.storAttuale) {
      for (const p of this.storAttuale.testo) {
        const found = ((p.words || p.vocabulary || p.vocabulario || p.parole || []) || []).find(pw =>
          this._normWord(pw.ingles || pw.english || pw.parola || pw.word) === this._normWord(palavra)
        );
        if (found) {
          ipa  = ipa  || found.ipa        || '';
          trad = trad || found.traducao_portugues || found.traducao || found.traduzione || found.portugues || '';
          cat  = cat  || found.categoria  || '';
          break;
        }
      }
    }

    const il      = I18n.idioma === 'it';
    const jaSalva = this._verificarSalva(palavra);

    // Se já temos trad do parole[], renderiza direto
    // Caso contrário, verifica cache → mostra placeholder → busca API
    const tradInicial = trad;

    const buildPills = (t) => t
      ? t.split(/[;,]/).map(s => s.trim()).filter(Boolean)
          .map(s => `<span class="storie-trad-pill">${this._escape(s)}</span>`).join('')
      : '';

    const renderModal = (tradAtual, carregando = false) => {
      const pills = buildPills(tradAtual);
      return `
        <button class="story-modal-close storie-modal-close" onclick="Stories._closeWordModal()">×</button>
        <div class="story-modal-palavra storie-modal-palavra">${this._escape(palavra)}</div>
        ${ipa ? `<div class="story-modal-ipa storie-modal-ipa">${this._escape(ipa)}</div>` : ''}
        <button class="story-modal-audio storie-modal-audio" onclick="App.speak('${this._escAttr(palavra)}')">🔊 ${il?'Listen':'Ouvir'}</button>
        <div class="story-modal-traducoes storie-modal-traducoes" id="story-modal-pills">
          ${pills || (carregando ? '<span class="story-trad-loading storie-trad-loading">…</span>' : '')}
        </div>
        ${cat ? `<div style="margin-top:0.45rem"><span class="story-modal-cat storie-modal-cat">${this._escape(cat)}</span></div>` : ''}
        <button class="story-modal-salvar storie-modal-salvar${jaSalva?' salvo':''}" id="story-btn-salvar"
          onclick="Stories._saveWordToFlashcards('${this._escAttr(palavra)}',{ipa:'${this._escAttr(ipa)}',trad:'${this._escAttr(tradAtual)}',cat:'${this._escAttr(cat)}'})">
          ${jaSalva
            ? `✅ ${il ? 'Already saved' : 'Já salva'}`
            : `⭐ ${il ? 'Save for review' : 'Salvar para revisão'}`}
        </button>`;
    };

    const modal = document.getElementById('story-word-modal') || document.getElementById('storie-word-modal');
    if (!modal) return;

    // Renderiza imediatamente (com loading se sem trad)
    modal.innerHTML = renderModal(tradInicial, !tradInicial);
    modal.style.display = 'block';
    this._posicionarModal(modal, wordEl);

    const overlay = document.getElementById('story-modal-overlay') || document.getElementById('storie-modal-overlay');
    if (overlay) overlay.style.display = 'block';

    // Se não tem tradução, busca via API (com cache)
    if (!tradInicial) {
      this._buscarTradAPI(palavra).then(tradAPI => {
        // Verifica se o modal ainda mostra esta palavra
        const pillsEl = document.getElementById('story-modal-pills') || document.getElementById('storie-modal-pills');
        if (!pillsEl) return;
        if (tradAPI) {
          pillsEl.innerHTML = buildPills(tradAPI);
          // Atualiza o onclick do botão salvar com a trad real
          const btn = document.getElementById('story-btn-save') || document.getElementById('storie-btn-salvar');
          if (btn) btn.setAttribute('onclick',
            `Stories._saveWordToFlashcards('${this._escAttr(palavra)}',{ipa:'${this._escAttr(ipa)}',trad:'${this._escAttr(tradAPI)}',cat:'${this._escAttr(cat)}'})`);
        } else {
          pillsEl.innerHTML = '';
        }
      });
    }
  },"""

new_word_modal_block = """  // ── Modal flutuante de palavra ─────────────────────────────
  _openWordModal(wordEl) {
    this._closeWordModal(false);

    const palavra = wordEl.dataset.palavra || wordEl.textContent.trim();
    let ipa  = wordEl.dataset.ipa  || '';
    let trad = wordEl.dataset.trad || '';
    let cat  = wordEl.dataset.cat  || '';

    // Busca global em todos os parágrafos da história
    if (!trad && this.storAttuale) {
      for (const p of (this.storAttuale.testo || [])) {
        const paroleList = (p.words || p.vocabulary || p.vocabulario || p.parole || []) || [];
        const found = paroleList.find(pw =>
          this._normWord(pw.ingles || pw.english || pw.parola || pw.word) === this._normWord(palavra)
        );
        if (found) {
          ipa  = ipa  || found.ipa        || '';
          trad = trad || found.traducao_portugues || found.traducao || found.portugues || found.traduzione || '';
          cat  = cat  || found.categoria  || found.category || '';
          break;
        }
      }
    }

    const isEn    = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const jaSalva = this._verificarSalva(palavra);
    const tradInicial = trad;

    this._modalData = {
      palavra,
      ipa,
      trad: tradInicial,
      cat
    };

    const buildPills = (t) => t
      ? t.split(/[;,]/).map(s => s.trim()).filter(Boolean)
          .map(s => `<span class="storie-trad-pill story-trad-pill">${this._escape(s)}</span>`).join('')
      : '';

    const renderModal = (tradAtual, carregando = false) => {
      const pills = buildPills(tradAtual);
      return `
        <button class="storie-modal-close story-modal-close" onclick="Stories._closeWordModal()" title="${isEn ? 'Close' : 'Fechar'}">×</button>
        <div class="storie-modal-palavra story-modal-palavra">${this._escape(palavra)}</div>
        ${ipa ? `<div class="storie-modal-ipa story-modal-ipa">${this._escape(ipa)}</div>` : ''}
        <button class="storie-modal-audio story-modal-audio" data-palavra="${this._escAttr(palavra)}" onclick="event.stopPropagation(); App.speak(this.dataset.palavra || Stories._modalData?.palavra)">🔊 ${isEn ? 'Listen' : 'Ouvir'}</button>
        <div class="storie-modal-traducoes story-modal-traducoes" id="storie-modal-pills">
          ${pills || (carregando ? '<span class="storie-trad-loading story-trad-loading">…</span>' : '')}
        </div>
        ${cat ? `<div style="margin-top:0.45rem"><span class="storie-modal-cat story-modal-cat">${this._escape(cat)}</span></div>` : ''}
        <button class="storie-modal-salvar story-modal-salvar${jaSalva ? ' salvo' : ''}" id="storie-btn-salvar"
          onclick="Stories._saveModalDeck()">
          ${jaSalva
            ? `✅ ${isEn ? 'Already saved' : 'Já salva'}`
            : `⭐ ${isEn ? 'Save for review' : 'Salvar para revisão'}`}
        </button>`;
    };

    const modal = document.getElementById('storie-word-modal') || document.getElementById('story-word-modal');
    if (!modal) return;

    modal.innerHTML = renderModal(tradInicial, !tradInicial);
    modal.style.display = 'block';
    this._posicionarModal(modal, wordEl);

    const overlay = document.getElementById('storie-modal-overlay') || document.getElementById('story-modal-overlay');
    if (overlay) overlay.style.display = 'block';

    // Se não tem tradução, busca via API (com cache)
    if (!tradInicial) {
      this._buscarTradAPI(palavra).then(tradAPI => {
        const pillsEl = document.getElementById('storie-modal-pills') || document.getElementById('story-modal-pills');
        if (!pillsEl) return;
        if (tradAPI) {
          if (this._modalData && this._modalData.palavra === palavra) {
            this._modalData.trad = tradAPI;
          }
          pillsEl.innerHTML = buildPills(tradAPI);
        } else {
          pillsEl.innerHTML = '';
        }
      });
    }
  },

  _saveModalDeck() {
    if (!this._modalData || !this._modalData.palavra) return;
    this._saveWordToFlashcards(this._modalData.palavra, {
      ipa: this._modalData.ipa,
      trad: this._modalData.trad,
      cat: this._modalData.cat
    });
  },"""

if old_word_modal_block in code:
    code = code.replace(old_word_modal_block, new_word_modal_block)
    print("Updated _openWordModal and added _saveModalDeck")

# Fix _saveWordToFlashcards button search & data keys
old_save_flashcards = """  // ── Salvar palavra no deck SRS ─────────────────────────────
  _saveWordToFlashcards(palavra, dados) {
    if (this._verificarSalva(palavra)) return;

    const id = 'story_' + this._normWord(palavra).replace(/\\W/g, '_') + '_' + Date.now();
    const entrada = {
      id,
      english: palavra,
      portugues: dados?.trad || '',
      categoria: dados?.cat  || 'vocabulo',
      templo_num: 0,
      _custom:    true,
      _from_story: true,
    };

    // Persistir em localStorage
    try {
      const key    = 'en_vocab_custom';
      const custom = JSON.parse(localStorage.getItem(key) || '[]');
      if (!custom.find(v => ((v.english || v.word || v.italiano)||'').toLowerCase() === palavra.toLowerCase())) {
        custom.push(entrada);
        localStorage.setItem(key, JSON.stringify(custom));
      }
    } catch(e) {}

    // Injetar no vocabCache global
    if (typeof App !== 'undefined' && App.estado?.vocabCache) {
      if (!App.estado.vocabCache.find(v => ((v.english || v.word || v.italiano)||'').toLowerCase() === palavra.toLowerCase())) {
        App.estado.vocabCache.unshift(entrada);
        if (App.estado.progresso) {
          App.estado.progresso.total_palavras = App.estado.vocabCache.length;
          App.salvarProgresso();
          App.atualizarStats();
        }
      }
    }

    // Inicializar estado FSRS
    if (typeof App !== 'undefined' && App.estado?.flashcardData) {
      if (!App.estado.flashcardData[id]) {
        App.estado.flashcardData[id] = {
          state: 'new', reps: 0, lapses: 0,
          stability: 0, difficulty: 5,
          nextReview: Date.now(),
        };
        if (App.salvarFlashcards) App.salvarFlashcards();
      }
    }

    // Feedback visual no botão
    const btn = document.getElementById('story-btn-save') || document.getElementById('storie-btn-salvar');
    if (btn) {
      const il = I18n.idioma === 'en';
      btn.textContent = `✅ ${il ? 'Already saved' : 'Já salva'}`;
      btn.classList.add('salvo');
    }

    // Destaca todas as ocorrências no texto
    this._markWordSavedInDOM(palavra);
  },"""

new_save_flashcards = """  // ── Salvar palavra no deck SRS ─────────────────────────────
  _saveWordToFlashcards(palavra, dados) {
    if (this._verificarSalva(palavra)) return;

    const id = 'story_' + this._normWord(palavra).replace(/\\W/g, '_') + '_' + Date.now();
    const entrada = {
      id,
      english:   palavra,
      ingles:    palavra,
      word:      palavra,
      portugues: dados?.trad || '',
      categoria: dados?.cat  || 'vocabulary',
      templo_num: 0,
      _custom:    true,
      _from_story: true,
    };

    // Persistir em localStorage
    try {
      const keys = ['en_vocab_custom', 'en_vocabulary_custom'];
      keys.forEach(k => {
        const custom = JSON.parse(localStorage.getItem(k) || '[]');
        if (!custom.find(v => ((v.english || v.word || v.ingles || v.italiano) || '').toLowerCase() === palavra.toLowerCase())) {
          custom.push(entrada);
          localStorage.setItem(k, JSON.stringify(custom));
        }
      });
    } catch(e) {}

    // Injetar no vocabCache global
    if (typeof App !== 'undefined' && App.estado?.vocabCache) {
      if (!App.estado.vocabCache.find(v => ((v.english || v.word || v.ingles || v.italiano) || '').toLowerCase() === palavra.toLowerCase())) {
        App.estado.vocabCache.unshift(entrada);
        if (App.estado.progresso) {
          App.estado.progresso.total_palavras = App.estado.vocabCache.length;
          App.salvarProgresso();
          App.atualizarStats();
        }
      }
    }

    // Inicializar estado FSRS
    if (typeof App !== 'undefined' && App.estado?.flashcardData) {
      if (!App.estado.flashcardData[id]) {
        App.estado.flashcardData[id] = {
          state: 'new', reps: 0, lapses: 0,
          stability: 0, difficulty: 5,
          nextReview: Date.now(),
        };
        if (App.salvarFlashcards) App.salvarFlashcards();
      }
    }

    // Feedback visual no botão
    const btn = document.getElementById('storie-btn-salvar') || document.getElementById('story-btn-salvar') || document.getElementById('story-btn-save');
    if (btn) {
      const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
      btn.textContent = `✅ ${isEn ? 'Already saved' : 'Já salva'}`;
      btn.classList.add('salvo');
    }

    // Destaca todas as ocorrências no texto
    this._markWordSavedInDOM(palavra);
  },"""

if old_save_flashcards in code:
    code = code.replace(old_save_flashcards, new_save_flashcards)
    print("Updated _saveWordToFlashcards")

# Fix _markAsRead notifications
old_mark_read = """  _markAsRead() {
    if (!this.storAttuale) return;
    const id = this.storAttuale.id;
    const il = I18n.idioma === 'it';
    if (this.completate.includes(id)) {
      App.notificar(il ? 'notif_gia_letta' : 'notif_ja_lida', 'info');
      return;
    }
    this.completate.push(id);
    this._saveCompleted();
    const xp = this.storAttuale.xp_recompensa || 50;
    if (typeof App !== 'undefined' && App.ganharXP) App.ganharXP(xp);
    App.notificar(il ? `notif_storia_letta_${id}` : `notif_storia_lida_${id}`, 'sucesso');
    this._renderizarStoria();
  },"""

new_mark_read = """  _markAsRead() {
    if (!this.storAttuale) return;
    const id = this.storAttuale.id;
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    if (this.completate.includes(id)) {
      const msg = (typeof I18n !== 'undefined' && I18n.t('storie_notif_ja_lida'))
        ? I18n.t('storie_notif_ja_lida')
        : (isEn ? 'You have already read this story.' : 'Você já leu esta história.');
      App.notificar(msg, 'info');
      return;
    }
    this.completate.push(id);
    this._saveCompleted();
    const xp = this.storAttuale.xp_recompensa || 50;
    if (typeof App !== 'undefined' && App.ganharXP) App.ganharXP(xp);
    const msgLida = (typeof I18n !== 'undefined' && I18n.t('storie_notif_lida'))
      ? I18n.t('storie_notif_lida').replace('{xp}', xp)
      : (isEn ? `📖 +${xp} XP for finishing the story!` : `📖 +${xp} XP por concluir a história!`);
    App.notificar(msgLida, 'sucesso');
    this._renderizarStoria();
  },"""

if old_mark_read in code:
    code = code.replace(old_mark_read, new_mark_read)
    print("Updated _markAsRead")

# Full backward-compatibility aliases
old_aliases = """// Backward-compatibility aliases
Stories._normalizar = (s) => Stories._normalize(s);
Stories.renderizarSeletor = () => Stories.renderSelector();
Stories.abrirStoria = Stories.abrirStoria;
Stories.abrirLeitor = (id) => Stories.abrirStoria(id);
Stories.openReader = (id) => Stories.abrirStoria(id);
Stories.openStory = (id) => Stories.abrirStoria(id);
Stories.fecharLeitor = () => Stories.closeReader();
Stories.proximaPagina = () => Stories.nextPage();
Stories.paginaAnterior = () => Stories.prevPage();
Stories.irParaPagina = (p) => Stories.goToPage(p);
Stories._calcularOrcamentoGeometria = (h, f, l) => Stories._calculateLineBudget(h, f, l);
Stories._gerarPaginas = () => Stories._generatePages();
Stories._tocarSomFolhear = () => Stories._playPageTurnSound();

window.Stories = Stories;
window.Storie = Stories;"""

new_aliases = """// Backward-compatibility aliases and Italian method parity
Stories._normalizar = (s) => Stories._normalize(s);
Stories.renderizarSeletor = () => Stories.renderSelector();
Stories.abrirStoria = Stories.abrirStoria;
Stories.abrirLeitor = (id) => Stories.abrirStoria(id);
Stories.openReader = (id) => Stories.abrirStoria(id);
Stories.openStory = (id) => Stories.abrirStoria(id);
Stories.fecharLeitor = () => Stories.closeReader();
Stories.proximaPagina = () => Stories.nextPage();
Stories.paginaAnterior = () => Stories.prevPage();
Stories.irParaPagina = (p) => Stories.goToPage(p);
Stories._calcularOrcamentoGeometria = (h, f, l) => Stories._calculateLineBudget(h, f, l);
Stories._gerarPaginas = (s, m) => Stories._generatePages(s, m);
Stories._tocarSomFolhear = () => Stories._playPageTurnSound();
Stories._toggleSegnalibro = () => Stories._toggleBookmark();
Stories._toggleTraduzir = () => Stories._toggleTranslation();
Stories._ouvirPaginaAtual = () => Stories._listenCurrentPage();
Stories._abrirIndiceCapitulos = () => Stories._openChapterDrawer();
Stories._fecharIndiceCapitulos = () => Stories._closeChapterDrawer();
Stories._abrirModalPalavra = (el) => Stories._openWordModal(el);
Stories._fecharModal = (r) => Stories._closeWordModal(r);
Stories._salvarModalDeck = () => Stories._saveModalDeck();
Stories._salvarNoDeck = (p, d) => Stories._saveWordToFlashcards(p, d);
Stories._marcarLida = () => Stories._markAsRead();
Stories._pararAudioPagina = () => Stories._stopPageAudio();
Stories._tocarProximaSentenca = () => Stories._playNextSentence();
Stories._marcarPalavras = (t, p, i, c) => Stories._tokenizeWords(t, p, i, c);
Stories._marcarPalavraSalvaNoDOM = (p) => Stories._markWordSavedInDOM(p);

window.Stories = Stories;
window.Storie = Stories;"""

if old_aliases in code:
    code = code.replace(old_aliases, new_aliases)
    print("Updated backward compatibility aliases")

with open('js/stories.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Saved js/stories.js successfully!")
