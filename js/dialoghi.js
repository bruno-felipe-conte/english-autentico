const Dialoghi = {
  dados: null,
  custom: [],
  concluidos: [],
  dialogoAtual: null,
  turnoAtual: 0,
  modo: 'leitura', // 'leitura' | 'pratica'
  acertos: 0,
  _tradVisivel: true,  // toggle tradução visível/oculta
  _personagensCores: {},  // mapa personagem → cor
  _coresDisponiveis: ['#1a5276','#117a65','#7d3c98','#c0392b','#d4a017','#2e86c1','#28b463','#8e44ad'],
  _corIdx: 0,
  _erroExplicacoes: {},  // mapa turno → explicações por alternativa
  _onboardingMostrado: false,
  
  async carregar() {
    if (!this.dados) {
      try {
        const r = await fetch('data/dialogi.json');
        this.dados = r.ok ? await r.json() : { dialogi: [] };
      } catch { this.dados = { dialogi: [] }; }
    }
    try {
      this.custom = JSON.parse(localStorage.getItem('en_dialoghi_custom') || '[]');
    } catch { this.custom = []; }
    try {
      this.concluidos = JSON.parse(localStorage.getItem('en_dialoghi_concluidos') || '[]');
    } catch { this.concluidos = []; }
  },

  _filtroOrigem: '', // '' | 'custom' | 'nativo'

  todosDialoghi() {
    // Custom primeiro
    return [...this.custom, ...(this.dados?.dialogi || [])];
  },

  _salvarCustom() {
    localStorage.setItem('en_dialoghi_custom', JSON.stringify(this.custom));
  },
  
  _filtroNivel: '',
  _filtroTexto: '',

  // ── Helpers de sanitização (QW-3: XSS prevention) ──────────
  _corParaPersonagem(nome) {
    if (!nome) return '#666';
    const key = nome.trim().toLowerCase();
    if (!this._personagensCores[key]) {
      this._personagensCores[key] = this._coresDisponiveis[this._corIdx % this._coresDisponiveis.length];
      this._corIdx++;
    }
    return this._personagensCores[key];
  },

  async renderizarSeletor() {
    await this.carregar();
    const c = document.getElementById('dialoghi-container');
    if (!c) return;

    const todos = this.todosDialoghi();
    const niveis = ['A1','A2','B1','B2','C1'];

    // Conta por nível
    const counts = {};
    todos.forEach(d => { counts[d.nivel] = (counts[d.nivel]||0)+1; });

    // Filtros
    let filtrados = todos;
    if (this._filtroOrigem === 'custom')  filtrados = filtrados.filter(d => d.custom || d._custom);
    if (this._filtroOrigem === 'nativo')  filtrados = filtrados.filter(d => !d.custom && !d._custom);
    if (this._filtroNivel) filtrados = filtrados.filter(d => d.nivel === this._filtroNivel);
    if (this._filtroTexto) {
      const q = this._filtroTexto.toLowerCase();
      filtrados = filtrados.filter(d => d.titulo.toLowerCase().includes(q) || (d.contexto||'').toLowerCase().includes(q));
    }

    // QW-4: Ordenação inteligente — não-concluídos primeiro, depois por nível
    filtrados.sort((a, b) => {
      const aConcl = this.concluidos.includes(a.id) ? 1 : 0;
      const bConcl = this.concluidos.includes(b.id) ? 1 : 0;
      if (aConcl !== bConcl) return aConcl - bConcl;
      const lvlA = niveis.indexOf(a.nivel), lvlB = niveis.indexOf(b.nivel);
      if (lvlA !== lvlB) return lvlA - lvlB;
      return a.titulo.localeCompare(b.titulo);
    });

    const nCustom = todos.filter(d => d.custom || d._custom).length;
    const nNativo = todos.length - nCustom;
    const _o = this._filtroOrigem;

    // QW-7: Onboarding contextual (mostra uma vez)
    if (!this._onboardingMostrado && todos.length > 0) {
      this._onboardingMostrado = true;
      setTimeout(() => {
        App.notificar('💬 Dialogue tip: Read first, then practice to earn XP!', 'alerta');
      }, 600);
    }

    const _origemPill = (val, label, count) => {
      const active = _o===val;
      return `<button data-filter="${val}" role="button" tabindex="0" onclick="Dialoghi._filtroOrigem='${val}';Dialoghi.renderizarSeletor()" style="padding:0.22rem 0.7rem;border-radius:999px;border:1.5px solid ${active?'#7B68A0':'#ddd'};background:${active?'#7B68A0':'transparent'};color:${active?'#fff':'inherit'};cursor:pointer;font-size:0.75rem;font-weight:600">${this._esc(label)} (${count})</button>`;
    };

    let html = `
      <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.55rem">
        <input type="search" placeholder="${this._esc(I18n.t('dial_search_placeholder'))}" value="${this._esc(this._filtroTexto)}"
          oninput="Dialoghi._filtroTexto=this.value;Dialoghi.renderizarSeletor()"
          aria-label="Search dialogues"
          style="flex:1;min-width:0;padding:0.44rem 0.75rem;border:1.5px solid #ddd;border-radius:20px;font-size:0.875rem;font-family:inherit">
        <button class="btn-pill-add" onclick="Dialoghi.abrirFormularioCriar()" style="white-space:nowrap">${this._esc(I18n.t('dial_btn_adicionar'))}</button>
        <button class="btn-ia-add" onclick="IAImport.abrir('dialogo')" style="white-space:nowrap">${this._esc(I18n.t('btn_via_ia'))}</button>
      </div>
      <div style="display:flex;gap:0.35rem;flex-wrap:wrap;margin-bottom:1rem;align-items:center">
        ${_origemPill('',I18n.t('filtro_todos'),todos.length)}
        ${nCustom ? _origemPill('custom',I18n.t('imit_filtro_adicionadas'),nCustom) : ''}
        ${nNativo  ? _origemPill('nativo',I18n.t('filtro_nativo'),nNativo) : ''}
        <select class="nivel-select${this._filtroNivel?' ativo':''}" aria-label="Filter by level"
          onchange="Dialoghi._filtroNivel=this.value;Dialoghi.renderizarSeletor()">
          <option value="">${this._esc(I18n.t('dial_select_level'))}</option>
          ${niveis.filter(n=>counts[n]).map(n=>`<option value="${n}" ${this._filtroNivel===n?'selected':''}>${n} (${counts[n]})</option>`).join('')}
        </select>
      </div>
      <div class="dialogo-grid" role="list" aria-label="Dialogue list">`;

    for (const dial of filtrados) {
      const ehCustom = dial.custom || dial._custom;
      const concluido = this.concluidos.includes(dial.id);
      const badge = ehCustom ? `<span style="font-size:0.65rem;background:#7B68A0;color:white;padding:0.1rem 0.4rem;border-radius:6px;margin-left:0.3rem;">${this._esc(I18n.t('dial_my_badge'))}</span>` : '';
      const checkmark = concluido ? '<span style="font-size:0.8rem;color:#27AE60;margin-left:0.3rem;" title="Completed" aria-label="Completed">✅</span>' : '';
      const safeId = this._esc(dial.id);
      const safeIcon = this._esc(dial.icone || '💬');
      const safeTitulo = this._esc(dial.titulo);
      const safeNivel = this._esc(dial.nivel);
      html += `<div class="dialogo-card" role="listitem" tabindex="0" aria-label="${safeTitulo}, Level ${safeNivel}${concluido?', completed':''}" onclick="Dialoghi.abrirDialogo('${safeId}','leitura')" onkeydown="if(event.key==='Enter'||event.key===' ')Dialoghi.abrirDialogo('${safeId}','leitura')">
        <div class="dialogo-icone">${safeIcon}</div>
        <div class="dialogo-titulo">${safeTitulo}${badge}${checkmark}</div>
        <div class="dialogo-nivel">${safeNivel}</div>
        ${ehCustom ? `<div style="margin-top:0.4rem;display:flex;gap:0.3rem;justify-content:center">
          ${dial.custom ? `<button onclick="event.stopPropagation();Dialoghi.editarDialogo('${safeId}')" style="background:none;border:none;cursor:pointer;font-size:0.9rem" title="Edit" aria-label="Edit dialogue">✏️</button>` : ''}
          <button onclick="event.stopPropagation();Dialoghi.excluirDialogo('${safeId}')" style="background:none;border:none;cursor:pointer;font-size:0.9rem" title="Delete" aria-label="Delete dialogue">🗑️</button>
        </div>` : `<div style="font-size:0.75rem;color:var(--cor-pietra);margin-top:0.3rem">🎁 ${dial.xp_recompensa} XP</div>`}
      </div>`;
    }

    // QW-5: Empty states
    if (filtrados.length === 0) {
      if (this._filtroTexto) {
        html += `<div style="text-align:center;color:#aaa;grid-column:1/-1;padding:2rem">
          <div style="font-size:2rem;margin-bottom:0.5rem">🔍</div>
          <div style="font-weight:600;margin-bottom:0.3rem">No results for "${this._esc(this._filtroTexto)}"</div>
          <div style="font-size:0.85rem">Try a different search term or <button onclick="Dialoghi._filtroTexto='';Dialoghi.renderizarSeletor()" style="background:none;border:none;color:var(--cor-veneziano);cursor:pointer;text-decoration:underline">clear filters</button></div>
        </div>`;
      } else if (this._filtroOrigem === 'custom' && nCustom === 0) {
        html += `<div style="text-align:center;color:#aaa;grid-column:1/-1;padding:2rem">
          <div style="font-size:2rem;margin-bottom:0.5rem">💬</div>
          <div style="font-weight:600;margin-bottom:0.3rem">No custom dialogues yet</div>
          <div style="font-size:0.85rem;margin-bottom:1rem">Create your own dialogues to practice specific situations!</div>
          <button class="btn-primario" onclick="Dialoghi.abrirFormularioCriar()">+ Create First Dialogue</button>
        </div>`;
      } else {
        html += `<div style="text-align:center;color:#aaa;grid-column:1/-1;padding:2rem">
          <div style="font-size:2rem;margin-bottom:0.5rem">📭</div>
          <div style="font-weight:600">No dialogues available</div>
          <div style="font-size:0.85rem">Try adjusting your filters or check back later.</div>
        </div>`;
      }
    }

    html += '</div>';
    c.innerHTML = html;
  },

  // ── Formulário para criar/editar diálogo ──────────────────
  abrirFormularioCriar(idEditar = null) {
    const c = document.getElementById('dialoghi-container');
    if (!c) return;
    const existente = idEditar ? this.custom.find(x => x.id === idEditar) : null;

    const titulo = existente?.titulo || '';
    const icone = existente?.icone || '💬';
    const nivel = existente?.nivel || 'A1';
    const contexto = existente?.contexto || '';
    const turni = existente?.turni || [
      { id:1, personaggio:'Character', frase:'', traducao:'', audio_ipa:'', tipo:'fala' },
      { id:2, personaggio:'You', frase:'', traducao:'', audio_ipa:'', tipo:'resposta', alternativas:['','','',''], resposta_correta:0 }
    ];

    let turniHtml = '';
    turni.forEach((t, i) => { turniHtml += Dialoghi._htmlTurnoForm(t, i); });

    c.innerHTML = `
      <div class="gram-lesson-nav">
        <button class="gram-btn-back" onclick="Dialoghi.renderizarSeletor()">‹ ${I18n.t('btn_cancelar')}</button>
        <span style="font-size:0.9rem;font-weight:700">${idEditar ? I18n.t('dial_edit_dialogue') : I18n.t('dial_new_dialogue')}</span>
      </div>

      <div class="gram-card" style="margin-top:1rem;padding:1.2rem">
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:0.7rem;margin-bottom:1rem">
          <div>
            <label style="font-size:0.82rem;font-weight:700;color:#003E8A">${I18n.t('dial_form_title')}</label>
            <input id="dial-titulo" type="text" value="${this._esc(titulo)}" placeholder="Ex: Al Bar"
              style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem">
          </div>
          <div>
            <label style="font-size:0.82rem;font-weight:700;color:#003E8A">${I18n.t('dial_form_level')}</label>
            <select id="dial-nivel" style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem">
              ${['A1','A2','B1','B2','C1'].map(n=>`<option ${n===nivel?'selected':''}>${n}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="font-size:0.82rem;font-weight:700;color:#003E8A">${I18n.t('dial_form_icon')}</label>
            <input id="dial-icone" type="text" value="${this._esc(icone)}" maxlength="4"
              style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem;text-align:center;font-size:1.2rem">
          </div>
        </div>

        <div style="margin-bottom:1rem">
          <label style="font-size:0.82rem;font-weight:700;color:#003E8A">${I18n.t('dial_form_context')}</label>
          <textarea id="dial-contexto" rows="2" placeholder="${I18n.t('dial_form_context_placeholder')}"
            style="width:100%;padding:0.5rem;border:2px solid #ddd;border-radius:8px;margin-top:0.3rem;font-size:0.88rem;resize:vertical">${this._esc(contexto)}</textarea>
        </div>

        <div style="font-size:0.85rem;font-weight:700;color:#003E8A;margin-bottom:0.8rem;border-top:1px solid #f0e8d8;padding-top:1rem">
          ${I18n.t('dial_form_turns')}
        </div>

        <div style="background:#FFF8E7;border:1px solid #D4A843;border-radius:8px;padding:0.7rem;margin-bottom:1rem;font-size:0.8rem;color:#6B4C1A">
          ${I18n.t('dial_form_tip_body')}
        </div>

        <div id="dial-turni">${turniHtml}</div>

        <div style="display:flex;gap:0.5rem;margin:0.8rem 0">
          <button onclick="Dialoghi._adicionarTurnoFala()" class="btn-secondario" style="flex:1">${I18n.t('dial_form_add_character')}</button>
          <button onclick="Dialoghi._adicionarTurnoResposta()" class="btn-secondario" style="flex:1">${I18n.t('dial_form_add_user')}</button>
        </div>

        <div style="display:flex;gap:0.5rem">
          <button class="btn-primario" style="flex:1" onclick="Dialoghi._salvarFormulario('${idEditar || ''}')">
            ${I18n.t('dial_form_save')}
          </button>
          <button class="btn-secondario" onclick="Dialoghi.renderizarSeletor()">${I18n.t('btn_cancelar')}</button>
        </div>
      </div>`;
  },

  _htmlTurnoForm(turno, i) {
    const ehResposta = (turno.personaggio === 'Tu' || turno.personaggio === 'You' || turno.personaggio === 'User') && turno.alternativas;
    const alts = turno.alternativas || ['','','',''];
    const correto = turno.resposta_correta || 0;
    return `
      <div class="dial-turno-form" id="dial-turno-${i}" style="background:#f9f6f0;border-radius:10px;padding:0.9rem;margin-bottom:0.8rem;border:1px solid ${ehResposta ? '#003E8A' : '#ede5d5'}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.6rem">
          <span style="font-weight:700;font-size:0.82rem;color:${ehResposta ? '#003E8A' : '#2C2C2C'}">
            ${ehResposta ? I18n.t('dial_form_user_response') : I18n.t('dial_form_character_line')}
          </span>
          <button onclick="Dialoghi._removerTurno(${i})" style="background:none;border:none;cursor:pointer;color:#C0392B;font-size:0.85rem">🗑️</button>
        </div>

        ${!ehResposta ? `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;margin-bottom:0.5rem">
            <input type="text" data-campo="personaggio" data-idx="${i}" value="${this._esc(turno.personaggio || '')}"
              placeholder="${I18n.t('dial_form_char_name')}" style="padding:0.4rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem">
            <input type="text" data-campo="audio_ipa" data-idx="${i}" value="${this._esc(turno.audio_ipa || '')}"
              placeholder="${I18n.t('dial_form_ipa')}" style="padding:0.4rem;border:2px solid #ddd;border-radius:7px;font-size:0.85rem">
          </div>
          <input type="text" data-campo="frase" data-idx="${i}" value="${this._esc(turno.frase || '')}"
            placeholder="${I18n.t('dial_form_eng_phrase')}" style="width:100%;padding:0.4rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem;margin-bottom:0.4rem">
          <input type="text" data-campo="traducao" data-idx="${i}" value="${this._esc(turno.traducao || '')}"
            placeholder="${I18n.t('dial_form_pt_translation')}" style="width:100%;padding:0.4rem;border:2px solid #ddd;border-radius:7px;font-size:0.85rem">
        ` : `
          <input type="text" data-campo="frase" data-idx="${i}" value="${this._esc(turno.frase || '')}"
            placeholder="${I18n.t('dial_form_correct_eng_phrase')}" style="width:100%;padding:0.4rem;border:2px solid #ddd;border-radius:7px;font-size:0.88rem;margin-bottom:0.4rem">
          <input type="text" data-campo="traducao" data-idx="${i}" value="${this._esc(turno.traducao || '')}"
            placeholder="${I18n.t('dial_form_pt_translation')}" style="width:100%;padding:0.4rem;border:2px solid #ddd;border-radius:7px;font-size:0.85rem;margin-bottom:0.6rem">
          <div style="font-size:0.78rem;font-weight:700;color:#003E8A;margin-bottom:0.4rem">${I18n.t('dial_form_alternatives_title')}</div>
          ${alts.map((a, ai) => `
            <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.3rem">
              <input type="radio" name="correct-${i}" value="${ai}" ${correto===ai?'checked':''} onchange="Dialoghi._marcarCorreta(${i},${ai})">
              <input type="text" data-campo="alt-${ai}" data-idx="${i}" value="${this._esc(a)}"
                placeholder="${I18n.t('dial_form_alt_placeholder').replace('{n}', ai+1)}${ai===0 ? I18n.t('dial_form_alt_correct') : ''}" style="flex:1;padding:0.4rem;border:2px solid ${ai===correto?'#27AE60':'#ddd'};border-radius:7px;font-size:0.85rem">
            </div>`).join('')}
          <input type="hidden" data-campo="resposta_correta" data-idx="${i}" value="${correto}">
        `}
        <input type="hidden" data-campo="_tipo" data-idx="${i}" value="${ehResposta ? 'resposta' : 'fala'}">
      </div>`;
  },

  _adicionarTurnoFala() {
    const container = document.getElementById('dial-turni');
    if (!container) return;
    const i = container.querySelectorAll('.dial-turno-form').length;
    const div = document.createElement('div');
    div.innerHTML = this._htmlTurnoForm({ personaggio:'Character', frase:'', traducao:'', audio_ipa:'' }, i);
    container.appendChild(div.firstElementChild);
  },

  _adicionarTurnoResposta() {
    const container = document.getElementById('dial-turni');
    if (!container) return;
    const i = container.querySelectorAll('.dial-turno-form').length;
    const div = document.createElement('div');
    div.innerHTML = this._htmlTurnoForm({ personaggio:'You', frase:'', traducao:'', alternativas:['','','',''], resposta_correta:0 }, i);
    container.appendChild(div.firstElementChild);
  },

  _removerTurno(i) {
    document.getElementById(`dial-turno-${i}`)?.remove();
  },

  _marcarCorreta(turnoIdx, altIdx) {
    // Atualiza hidden field e borda das alternativas
    const turno = document.getElementById(`dial-turno-${turnoIdx}`);
    if (!turno) return;
    turno.querySelector('[data-campo="resposta_correta"]').value = altIdx;
    turno.querySelectorAll('[data-campo^="alt-"]').forEach((inp, ai) => {
      inp.style.border = `2px solid ${ai === altIdx ? '#27AE60' : '#ddd'}`;
    });
  },

  _salvarFormulario(idEditar) {
    const titulo = document.getElementById('dial-titulo')?.value.trim();
    if (!titulo) { App.notificar('notif_dial_titulo_obr', 'erro'); return; }

    const turniEls = document.querySelectorAll('.dial-turno-form');
    const turni = [];

    turniEls.forEach((el, i) => {
      const campos = {};
      el.querySelectorAll('[data-campo]').forEach(inp => { campos[inp.dataset.campo] = inp.value.trim(); });
      const tipo = campos['_tipo'];
      const frase = campos['frase'];
      if (!frase) return;

      if (tipo === 'resposta') {
        const alts = [0,1,2,3].map(ai => campos[`alt-${ai}`] || '').filter(Boolean);
        const correto = parseInt(campos['resposta_correta'] || '0');
        turni.push({ id: i+1, personaggio:'You', frase, traducao: campos['traducao'] || '', audio_ipa:'', alternativas: alts.length >= 2 ? alts : [frase,'','',''], resposta_correta: correto });
      } else {
        turni.push({ id: i+1, personaggio: campos['personaggio'] || 'Personaggio', frase, traducao: campos['traducao'] || '', audio_ipa: campos['audio_ipa'] || '' });
      }
    });

    if (turni.length < 2) { App.notificar('notif_dial_sem_turnos', 'erro'); return; }

    const novo = {
      id: idEditar || `custom_dial_${Date.now()}`,
      titulo,
      icone: document.getElementById('dial-icone')?.value.trim() || '💬',
      nivel: document.getElementById('dial-nivel')?.value || 'A1',
      contexto: document.getElementById('dial-contexto')?.value.trim() || '',
      criado_em: Date.now(),
      custom: true,
      turni,
      vocabulario_chave: [],
      xp_recompensa: Math.min(30 + turni.length * 3, 60)
    };

    if (idEditar) {
      const idx = this.custom.findIndex(x => x.id === idEditar);
      if (idx >= 0) this.custom[idx] = novo; else this.custom.push(novo);
    } else {
      this.custom.push(novo);
    }
    this._salvarCustom();
    App.notificar(I18n.t('dial_salvo').replace('{t}', titulo), 'sucesso');
    this.renderizarSeletor();
  },

  editarDialogo(id) { this.abrirFormularioCriar(id); },

  excluirDialogo(id) {
    const d = this.custom.find(x => x.id === id);
    if (!d || !confirm(I18n.t('dial_excluir_confirm').replace('{t}', d.titulo))) return;
    this.custom = this.custom.filter(x => x.id !== id);
    this._salvarCustom();
    App.notificar('notif_dial_excluido', 'alerta');
    this.renderizarSeletor();
  },

  // ── MÉTODOS DE JOGO ──────────────────────────────────────────
  abrirDialogo(id, modo) {
    this.dialogoAtual = this.todosDialoghi().find(d => d.id === id);
    if (!this.dialogoAtual) return;
    this.turnoAtual = 0;
    this.acertos = 0;
    this.modo = modo || 'leitura';
    this._tradVisivel = true;
    this._personagensCores = {};
    this._corIdx = 0;
    this._erroExplicacoes = {};
    this.renderizarDialogo();
  },
  
  renderizarDialogo() {
    const c = document.getElementById('dialoghi-container');
    const d = this.dialogoAtual;
    
    // QW-1: Botão toggle tradução
    const tradBtn = this.modo === 'leitura' 
      ? `<button onclick="Dialoghi._tradVisivel=!Dialoghi._tradVisivel;Dialoghi.renderizarDialogo()" style="padding:0.3rem 0.6rem;border-radius:8px;border:1.5px solid #ddd;background:${this._tradVisivel?'#fff':'#f0f0f0'};cursor:pointer;font-size:0.85rem" title="Toggle translation" aria-label="Toggle translation">${this._tradVisivel?'👁️ Trad':'🙈 Trad'}</button>`
      : '';

    let html = `
      <div style="margin-bottom:1rem;display:flex;align-items:center;justify-content:space-between">
        <button class="btn-secondario" onclick="Dialoghi.renderizarSeletor()" style="padding:0.4rem 0.8rem">‹ ${I18n.t('dial_back')}</button>
        <div style="display:flex;gap:0.5rem;align-items:center">
          ${tradBtn}
          <button class="btn-modo-toggle ${this.modo === 'leitura' ? 'ativo' : ''}" onclick="Dialoghi.modo='leitura';Dialoghi.turnoAtual=0;Dialoghi._erroExplicacoes={};Dialoghi.renderizarDialogo()" title="Read mode" aria-label="Read mode">📖</button>
          <button class="btn-modo-toggle ${this.modo === 'pratica' ? 'ativo' : ''}" onclick="Dialoghi.modo='pratica';Dialoghi.turnoAtual=0;Dialoghi._erroExplicacoes={};Dialoghi.renderizarDialogo()" title="Practice mode" aria-label="Practice mode">✍️</button>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:1rem">
        <div style="font-size:2rem">${d.icone}</div>
        <h3 style="font-family:'Cinzel',serif;color:var(--cor-veneziano-escuro);margin:0.2rem 0">${d.titulo}</h3>
        <p style="font-size:0.85rem;color:var(--cor-pietra);font-style:italic">${d.contexto}</p>
      </div>
      <div class="dialogo-conversa" role="log" aria-label="Dialogue conversation" aria-live="polite">
    `;
    
    const safeNome = (this._esc(I18n.t('dial_user_name') || 'You'));

    if (this.modo === 'leitura') {
      for (const t of d.turni) {
        const isUtente = t.personaggio && (t.personaggio.trim().toLowerCase() === 'tu' || t.personaggio.trim().toLowerCase() === 'you' || t.personaggio.trim().toLowerCase() === 'user');
        const cssClass = isUtente ? 'utente' : 'personaggio';
        // Fallback: se frase estiver vazia mas há alternativas, usa a resposta correta
        const fraseExibir = t.frase || (t.alternativas ? t.alternativas[t.resposta_correta || 0] : '');
        const traducaoExibir = t.traducao || '';
        const nomePersonagem = isUtente ? safeNome : this._esc(t.personaggio);
        const corPersonagem = isUtente ? '' : this._corParaPersonagem(t.personaggio);
        html += `
          <div class="dialogo-turno ${cssClass}" style="${!isUtente && corPersonagem ? 'border-left: 3px solid ' + corPersonagem + '; padding-left: 0.5rem;' : ''}">
            <div class="dialogo-bubble">
              <div class="dialogo-nome" style="${!isUtente && corPersonagem ? 'font-weight:700;' : ''}">${nomePersonagem}</div>
              <div>${this._esc(fraseExibir)} <button class="dialogo-audio-btn" onclick="App.pronunciar('${fraseExibir.replace(/\\/g,'\\\\').replace(/'/g,"\\'")}')" aria-label="Play audio">🔊</button></div>
              ${t.audio_ipa ? `<div class="dialogo-ipa" style="font-size:0.76rem;color:#8a7a60;font-family:monospace;margin-top:0.2rem;display:inline-block" aria-label="IPA pronunciation">/ ${this._esc(t.audio_ipa)} /</div>` : ''}
              ${traducaoExibir ? `<div class="dialogo-traducao${this._tradVisivel ? '' : ' traducao-oculta'}">${this._esc(traducaoExibir)}</div>` : ''}
            </div>
          </div>
        `;
      }
      html += `
        <div style="text-align:center;margin-top:1.5rem">
          <button class="btn-primario" onclick="Dialoghi.modo='pratica';Dialoghi.turnoAtual=0;Dialoghi._erroExplicacoes={};Dialoghi.renderizarDialogo()">${I18n.t('dial_practise_btn')}</button>
        </div>
      `;
    } else {
      // Modo prática: renderiza apenas o turno atual e os anteriores
      for (let i = 0; i <= this.turnoAtual; i++) {
        const t = d.turni[i];
        const isUtente = t.personaggio && (t.personaggio.trim().toLowerCase() === 'tu' || t.personaggio.trim().toLowerCase() === 'you' || t.personaggio.trim().toLowerCase() === 'user');
        const cssClass = isUtente ? 'utente' : 'personaggio';
        const nomePersonagem = isUtente ? safeNome : this._esc(t.personaggio);
        const corPersonagem = isUtente ? '' : this._corParaPersonagem(t.personaggio);
        
        if (i < this.turnoAtual) {
          // Histórico (já respondido)
          const explicacao = this._erroExplicacoes[i] ? `<div class="dialogo-explicacao" style="margin-top:0.5rem;padding:0.5rem;background:#f0f8ff;border-radius:8px;font-size:0.82rem;color:#1a5276;border-left:3px solid #2980b9">💡 ${this._esc(this._erroExplicacoes[i])}</div>` : '';
          html += `
            <div class="dialogo-turno ${cssClass}" style="${!isUtente && corPersonagem ? 'border-left: 3px solid ' + corPersonagem + '; padding-left: 0.5rem;' : ''}">
              <div class="dialogo-bubble">
                <div class="dialogo-nome">${nomePersonagem}</div>
                <div>${this._esc(t.frase)} <button class="dialogo-audio-btn" onclick="App.pronunciar('${t.frase.replace(/\\/g,'\\\\').replace(/'/g,"\\'")}')" aria-label="Play audio">🔊</button></div>
                ${t.audio_ipa ? `<div class="dialogo-ipa" style="font-size:0.76rem;color:#8a7a60;font-family:monospace;margin-top:0.2rem;display:inline-block">/ ${this._esc(t.audio_ipa)} /</div>` : ''}
                ${explicacao}
              </div>
            </div>
          `;
        } else {
          // Turno ativo
          if (!isUtente) {
            // Fala do personagem
            html += `
              <div class="dialogo-turno ${cssClass}" style="animation:fadeIn 0.3s ease${!isUtente && corPersonagem ? ';border-left:3px solid ' + corPersonagem + ';padding-left:0.5rem' : ''}">
                <div class="dialogo-bubble">
                  <div class="dialogo-nome">${nomePersonagem}</div>
                  <div>${this._esc(t.frase)} <button class="dialogo-audio-btn" onclick="App.pronunciar('${t.frase.replace(/\\/g,'\\\\').replace(/'/g,"\\'")}')" aria-label="Play audio">🔊</button></div>
                  ${t.audio_ipa ? `<div class="dialogo-ipa" style="font-size:0.76rem;color:#8a7a60;font-family:monospace;margin-top:0.2rem;display:inline-block">/ ${this._esc(t.audio_ipa)} /</div>` : ''}
                  <div class="dialogo-traducao">${this._esc(t.traducao)}</div>
                </div>
              </div>
              <div style="text-align:center;margin-top:1rem">
                <button class="btn-primario" onclick="Dialoghi.avancarTurno()">${I18n.t('dial_continue')}</button>
              </div>
            `;
          } else {
            // Escolha do usuário
            html += `
              <div style="margin-top:1rem;animation:fadeIn 0.3s ease">
                <div class="dialogo-pratica-frase">${I18n.t('dial_your_turn')}</div>
                <div class="dialogo-opcoes" role="radiogroup" aria-label="Choose your response">
            `;
            t.alternativas.forEach((alt, idx) => {
              html += `<button class="dialogo-opcao" role="radio" aria-checked="false" onclick="Dialoghi.checarResposta(${idx}, this)">${alt}</button>`;
            });
            html += `
                </div>
              </div>
            `;
          }
        }
      }
    }
    
    html += '</div>';
    c.innerHTML = html;
  },
  
  avancarTurno() {
    this.turnoAtual++;
    if (this.turnoAtual >= this.dialogoAtual.turni.length) {
      this.mostrarResultado();
    } else {
      this.renderizarDialogo();
    }
  },
  
  checarResposta(indice, btn) {
    const turno = this.dialogoAtual.turni[this.turnoAtual];
    const correto = indice === turno.resposta_correta;
    
    // Desabilita botões
    const container = btn.parentElement;
    container.querySelectorAll('button').forEach(b => {
      b.disabled = true;
      b.style.cursor = 'default';
    });
    
    if (correto) {
      this.acertos++;
      btn.classList.add('correta');
      App.pronunciar(turno.alternativas[indice]);
      setTimeout(() => {
        this.avancarTurno();
      }, 1200);
    } else {
      btn.classList.add('errada');
      container.children[turno.resposta_correta].classList.add('correta');
      App.pronunciar(turno.alternativas[turno.resposta_correta]);
      // QW-6: Salva explicação do erro para exibir no histórico
      const explicacao = turno.explicacoes && turno.explicacoes[indice] ? turno.explicacoes[indice] : this._gerarExplicacao(turno, indice);
      if (explicacao) {
        this._erroExplicacoes[this.turnoAtual] = explicacao;
      }
      setTimeout(() => {
        this.avancarTurno();
      }, 2200);
    }
  },

  // QW-6: Gera explicação automática para erros
  _gerarExplicacao(turno, indiceErrado) {
    const correto = turno.resposta_correta || 0;
    const fraseCorreta = turno.alternativas[correto] || '';
    const fraseErrada = turno.alternativas[indiceErrado] || '';
    // Heurísticas simples de explicação
    if (fraseErrada.length < fraseCorreta.length * 0.5) {
      return 'This response is too short and may sound rude or incomplete.';
    }
    if (fraseErrada.toLowerCase().includes('want') && !fraseCorreta.toLowerCase().includes('want')) {
      return '"Want" can sound demanding. Try "Can I have..." or "I\'d like..." for politeness.';
    }
    if (fraseErrada.toLowerCase().includes('give me') || fraseErrada.toLowerCase().includes('i want')) {
      return 'Direct commands can sound rude in English. Use "Can I have..." or "Could I get..."';
    }
    if (fraseCorreta.toLowerCase().includes('please') && !fraseErrada.toLowerCase().includes('please')) {
      return 'Adding "please" makes your request more polite.';
    }
    return 'The correct answer is more natural/appropriate for this context.';
  },
  
  mostrarResultado() {
    const d = this.dialogoAtual;
    const totalTu = d.turni.filter(t => {
      const nome = (t.personaggio || '').trim().toLowerCase();
      return nome === 'tu' || nome === 'you' || nome === 'user';
    }).length;
    const pct = Math.round((this.acertos / totalTu) * 100);
    
    // Apenas ganha XP se acertar a maioria e estiver no modo prática
    let ganhouXp = false;
    if (this.modo === 'pratica' && pct >= 60) {
      Progressao.ganhar(d.xp_recompensa);
      ganhouXp = true;

      if (!this.concluidos.includes(d.id)) {
        this.concluidos.push(d.id);
        localStorage.setItem('en_dialoghi_concluidos', JSON.stringify(this.concluidos));
      }
    }
    
    const c = document.getElementById('dialoghi-container');
    
    // QW-2: Flashcards automáticos — identifica vocabulário do diálogo
    const vocabList = (d.vocabulario_chave || []).filter(Boolean);
    const fcBtn = vocabList.length > 0 ? `
      <button class="btn-secondary" onclick="Dialoghi._criarFlashcardsDialogo()" style="margin-top:0.8rem">
        📚 Add ${vocabList.length} words to flashcards
      </button>
    ` : '';

    // QW-6: Resumo de erros se houve
    const erros = Object.keys(this._erroExplicacoes).length;
    const errosHtml = erros > 0 ? `
      <div style="background:#fff8e7;border:1px solid #D4A843;border-radius:12px;padding:1rem;margin-bottom:1.5rem;text-align:left">
        <div style="font-size:0.8rem;color:#6B4C1A;text-transform:uppercase;font-weight:700;margin-bottom:0.5rem">💡 Learn from mistakes</div>
        ${Object.values(this._erroExplicacoes).map(e => `<div style="font-size:0.85rem;color:#6B4C1A;margin-bottom:0.3rem">• ${e}</div>`).join('')}
      </div>
    ` : '';

    c.innerHTML = `
      <div style="text-align:center;padding:2rem 1rem">
        <div style="font-size:3rem">${pct >= 80 ? '🌟' : (pct >= 50 ? '👍' : '🔄')}</div>
        <h3 style="font-family:'Cinzel',serif;color:var(--cor-veneziano-escuro);font-size:1.5rem;margin:1rem 0">${I18n.t('dial_concluido')}</h3>
        <div style="font-size:1.1rem;margin-bottom:1rem">${I18n.t('dial_acertos').replace('{a}', this.acertos).replace('{b}', totalTu)}</div>
        ${ganhouXp ? `<div style="color:var(--cor-toscano);font-weight:700;font-size:1.2rem;margin-bottom:1.5rem">+${d.xp_recompensa} XP</div>` : ''}
        ${errosHtml}
        <div style="background:var(--cor-marmore);border-radius:12px;padding:1rem;margin-bottom:1.5rem;text-align:left;box-shadow:0 2px 10px rgba(0,0,0,0.05)">
          <div style="font-size:0.8rem;color:var(--cor-pietra);text-transform:uppercase;font-weight:700;margin-bottom:0.5rem">${I18n.t('dial_vocab_chave')}</div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            ${vocabList.map(v => `<span style="background:var(--cor-pergaminho);color:var(--cor-veneziano-escuro);padding:0.2rem 0.6rem;border-radius:20px;font-size:0.85rem">${v}</span>`).join('')}
          </div>
          ${fcBtn}
        </div>
        
        <div style="display:flex;gap:1rem;justify-content:center">
          <button class="btn-secondario" onclick="Dialoghi.renderizarSeletor()">${I18n.t('dial_voltar')}</button>
          <button class="btn-primario" onclick="Dialoghi.abrirDialogo('${d.id}', 'pratica')">${I18n.t('dial_praticar_novamente')}</button>
        </div>
      </div>
    `;
  },

  // QW-2: Abre sessão de flashcards com o vocabulário do diálogo
  _criarFlashcardsDialogo() {
    const d = this.dialogoAtual;
    const vocabList = (d.vocabulario_chave || []).filter(Boolean);
    if (!vocabList.length) return;

    // Constrói palavra objects no schema do Flashcards (italiano=EN, portugues=PT)
    const palavras = vocabList.map(word => {
      const turno = d.turni.find(t => t.frase && t.frase.toLowerCase().includes(word.toLowerCase()));
      return {
        id: 'fc_dial_' + d.id + '_' + word.toLowerCase().replace(/\s+/g, '_'),
        italiano: word,
        portugues: '',
        categoria: 'Dialogue',
        exemplo: turno ? turno.frase : '',
        exemplo_pt: turno ? (turno.traducao || '') : '',
        audio_ipa: '',
      };
    });

    // Navega para flashcards e inicia sessão com as palavras do diálogo
    App.navegar('flashcard');
    setTimeout(() => Flashcards.iniciarComPalavrasCustom(palavras, d.titulo), 150);
  },

  _esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};

document.addEventListener('i18n:changed', () => {
  if (document.getElementById('dialoghi-container')) Dialoghi.renderizarSeletor();
});
