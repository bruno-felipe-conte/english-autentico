const Canzoni = {
  dados: null,        // built-in (data/canzoni.json)
  custom: [],         // criados pelo usuário (localStorage)
  _ocultas: [],       // IDs de nativas ocultadas pelo usuário
  canzonAtual: null,
  estrofeAtual: 0,
  acertos: 0,
  modoEdicao: false,  // true quando está criando/editando

  // ── Carregar built-in + custom ─────────────────────────────
  async carregar() {
    // 1. Carrega built-in
    if (!this.dados) {
      try {
        const r = await fetch('data/canzoni.json');
        if (r.ok) this.dados = await r.json();
        else this.dados = { canzoni: [] };
      } catch { this.dados = { canzoni: [] }; }
    }
    // 2. Carrega custom do localStorage
    try {
      this.custom = JSON.parse(localStorage.getItem('en_canzoni_custom') || '[]');
    } catch { this.custom = []; }
    // 3. Carrega lista de nativas ocultas
    try {
      this._ocultas = JSON.parse(localStorage.getItem('en_canzoni_ocultas') || '[]');
    } catch { this._ocultas = []; }
  },

  _filtroOrigem: '', // '' | 'custom' | 'nativo'

  // ── Retorna TODAS as músicas — custom primeiro, excluindo ocultas ──
  todasCanzoni() {
    const nativas = (this.dados?.canzoni || []).filter(c => !this._ocultas.includes(c.id));
    return [...this.custom, ...nativas];
  },

  // ── Salvar custom no localStorage ─────────────────────────
  _salvarCustom() {
    localStorage.setItem('en_canzoni_custom', JSON.stringify(this.custom));
  },

  // ── Ocultar música nativa (guarda ID no localStorage) ─────
  ocultarNativa(id) {
    const can = (this.dados?.canzoni || []).find(c => c.id === id);
    if (!can) return;
    if (!confirm(I18n.t('can_ocultar_confirm').replace('{t}', can.titulo))) return;
    if (!this._ocultas.includes(id)) this._ocultas.push(id);
    localStorage.setItem('en_canzoni_ocultas', JSON.stringify(this._ocultas));
    App.notificar(I18n.t('can_oculta_notif'), 'alerta');
    this.renderizarSeletor();
  },

  // ── Restaurar todas as nativas ocultas ─────────────────────
  restaurarNativas() {
    if (!this._ocultas.length) return;
    this._ocultas = [];
    localStorage.removeItem('en_canzoni_ocultas');
    App.notificar(I18n.t('can_restauradas_notif'), 'sucesso');
    this.renderizarSeletor();
  },

  // ── Renderizar seletor com built-in + custom + botão criar + avaliar ──
  _filtroNivel: '',
  _filtroTexto: '',

  async renderizarSeletor() {
    await this.carregar();
    const c = document.getElementById('canzoni-container');
    if (!c) return;

    const todas = this.todasCanzoni();
    const niveis = ['A1','A2','B1','B2','C1','C2'];
    const counts = {};
    todas.forEach(s => { counts[s.nivel] = (counts[s.nivel]||0)+1; });

    let filtradas = todas;
    if (this._filtroOrigem === 'custom') filtradas = filtradas.filter(s => s.custom || s._custom);
    if (this._filtroOrigem === 'nativo') filtradas = filtradas.filter(s => !s.custom && !s._custom);
    if (this._filtroNivel) filtradas = filtradas.filter(s => s.nivel === this._filtroNivel);
    if (this._filtroTexto) {
      const q = this._filtroTexto.toLowerCase();
      filtradas = filtradas.filter(s => s.titulo.toLowerCase().includes(q) || (s.artista||'').toLowerCase().includes(q));
    }

    // Ordenar: volumes da mesma música ficam juntos em sequência
    filtradas = [...filtradas].sort((a, b) => {
      const getBase = t => t.replace(/\s*\(Vol\.\s*\d+\)\s*$/i, '').trim();
      const getVol  = t => { const m = t.match(/\(Vol\.\s*(\d+)\)/i); return m ? parseInt(m[1]) : 0; };
      const baseA = getBase(a.titulo), baseB = getBase(b.titulo);
      if (baseA !== baseB) return baseA.localeCompare(baseB, 'it');
      return getVol(a.titulo) - getVol(b.titulo);
    });

    const nC=todas.filter(s=>s.custom||s._custom).length, nN=todas.length-nC, _o=this._filtroOrigem;
    const nOcultas = this._ocultas.length;
    const _oPill=(v,l,ct)=>`<button onclick="Canzoni._filtroOrigem='${v}';Canzoni.renderizarSeletor()" style="padding:0.22rem 0.6rem;border-radius:999px;border:1.5px solid ${_o===v?'#7B68A0':'#ddd'};background:${_o===v?'#7B68A0':'transparent'};color:${_o===v?'#fff':'inherit'};cursor:pointer;font-size:0.75rem;font-weight:600;white-space:nowrap">${l} (${ct})</button>`;

    let html = `
      <!-- Linha 1: busca + ações -->
      <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.55rem">
        <input type="search" placeholder="${I18n.t('can_busca_placeholder')}" value="${this._filtroTexto}"
          oninput="Canzoni._filtroTexto=this.value;Canzoni.renderizarSeletor()"
          style="flex:1;min-width:0;padding:0.44rem 0.75rem;border:1.5px solid #ddd;border-radius:20px;font-size:0.875rem;font-family:inherit">
        <button class="btn-pill-add" onclick="Canzoni.abrirFormularioCriar()" style="white-space:nowrap">${I18n.t('can_btn_adicionar')}</button>
        <button class="btn-ia-add" onclick="IAImport.abrir('canzone')" style="white-space:nowrap">${I18n.t('btn_via_ia')}</button>
      </div>
      <!-- Linha 2: filtros numa só linha -->
      <div style="display:flex;gap:0.35rem;flex-wrap:wrap;margin-bottom:1rem;align-items:center">
        ${_oPill('',I18n.t('filtro_todos'),todas.length)}
        ${nC?_oPill('custom','🤖 Adicionadas',nC):''}
        ${nN?_oPill('nativo',I18n.t('filtro_nativo'),nN):''}
        <select class="nivel-select${this._filtroNivel?' ativo':''}"
          onchange="Canzoni._filtroNivel=this.value;Canzoni.renderizarSeletor()">
          <option value="">🎯 Level</option>
          ${niveis.filter(n=>counts[n]).map(n=>`<option value="${n}" ${this._filtroNivel===n?'selected':''}>${n} (${counts[n]})</option>`).join('')}
        </select>
        ${nOcultas ? `<button onclick="Canzoni.restaurarNativas()" style="padding:0.22rem 0.6rem;border-radius:999px;border:1.5px solid #c9952a;background:rgba(201,149,42,0.1);color:#7a5a00;cursor:pointer;font-size:0.75rem;font-weight:600;white-space:nowrap;font-family:inherit">${I18n.t('can_restaurar')} (${nOcultas})</button>` : ''}
      </div>
      <div class="dialogo-grid">`;

    for (const can of filtradas) {
      const ehCustom = can.custom || can._custom;
      const badgeCustom = ehCustom ? '<span style="font-size:0.65rem;background:#7B68A0;color:white;padding:0.1rem 0.4rem;border-radius:6px;margin-left:0.3rem;">Minha</span>' : '';
      html += `<div class="dialogo-card" onclick="Canzoni.abrirCanzone('${can.id}')">
        <div class="dialogo-icone">${can.icone || '🎵'}</div>
        <div class="dialogo-titulo">${this._esc(can.titulo)}${badgeCustom}</div>
        <div style="font-size:0.75rem;color:#888;margin:0.2rem 0">${this._esc(can.artista || '')}</div>
        <div style="display:flex;gap:0.3rem;justify-content:center;flex-wrap:wrap;margin-top:0.3rem;align-items:center;">
          <span class="dialogo-nivel">${can.nivel}</span>
          ${ehCustom ? `
          ${can.custom ? `<button onclick="event.stopPropagation();Canzoni.editarCanzone('${can.id}')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;" title="Editar">✏️</button>` : ''}
          <button onclick="event.stopPropagation();Canzoni.excluirCanzone('${can.id}')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;" title="Excluir">🗑️</button>`
          : `<button onclick="event.stopPropagation();Canzoni.ocultarNativa('${can.id}')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;opacity:0.4;transition:opacity 0.15s" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=0.4" title="Hide this song">🗑️</button>`}
        </div>
      </div>`;
    }

    if (filtradas.length === 0) {
      html += `<p style="text-align:center;color:#aaa;grid-column:1/-1">${this._filtroTexto ? I18n.t('can_sem_resultados') : I18n.t('can_sem_musicas')}</p>`;
    }

    html += '</div>';
    c.innerHTML = html;
  },

  // ── Formulário de CRIAÇÃO ──────────────────────────────────
  abrirFormularioCriar(idEditar = null) {
    const c = document.getElementById('canzoni-container');
    if (!c) return;
    this.modoEdicao = true;

    const existente = idEditar ? this.custom.find(x => x.id === idEditar) : null;
    const titulo = existente?.titulo || '';
    const artista = existente?.artista || '';
    const nivel = existente?.nivel || 'A2';
    const icone = existente?.icone || '🎵';
    const audioKey = existente?.audio_store_key || '';
    const estrofes = existente?.estrofes?.map(e => ({ ...e, tempo: e.inicio_ms != null ? (e.inicio_ms / 1000) : '' }))
      || [{ id: 1, texto_completo: '', texto_lacuna: '', palavra_oculta: '', traducao: '', dica: '', tempo: '' }];

    let estrofesHtml = '';
    estrofes.forEach((est, i) => {
      estrofesHtml += Canzoni._htmlEstrofeForm(est, i);
    });

    c.innerHTML = `
      <div class="gram-lesson-nav">
        <button class="gram-btn-back" onclick="Canzoni.renderizarSeletor()">‹ Cancelar</button>
        <span style="font-size:0.9rem;font-weight:700">${idEditar ? I18n.t('can_editar_musica') : I18n.t('can_nova_musica')}</span>
      </div>

      <div class="gram-card" style="margin-top:1rem;padding:1.2rem">

        ${/* Hidden metadata inputs — always saved; visible only in edit mode */ ''}
        <input type="hidden" id="can-titulo" value="${this._esc(titulo)}">
        <input type="hidden" id="can-artista" value="${this._esc(artista)}">
        <input type="hidden" id="can-nivel" value="${this._esc(nivel)}">
        <input type="hidden" id="can-icone" value="${this._esc(icone)}">

        ${idEditar ? `
        <div id="can-meta-fields" style="margin-bottom:1rem">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-bottom:0.8rem">
            <div>
              <label style="font-size:0.82rem;font-weight:700;color:#9B2335">Título *</label>
              <input id="can-titulo-vis" type="text" value="${this._esc(titulo)}" placeholder="Ex: Bella Ciao"
                oninput="document.getElementById('can-titulo').value=this.value"
                style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem;font-size:0.9rem">
            </div>
            <div>
              <label style="font-size:0.82rem;font-weight:700;color:#9B2335">Artista</label>
              <input id="can-artista-vis" type="text" value="${this._esc(artista)}" placeholder="Ex: Tradicional"
                oninput="document.getElementById('can-artista').value=this.value"
                style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem;font-size:0.9rem">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem">
            <div>
              <label style="font-size:0.82rem;font-weight:700;color:#003E8A">Level</label>
              <select id="can-nivel-vis" oninput="document.getElementById('can-nivel').value=this.value"
                style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem;font-size:0.9rem">
                ${['A1','A2','B1','B2','C1'].map(n => `<option ${n===nivel?'selected':''}>${n}</option>`).join('')}
              </select>
            </div>
            <div>
              <label style="font-size:0.82rem;font-weight:700;color:#9B2335">Ícone (emoji)</label>
              <input id="can-icone-vis" type="text" value="${this._esc(icone)}" maxlength="4"
                oninput="document.getElementById('can-icone').value=this.value"
                style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem;font-size:1.2rem;text-align:center">
            </div>
          </div>
        </div>` : ''}

        ${/* Summary bar shown after import (hidden initially for new songs) */ ''}
        ${!idEditar ? `<div id="can-meta-summary" style="display:none;background:#e8f4e8;border:1px solid #a8d8a8;border-radius:8px;padding:0.6rem 0.9rem;margin-bottom:1rem;font-size:0.85rem;align-items:center;gap:0.8rem;flex-wrap:wrap">
          <span id="can-meta-icone" style="font-size:1.3rem"></span>
          <strong id="can-meta-titulo" style="color:#1a5c1a"></strong>
          <span id="can-meta-artista" style="color:#4a7a4a"></span>
          <span id="can-meta-nivel" style="background:#27ae60;color:#fff;padding:0.15rem 0.5rem;border-radius:12px;font-size:0.75rem;font-weight:700"></span>
        </div>` : ''}

        <div style="background:#f0f4fa;border:1px solid #c8d6ea;border-radius:10px;padding:0.9rem;margin-bottom:1rem">
          <div style="font-size:0.85rem;font-weight:700;color:#003E8A;margin-bottom:0.6rem">🎵 Song Audio (optional)</div>
          <input type="hidden" id="can-audio-key" value="${audioKey}">
          <input type="file" id="can-audio-file" accept="audio/*" onchange="Canzoni._onAudioSelecionado(event)" style="font-size:0.85rem">
          <audio id="can-audio-preview" controls style="width:100%;margin-top:0.6rem;display:${audioKey ? 'block' : 'none'}"></audio>
          <button id="can-btn-remover-audio" class="btn-secondario" onclick="Canzoni._removerAudio()"
            style="margin-top:0.5rem;font-size:0.8rem;display:${audioKey ? 'inline-block' : 'none'}">🗑️ Remove audio</button>
        </div>

        <div style="background:#f9f6f0;border:1px solid #ede5d5;border-radius:10px;padding:0.9rem;margin-bottom:1rem">
          <div style="font-size:0.85rem;font-weight:700;color:#9B2335;margin-bottom:0.6rem">🤖 Build AI Prompt (with exercises)</div>
          <div style="margin-top:0.5rem">
            <button class="btn-secondario" onclick="Canzoni._construirPromptIA()">🤖 Build AI Prompt (with exercises)</button>
          </div>

          <div id="can-ia-bloco" style="${idEditar ? 'display:none' : 'display:block'};margin-top:0.8rem">
            <p style="font-size:0.78rem;color:#8a7a60;margin-bottom:0.6rem">
              💡 <strong>Modo 4 Partes:</strong> Para músicas longas, envie um prompt por conversa separada no Gemini. Cole o JSON de cada parte nas abas abaixo, depois clique em <strong>✅ Unir e Importar</strong>.
            </p>

            <!-- Abas de partes -->
            <div style="display:flex;gap:4px;margin-bottom:0;flex-wrap:wrap">
              ${[1,2,3,4].map(n => `<button id="can-tab-btn-${n}" onclick="Canzoni._selecionarPartIA(${n})" style="flex:1;min-width:60px;padding:0.4rem 0.5rem;font-size:0.8rem;font-weight:700;border:1px solid #ede5d5;border-bottom:none;border-radius:6px 6px 0 0;cursor:pointer;background:${n===1?'#fff':'#f0ece6'};color:${n===1?'#9B2335':'#8a7a60'};transition:all 0.15s">Parte ${n}</button>`).join('')}
            </div>

            <!-- Conteúdo de cada aba -->
            ${[1,2,3,4].map(n => `
            <div id="can-tab-${n}" style="display:${n===1?'block':'none'};border:1px solid #ede5d5;border-radius:0 6px 6px 6px;background:#fff;padding:0.8rem">
              <p style="font-size:0.75rem;color:#8a7a60;margin-bottom:0.4rem">Prompt da Parte ${n} — envie separadamente ao Gemini:</p>
              <div class="ia-prompt-box">
                <pre id="can-ia-prompt-text-${n}"></pre>
                <button class="ia-copy-btn" onclick="Canzoni._copiarPromptIA(${n})">📋 Copiar Parte ${n}</button>
              </div>
              <p style="font-size:0.75rem;color:#8a7a60;margin:0.6rem 0 0.3rem">Cole o JSON que o Gemini gerou para esta parte:</p>
              <textarea id="can-ia-parte-${n}" class="ia-paste-area" rows="4" placeholder="Cole aqui o JSON da Parte ${n}..."></textarea>
            </div>`).join('')}

            <!-- Botão de unir e importar -->
            <div style="margin-top:0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center">
              <button class="btn-primario" style="flex:1;min-width:180px" onclick="Canzoni._unirEImportar()">✅ Unir e Importar (4 partes)</button>
              <button class="btn-secondario" style="font-size:0.78rem" onclick="Canzoni._mostrarCampoParteUnica()">📥 Importar parte única</button>
            </div>
            <p style="font-size:0.72rem;color:#8a7a60;margin-top:0.4rem">💡 Se tiver só uma parte ou a música inteira, use o botão "Importar parte única".</p>

            <!-- Campo para importação de parte única — revelado pelo botão -->
            <textarea id="can-ia-resultado" class="ia-paste-area" rows="4" placeholder="Cole aqui o JSON completo (parte única ou música inteira)..." style="margin-top:0.5rem;display:none"></textarea>
          </div>
        </div>

        <div style="display:none">
          <div id="can-estrofes">${estrofesHtml}</div>
        </div>

        <div style="position:sticky;bottom:0;background:#fff;padding:0.75rem 0 0.25rem;border-top:1px solid #f0e8d8;z-index:10;margin-top:0.25rem">
          <div style="display:flex;gap:0.5rem">
            ${idEditar
              ? `<button class="btn-primario" style="flex:1" onclick="Canzoni._salvarFormulario('${idEditar}')">💾 Save Song</button>`
              : `<button class="btn-primario" style="flex:1" onclick="Canzoni._importarESalvar()">✅ Salvar Música</button>`
            }
            <button class="btn-secondario" onclick="Canzoni.renderizarSeletor()">Cancelar</button>
          </div>
        </div>
      </div>`;

    if (audioKey) {
      AudioStore.obterURL(audioKey).then(url => {
        const audioEl = document.getElementById('can-audio-preview');
        if (audioEl && url) audioEl.src = url;
      });
    }
    if (!idEditar) setTimeout(() => this._construirPromptIA(), 50);
  },

  // ── Áudio sincronizado (formulário) ────────────────────────
  async _onAudioSelecionado(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const keyInput = document.getElementById('can-audio-key');
    const key = keyInput?.value || `audio_${Date.now()}`;
    try {
      await AudioStore.salvar(key, file);
      if (keyInput) keyInput.value = key;
      const url = await AudioStore.obterURL(key);
      const audioEl = document.getElementById('can-audio-preview');
      if (audioEl) { audioEl.src = url; audioEl.style.display = 'block'; }
      const btnRemover = document.getElementById('can-btn-remover-audio');
      if (btnRemover) btnRemover.style.display = 'inline-block';
    } catch (e) {
      App.notificar('Error saving audio file', 'erro');
    }
  },

  async _removerAudio() {
    const keyInput = document.getElementById('can-audio-key');
    const key = keyInput?.value;
    if (key) { try { await AudioStore.remover(key); } catch (e) {} }
    if (keyInput) keyInput.value = '';
    const audioEl = document.getElementById('can-audio-preview');
    if (audioEl) { audioEl.removeAttribute('src'); audioEl.style.display = 'none'; }
    const fileInput = document.getElementById('can-audio-file');
    if (fileInput) fileInput.value = '';
    const btnRemover = document.getElementById('can-btn-remover-audio');
    if (btnRemover) btnRemover.style.display = 'none';
  },

  _marcarTempoAgora(i) {
    const audioEl = document.getElementById('can-audio-preview');
    if (!audioEl || !audioEl.src) { App.notificar('Load an audio file first', 'alerta'); return; }
    const tempoInput = document.querySelector(`#can-est-${i} [data-campo="tempo"]`);
    if (tempoInput) tempoInput.value = audioEl.currentTime.toFixed(2);
  },

  _parseLRC(texto) {
    const re = /^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/;
    return texto.split('\n').reduce((acc, linha) => {
      const m = linha.trim().match(re);
      if (!m) return acc;
      const textoCompleto = m[3].trim();
      if (!textoCompleto) return acc;
      acc.push({ tempo: parseInt(m[1], 10) * 60 + parseFloat(m[2]), texto_completo: textoCompleto });
      return acc;
    }, []);
  },

  // Aceita "12s", "1:01" (m:ss) ou "1:02:03" (h:mm:ss) → segundos
  _parseTempoGenerico(str) {
    str = (str || '').trim();
    const seg = str.match(/^(\d+)\s*s$/i);
    if (seg) return parseInt(seg[1], 10);
    if (!/^\d+(:\d+){1,2}$/.test(str)) return null;
    const partes = str.split(':').map(p => parseInt(p, 10));
    if (partes.some(isNaN)) return null;
    if (partes.length === 2) return partes[0] * 60 + partes[1];
    return partes[0] * 3600 + partes[1] * 60 + partes[2];
  },

  // Tabela colada de sites de transcrição/legenda (Time | Subtitle | Tradução), separada por TAB
  // ou por 2+ espaços quando o TAB não sobrevive à colagem.
  _parseTabelaTranscricao(texto) {
    return texto.split('\n').reduce((acc, linha) => {
      if (!linha.trim()) return acc;
      const cols = linha.includes('\t') ? linha.split('\t') : linha.split(/ {2,}/);
      if (cols.length < 2) return acc;
      const tempo = this._parseTempoGenerico(cols[0]);
      if (tempo == null) return acc;
      const textoCompleto = (cols[1] || '').replace(/♪/g, '').trim();
      if (!textoCompleto) return acc;
      const traducao = (cols[2] || '').replace(/♪/g, '').trim();
      acc.push({ tempo, texto_completo: textoCompleto, traducao });
      return acc;
    }, []);
  },

  _importarLRC() {
    const textarea = document.getElementById('can-lrc-paste');
    const texto = textarea?.value || '';
    let linhas = this._parseLRC(texto);
    if (linhas.length === 0) linhas = this._parseTabelaTranscricao(texto);
    if (linhas.length === 0) { App.notificar('No valid timed lines found', 'alerta'); return; }

    const container = document.getElementById('can-estrofes');
    if (!container) return;
    container.innerHTML = '';
    linhas.forEach((l, i) => {
      const div = document.createElement('div');
      div.innerHTML = this._htmlEstrofeForm({ id: i + 1, texto_completo: l.texto_completo, texto_lacuna: '', palavra_oculta: '', traducao: l.traducao || '', dica: '', tempo: l.tempo }, i);
      container.appendChild(div.firstElementChild);
    });
    App.notificar(`${linhas.length} lines imported`, 'sucesso');
  },

  // ── Helper: parse timestamp → milliseconds (supports decimal seconds "15.274", "M:SS", "M:SS.x") ──
  _parseTimestamp(t) {
    if (!t) return 0;
    const parts = String(t).split(':');
    if (parts.length === 2) {
      // Supports "M:SS" and "M:SS.x" (decimal seconds)
      return Math.round((parseInt(parts[0]) * 60 + parseFloat(parts[1])) * 1000);
    }
    if (parts.length === 3) return (parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2])) * 1000;
    return parseFloat(t) * 1000;
  },

  // ── Novo prompt para Google Gemini (análise de áudio com timestamps por palavra) ──
  _construirPromptIA() {
    const titulo = document.getElementById('can-titulo')?.value.trim() || '';
    const artista = document.getElementById('can-artista')?.value.trim() || '';
    const nivel   = document.getElementById('can-nivel')?.value || 'A2';
    const icone   = document.getElementById('can-icone')?.value.trim() || '🎵';

    const nomeDaMusica = titulo && artista ? `${titulo} — ${artista}` : titulo || artista || 'NOME DA MÚSICA — ARTISTA';

    const prompt = `Você é um assistente especializado em transcrição musical pedagógica para um aplicativo de aprendizado de inglês. Sua missão é analisar arquivos de áudio de músicas e retornar JSONs com timestamps extremamente precisos para cada palavra individualmente vocalizada.

══════════════════════════════════════════════ ANÁLISE DO ÁUDIO ═══════════════════════════════════════════════
Analise o arquivo de áudio da música "${nomeDaMusica}" e retorne um JSON com timestamps por palavra individual.

### 1. ESTRUTURA DO JSON
Retorne um array de objetos JSON. Cada objeto representa uma linha completa ("line") e deve conter:

- "id": (int) Identificador único e sequencial do bloco
- "line": (string) A frase completa cantada em inglês
- "translation": (string) Tradução natural da frase para o português brasileiro
- "words": (array) Lista de objetos, UM POR PALAVRA da frase:
  - "w": (string) A palavra individual em inglês
  - "t": (number) Timestamp EXATO em que a palavra começa, em segundos decimais a partir do início do áudio (ex: 15.274, 62.891, 79.034)
  - "m": (string) Tradução literal ou significado morfológico daquela palavra isolada
  - "hidden": (boolean) true para a palavra escolhida como lacuna de exercício, false para todas as outras

### 2. REGRAS OBRIGATÓRIAS DE PRECISÃO

1. **Segmentação mínima**: Divida a música por FRASES LÓGICAS únicas (versos ou linhas). Não agrupe múltiplas linhas em um único bloco.

2. **Timestamps por palavra individual**: Estime o SEGUNDO EXATO em que cada palavra começa a ser vocalizada no áudio.
   - Cada palavra deve ter seu próprio objeto no array "words"
   - O timestamp deve refletir quando aquela palavra específica começa (não termina)
   - Precisão: use 3 casas decimais de segundo (ex: 15.274)

3. **Campo "hidden"**:
   - Em 40% a 50% das linhas com conteúdo cantado real, marque UMA palavra com "hidden": true
   - Escolha palavras pedagogicamente úteis: substantivos, verbos, adjetivos ou advérbios relevantes
   - NUNCA artigos ("the", "a"), preposições curtas, pronomes ou conjunções simples
   - Linhas sem exercício: todas as palavras têm "hidden": false

4. **Traduções**:
   - "translation": tradução natural da frase inteira (sentido contextual em português)
   - "m": tradução literal/morfológica da palavra isolada

5. **Retorne APENAS o JSON válido**, sem texto antes ou depois

6. **Nível de inglês alvo**: ${nivel}. Prefira lacunas com palavras adequadas a esse nível (palavras-chave, não conectivos)

### 3. METADADOS PARA IMPORTAÇÃO
Inclua no início do JSON, antes do array, um objeto wrapper:

{
  "titulo": "${titulo || 'NOME DA MÚSICA'}",
  "artista": "${artista || 'NOME DO ARTISTA'}",
  "nivel": "${nivel}",
  "icone": "${icone}",
  "estrofes": [...] // array de linhas acima...
}

══════════════════════════════════════════════ EXEMPLO DE SAIDA ESPERADA ═══════════════════════════════════════════════
[
  {
    "id": 1,
    "line": "First things first, I'ma say all the words inside my head",
    "translation": "Em primeiro lugar, vou dizer todas as palavras dentro da minha cabeça",
    "words": [
      {"w": "First",  "t": 15.000, "m": "Primeiro",  "hidden": false},
      {"w": "things", "t": 15.274, "m": "coisas",    "hidden": false},
      {"w": "first",  "t": 15.891, "m": "primeiro",  "hidden": false},
      {"w": "I'ma",   "t": 16.134, "m": "Eu vou",    "hidden": false},
      {"w": "say",    "t": 16.512, "m": "dizer",      "hidden": true},
      {"w": "all",    "t": 16.891, "m": "todas",      "hidden": false},
      {"w": "the",    "t": 17.103, "m": "as",         "hidden": false},
      {"w": "words",  "t": 17.312, "m": "palavras",   "hidden": false},
      {"w": "inside", "t": 17.623, "m": "dentro de",  "hidden": false},
      {"w": "my",     "t": 17.891, "m": "minha",      "hidden": false},
      {"w": "head",   "t": 18.204, "m": "cabeça",     "hidden": false}
    ]
  }
]

══════════════════════════════════════════════ 📍 IMPORTANTE ══════════════════════════════════════════════════
- Timestamps devem ser extremamente precisos (cada palavra tem seu próprio timestamp de INÍCIO)
- NUNCA repita o mesmo valor de "t" em duas palavras da mesma linha — o motor calcula o fim de cada palavra como o início da próxima; timestamps iguais resultam em duração zero e a palavra nunca acende no karaokê
- Use 3 casas decimais (ex: 15.274) para máxima precisão de highlight
- O JSON deve estar validado e pronto para importação direta no aplicativo`;

    const bloco = document.getElementById('can-ia-bloco');
    if (bloco) bloco.style.display = 'block';

    // Build prompts for all 4 parts and inject into tabs
    const prompts = this._construirPrompts4Partes(titulo, artista, nivel, icone, nomeDaMusica);
    prompts.forEach((p, i) => {
      const pre = document.getElementById(`can-ia-prompt-text-${i + 1}`);
      if (pre) pre.textContent = p;
    });

    // Activate part 1 tab by default
    this._selecionarPartIA(1);
    const tab1 = document.getElementById('can-tab-1');
    tab1?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  },

  _selecionarPartIA(n) {
    [1,2,3,4].forEach(i => {
      const tab = document.getElementById(`can-tab-${i}`);
      const btn = document.getElementById(`can-tab-btn-${i}`);
      if (tab) tab.style.display = i === n ? 'block' : 'none';
      if (btn) {
        btn.style.background = i === n ? '#fff' : '#f0ece6';
        btn.style.color      = i === n ? '#9B2335' : '#8a7a60';
      }
    });
  },

  _construirPrompts4Partes(titulo, artista, nivel, icone, nomeDaMusica) {
    const parteLabels = [
      'primeira parte (início até aproximadamente 25% da música)',
      'segunda parte (de aproximadamente 25% até 50% da música)',
      'terceira parte (de aproximadamente 50% até 75% da música)',
      'quarta e última parte (de aproximadamente 75% até o fim da música)',
    ];

    const regraBase = `### REGRAS OBRIGATÓRIAS DE PRECISÃO

1. **Segmentação mínima**: Divida por FRASES LÓGICAS únicas (versos ou linhas). Não agrupe múltiplas linhas.

2. **Timestamps por palavra individual**: Estime o SEGUNDO EXATO em que cada palavra começa.
   - Cada palavra deve ter seu próprio objeto no array "words"
   - O timestamp deve refletir quando aquela palavra começa (não termina)
   - Precisão: use 3 casas decimais em segundos (ex: 79.034)

3. **Campo "hidden"**:
   - Em 40% a 50% das linhas com conteúdo cantado real, marque UMA palavra com "hidden": true
   - Escolha palavras úteis: substantivos, verbos, adjetivos ou advérbios relevantes
   - NUNCA artigos ("the", "a"), preposições curtas, pronomes ou conjunções simples
   - Linhas sem exercício: todas as palavras têm "hidden": false

4. **Traduções**:
   - "translation": tradução natural da frase inteira em português
   - "m": tradução literal/morfológica da palavra isolada

5. **Retorne APENAS o JSON válido**, sem texto antes ou depois

6. **Nível de inglês alvo**: ${nivel}. Prefira lacunas adequadas a esse nível`;

    const estrutura = `### ESTRUTURA DE CADA LINHA
⚠️ "t" e "e" devem ser NÚMEROS (float), não strings. Correto: 79.034  |  Errado: "79.034"
⚠️ "e" (end) é OBRIGATÓRIO: timestamp do fim da palavra em segundos decimais. "e" deve ser MAIOR que "t".
[
  {
    "id": 1,
    "line": "You made me a believer",
    "translation": "Você me fez um crente",
    "words": [
      {"w": "You",      "t": 79.034, "e": 79.312, "m": "Você",    "hidden": false},
      {"w": "made",     "t": 79.312, "e": 79.578, "m": "fez",     "hidden": false},
      {"w": "me",       "t": 79.578, "e": 79.801, "m": "me",      "hidden": false},
      {"w": "a",        "t": 79.801, "e": 80.124, "m": "um",      "hidden": false},
      {"w": "believer", "t": 80.124, "e": 80.950, "m": "crente",  "hidden": true}
    ]
  }
]`;

    const metadadosParte1 = `
### ENTREGA PARTE 1 — retorne o objeto wrapper completo:
{
  "titulo": "${titulo || 'NOME DA MÚSICA'}",
  "artista": "${artista || 'NOME DO ARTISTA'}",
  "nivel": "${nivel}",
  "icone": "${icone}",
  "estrofes": [ ...array de linhas desta parte... ]
}`;

    return parteLabels.map((label, idx) => {
      const partNum = idx + 1;
      const isFirst = partNum === 1;
      const continuacaoNote = isFirst ? '' : `
⚠️ ATENÇÃO: Este é um prompt de CONTINUAÇÃO. Continue a numeração de "id" de onde a parte anterior parou. NÃO repita linhas já transcritas.`;

      const entrega = isFirst
        ? metadadosParte1
        : `
══════════════════════════════ 📍 ENTREGA ══════════════════════════════
- Retorne APENAS o array JSON de linhas desta parte (sem wrapper, sem explicações)
- Parte ${partNum} de 4 — continue a numeração do "id" sequencialmente
- "t" e "e" são NÚMEROS float (ex: 80.124), não strings — "e" > "t" obrigatoriamente
- NUNCA repita o mesmo valor de "t" em duas palavras`;

      return `Você é um assistente especializado em transcrição musical pedagógica para um aplicativo de aprendizado de inglês.${continuacaoNote}

══════════════════════════════ PARTE ${partNum} DE 4 ══════════════════════════════
Analise o arquivo de áudio da música "${nomeDaMusica}".
Transcreva APENAS a ${label}.

Importante: NÃO transcreva a música inteira — apenas a fração indicada acima.
════════════════════════════════════════════════════════════════════════

${regraBase}

${estrutura}${entrega}`;
    });
  },

  _copiarPromptIA(partNum) {
    // Support copying by part tab (1-4) or fallback to legacy single prompt element
    const elId = partNum ? `can-ia-prompt-text-${partNum}` : 'can-ia-prompt-text';
    const txt = document.getElementById(elId)?.textContent || '';
    const btnSel = partNum
      ? `#can-tab-${partNum} .ia-copy-btn`
      : '#can-ia-bloco .ia-copy-btn';
    const setCopiado = () => {
      const btn = document.querySelector(btnSel);
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = '✅ Copiado!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    };
    navigator.clipboard.writeText(txt).then(setCopiado).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiado();
    });
  },

  _unirEImportar() {
    // Collect JSON from all 4 part textareas and merge estrofes
    const partes = [];
    let metadados = null;

    for (let i = 1; i <= 4; i++) {
      const raw = (document.getElementById(`can-ia-parte-${i}`)?.value || '').trim();
      if (!raw) continue;
      try {
        let parsed = JSON.parse(raw);
        // Support both array and wrapper object formats
        if (Array.isArray(parsed)) {
          partes.push(...parsed);
        } else if (parsed.estrofes) {
          if (!metadados) metadados = { titulo: parsed.titulo, artista: parsed.artista, nivel: parsed.nivel, icone: parsed.icone };
          partes.push(...parsed.estrofes);
        }
      } catch (e) {
        App.notificar(`Parte ${i}: JSON inválido — verifique o conteúdo`, 'erro');
        return;
      }
    }

    if (partes.length === 0) {
      App.notificar('Nenhuma parte preenchida. Cole o JSON das partes antes de unir.', 'alerta');
      return;
    }

    // Re-number IDs sequentially after merge
    partes.forEach((e, idx) => { e.id = idx + 1; });

    // Build unified JSON and feed it to the existing import pipeline
    const unificado = metadados
      ? { ...metadados, estrofes: partes }
      : { titulo: document.getElementById('can-titulo')?.value || '', artista: document.getElementById('can-artista')?.value || '', nivel: document.getElementById('can-nivel')?.value || 'A2', icone: document.getElementById('can-icone')?.value || '🎵', estrofes: partes };

    // Inject into the legacy textarea so _importarResultadoIA can process it
    const ta = document.getElementById('can-ia-resultado');
    if (ta) {
      ta.value = JSON.stringify(unificado);
      ta.style.display = 'block';
    }
    this._importarResultadoIA();
    App.notificar(`✅ ${partes.length} linhas unidas e importadas com sucesso!`, 'sucesso');
  },

  _mostrarCampoParteUnica() {
    const ta = document.getElementById('can-ia-resultado');
    if (!ta) return;
    if (ta.style.display === 'none' || !ta.style.display) {
      // First click: reveal field and focus it
      ta.style.display = 'block';
      ta.placeholder = 'Cole aqui o JSON completo (parte única ou música inteira) e clique no botão novamente...';
      ta.focus();
      // Change button label to signal second click will import
      const btn = document.querySelector('[onclick="Canzoni._mostrarCampoParteUnica()"]');
      if (btn) { btn.textContent = '✅ Confirmar e Importar'; btn.style.background = 'rgba(74,222,128,0.2)'; }
    } else {
      // Second click (or field already visible): import
      this._importarResultadoIA();
    }
  },

  _importarResultadoIA() {
    const raw = document.getElementById('can-ia-resultado')?.value.trim() || '';
    if (!raw) { App.notificar(I18n.t('can_ia_cole_json'), 'alerta'); return; }

    let dados;
    try {
      const match = raw.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (!match) throw new Error('No JSON found');
      dados = JSON.parse(match[1]);

      // Extrair metadados do wrapper {titulo, artista, nivel, icone, estrofes}
      if (!Array.isArray(dados) && Array.isArray(dados.estrofes)) {
        if (dados.titulo)  { const el = document.getElementById('can-titulo');  if (el) el.value = dados.titulo; }
        if (dados.artista) { const el = document.getElementById('can-artista'); if (el) el.value = dados.artista; }
        if (dados.nivel)   { const el = document.getElementById('can-nivel');   if (el) el.value = dados.nivel; }
        if (dados.icone)   { const el = document.getElementById('can-icone');   if (el) el.value = dados.icone; }
        dados = dados.estrofes;
      }
      if (!Array.isArray(dados)) dados = [dados];

      // ── Converter novo formato Gemini [{id, line, translation, words}] ──
      if (dados.length > 0 && dados[0].words && Array.isArray(dados[0].words)) {
        dados = dados.map(item => {
          const words = item.words.map(w => ({ ...w, ms: this._parseTimestamp(w.t) }));
          this._distribuirTimestamps(words);
          const hiddenWord = words.find(w => w.hidden);
          const inicioMs = words[0]?.ms ?? 0;
          const palavraOcultaMs = hiddenWord?.ms ?? null;
          let textoLacuna = '';
          if (hiddenWord) {
            const re = new RegExp('(?<![\\w\'])' + hiddenWord.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w\'])', 'i');
            textoLacuna = item.line.replace(re, '___');
          }
          return {
            texto_completo: item.line,
            traducao: item.translation || '',
            palavra_oculta: hiddenWord?.w || '',
            dica: hiddenWord?.m || '',
            texto_lacuna: textoLacuna,
            tempo: inicioMs / 1000,
            inicio_ms: inicioMs,
            palavra_oculta_ms: palavraOcultaMs,
            words
          };
        });
      }
    } catch (e) {
      App.notificar(I18n.t('can_ia_json_invalido'), 'erro');
      return;
    }

    const validos = dados.filter(d => d && typeof d.texto_completo === 'string' && d.texto_completo.trim());
    if (validos.length === 0) { App.notificar(I18n.t('can_ia_sem_versos'), 'erro'); return; }

    const container = document.getElementById('can-estrofes');
    if (!container) return;
    const existentes = container.querySelectorAll('.can-estrofe-form').length;
    if (existentes > 0 && !confirm(I18n.t('can_substituir_versos').replace('{a}', existentes).replace('{b}', validos.length))) return;
    container.innerHTML = '';
    validos.forEach((l, i) => {
      const div = document.createElement('div');
      div.innerHTML = this._htmlEstrofeForm({
        id: i + 1,
        texto_completo: l.texto_completo,
        texto_lacuna: l.texto_lacuna || '',
        palavra_oculta: l.palavra_oculta || '',
        traducao: l.traducao || '',
        dica: l.dica || '',
        tempo: l.tempo ?? '',
        words: l.words || null,
        palavra_oculta_ms: l.palavra_oculta_ms ?? null
      }, i);
      container.appendChild(div.firstElementChild);
    });
    App.notificar(I18n.t('can_ia_importados').replace('{n}', validos.length), 'sucesso');

    // Show metadata summary bar (only in new-song mode, not edit mode)
    const summary = document.getElementById('can-meta-summary');
    if (summary) {
      const tit = document.getElementById('can-titulo')?.value || '';
      const art = document.getElementById('can-artista')?.value || '';
      const niv = document.getElementById('can-nivel')?.value || '';
      const ico = document.getElementById('can-icone')?.value || '🎵';
      const elIco = document.getElementById('can-meta-icone');
      const elTit = document.getElementById('can-meta-titulo');
      const elArt = document.getElementById('can-meta-artista');
      const elNiv = document.getElementById('can-meta-nivel');
      if (elIco) elIco.textContent = ico;
      if (elTit) elTit.textContent = tit;
      if (elArt) elArt.textContent = art ? `— ${art}` : '';
      if (elNiv) elNiv.textContent = niv;
      summary.style.display = 'flex';
    }
  },

  _importarESalvar() {
    const raw = document.getElementById('can-ia-resultado')?.value.trim() || '';
    if (!raw) { App.notificar(I18n.t('can_ia_cole_json'), 'alerta'); return; }

    let dados, meta = {};
    try {
      const match = raw.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
      if (!match) throw new Error('No JSON found');
      dados = JSON.parse(match[1]);

      if (!Array.isArray(dados) && Array.isArray(dados.estrofes)) {
        meta = { titulo: dados.titulo, artista: dados.artista, nivel: dados.nivel, icone: dados.icone };
        dados = dados.estrofes;
      }
      if (!Array.isArray(dados)) dados = [dados];

      if (dados.length > 0 && dados[0].words && Array.isArray(dados[0].words)) {
        dados = dados.map(item => {
          const words = item.words.map(w => ({ ...w, ms: this._parseTimestamp(w.t) }));
          this._distribuirTimestamps(words);
          const hiddenWord = words.find(w => w.hidden);
          const inicioMs = words[0]?.ms ?? 0;
          const palavraOcultaMs = hiddenWord?.ms ?? null;
          let textoLacuna = '';
          if (hiddenWord) {
            const re = new RegExp('(?<![\\w\'])' + hiddenWord.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\w\'])', 'i');
            textoLacuna = item.line.replace(re, '___');
          }
          return {
            texto_completo: item.line, traducao: item.translation || '',
            palavra_oculta: hiddenWord?.w || '', dica: hiddenWord?.m || '',
            texto_lacuna: textoLacuna, inicio_ms: inicioMs,
            palavra_oculta_ms: palavraOcultaMs, words
          };
        });
      }
    } catch(e) { App.notificar(I18n.t('can_ia_json_invalido'), 'erro'); return; }

    const validos = dados.filter(d => d && typeof d.texto_completo === 'string' && d.texto_completo.trim());
    if (!validos.length) { App.notificar(I18n.t('can_ia_sem_versos'), 'erro'); return; }

    const titulo = meta.titulo || document.getElementById('can-titulo')?.value.trim() || '';
    if (!titulo) { App.notificar(I18n.t('notif_can_titulo_obr'), 'erro'); return; }

    const estrofes = validos.map((l, i) => {
      const est = {
        id: i + 1, texto_completo: l.texto_completo, texto_lacuna: l.texto_lacuna || '',
        palavra_oculta: l.palavra_oculta || '', traducao: l.traducao || '', dica: l.dica || ''
      };
      if (l.inicio_ms != null) est.inicio_ms = l.inicio_ms;
      if (l.palavra_oculta_ms != null) est.palavra_oculta_ms = l.palavra_oculta_ms;
      if (l.words) est.words = l.words;
      return est;
    });

    const audioKey = document.getElementById('can-audio-key')?.value || '';
    const nova = {
      id: `custom_can_${Date.now()}`,
      titulo,
      artista: meta.artista || '',
      nivel: meta.nivel || 'A2',
      icone: meta.icone || '🎵',
      tema: 'custom', criado_em: Date.now(), custom: true,
      estrofes,
      vocabulario_chave: estrofes.map(e => e.palavra_oculta).filter(Boolean),
      xp_recompensa: Math.min(10 + estrofes.length * 5, 60)
    };
    if (audioKey) nova.audio_store_key = audioKey;
    this.custom.push(nova);
    this._salvarCustom();
    App.notificar(I18n.t('can_salva').replace('{t}', titulo), 'sucesso');
    this.renderizarSeletor();
  },

  _htmlEstrofeForm(est, i) {
    return `
      <div class="can-estrofe-form" id="can-est-${i}" style="background:#f9f6f0;border-radius:10px;padding:0.9rem;margin-bottom:0.8rem;border:1px solid #ede5d5">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <span style="font-weight:700;font-size:0.82rem;color:#9B2335">Verse ${i + 1}</span>
          <button class="can-btn-remover-verso" onclick="Canzoni._removerEstrofe(${i})" style="background:none;border:none;cursor:pointer;color:#C0392B;font-size:0.85rem">🗑️ Remove</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:0.5rem">
          <input type="text" placeholder="Full text (e.g.: Yesterday, all my troubles seemed so far away)" data-campo="texto_completo" data-idx="${i}"
            value="${est.texto_completo || ''}"
            style="padding:0.45rem 0.6rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem">
          <input type="text" placeholder="Text with gap (e.g.: Yesterday, all my ___ seemed so far away)" data-campo="texto_lacuna" data-idx="${i}"
            value="${est.texto_lacuna || ''}"
            style="padding:0.45rem 0.6rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem">
            <input type="text" placeholder="Hidden word (e.g.: troubles)" data-campo="palavra_oculta" data-idx="${i}"
              value="${est.palavra_oculta || ''}"
              style="padding:0.45rem 0.6rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem">
            <input type="text" placeholder="Hint (e.g.: problems)" data-campo="dica" data-idx="${i}"
              value="${est.dica || ''}"
              style="padding:0.45rem 0.6rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem">
          </div>
          <input type="text" placeholder="Portuguese translation" data-campo="traducao" data-idx="${i}"
            value="${est.traducao || ''}"
            style="padding:0.45rem 0.6rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem">
          <div style="display:flex;gap:0.5rem;align-items:center">
            <input type="number" step="0.1" min="0" placeholder="Time (s)" data-campo="tempo" data-idx="${i}"
              value="${est.tempo ?? ''}"
              style="padding:0.45rem 0.6rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem;width:7rem">
            <button class="can-btn-marcar-tempo" onclick="Canzoni._marcarTempoAgora(${i})"
              style="background:none;border:1px solid #003E8A;color:#003E8A;border-radius:7px;padding:0.4rem 0.6rem;cursor:pointer;font-size:0.78rem;white-space:nowrap">🎙️ Mark now</button>
          </div>
          <input type="hidden" data-campo="words_json" data-idx="${i}" value="${est.words ? this._esc(JSON.stringify(est.words)) : ''}">
          <input type="hidden" data-campo="palavra_oculta_ms" data-idx="${i}" value="${est.palavra_oculta_ms ?? ''}">
        </div>
      </div>`;
  },

  _adicionarEstrofe() {
    const container = document.getElementById('can-estrofes');
    if (!container) return;
    const i = container.querySelectorAll('.can-estrofe-form').length;
    const div = document.createElement('div');
    div.innerHTML = this._htmlEstrofeForm({ id: i+1, texto_completo:'', texto_lacuna:'', palavra_oculta:'', traducao:'', dica:'', tempo:'' }, i);
    container.appendChild(div.firstElementChild);
  },

  _removerEstrofe(i) {
    const el = document.getElementById(`can-est-${i}`);
    if (el) el.remove();
    // Re-numerar
    document.querySelectorAll('.can-estrofe-form').forEach((el, idx) => {
      el.id = `can-est-${idx}`;
      el.querySelector('span').textContent = `Verse ${idx + 1}`;
      el.querySelectorAll('[data-idx]').forEach(inp => inp.dataset.idx = idx);
      const btnRemover = el.querySelector('.can-btn-remover-verso');
      if (btnRemover) btnRemover.setAttribute('onclick', `Canzoni._removerEstrofe(${idx})`);
      const btnMarcar = el.querySelector('.can-btn-marcar-tempo');
      if (btnMarcar) btnMarcar.setAttribute('onclick', `Canzoni._marcarTempoAgora(${idx})`);
    });
  },

  _salvarFormulario(idEditar) {
    const titulo = document.getElementById('can-titulo')?.value.trim();
    if (!titulo) { App.notificar('notif_can_titulo_obr', 'erro'); return; }

    // Coletar estrofes
    const estrofes = [];
    document.querySelectorAll('.can-estrofe-form').forEach((el, i) => {
      const campos = {};
      el.querySelectorAll('[data-campo]').forEach(inp => { campos[inp.dataset.campo] = inp.value.trim(); });
      if (!campos.texto_completo) return;
      // Auto-gerar texto_lacuna se não preenchido
      if (!campos.texto_lacuna && campos.palavra_oculta) {
        const reEscape = campos.palavra_oculta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        campos.texto_lacuna = campos.texto_completo.replace(new RegExp(reEscape, 'i'), '___');
      }
      const est = {
        id: i + 1,
        texto_completo: campos.texto_completo,
        texto_lacuna: campos.texto_lacuna || '',
        palavra_oculta: campos.palavra_oculta || '',
        traducao: campos.traducao || '',
        dica: campos.dica || ''
      };
      const tempo = campos.tempo !== '' && campos.tempo != null ? parseFloat(campos.tempo) : NaN;
      if (!isNaN(tempo)) est.inicio_ms = Math.round(tempo * 1000);
      const wordsJson = campos.words_json || '';
      if (wordsJson) { try { est.words = JSON.parse(wordsJson); } catch(e) {} }
      if (campos.palavra_oculta_ms) est.palavra_oculta_ms = parseInt(campos.palavra_oculta_ms);
      estrofes.push(est);
    });
    if (estrofes.length === 0) { App.notificar('notif_can_sem_verso', 'erro'); return; }

    const audioKey = document.getElementById('can-audio-key')?.value || '';

    const nova = {
      id: idEditar || `custom_can_${Date.now()}`,
      titulo,
      artista: document.getElementById('can-artista')?.value.trim() || '',
      nivel: document.getElementById('can-nivel')?.value || 'A2',
      icone: document.getElementById('can-icone')?.value.trim() || '🎵',
      tema: 'custom',
      criado_em: Date.now(),
      custom: true,
      estrofes,
      vocabulario_chave: estrofes.map(e => e.palavra_oculta).filter(Boolean),
      xp_recompensa: Math.min(10 + estrofes.length * 5, 60)
    };
    if (audioKey) nova.audio_store_key = audioKey;

    if (idEditar) {
      const idx = this.custom.findIndex(x => x.id === idEditar);
      if (idx >= 0) this.custom[idx] = nova; else this.custom.push(nova);
    } else {
      this.custom.push(nova);
    }
    this._salvarCustom();
    App.notificar(I18n.t('can_salva').replace('{t}', titulo), 'sucesso');
    this.renderizarSeletor();
  },

  editarCanzone(id) {
    this.abrirFormularioCriar(id);
  },

  excluirCanzone(id) {
    const can = this.custom.find(x => x.id === id);
    if (!can) return;
    if (!confirm(I18n.t('can_excluir_confirm').replace('{t}', can.titulo))) return;
    this.custom = this.custom.filter(x => x.id !== id);
    this._salvarCustom();
    App.notificar('notif_can_excluida', 'alerta');
    this.renderizarSeletor();
  },

  // ── EVENT BUS ─────────────────────────────────────────────────
  // Minimal pub/sub: decouples RAF loop from UI consumers (Lyrics, Exercise, Debug).
  // Usage: Canzoni._bus.on('sync', fn)  /  Canzoni._bus.off('sync', fn)
  // RAF loop calls _bus.emit('sync', state) — consumers react independently.
  _bus: {
    _h: {},
    on(e, fn)   { (this._h[e] = this._h[e] || []).push(fn); },
    off(e, fn)  { if (this._h[e]) this._h[e] = this._h[e].filter(f => f !== fn); },
    emit(e, d)  { const hs = this._h[e]; if (hs) for (let i = 0; i < hs.length; i++) { try { hs[i](d); } catch(ex) { console.error('[bus]', e, ex); } } },
    clear(e)    { delete this._h[e]; },
  },

  // ── MÉTODOS DE JOGO ──────────────────────────────────────────
  erros: 0,
  // ⚠️ Mutated in-place every RAF frame — do NOT retain a reference between frames.
  //    Subscribers must read fields immediately inside their callback, never cache the object itself.
  _syncState: { curMs:0, wordIndex:-1, lineIndex:-1, currentWord:null, nextWord:null, currentLine:null, nextLine:null, progress:0 },
  _syncDebugVisible: false,
  respostas: [],
  traduzirVisivel: false,

  async abrirCanzone(id) {
    await this.carregar();
    const can = this.todasCanzoni().find(c => c.id === id);
    if (!can) return;
    this.canzonAtual = can;
    // Multi-part imports can produce out-of-order estrofes; binary search requires sorted input
    can.estrofes.sort((a, b) => (a.inicio_ms ?? a.words?.[0]?.ms ?? 0) - (b.inicio_ms ?? b.words?.[0]?.ms ?? 0));
    this.estrofeAtual = 0;
    this.acertos = 0;
    this.erros = 0;
    this.respostas = this.canzonAtual.estrofes.map(() => null);
    this.syncOffsetMs = parseFloat(localStorage.getItem('can_sync_' + (can.id || '')) || '0') || 0;
    this._songIdx = null;
    this._lastLineIndex = -1;
    this.traduzirVisivel = false;
    this._audioResumeTime = null;
    this._audioShouldPlay = false;
    this._distratorCache = {};
    this._syncGen = (this._syncGen || 0) + 1;
    // Limpa listeners e bus ao trocar de música — evita handlers duplicados acumulados
    this._bus.clear('sync');
    if (this._karaokeRafStop) { this._karaokeRafStop(); this._karaokeRafStop = null; }
    const _audioReset = document.getElementById('can-audio-player');
    if (_audioReset) {
      if (this._timeupdateListener) { _audioReset.removeEventListener('timeupdate', this._timeupdateListener); this._timeupdateListener = null; }
      _audioReset.dataset.loadedKey = '';
    }
    this._buildSongIndex(this.canzonAtual);
    this._avancarProximoBlank();
  },

  _repetirVerso(inicioMs, fimMs) {
    const audioEl = document.getElementById('can-audio-player');
    if (!audioEl || inicioMs == null) return;
    if (this._repeatListener) {
      audioEl.removeEventListener('timeupdate', this._repeatListener);
      this._repeatListener = null;
    }
    const off = this.syncOffsetMs || 0;
    audioEl.currentTime = (inicioMs + off) / 1000;
    audioEl.play();
    if (fimMs != null) {
      const stopAt = fimMs + off;
      const parar = () => {
        if (audioEl.currentTime * 1000 >= stopAt) {
          audioEl.pause();
          audioEl.removeEventListener('timeupdate', parar);
          this._repeatListener = null;
        }
      };
      this._repeatListener = parar;
      audioEl.addEventListener('timeupdate', parar);
    }
  },

  _togglePlay() {
    const a = document.getElementById('can-audio-player');
    if (!a) return;
    a.paused ? a.play() : a.pause();
  },

  _seekAudio(event) {
    const a   = document.getElementById('can-audio-player');
    const bar = document.getElementById('can-player-progress');
    if (!a || !bar || !a.duration) return;
    const rect = bar.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * a.duration;
  },

  _toggleSyncDebug() {
    this._syncDebugVisible = !this._syncDebugVisible;
    const el = document.getElementById('can-sync-debug');
    if (!el) return;
    el.style.display = this._syncDebugVisible ? 'block' : 'none';
    // Populate immediately so overlay is not empty when audio is paused
    if (this._syncDebugVisible) {
      const audio = document.getElementById('can-audio-player');
      const audioMs = audio ? audio.currentTime * 1000 : 0;
      const curMs   = audioMs - (this.syncOffsetMs || 0);
      this._updateSyncDebug(audioMs, curMs, this._syncState, 0);
    }
  },

  _updateSyncDebug(audioMs, curMs, state, fps) {
    const el = document.getElementById('can-sync-debug');
    if (!el) return;
    const fmt = ms => ms == null ? '—' : (ms / 1000).toFixed(3) + 's';
    const cw = state.currentWord;
    const cl = state.currentLine;
    el.innerHTML =
      `<b>Sync Debug</b><br>` +
      `fps: ${fps}<br>` +
      `audioMs: ${fmt(audioMs)}<br>` +
      `curMs: ${fmt(curMs)}<br>` +
      `offset: ${fmt(this.syncOffsetMs || 0)}<br>` +
      `word[${state.wordIndex}]: ${cw ? cw.text : '—'} (${fmt(cw?.startMs)}→${fmt(cw?.endMs)})<br>` +
      `line[${state.lineIndex}]: pauseMs=${fmt(cl?.pauseMs)}<br>` +
      `progress: ${(state.progress * 100).toFixed(1)}%`;
  },

  _updatePlayerUI() {
    const a = document.getElementById('can-audio-player');
    if (!a) return;
    const btn    = document.getElementById('can-play-btn');
    const fill   = document.getElementById('can-player-fill');
    const timeEl = document.getElementById('can-player-time');
    const totEl  = document.getElementById('can-player-total');
    if (btn)   btn.textContent = a.paused ? '▶' : '⏸';
    const cur = a.currentTime || 0, dur = a.duration || 0;
    if (fill)  fill.style.width = (dur > 0 ? (cur / dur * 100) : 0) + '%';
    if (timeEl) timeEl.textContent = this._formatTime(cur);
    if (totEl && dur > 0) totEl.textContent = this._formatTime(dur);
  },

  _distribuirTimestamps(words) {
    for (let i = 0; i < words.length; ) {
      let j = i;
      while (j < words.length && words[j].ms === words[i].ms) j++;
      if (j > i + 1) {
        const baseMs = words[i].ms;
        const nextMs = j < words.length ? words[j].ms : baseMs + 1000;
        const step   = (nextMs - baseMs) / (j - i);
        for (let k = i; k < j; k++) words[k].ms = Math.round(baseMs + step * (k - i));
      }
      i = j;
    }
    return words;
  },
  // ── Sync Engine ─────────────────────────────────────────────
  // Helper: startMs of the hidden word in this line (uses pre-distributed lineWords)
  _getPauseMsForEst(est, lineWords) {
    const hw = lineWords.find(w => w.hidden);
    if (hw) return hw.startMs;
    return est.palavra_oculta_ms ?? est.inicio_ms ?? null;
  },

  // Build flat word/line index once per song — called in abrirCanzone
  _buildSongIndex(can) {
    const words = [];
    const lines = [];

    can.estrofes.forEach((est, lineIdx) => {
      const distrib = est.words
        ? this._distribuirTimestamps(est.words.map(w => ({ ...w })))
        : [];

      const firstWordIdx = words.length;
      const lineWords = distrib.map((w, wi) => ({
        text:      w.w,
        startMs:   w.ms,
        // Use explicit "e" field from JSON when present and valid (must be > startMs after redistribution)
        endMs: (() => {
          if (w.e == null) return wi + 1 < distrib.length ? distrib[wi + 1].ms : w.ms + 800;
          const eMs = this._parseTimestamp(w.e);
          if (eMs <= w.ms) {
            console.warn(`[sync] word "${w.w}" has e(${eMs}) <= startMs(${w.ms}) after redistribution — using fallback`);
            return wi + 1 < distrib.length ? distrib[wi + 1].ms : w.ms + 800;
          }
          return eMs;
        })(),
        hidden:    !!w.hidden,
        meaning:   w.m || '',
        lineIndex: lineIdx,
        wordIndex: firstWordIdx + wi,
      }));

      lines.push({
        index:        lineIdx,
        startMs:      est.inicio_ms ?? (lineWords[0]?.startMs ?? 0),
        endMs:        0, // filled in pass 2
        hasBlank:     this._hasBlank(est),
        pauseMs:      this._getPauseMsForEst(est, lineWords),
        firstWordIdx,
        wordCount:    lineWords.length,
      });

      words.push(...lineWords);
    });

    // Pass 2: line endMs = next line's startMs
    for (let i = 0; i < lines.length - 1; i++) {
      lines[i].endMs = lines[i + 1].startMs;
    }
    if (lines.length > 0) lines[lines.length - 1].endMs = Infinity;

    // Pass 3: fix endMs of last word per line (replaces the startMs+800 heuristic)
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      if (line.wordCount > 0) {
        words[line.firstWordIdx + line.wordCount - 1].endMs = line.endMs;
      }
    }

    this._songIdx = { words, lines };
  },

  // Binary search: last index in arr where arr[i].startMs <= ms (-1 if none)
  _binarySearchMs(arr, ms) {
    let lo = 0, hi = arr.length - 1, result = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].startMs <= ms) { result = mid; lo = mid + 1; }
      else hi = mid - 1;
    }
    return result;
  },

  // Compute current sync state — mutates this._syncState (zero allocation per frame)
  _computeSyncState(curMs) {
    const idx = this._songIdx;
    const s   = this._syncState;
    s.curMs = curMs;
    if (!idx) {
      s.wordIndex = -1; s.lineIndex = -1;
      s.currentWord = null; s.nextWord = null;
      s.currentLine = null; s.nextLine = null;
      s.progress = 0;
      return s;
    }
    // Cache: skip binary search when curMs is still within the cached word/line interval.
    // lines[i].index === i always (built in order), so s.lineIndex doubles as the array index.
    const cw = s.currentWord;
    const cl = s.currentLine;
    const wordI = (cw && curMs >= cw.startMs && curMs < cw.endMs)
      ? s.wordIndex
      : this._binarySearchMs(idx.words, curMs);
    const lineI = (cl && curMs >= cl.startMs && curMs < cl.endMs)
      ? s.lineIndex   // s.lineIndex === lines[] array index (lines[i].index === i)
      : this._binarySearchMs(idx.lines, curMs);
    s.wordIndex   = wordI;
    s.lineIndex   = lineI >= 0 ? idx.lines[lineI].index : -1;
    s.currentWord = wordI >= 0 ? idx.words[wordI] : null;
    s.nextWord    = wordI + 1 < idx.words.length ? idx.words[wordI + 1] : null;
    s.currentLine = lineI >= 0 ? idx.lines[lineI] : null;
    s.nextLine    = lineI >= 0 && lineI + 1 < idx.lines.length ? idx.lines[lineI + 1] : null;
    s.progress    = s.currentWord
      ? (curMs >= s.currentWord.endMs ? 1 : (curMs - s.currentWord.startMs) / (s.currentWord.endMs - s.currentWord.startMs))
      : 0;
    return s;
  },
  // ─────────────────────────────────────────────────────────────

  _formatTime(sec) {
    const m = Math.floor(sec / 60);
    return m + ':' + Math.floor(sec % 60).toString().padStart(2, '0');
  },

  _hasBlank(est) {
    return !!(est.palavra_oculta || (est.words && est.words.some(w => w.hidden)));
  },

  _avancarProximoBlank() {
    const can = this.canzonAtual;
    if (!can) return;
    // Músicas sem nenhuma lacuna (ex.: só áudio sincronizado, sem exercício) ficam em modo "ouvir letra",
    // sem pular automaticamente pra tela de resultado.
    const temLacunas = can.estrofes.some(e => this._hasBlank(e));
    while (this.estrofeAtual < can.estrofes.length && !this._hasBlank(can.estrofes[this.estrofeAtual])) {
      this.estrofeAtual++;
    }
    if (this.estrofeAtual >= can.estrofes.length) {
      this._renderizarPlayer();
      if (temLacunas) setTimeout(() => this.mostrarResultado(), 700);
    } else {
      this._renderizarPlayer();
    }
  },

  _getDistrator(est) {
    const can = this.canzonAtual;
    const outras = can.estrofes
      .filter(e => e.palavra_oculta && e.palavra_oculta.toLowerCase() !== est.palavra_oculta.toLowerCase())
      .map(e => e.palavra_oculta);
    if (outras.length > 0) return outras[Math.floor(Math.random() * outras.length)];
    const fb = ['never','always','heart','light','night','dream','free','lost','bright','deep'];
    const filtrado = fb.filter(w => w.toLowerCase() !== est.palavra_oculta.toLowerCase());
    return filtrado[Math.floor(Math.random() * filtrado.length)] || '???';
  },

  _esc(str) {
    return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  },

  _renderizarPlayer() {
    const c = document.getElementById('canzoni-container');
    if (!c || !this.canzonAtual) return;
    const can = this.canzonAtual;

    const total = can.estrofes.filter(e => this._hasBlank(e)).length;
    const done  = can.estrofes.filter((e, i) => this._hasBlank(e) && this.respostas[i] !== null).length;
    const pct   = total > 0 ? Math.round(done / total * 100) : 0;

    const versosHtml = can.estrofes.map((v, i) => {
      const resp = this.respostas[i];
      let cls;
      if (i < this.estrofeAtual) {
        if (!v.palavra_oculta)  cls = 'past-ok';
        else if (resp && resp.correto) cls = 'past-correct';
        else if (resp)          cls = 'past-wrong';
        else                    cls = 'past-ok';
      } else if (i === this.estrofeAtual) {
        cls = 'active';
      } else {
        cls = 'future';
      }

      let lineHtml;
      if (v.words && v.words.length > 0) {
        // Word-level rendering with clickable spans
        const distribWords = this._distribuirTimestamps(v.words.map(w => ({ ...w })));
        const firstWordIdx = this._songIdx?.lines[i]?.firstWordIdx ?? 0;
        const wordsHtml = distribWords.map((wd, wi) => {
          const nextMs = (wi + 1 < distribWords.length) ? distribWords[wi + 1].ms : (wd.ms + 1500);
          const msVal = wd.ms ?? 0;
          const gIdx = firstWordIdx + wi; // global word index in _songIdx.words
          const tooltip = wd.m ? ' title="' + this._esc(wd.m) + '"' : '';
          if (wd.hidden) {
            let blankHtml;
            if (cls === 'future' || cls === 'active') {
              blankHtml = '<span class="can-blank" data-word-idx="' + gIdx + '"' + tooltip + '>_____</span>';
            } else if (resp && resp.correto) {
              blankHtml = '<span class="can-blank can-blank-correct can-word" data-word-idx="' + gIdx + '" onclick="Canzoni._repetirVerso(' + msVal + ',' + nextMs + ')"' + tooltip + '>' + this._esc(wd.w) + '</span>';
            } else if (resp) {
              blankHtml = '<span class="can-blank can-blank-wrong">' + this._esc(resp.escolha) + '</span>'
                        + '<span class="can-blank can-blank-revealed can-word" data-word-idx="' + gIdx + '" onclick="Canzoni._repetirVerso(' + msVal + ',' + nextMs + ')"' + tooltip + '> ' + this._esc(wd.w) + '</span>';
            } else {
              blankHtml = '<span class="can-blank can-word" data-word-idx="' + gIdx + '" onclick="Canzoni._repetirVerso(' + msVal + ',' + nextMs + ')"' + tooltip + '>' + this._esc(wd.w) + '</span>';
            }
            return blankHtml;
          }
          return '<span class="can-word" data-word-idx="' + gIdx + '" onclick="Canzoni._repetirVerso(' + msVal + ',' + nextMs + ')"' + tooltip + '>' + this._esc(wd.w) + '</span>';
        }).join(' ');
        lineHtml = '<span class="can-verse-line">' + wordsHtml + '</span>';
      } else if (!v.palavra_oculta || !v.texto_lacuna) {
        lineHtml = '<span class="can-verse-line">' + this._esc(v.texto_completo||'') + '</span>';
      } else {
        let blankHtml;
        if (cls === 'future' || cls === 'active') {
          blankHtml = '<span class="can-blank">_____</span>';
        } else if (resp && resp.correto) {
          blankHtml = '<span class="can-blank can-blank-correct">' + this._esc(v.palavra_oculta) + '</span>';
        } else if (resp) {
          blankHtml = '<span class="can-blank can-blank-wrong">' + this._esc(resp.escolha) + '</span>'
                    + '<span class="can-blank can-blank-revealed"> ' + this._esc(v.palavra_oculta) + '</span>';
        } else {
          blankHtml = '<span class="can-blank">' + this._esc(v.palavra_oculta) + '</span>';
        }
        const pts = (v.texto_lacuna||'').split('___');
        lineHtml = '<span class="can-verse-line">' + this._esc(pts[0]) + blankHtml + this._esc(pts[1]||'') + '</span>';
      }

      const tradHtml = (this.traduzirVisivel && v.traducao)
        ? '<div class="can-verse-trad">' + this._esc(v.traducao) + '</div>' : '';

      const proximoMs = can.estrofes.slice(i + 1).find(e => e.inicio_ms != null)?.inicio_ms;
      const repeatHtml = (cls !== 'future' && v.inicio_ms != null && (can.audio_store_key || can.audio_url))
        ? '<button class="can-repeat-btn" onclick="Canzoni._repetirVerso(' + v.inicio_ms + ',' + (proximoMs ?? 'undefined') + ')">&#9654; repetir</button>' : '';

      const temposAttr = (v.inicio_ms != null) ? ' data-tempo-ms="' + v.inicio_ms + '"' : '';
      return '<div class="can-verse can-verse-' + cls + '"' + temposAttr + '>' + lineHtml + tradHtml + repeatHtml + '</div>';
    }).join('');

    let choicesHtml = '';
    const est = can.estrofes[this.estrofeAtual];
    if (est && this._hasBlank(est)) {
      const palavraCorreta = est.palavra_oculta || est.words?.find(w => w.hidden)?.w || '';
      const idx = this.estrofeAtual;
      if (!this._distratorCache) this._distratorCache = {};
      if (!this._distratorCache[idx]) {
        this._distratorCache[idx] = { dist: this._getDistrator(est), ordem: Math.random() > 0.5 };
      }
      const { dist, ordem } = this._distratorCache[idx];
      const arr = ordem ? [palavraCorreta, dist] : [dist, palavraCorreta];
      const btns = arr.map(w => {
        const safeW = w.replace(/\\/g,'\\\\').replace(/'/g,"\\'");
        return '<button class="can-choice-btn" onclick="Canzoni._escolher(\'' + safeW + '\')"><i>' + this._esc(w) + '</i></button>';
      }).join('');
      choicesHtml = '<div class="can-choices-bar"><div class="can-choices-label">' + I18n.t('can_escolha_palavra') + '</div><div class="can-choices-grid">' + btns + '</div></div>';
    }

    const hasAudio = can.audio_store_key || can.audio_url;
    const audioBarHtml = hasAudio
      ? '<div class="can-audio-bar">' +
          '<audio id="can-audio-player"></audio>' +
          '<div class="can-custom-player">' +
            '<button class="can-play-btn" id="can-play-btn" onclick="Canzoni._togglePlay()">&#9654;</button>' +
            '<span class="can-player-time" id="can-player-time">0:00</span>' +
            '<div class="can-player-progress" id="can-player-progress" onclick="Canzoni._seekAudio(event)">' +
              '<div class="can-player-fill" id="can-player-fill"></div>' +
            '</div>' +
            '<span class="can-player-total" id="can-player-total">--:--</span>' +
            '<button onclick="Canzoni._toggleSyncDebug()" title="Sync debug" style="background:none;border:none;color:rgba(255,210,180,0.4);font-size:0.75rem;cursor:pointer;padding:0 4px;flex-shrink:0;">&#128295;</button>' +
          '</div>' +
          '<div id="can-sync-debug" style="display:none;position:fixed;top:60px;right:10px;background:rgba(0,0,0,0.85);color:#4ade80;font-family:monospace;font-size:0.7rem;padding:8px 10px;border-radius:6px;z-index:9999;min-width:200px;line-height:1.7;pointer-events:none;"></div>' +
        '</div>'
      : '';

    c.innerHTML =
      '<div class="can-player">' +
        '<div class="can-player-header">' +
          '<button class="can-back-btn" onclick="Canzoni.renderizarSeletor()">&#8249;</button>' +
          '<div class="can-header-song">' +
            '<div class="can-header-title">' + this._esc(can.titulo) + '</div>' +
            '<div class="can-header-artist">' + this._esc(can.artista||'') + '</div>' +
          '</div>' +
          '<div class="can-score-row">' +
            '<span class="can-score-pill can-score-correct">' + this.acertos + ' ✓</span>' +
            '<span class="can-score-pill can-score-wrong">' + this.erros + ' ✗</span>' +
          '</div>' +
        '</div>' +
        audioBarHtml +
        '<div class="can-subbar">' +
          '<div class="can-progress-wrap"><div class="can-progress-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="can-toggle-row">' +
            '<span class="can-toggle-label">tradução</span>' +
            '<button class="can-toggle-btn ' + (this.traduzirVisivel?'on':'off') + '" onclick="Canzoni._toggleTraduzir()" aria-label="alternar tradução"></button>' +
          '</div>' +
        '</div>' +
        '<div class="can-lyrics-area" id="can-lyrics">' + versosHtml + '</div>' +
        choicesHtml +
      '</div>';

    setTimeout(() => {
      const el = document.querySelector('.can-verse-active');
      if (el) el.scrollIntoView({ behavior:'instant', block:'center' });
    }, 0);

    if (can.audio_store_key || can.audio_url) this._iniciarSyncAudio(can);
  },

  // ── Reprodução de áudio sincronizado com a letra ──────────
  async _iniciarSyncAudio(can) {
    const gen = this._syncGen;
    let url;
    if (can.audio_store_key) {
      try { url = await AudioStore.obterURL(can.audio_store_key); } catch (e) { return; }
    } else if (can.audio_url) {
      url = can.audio_url;
    }
    if (!url || gen !== this._syncGen) return; // render mais recente tomou conta
    const audioEl = document.getElementById('can-audio-player');
    if (!audioEl) return;

    // Remove listener acumulado de render anterior (evita N listeners após N respostas)
    if (this._timeupdateListener) {
      audioEl.removeEventListener('timeupdate', this._timeupdateListener);
      this._timeupdateListener = null;
    }
    // Cancel any running RAF karaoke loop from previous render
    if (this._karaokeRafStop) {
      this._karaokeRafStop();
      this._karaokeRafStop = null;
    }

    // Só recarrega src se a música mudou — recarregar desnecessariamente reseta currentTime→0
    // causando highlight errado do verso durante o reload
    const cacheKey = can.audio_store_key || can.audio_url;
    if (audioEl.dataset.loadedKey !== cacheKey) {
      audioEl.dataset.loadedKey = cacheKey;
      const tempoRetomar = this._audioResumeTime;
      const deveTocar = this._audioShouldPlay;
      this._audioResumeTime = null;
      this._audioShouldPlay = false;
      if (tempoRetomar != null) {
        const onMeta = () => {
          audioEl.currentTime = tempoRetomar;
          if (deveTocar) audioEl.play();
        };
        audioEl.addEventListener('loadedmetadata', onMeta, { once: true });
        audioEl.src = url;
        if (audioEl.readyState >= 1) { audioEl.removeEventListener('loadedmetadata', onMeta); onMeta(); }
      } else {
        audioEl.src = url;
      }
      // Listeners de estado para o player customizado (adicionados só na primeira carga)
      audioEl.addEventListener('play',  () => this._updatePlayerUI());
      audioEl.addEventListener('pause', () => this._updatePlayerUI());
      audioEl.addEventListener('ended', () => this._updatePlayerUI());
      audioEl.addEventListener('loadedmetadata', () => this._updatePlayerUI());
    } else if (this._audioResumeTime != null) {
      // Áudio já carregado — apenas faz seek e resume, sem reload
      const tempoRetomar = this._audioResumeTime;
      const deveTocar = this._audioShouldPlay;
      this._audioResumeTime = null;
      this._audioShouldPlay = false;
      audioEl.currentTime = tempoRetomar;
      if (deveTocar) audioEl.play();
    }

    const verseEls = Array.from(document.querySelectorAll('#can-lyrics .can-verse[data-tempo-ms]'))
      .sort((a, b) => parseInt(a.dataset.tempoMs, 10) - parseInt(b.dataset.tempoMs, 10));

    verseEls.forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        const ms = parseInt(el.dataset.tempoMs, 10);
        if (isNaN(ms)) return;
        audioEl.currentTime = ms / 1000;
        audioEl.play();
      });
    });

    // Cache word elements — use data-word-idx to look up timing from _songIdx (single source of truth)
    const lyricWordEls = Array.from(document.querySelectorAll('#can-lyrics [data-word-idx]'));
    for (let i = 0; i < lyricWordEls.length; i++) {
      const el = lyricWordEls[i];
      el._wIdx    = +el.dataset.wordIdx;
      el._past    = false;
      el._current = false;
    }

    let pausadoParaLacuna = false;
    let _dbgFrames = 0, _dbgFps = 0, _dbgFpsT = performance.now();

    // High-resolution Clock — anchored on timeupdate, interpolated with performance.now()
    // audio.currentTime updates every ~4-15ms (browser-dependent); RAF runs at ~16ms.
    // Without interpolation, curMs is "frozen" for several RAF frames after each timeupdate.
    let _clkAudioMs  = audioEl.currentTime * 1000;
    let _clkPerfMs   = performance.now();
    let _clkRate     = audioEl.playbackRate || 1;
    const _clkAnchor = () => {
      _clkAudioMs = audioEl.currentTime * 1000;
      _clkPerfMs  = performance.now();
      _clkRate    = audioEl.playbackRate || 1;
    };
    // Invalidate word/line cache on seek or rate change so _computeSyncState runs a full
    // binary search on the next frame instead of trusting the stale cached interval.
    const _clkInvalidate = () => {
      _clkAnchor();
      this._syncState.currentWord = null;
      this._syncState.currentLine = null;
    };
    audioEl.addEventListener('timeupdate',   _clkAnchor);
    audioEl.addEventListener('seeking',      _clkInvalidate);
    audioEl.addEventListener('ratechange',   _clkInvalidate);

    // 60fps RAF loop — reads clock, delegates to Sync Engine, applies to DOM
    let rafId = null;
    const rafLoop = () => {
      rafId = requestAnimationFrame(rafLoop);
      if (audioEl.paused && !audioEl.seeking) return;

      // Interpolate: add elapsed wall-clock time since last anchor
      const audioMs = _clkAudioMs + (performance.now() - _clkPerfMs) * _clkRate;
      const curMs   = audioMs - (this.syncOffsetMs || 0);   // syncOffset applied once — IA→audio scale

      const state = this._computeSyncState(curMs);          // zero-allocation Sync Engine call

      // 1. Karaokê — timing from _songIdx.words (DOM is never the timing source)
      for (let i = 0; i < lyricWordEls.length; i++) {
        const el = lyricWordEls[i];
        const w  = this._songIdx?.words[el._wIdx];
        if (!w) continue;
        const past    = curMs >= w.endMs;
        const current = !past && curMs >= w.startMs;
        if (past    !== el._past)    { el._past    = past;    el.classList.toggle('can-word-past',    past); }
        if (current !== el._current) { el._current = current; el.classList.toggle('can-word-current', current); }
      }

      // 2. Verse highlight (scroll) — only when line changes
      if (state.lineIndex !== this._lastLineIndex) {
        this._lastLineIndex = state.lineIndex;
        for (let i = 0; i < verseEls.length; i++) {
          verseEls[i].classList.toggle('can-verse-playing', i === state.lineIndex);
        }
        if (verseEls[state.lineIndex]) {
          verseEls[state.lineIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      // 3. Pause at blank — index-driven, offset-corrected
      const estIdx  = this.estrofeAtual;
      const estLine = this._songIdx?.lines[estIdx];
      if (estLine?.hasBlank && this.respostas[estIdx] == null && !pausadoParaLacuna) {
        const pauseTarget = (estLine.pauseMs ?? 0) + (this.syncOffsetMs || 0);
        if (audioMs >= pauseTarget) {
          pausadoParaLacuna = true;
          audioEl.pause();
          this._updatePlayerUI();
        }
      }

      // 4. Emit sync event — bus subscribers (debug overlay, future: translation, exercise)
      _dbgFrames++;
      const _now = performance.now();
      if (_now - _dbgFpsT >= 500) {
        _dbgFps = Math.round(_dbgFrames * 1000 / (_now - _dbgFpsT));
        _dbgFrames = 0; _dbgFpsT = _now;
      }
      this._bus.emit('sync', { audioMs, curMs, state, fps: _dbgFps });
    };

    // timeupdate keeps progress bar smooth when RAF is paused
    const timeupdateFn = () => this._updatePlayerUI();
    this._timeupdateListener = timeupdateFn;
    audioEl.addEventListener('timeupdate', timeupdateFn);

    // Debug overlay subscriber — reacts to 'sync' bus event
    const _debugSubscriber = ({ audioMs, curMs, state, fps }) => {
      if (this._syncDebugVisible) this._updateSyncDebug(audioMs, curMs, state, fps);
    };
    this._bus.on('sync', _debugSubscriber);

    if (this._karaokeRafId) cancelAnimationFrame(this._karaokeRafId);
    rafId = requestAnimationFrame(rafLoop);
    this._karaokeRafStop = () => {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
      audioEl.removeEventListener('timeupdate',  _clkAnchor);
      audioEl.removeEventListener('seeking',     _clkInvalidate);
      audioEl.removeEventListener('ratechange',  _clkInvalidate);
      this._bus.off('sync', _debugSubscriber);
    };
  },

  _escolher(palavra) {
    const can = this.canzonAtual;
    if (!can || this.estrofeAtual >= can.estrofes.length) return;
    const est = can.estrofes[this.estrofeAtual];
    const palavraCorreta = est.palavra_oculta || est.words?.find(w => w.hidden)?.w || '';
    if (!palavraCorreta) return;
    document.querySelectorAll('.can-choice-btn').forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
    const norm = s => s.toLowerCase().trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const correto = norm(palavra) === norm(palavraCorreta);
    this.respostas[this.estrofeAtual] = { escolha: palavra, correto };
    if (correto) {
      this.acertos++;
      if (typeof App !== 'undefined' && App.ganharXP) App.ganharXP(5);
    } else {
      this.erros++;
    }
    this.estrofeAtual++;

    // Se a música tem áudio sincronizado, retoma a reprodução de onde pausou
    const audioEl = document.getElementById('can-audio-player');
    if (audioEl) {
      this._audioResumeTime = audioEl.currentTime;
      this._audioShouldPlay = true;
    }

    setTimeout(() => this._avancarProximoBlank(), 200);
  },

  _toggleTraduzir() {
    this.traduzirVisivel = !this.traduzirVisivel;
    const audioEl = document.getElementById('can-audio-player');
    if (audioEl) {
      this._audioResumeTime = audioEl.currentTime;
      this._audioShouldPlay = !audioEl.paused;
    }
    this._renderizarPlayer();
  },

  _ajustarSincronia(deltaMs) {
    this.syncOffsetMs = (this.syncOffsetMs || 0) + deltaMs;
    // Persist to localStorage so it survives page refresh
    if (this.canzonAtual) {
      localStorage.setItem('can_sync_' + this.canzonAtual.id, String(this.syncOffsetMs));
    }
    const syncSec = (this.syncOffsetMs / 1000).toFixed(1);
    const displayEl = document.getElementById('can-sync-display');
    if (displayEl) displayEl.textContent = syncSec + 's';
    // Force immediate highlight update
    if (this._timeupdateListener) this._timeupdateListener();
  },

  _calibrarSincronia() {
    const audioEl = document.getElementById('can-audio-player');
    if (!audioEl || audioEl.paused) {
      // Se parado: inicia instrução de tap
      const btn = document.getElementById('can-calib-btn');
      if (btn) {
        btn.textContent = '\u25b6 Play e toque!';
        btn.style.background = 'rgba(212,168,67,0.5)';
        btn.style.animation = 'none';
        // Start audio and prepare for tap
        audioEl.play().catch(() => {});
      }
      this._calibrando = true;
      return;
    }
    if (!this._calibrando) {
      // Primeira chamada com audio tocando: aguardar tap
      this._calibrando = true;
      const btn = document.getElementById('can-calib-btn');
      if (btn) { btn.textContent = '\u1f3af Toque ao ouvir!'; btn.style.background = 'rgba(212,168,67,0.5)'; }
      return;
    }
    // Segunda chamada: o user tocou quando ouviu a 1ª palavra
    this._calibrando = false;
    // O audio está em audioEl.currentTime. A 1ª palavra deveria iniciar em firstWordMs.
    const can = this.canzonAtual;
    if (!can) return;
    const firstWord = can.estrofes[0]?.words?.[0];
    const firstWordMs = firstWord?.ms ?? can.estrofes[0]?.inicio_ms ?? 0;
    const tapAudioMs = audioEl.currentTime * 1000;
    // offset = tapAudioMs - firstWordMs (how much the audio is ahead of timestamps)
    const newOffset = Math.round(tapAudioMs - firstWordMs);
    this.syncOffsetMs = newOffset;
    if (can) localStorage.setItem('can_sync_' + can.id, String(newOffset));
    const displayEl = document.getElementById('can-sync-display');
    if (displayEl) displayEl.textContent = (newOffset / 1000).toFixed(1) + 's';
    const btn = document.getElementById('can-calib-btn');
    if (btn) { btn.textContent = '\u2705 Calibrado!'; btn.style.background = 'rgba(74,222,128,0.25)'; setTimeout(() => { if (btn) btn.textContent = '\u1f3af Calibrar'; }, 2000); }
    if (this._timeupdateListener) this._timeupdateListener();
  },

  verificar() {},
  renderizarEstrofe() { this._renderizarPlayer(); },

  mostrarResultado() {
    const can = this.canzonAtual;
    const total = can.estrofes.filter(e => e.palavra_oculta).length;
    const pct = total > 0 ? Math.round(this.acertos / total * 100) : 100;
    const xpGanho = Math.round(can.xp_recompensa * pct / 100);
    if (xpGanho > 0 && typeof Progressao !== 'undefined' && Progressao.ganhar) Progressao.ganhar(xpGanho);
    const c = document.getElementById('canzoni-container');
    const emoji = pct >= 80 ? '🎤' : pct >= 50 ? '🎵' : '🎼';
    c.innerHTML =
      '<div class="can-player">' +
        '<div class="can-result">' +
          '<div class="can-result-emoji">' + emoji + '</div>' +
          '<div class="can-result-title">' + this._esc(can.titulo) + '</div>' +
          '<div class="can-result-score">' + this.acertos + '<span>/' + total + '</span></div>' +
          '<div class="can-result-xp">+' + xpGanho + ' XP</div>' +
          '<div style="display:flex;gap:0.5rem;justify-content:center;margin-top:1.2rem;flex-wrap:wrap">' +
            '<button class="can-restart-btn" onclick="Canzoni.abrirCanzone(\'' + can.id + '\')">&#8635; Tentar novamente</button>' +
            '<button class="can-restart-btn secundario" onclick="Canzoni.renderizarSeletor()">&#8592; M\u00fasicas</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }
};

document.addEventListener('i18n:changed', () => {
  if (document.getElementById('canzoni-container')) Canzoni.renderizarSeletor();
});
