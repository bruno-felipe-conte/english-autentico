// ============================================================
// grammar.js — English Grammar — Design Didático em 3 Etapas
// Read & Write — A1 to C2
// Etapas: 1. Aprender a Regra | 2. Exemplos & Armadilhas | 3. Praticar
// Tipos: "escolha" (múltipla escolha) | "revelar" (blur-reveal) | "digitar"
// XP: +8 por acerto · +60 bônus por capítulo concluído
// ============================================================

const Grammatica = {
  dados: null,
  moduloAtual: null,
  unidadeAtual: null,
  etapaAtual: 'aprender', // 'aprender' | 'exemplos' | 'praticar'
  exIndex: 0,
  acertos: 0,
  respondida: false,
  _adminMods: new Set(),   // módulos desbloqueados temporariamente pelo admin

  // ─────────────────────────────────────────────────────────
  // Carregar dados (Stale-While-Revalidate)
  // ─────────────────────────────────────────────────────────
  async carregar() {
    if (this.dados) return;
    try {
      const cached = localStorage.getItem('en_swr_grammar');
      if (cached) {
        this.dados = JSON.parse(cached);
        // Revalida em background sem bloquear a UI
        fetch('data/grammar.json')
          .then(r => r.ok ? r.json() : null)
          .then(fresh => {
            if (fresh && Array.isArray(fresh.moduli)) {
              this.dados = fresh;
              try { localStorage.setItem('en_swr_grammar', JSON.stringify(fresh)); } catch (_) {}
            }
          })
          .catch(() => {});
        return;
      }
    } catch (_) {}

    try {
      const r = await fetch('data/grammar.json');
      if (!r.ok) throw new Error('grammar.json não encontrado');
      this.dados = await r.json();
      try { localStorage.setItem('en_swr_grammar', JSON.stringify(this.dados)); } catch (_) {}
    } catch (e) {
      console.error('Grammatica: erro ao carregar dados', e);
      this.dados = { moduli: [] };
    }
  },

  // ─────────────────────────────────────────────────────────
  // Ponto de entrada — renderiza seletor de módulos
  // ─────────────────────────────────────────────────────────
  async renderizarSeletor() {
    await this.carregar();
    const c = (document.getElementById('grammar-container') || document.getElementById('grammatica-container'));
    if (!c) return;
    c.innerHTML = this._htmlSeletor();
  },

  // Voltar ao seletor (com confirmação se exercício em andamento)
  voltarSeletor() {
    const total = this.unidadeAtual?.exercicios?.length || 0;
    if (this.unidadeAtual && this.etapaAtual === 'praticar' && this.exIndex > 0 && this.exIndex < total) {
      if (!confirm('Deseja voltar aos módulos? O progresso dos exercícios desta lição será perdido.')) return;
    }
    this.unidadeAtual = null;
    this.renderizarSeletor();
  },

  // ─────────────────────────────────────────────────────────
  // Seletor de módulos e lições
  // ─────────────────────────────────────────────────────────
  _htmlSeletor() {
    if (!this.dados || !this.dados.moduli.length)
      return `<p class="gram-empty">${(typeof I18n !== 'undefined' && I18n.t('gram_conteudo_indisponivel')) || 'Conteúdo não disponível.'}</p>`;

    const nivel = App.estado.progresso?.nivel || 1;
    const completadas = App.estado.progresso?.grammatica_completadas || [];

    // Streak de gramática
    let streakHtml = '';
    try {
      const streak = parseInt(localStorage.getItem('en_gram_streak') || '0');
      const streakDate = localStorage.getItem('en_gram_streak_date') || '';
      const today = new Date().toISOString().slice(0, 10);
      if (streak > 0 && (streakDate === today || streakDate === new Date(Date.now() - 86400000).toISOString().slice(0, 10))) {
        streakHtml = '<div class="gram-streak-banner" style="background:linear-gradient(135deg,rgba(0,62,138,0.1),rgba(212,168,67,0.15));border:1.5px solid #003E8A;border-radius:10px;padding:0.55rem 1rem;margin-bottom:1rem;display:flex;align-items:center;gap:0.5rem;font-weight:600;font-size:0.85rem;color:#002047">🔥 ' + streak + ' dias estudando gramática' + (streak >= 7 ? ' — Incrível!' : streak >= 3 ? ' — Mantenha assim!' : '') + '</div>';
      }
    } catch (_) {}

    let html = '<div class="gram-seletor">' + streakHtml;

    for (const mod of this.dados.moduli) {
      const bloqueado = nivel < mod.nivel_minimo && !this._adminMods.has(mod.id);
      const totalUnid = mod.lezioni ? mod.lezioni.length : 0;
      if (bloqueado || totalUnid === 0) continue; // skip locked/empty modules

      const totalEx   = mod.lezioni.reduce((s, u) => s + (u.exercicios?.length || 0), 0);
      const completas = mod.lezioni.filter(u => completadas.includes(u.id)).length;
      const pct       = totalUnid > 0 ? Math.round((completas / totalUnid) * 100) : 0;

      // Module banner (clicável para colapsar/expandir)
      const adminDesbloqueado = this._adminMods.has(mod.id);
      const infoTxt = `${completas}/${totalUnid} concluídas · ${totalEx} exercícios`;
      html += `<div class="gram-nivel-banner" data-nivel="${mod.id}" style="background:${mod.cor};cursor:pointer;user-select:none" onclick="Grammatica.toggleNivel('${mod.id}')">`;
      html += `<div style="display:flex;align-items:center;justify-content:space-between">`;
      html += `<div class="gram-nivel-badge-txt">${mod.id}${adminDesbloqueado ? ' &nbsp;🔓 Admin' : ''}</div>`;
      html += `<span class="gram-nivel-toggle-icone" style="font-size:1.1rem;opacity:0.8;transition:transform 0.2s">▾</span>`;
      html += `</div>`;
      html += `<div class="gram-nivel-nome">${mod.nome}</div>`;
      html += `<div class="gram-nivel-info">${infoTxt}</div>`;
      html += `<div class="gram-nivel-barra"><div style="width:${pct}%"></div></div>`;
      html += '</div>';

      // Grid of lezione cards (id para colapso)
      html += `<div class="gram-lezioni-grid" id="gram-grid-${mod.id}">`;
      for (const u of mod.lezioni) {
        const feita = completadas.includes(u.id);
        const nEx = (u.exercicios || []).length;
        const nCards = (u.observacao_cards || []).length;
        html += `<button class="gram-lez-card${feita ? ' feita' : ''}" onclick="Grammatica.abrirUnidade('${mod.id}','${u.id}')">`;
        html += `<span class="gram-lez-icon">${feita ? '✅' : '📘'}</span>`;
        html += `<span class="gram-lez-info">`;
        if (u.num) html += `<span class="gram-lez-num-label">${u.num}</span>`;
        html += `<span class="gram-lez-titulo">${u.titulo}</span>`;
        html += `<span class="gram-lez-meta">📖 Teoria${nCards ? ` · ${nCards} cards` : ''} · ✏️ ${nEx} exercícios</span>`;
        html += `</span>`;
        html += `<span class="gram-lez-arrow">›</span>`;
        html += '</button>';
      }
      html += '</div>';
    }

    // Locked modules (compact pills — clicáveis para admin)
    const bloqueados = this.dados.moduli.filter(m => nivel < m.nivel_minimo && !this._adminMods.has(m.id) && (m.lezioni || []).length > 0);
    if (bloqueados.length > 0) {
      html += '<div class="gram-locked-row">';
      for (const mod of bloqueados) {
        html += `<button class="gram-locked-pill" onclick="Grammatica.pedirSenhaAdmin('${mod.id}')" title="Acesso administrativo (senha: 2012)">`;
        html += `<span class="gram-locked-pill-icon">🔒</span>`;
        html += `<span class="gram-locked-pill-info">`;
        html += `<span class="gram-locked-pill-id">${mod.id}</span>`;
        html += `<span class="gram-locked-pill-nome">${mod.nome}</span>`;
        html += `<span class="gram-locked-pill-req">Requer Nível ${mod.nivel_minimo}</span>`;
        html += `</span>`;
        html += `<span class="gram-locked-pill-arrow">›</span>`;
        html += `</button>`;
      }
      html += '</div>';
    }

    html += '</div>';
    return html;
  },

  // ─────────────────────────────────────────────────────────
  // Acesso administrativo — popup de senha
  // ─────────────────────────────────────────────────────────
  pedirSenhaAdmin(modId) {
    const old = document.getElementById('gram-admin-modal');
    if (old) old.remove();

    const mod = this.dados.moduli.find(m => m.id === modId);
    const nome = mod ? mod.nome : modId;

    const overlay = document.createElement('div');
    overlay.id = 'gram-admin-modal';
    overlay.className = 'gram-admin-overlay';
    overlay.innerHTML = `
      <div class="gram-admin-box" role="dialog" aria-modal="true">
        <div class="gram-admin-icon">🔐</div>
        <div class="gram-admin-titulo">Desbloquear Módulo</div>
        <div class="gram-admin-subtit">${nome}</div>
        <input
          id="gram-admin-input"
          class="gram-admin-input"
          type="password"
          placeholder="Senha (dica: 2012)"
          maxlength="20"
          autocomplete="off"
          onkeydown="if(event.key==='Enter') Grammatica._confirmarSenha('${modId}'); if(event.key==='Escape') Grammatica._fecharModal()"
        />
        <div id="gram-admin-erro" class="gram-admin-erro" style="display:none">Senha incorreta. Tente novamente (2012).</div>
        <div class="gram-admin-btns">
          <button class="gram-admin-btn-cancel" onclick="Grammatica._fecharModal()">Cancelar</button>
          <button class="gram-admin-btn-ok" onclick="Grammatica._confirmarSenha('${modId}')">Desbloquear</button>
        </div>
      </div>`;

    overlay.addEventListener('click', e => { if (e.target === overlay) this._fecharModal(); });
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      const inp = document.getElementById('gram-admin-input');
      if (inp) inp.focus();
    });
  },

  _fecharModal() {
    const m = document.getElementById('gram-admin-modal');
    if (m) { m.classList.add('gram-admin-saindo'); setTimeout(() => m.remove(), 220); }
  },

  _confirmarSenha(modId) {
    const inp = document.getElementById('gram-admin-input');
    const erro = document.getElementById('gram-admin-erro');
    if (!inp) return;

    if (inp.value === '2012') {
      this._adminMods.add(modId);
      this._fecharModal();
      const c = (document.getElementById('grammar-container') || document.getElementById('grammatica-container'));
      if (c) c.innerHTML = this._htmlSeletor();
    } else {
      inp.value = '';
      if (erro) { erro.style.display = 'block'; }
      inp.classList.add('gram-admin-shake');
      setTimeout(() => inp.classList.remove('gram-admin-shake'), 500);
      inp.focus();
    }
  },

  // ── Colapsa / expande o grid de lições de um nível ───────────
  toggleNivel(id) {
    const grid   = document.getElementById(`gram-grid-${id}`);
    const banner = document.querySelector(`.gram-nivel-banner[data-nivel="${id}"]`);
    if (!grid) return;
    const recolhido = grid.classList.toggle('recolhido');
    const seta = banner?.querySelector('.gram-nivel-toggle-icone');
    if (seta) seta.style.transform = recolhido ? 'rotate(-90deg)' : 'rotate(0deg)';
  },

  // ─────────────────────────────────────────────────────────
  // Abrir lição (Inicia sempre na Etapa 1: Aprender a Regra)
  // ─────────────────────────────────────────────────────────
  abrirUnidade(moduloId, unidadeId, etapaInicial = 'aprender') {
    const mod  = this.dados.moduli.find(m => m.id === moduloId);
    if (!mod) return;
    const unid = (mod.lezioni || []).find(u => u.id === unidadeId);
    if (!unid) return;

    this.moduloAtual  = mod;
    this.unidadeAtual = unid;
    this.etapaAtual   = etapaInicial;
    this.exIndex      = 0;
    this.acertos      = 0;
    this.respondida   = false;

    const c = (document.getElementById('grammar-container') || document.getElementById('grammatica-container'));
    if (c) {
      c.innerHTML = this._htmlUnidade(unid);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  irParaEtapa(etapa) {
    if (!this.unidadeAtual) return;
    this.etapaAtual = etapa;
    const c = (document.getElementById('grammar-container') || document.getElementById('grammatica-container'));
    if (c) {
      c.innerHTML = this._htmlUnidade(this.unidadeAtual);
      const nav = document.querySelector('.gram-steps-bar');
      if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  // ─────────────────────────────────────────────────────────
  // HTML completo da lição com Barra de 3 Etapas Didáticas
  // ─────────────────────────────────────────────────────────
  _htmlUnidade(u) {
    const mod = this.moduloAtual;
    const nEx = (u.exercicios || []).length;

    let html = '<div class="gram-lesson-layout">';

    // Nav superior
    html += '<div class="gram-lesson-nav">';
    html += `<button class="gram-btn-back" onclick="Grammatica.voltarSeletor()">‹ Todos os módulos</button>`;
    html += `<div class="gram-lesson-breadcrumb"><span>${mod.id}</span>${u.num ? ` › <span>${u.num}</span>` : ''}</div>`;
    html += '</div>';

    // Cabeçalho da lição
    html += '<div class="gram-lesson-header">';
    if (u.num) html += `<div class="gram-lesson-eyebrow">${u.num}</div>`;
    html += `<h2 class="gram-lesson-title">${u.titulo}</h2>`;
    if (u.subtitulo) html += `<p class="gram-lesson-subtitle">${u.subtitulo}</p>`;
    html += '</div>';

    // Barra de Navegação das 3 Etapas Didáticas
    html += `
      <div class="gram-steps-bar" role="tablist" aria-label="Etapas da lição">
        <button class="gram-step-btn ${this.etapaAtual === 'aprender' ? 'active' : ''}"
                onclick="Grammatica.irParaEtapa('aprender')" role="tab" aria-selected="${this.etapaAtual === 'aprender'}">
          <span class="gram-step-num">1</span>
          <span class="gram-step-txt">📖 Aprender a Regra</span>
        </button>
        <button class="gram-step-btn ${this.etapaAtual === 'exemplos' ? 'active' : ''}"
                onclick="Grammatica.irParaEtapa('exemplos')" role="tab" aria-selected="${this.etapaAtual === 'exemplos'}">
          <span class="gram-step-num">2</span>
          <span class="gram-step-txt">🔍 Exemplos & Armadilhas</span>
        </button>
        <button class="gram-step-btn ${this.etapaAtual === 'praticar' ? 'active' : ''}"
                onclick="Grammatica.irParaEtapa('praticar')" role="tab" aria-selected="${this.etapaAtual === 'praticar'}">
          <span class="gram-step-num">3</span>
          <span class="gram-step-txt">✏️ Praticar (${nEx})</span>
        </button>
      </div>`;

    // Conteúdo da Etapa Ativa
    if (this.etapaAtual === 'aprender') {
      html += this._htmlEtapaAprender(u);
    } else if (this.etapaAtual === 'exemplos') {
      html += this._htmlEtapaExemplos(u);
    } else {
      html += this._htmlEtapaPraticar(u);
    }

    html += '</div>'; // lesson-layout
    return html;
  },

  // ─────────────────────────────────────────────────────────
  // ETAPA 1: 📖 Aprender a Regra (Integra todas as camadas teóricas)
  // ─────────────────────────────────────────────────────────
  _htmlEtapaAprender(u) {
    let h = '<div class="gram-card gram-teoria-card"><div class="gram-camadas">';

    // 0. Jornada narrativa: cena viva + fio condutor (se existirem)
    h += this._htmlCena(u);
    if (u.fio && u.fio.descoberta) h += `<p class="gram-fio">${this._formatarPergunta(u.fio.descoberta)}</p>`;

    // 1. Alerta motivacional
    h += this._htmlFase1Ancoragem(u);

    // 2. Definição (Veja -> Pense -> Entenda)
    h += this._htmlDefinicao(u);

    // 3. Inventário de Estruturas-Chave
    h += this._htmlInventario(u);

    // 4. Tabela Visual Resumida (Cards visuais)
    h += this._htmlFase3Tabela(u);

    // 5. Cards Interativos de Observação (Flip Cards com botão de áudio isolado)
    h += this._htmlFase2Observacao(u);

    // 6. Técnica Passo a Passo (Como Aplicar)
    h += this._htmlTecnica(u);

    // 7. Teoria Completa e Tabelas Detalhadas
    if (u.teoria) {
      h += `
        <div class="gram-camada-bloco">
          <div class="gram-camada-label">📚 Explicação Completa & Quadros de Referência</div>
          <div class="gram-teoria-corpo" style="padding: 1.1rem 1.25rem">${this._formatarTeoria(u.teoria)}</div>
        </div>`;
    }

    // 8. Ponte com o Português (Comparação contrastiva PT ↔ EN)
    h += this._htmlPonte(u);

    if (u.fio && u.fio.fecho) h += `<p class="gram-fio gram-fio-fecho">${this._formatarPergunta(u.fio.fecho)}</p>`;

    // Chamada de ação para o Phrasal Verbs Lab na lição b2-lez15
    if (u.id === 'b2-lez15') {
      h += `
        <div style="background:linear-gradient(135deg, rgba(0,62,138,0.12), rgba(212,168,67,0.15));border:1.5px solid #003E8A;border-radius:12px;padding:1.1rem 1.25rem;margin:1.25rem 0;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
          <div>
            <strong style="color:var(--cor-primaria,#003E8A);font-size:1.05rem;display:flex;align-items:center;gap:0.4rem;">
              🧩 Phrasal Verbs Lab Completo
            </strong>
            <p style="margin:0.25rem 0 0 0;font-size:0.88rem;color:var(--cor-texto-secundario,#555);">
              Explore o acervo de 415 verbos com pronúncia nativa, mini-game da regra do pronome e cards FSRS.
            </p>
          </div>
          <button onclick="App.navegar('phrasal')" style="background:var(--cor-primaria,#003E8A);color:#fff;border:none;padding:0.55rem 1.1rem;border-radius:8px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:0.35rem;">
            Abrir o Lab →
          </button>
        </div>`;
    }

    // Botão de avanço intuitivo para a Etapa 2
    h += `
      <div class="gram-step-footer">
        <button class="gram-btn-next gram-btn-step-cta" onclick="Grammatica.irParaEtapa('exemplos')">
          Avançar para Exemplos & Armadilhas →
        </button>
      </div>`;

    h += '</div></div>';
    return h;
  },

  // ─────────────────────────────────────────────────────────
  // ETAPA 2: 🔍 Exemplos & Armadilhas
  // ─────────────────────────────────────────────────────────
  _htmlEtapaExemplos(u) {
    const nEx = (u.exercicios || []).length;
    let h = '<div class="gram-card gram-teoria-card"><div class="gram-camadas">';

    // 1. Exemplos Analisados (Pergunta -> Resposta -> Conclusão) com áudio isolado
    h += this._htmlFase4Exemplos(u);

    // 2. Frases extras de exemplo com áudio clicável
    if (u.exemplos && u.exemplos.length) {
      let lista = '';
      for (const ex of u.exemplos) {
        const en = typeof ex === 'string' ? ex : (ex.en || ex.ingles || ex.it || '');
        const pt = typeof ex === 'string' ? '' : (ex.pt || '');
        const safe = en.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        lista += `
          <div class="gram-esempio" onclick="App.pronunciar('${safe}')" style="cursor:pointer" title="Clique para ouvir a pronúncia em inglês">
            <div class="gram-esempio-it">🔊 ${this._formatarPergunta(en)}</div>
            ${pt ? `<div class="gram-esempio-pt">${this._formatarPergunta(pt)}</div>` : ''}
          </div>`;
      }
      h += `
        <div class="gram-camada-bloco">
          <div class="gram-camada-label">🎧 Frases Autênticas para Ouvir e Repetir</div>
          <div class="gram-esempi-lista" style="padding: 0.9rem 1.25rem">${lista}</div>
        </div>`;
    }

    // 3. Armadilhas Comuns (Errado ✗ vs Certo ✓ com áudio na forma certa)
    h += this._htmlFase5Armadilhas(u);

    // 4. Coda (Resumo prático de memorização)
    h += this._htmlCoda(u);

    // Botões de navegação de rodapé
    h += `
      <div class="gram-step-footer" style="display:flex;gap:0.75rem;justify-content:space-between;flex-wrap:wrap">
        <button class="gram-btn-secondary" onclick="Grammatica.irParaEtapa('aprender')">
          ← Voltar à Regra
        </button>
        <button class="gram-btn-next gram-btn-step-cta" onclick="Grammatica.irParaEtapa('praticar')">
          Ir para os Exercícios (${nEx}) ✏️ →
        </button>
      </div>`;

    h += '</div></div>';
    return h;
  },

  // ─────────────────────────────────────────────────────────
  // ETAPA 3: ✏️ Praticar (Exercícios + Consulta Rápida no Topo)
  // ─────────────────────────────────────────────────────────
  _htmlEtapaPraticar(u) {
    let h = '';
    // Painel colapsável de consulta rápida (Tabela Visual + Técnica + Ponte)
    h += this._htmlTabelaVisual(u);

    // Área de exercícios
    h += '<div id="gram-ex-area">';
    h += this._htmlExercicio();
    h += '</div>';

    return h;
  },

  // ─────────────────────────────────────────────────────────
  // Exercício atual
  // ─────────────────────────────────────────────────────────
  _htmlExercicio() {
    const u = this.unidadeAtual;
    if (!u || this.exIndex >= u.exercicios.length) return this._htmlResultado();

    const ex    = u.exercicios[this.exIndex];
    const total = u.exercicios.length;
    const pct   = Math.round((this.exIndex / total) * 100);
    const qHtml = this._formatarPergunta(ex.pergunta);

    let html = '<div class="gram-card">';

    // Progresso + tipo badge na mesma linha
    const tipoLabel = ex.tipo === 'revelar' ? '👁️ Descubra' : ex.tipo === 'digitar' ? '⌨️ Escreva' : '🔘 Escolha';
    const tipoCls   = ex.tipo === 'revelar' ? 'gram-ex-tipo-revelar' : ex.tipo === 'digitar' ? 'gram-ex-tipo-digitar' : 'gram-ex-tipo-escolha';
    html += '<div class="gram-ex-header">';
    html += `<div class="gram-ex-header-top"><span class="gram-ex-progress-label">Exercício ${this.exIndex + 1} / ${total}</span><span class="gram-ex-tipo-badge ${tipoCls}">${tipoLabel}</span></div>`;
    html += `<div class="gram-ex-progress-bar"><div class="gram-ex-progress-fill" style="width:${pct}%"></div></div>`;
    html += '</div>';

    // Pergunta
    html += `<div class="gram-ex-question">${qHtml}</div>`;

    // Corpo do exercício
    if (ex.tipo === 'escolha') {
      html += this._htmlEscolha(ex);
    } else if (ex.tipo === 'digitar') {
      html += this._htmlDigitar(ex);
    } else {
      html += this._htmlRivelar(ex);
    }

    // Feedback (oculto até responder)
    html += '<div class="gram-ex-feedback" id="gram-feedback"></div>';

    // Ações (ocultas até responder)
    html += '<div class="gram-ex-actions" id="gram-actions" style="display:none">';
    if (ex.tipo === 'revelar') {
      html += '<button class="gram-btn-errei"  onclick="Grammatica.proximoExercicio()">❌ Preciso revisar</button>';
      html += '<button class="gram-btn-acertei" onclick="Grammatica.marcarAcerto()">✅ Acertei</button>';
    } else {
      html += '<button class="gram-btn-next" onclick="Grammatica.proximoExercicio()">Próximo →</button>';
    }
    html += '</div>';

    html += '</div>'; // card
    return html;
  },

  // ─── Múltipla escolha ───
  _htmlEscolha(ex) {
    let html = '<div class="gram-options" id="gram-options">';
    for (let i = 0; i < ex.opcoes.length; i++) {
      const op = this._formatarPergunta(ex.opcoes[i]);
      html += `<button class="gram-option" id="gram-op-${i}" onclick="Grammatica.responder(${i})">${op}</button>`;
    }
    html += '</div>';
    return html;
  },

  // ─── Digitação livre ───
  _htmlDigitar(ex) {
    const dica = ex.dica ? `<div class="gram-digitar-dica">💡 ${ex.dica}</div>` : '';
    return `
      <div class="gram-digitar-area" id="gram-digitar-area">
        ${dica}
        <div class="gram-digitar-row">
          <input class="gram-input-digitacao" id="gram-input-digitacao"
                 type="text" placeholder="Digite sua resposta..."
                 autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                 onkeydown="if(event.key==='Enter')Grammatica.responderDigitar()">
          <button class="gram-btn-verificar" onclick="Grammatica.responderDigitar()">✔ Verificar</button>
        </div>
      </div>`;
  },

  // ─── Blur-reveal ───
  _htmlRivelar(ex) {
    const respStr = String(ex.resposta || ex.revelacao || '');
    const partes = respStr.split(/(\s+)/);
    const spans  = partes.map(p => {
      if (/^\s+$/.test(p)) return p;
      return `<span class="gram-word-blur" onclick="Grammatica.togglePalavra(this)">${p}</span>`;
    }).join('');

    let html = '<div class="gram-revelar-area">';
    const hint = '👆 Pense na resposta e clique nas palavras para conferir (ou em "Ver resposta")';
    html += `<div class="gram-revelar-hint">${hint}</div>`;
    html += `<div class="gram-risposta-container" id="gram-risposta">${spans}</div>`;
    html += '<div class="gram-revelar-actions">';
    html += '<button class="gram-btn-rivela-tutto" onclick="Grammatica.revelarTudo()">👁️ Ver resposta completa</button>';
    html += '<button class="gram-btn-nascondi" id="gram-btn-nascondi" onclick="Grammatica.nasconderTudo()">Ocultar</button>';
    html += '</div>';
    html += '</div>';
    return html;
  },

  // ─────────────────────────────────────────────────────────
  // Interações blur-reveal
  // ─────────────────────────────────────────────────────────
  togglePalavra(el) {
    el.classList.toggle('revealed');
    this._verificarTudoRevelado();
  },

  revelarTudo() {
    document.querySelectorAll('.gram-word-blur').forEach(w => w.classList.add('revealed'));
    const btn = document.getElementById('gram-btn-nascondi');
    if (btn) btn.style.display = 'inline-flex';
    this._afterReveal();
  },

  nasconderTudo() {
    document.querySelectorAll('.gram-word-blur').forEach(w => w.classList.remove('revealed'));
    const fb = document.getElementById('gram-feedback');
    if (fb) fb.innerHTML = '';
    const actions = document.getElementById('gram-actions');
    if (actions) actions.style.display = 'none';
    const btn = document.getElementById('gram-btn-nascondi');
    if (btn) btn.style.display = 'none';
    this.respondida = false;
  },

  _verificarTudoRevelado() {
    const words = document.querySelectorAll('.gram-word-blur');
    if ([...words].every(w => w.classList.contains('revealed'))) {
      const btn = document.getElementById('gram-btn-nascondi');
      if (btn) btn.style.display = 'inline-flex';
      this._afterReveal();
    }
  },

  _extrairFraseInglesExercicio(ex) {
    if (!ex) return '';
    const p = ex.pergunta || '';
    const tipo = ex.tipo;
    const resp = ex.resposta;
    const revelacao = ex.revelacao;
    const opcoes = ex.opcoes;

    let fill = '';
    if (tipo === 'escolha' && Array.isArray(opcoes) && typeof resp === 'number' && resp < opcoes.length) {
      fill = opcoes[resp] || '';
    } else if (resp && !String(resp).toLowerCase().match(/^(porque|qual|a frase|regra|explicação|não se usa|usa-se|em inglês|o verbo|a short)/)) {
      fill = String(resp);
    }

    let raw = '';
    if (revelacao) {
      raw = String(revelacao);
    } else if (p.includes('___') && fill) {
      raw = p.replace(/___+/g, fill);
    } else if (fill) {
      raw = fill;
    } else if (p) {
      raw = p;
    }

    // 1. Limpeza de formatação markdown
    let s = raw.replace(/\*\*|\*/g, '').replace(/_/g, '');

    // 2. Remover anotações explicativas / traduções entre parênteses em português como (= ...), (Ela ...)
    s = s.replace(/\s*\(=[^)]+\)/g, '');
    s = s.replace(/\s*\([^)]*\b(o|a|os|as|um|uma|de|do|da|em|no|na|para|com|por|que|se|não|está|estavam|era|eram|verbo|trad|tradução|nem|no que|antes de|tampa|aonde|quem|qual|dirigir|concordam|sempre)\b[^)]*\)/gi, '');

    // 3. Se houver quebra de linha seguida de frase entre aspas (ex: instrução em cima, frase em baixo)
    const mBlock = s.match(/[\n\r]+\s*["'“‘]([^"'”’]{3,})["'”’]/);
    if (mBlock) {
      s = mBlock[1].trim();
    }

    // 4. Se houver dois pontos (:) seguido de frase em inglês
    const mColon = s.match(/:\s*["'“‘]?([A-Z][^:"'\n\r]+[.!?]?)["'”’]?\s*$/);
    if (mColon && mColon[1].trim().split(/\s+/).length >= 2) {
      const afterColon = mColon[1].trim();
      const beforeColon = s.slice(0, s.indexOf(':'));
      if (/\b(complete|como|para|dizer|digite|qual|escreva|identifique|inverta|observe|transforme|pense|escute|você|se|caso)\b/i.test(beforeColon)) {
        s = afterColon;
      }
    } else {
      // Tentar remover prefixo de comando clássico até o ':'
      const cmdPrefix = /^\s*[^:\n\r]*\b(Complete|Como|Para\s+dizer|Para\s+clima|Digite|Escreva|Identifique|Inverta|Observe|Transforme|Pense|Escute|Preencha|Traduza|Diga|Pergunta|Resposta|Atenção)\b[^:\n]*:\s*/i;
      s = s.replace(cmdPrefix, '');
    }

    // 5. Remover rótulos residuais como 'Pergunta: ...' ou 'Resposta curta: ...'
    s = s.replace(/Pergunta\s*:\s*/gi, '');
    s = s.replace(/Resposta(\s+[a-zçã]+)*\s*:\s*/gi, '');

    // 6. Desembrulhar aspas simples ou duplas envolventes
    s = s.trim();
    const mQuote = s.match(/^["'“‘](.*)["'”’]$/s);
    if (mQuote) {
      s = mQuote[1].trim();
    }

    // 7. Normalizar espaços e quebras
    s = s.replace(/\s+/g, ' ').trim();

    // 8. Descartar se for explicação puramente teórica em português (sem palavras gramaticais inglesas)
    const ptDetector = /\b(porque|portanto|adjetivo|substantivo|conjunção|pretérito|passado|futuro|afirmativa|negativa|interrogativa|correto|correta|significa|indica|usa-se)\b/i;
    const enDetector = /\b(the|is|are|am|was|were|have|has|had|do|does|did|will|would|can|could|should|may|might|this|that|these|those|you|he|she|it|we|they|my|your|his|her|its|our|their)\b/i;
    if (ptDetector.test(s) && !enDetector.test(s)) {
      return '';
    }

    return s;
  },

  _botaoOuvirExercicio(ex) {
    if (!ex) return '';
    const fraseParaOuvir = this._extrairFraseInglesExercicio(ex);
    if (!fraseParaOuvir || fraseParaOuvir.length > 220) return '';
    const safe = fraseParaOuvir.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `<div style="margin-top:0.55rem"><button class="gram-audio-mini-btn" onclick="App.pronunciar('${safe}')">🔊 Ouvir pronúncia em inglês</button></div>`;
  },

  _afterReveal() {
    if (this.respondida) return;
    this.respondida = true;
    const ex = this.unidadeAtual.exercicios[this.exIndex];
    const fb = document.getElementById('gram-feedback');
    if (fb && ex.explicacao) {
      fb.innerHTML = `<div class="gram-feedback-info">💡 <strong>Por que?</strong> ${this._formatarPergunta(ex.explicacao)}${this._botaoOuvirExercicio(ex)}</div>`;
    }
    const actions = document.getElementById('gram-actions');
    if (actions) actions.style.display = 'flex';
  },

  revelarResposta() { this.revelarTudo(); },

  // ─────────────────────────────────────────────────────────
  // Responder múltipla escolha
  // ─────────────────────────────────────────────────────────
  responder(indice) {
    if (this.respondida) return;
    this.respondida = true;

    const ex      = this.unidadeAtual.exercicios[this.exIndex];
    const correto = (indice === ex.resposta);

    for (let i = 0; i < ex.opcoes.length; i++) {
      const btn = document.getElementById(`gram-op-${i}`);
      if (!btn) continue;
      btn.disabled = true;
      btn.className = i === ex.resposta
        ? 'gram-option-correct'
        : i === indice && !correto
          ? 'gram-option-wrong'
          : 'gram-option-disabled opcao-recolhida';
    }

    const fb = document.getElementById('gram-feedback');
    if (fb) {
      const expHtml = this._formatarPergunta(ex.explicacao || '');
      const audioBtn = this._botaoOuvirExercicio(ex);
      fb.innerHTML = correto
        ? `<div class="gram-feedback-correct">✅ <strong>Correto!</strong> ${expHtml}${audioBtn}</div>`
        : `<div class="gram-feedback-wrong">❌ <strong>Incorreto.</strong> ${expHtml}${audioBtn}</div>`;
    }

    const actions = document.getElementById('gram-actions');
    if (actions) actions.style.display = 'flex';

    if (correto) { this.acertos++; App.ganharXP(8); }
  },

  // ─────────────────────────────────────────────────────────
  // Responder digitação
  // ─────────────────────────────────────────────────────────
  responderDigitar() {
    if (this.respondida) return;
    const input = document.getElementById('gram-input-digitacao');
    if (!input) return;

    const ex = this.unidadeAtual.exercicios[this.exIndex];
    const digitado = input.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const correta  = String(ex.resposta ?? '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    const variantes = (ex.variantes || []).map(v =>
      String(v ?? '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    );
    const correto = digitado === correta || variantes.includes(digitado);

    this.respondida = true;
    input.disabled = true;
    input.classList.add(correto ? 'digitar-correto' : 'digitar-errado');

    const fb = document.getElementById('gram-feedback');
    if (fb) {
      const expHtml = ex.explicacao ? ' ' + this._formatarPergunta(ex.explicacao) : '';
      const audioBtn = this._botaoOuvirExercicio(ex);
      fb.innerHTML = correto
        ? `<div class="gram-feedback-correct">✅ <strong>Correto!</strong>${expHtml}${audioBtn}</div>`
        : `<div class="gram-feedback-wrong">❌ <strong>Incorreto.</strong> A resposta era: <strong>${ex.resposta}</strong>.${expHtml}${audioBtn}</div>`;
    }

    const actions = document.getElementById('gram-actions');
    if (actions) actions.style.display = 'flex';

    if (correto) { this.acertos++; App.ganharXP(8); }
  },

  // ─────────────────────────────────────────────────────────
  // Marcar acerto (revelar)
  // ─────────────────────────────────────────────────────────
  marcarAcerto() {
    this.acertos++;
    App.ganharXP(5);
    this.proximoExercicio();
  },

  // ─────────────────────────────────────────────────────────
  // Avançar para próximo exercício
  // ─────────────────────────────────────────────────────────
  proximoExercicio() {
    this.exIndex++;
    this.respondida = false;
    const area = document.getElementById('gram-ex-area');
    if (!area) return;
    area.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    area.style.opacity = '0';
    area.style.transform = 'translateY(8px)';
    setTimeout(() => {
      area.innerHTML = this.exIndex >= this.unidadeAtual.exercicios.length
        ? this._htmlResultado()
        : this._htmlExercicio();
      area.style.opacity = '1';
      area.style.transform = 'translateY(0)';
      area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 160);
  },

  // ─────────────────────────────────────────────────────────
  // Tela de resultado
  // ─────────────────────────────────────────────────────────
  _htmlResultado() {
    const total   = this.unidadeAtual.exercicios.length;
    const acertos = this.acertos;
    const pct     = total > 0 ? Math.round((acertos / total) * 100) : 0;
    const bonus   = 60;

    const completadas = (App.estado.progresso || {}).grammatica_completadas || [];
    const jaFeita     = completadas.includes(this.unidadeAtual.id);
    if (!jaFeita) {
      completadas.push(this.unidadeAtual.id);
      App.estado.progresso.grammatica_completadas = completadas;
      App.salvarProgresso();
      App.ganharXP(bonus);
      App.notificar(`🏆 Capítulo concluído! +${bonus} XP`, 'sucesso');
    }

    if (typeof Calor !== 'undefined' && typeof Calor.registrar === 'function') Calor.registrar(total);

    let emoji = '📚', msg = 'Continue praticando — revise a teoria e tente novamente!';
    if      (pct === 100) { emoji = '🌟'; msg = 'Perfeito! Você dominou todas as questões desta lição!'; }
    else if (pct >= 80)   { emoji = '🎉'; msg = 'Excelente trabalho! Domínio muito sólido do tema!'; }
    else if (pct >= 60)   { emoji = '💪'; msg = 'Bom resultado! Vale revisar as armadilhas para chegar a 100%.'; }

    // Próxima lição
    const unids = this.moduloAtual.lezioni || [];
    const idx   = unids.findIndex(u => u.id === this.unidadeAtual.id);
    let proxBtn = '';
    if (idx >= 0 && idx < unids.length - 1) {
      const prox = unids[idx + 1];
      proxBtn = `<button class="gram-btn-next" onclick="Grammatica.abrirUnidade('${this.moduloAtual.id}','${prox.id}')">Próxima lição →</button>`;
    }

    return `
      <div class="gram-card gram-resultado">
        <div class="gram-res-emoji">${emoji}</div>
        <div class="gram-res-title">Lição Concluída!</div>
        <div class="gram-res-score">${acertos}<span>/${total}</span></div>
        <div class="gram-res-pct">${pct}% de acertos</div>
        ${!jaFeita ? `<div class="gram-res-xp">+${bonus} XP bônus 🏆</div>` : ''}
        <div class="gram-res-msg">${msg}</div>
        <div class="gram-res-actions">
          <button class="gram-btn-secondary" onclick="Grammatica.abrirUnidade('${this.moduloAtual.id}','${this.unidadeAtual.id}','praticar')">🔄 Refazer Exercícios</button>
          <button class="gram-btn-secondary" onclick="Grammatica.irParaEtapa('aprender')">📖 Revisar Teoria</button>
          ${proxBtn}
          <button class="gram-btn-secondary" onclick="Grammatica.voltarSeletor()">‹ Todos os módulos</button>
        </div>
      </div>`;
  },

  // ─────────────────────────────────────────────────────────
  // Formatação da teoria (Markdown → HTML)
  // ─────────────────────────────────────────────────────────
  _formatarTeoria(texto) {
    if (!texto) return '';

    if (typeof texto !== 'string') {
      if (typeof texto === 'object') {
        const tit = texto.titulo ? `**${texto.titulo}**\n\n` : '';
        const passos = Array.isArray(texto.passos) ? texto.passos.map(p => `- ${p}`).join('\n') : '';
        texto = tit + passos;
      } else {
        texto = String(texto);
      }
    }

    const htmlTables = [];
    texto = texto.replace(/<table[\s\S]*?<\/table>/gi, (m) => {
      htmlTables.push(m);
      return `\x00T${htmlTables.length - 1}\x00`;
    });

    // Headings markdown (### e ####)
    texto = texto
      .replace(/^####\s+(.+)$/gm, '<h4 style="color:#002855;margin:1rem 0 0.4rem;font-size:1rem">$1</h4>')
      .replace(/^###\s+(.+)$/gm, '<h3 style="color:#003E8A;margin:1.1rem 0 0.5rem;font-size:1.12rem;border-bottom:1px solid #d4c4a8;padding-bottom:0.25rem">$1</h3>');

    // Bold e italic
    texto = texto
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Linhas pipe → <tr>
    texto = texto.replace(/^(\|.+\|)$/gm, (row) => {
      const clean = row.replace(/[\|\s\-:]/g, '');
      if (!clean) return '';
      const cells = row.split('|').filter((_, i, a) => i > 0 && i < a.length - 1);
      if (cells.some(c => /^[\s\-:]+$/.test(c))) return '';
      return '<tr>' + cells.map((c, i) => {
        const tag = i === 0 ? 'th' : 'td';
        return `<${tag}>${c.trim()}</${tag}>`;
      }).join('') + '</tr>';
    });

    texto = texto.replace(/((<tr>[\s\S]*?<\/tr>\n*)+)/g,
      '<table class="gram-table">$1</table>');

    texto = texto.replace(/(<table[^>]*>)([\s\S]*?)(<\/table>)/g,
      (_, open, inner, close) => open + inner.replace(/\n+/g, '') + close);

    texto = texto.replace(/\n+(<table)/g, '\n$1');
    texto = texto.replace(/(<\/table>)\n+/g, '$1\n');

    texto = texto.replace(/\n{2,}/g, '\n\n');
    texto = texto.replace(/\n\n/g, '</p><p>');
    texto = texto.replace(/\n/g, '<br>');

    texto = texto.replace(/<p>\s*<\/p>/g, '');
    texto = texto.replace(/(<br>)+(<table)/g, '$2');
    texto = texto.replace(/(<\/table>)(<br>)+/g, '$1');
    texto = texto.replace(/<p>(<table)/g, '$1');
    texto = texto.replace(/(<\/table>)<\/p>/g, '$1');

    htmlTables.forEach((t, i) => {
      texto = texto.replace(`\x00T${i}\x00`, t);
    });

    texto = texto.replace(
      /(<p>)(<strong>(?:Rule|Regola|Nota bene|Nota|Regra)[^<]*:<\/strong>)/gi,
      '<p class="gram-regola">$2'
    );
    texto = texto.replace(
      /(<p>)(<strong>(?:Attention|Attenzione|Importante|Achtung|Atenção)[^<]*!?:?<\/strong>)/gi,
      '<p class="gram-attenzione">$2'
    );

    texto = texto.replace(
      /<p>(<strong>[A-ZÀÈÉÌÒÙ][a-zàèéìòùA-Z\s]+:<\/strong>[^<p]{0,300}<br>[^<p]{0,50}<strong>[A-ZÀÈÉÌÒÙ])/g,
      '<p class="gram-dialogo-box">$1'
    );

    return texto;
  },

  _formatarPergunta(texto) {
    if (!texto) return '';
    return String(texto)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  },

  // ─── FASE 1: Ancoragem ───
  _htmlCena(u) {
    if (!u.cena) return '';
    const esc = t => t.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const linhas = u.cena.texto.split('\n').map(x => x.trim()).filter(x => x && !/^_.*_$/.test(x));
    let corpo = '';
    for (const raw of linhas) {
      const plain = raw.replace(/\*\*[^*]+:\*\*\s*/, '').replace(/\*/g, '').replace(/_/g, '');
      corpo += `<div class="gram-cena-linha"><button class="gram-audio-mini-btn" onclick="App.pronunciar('${esc(plain)}')" title="Ouvir">🔊</button><span>${this._formatarPergunta(raw)}</span></div>`;
    }
    const abertura = (u.fio && u.fio.abertura) ? `<p class="gram-fio">${this._formatarPergunta(u.fio.abertura)}</p>` : '';
    return `<div class="gram-cena">
      <div class="gram-cena-etiqueta">🎭 Vozes da vida real — ${u.cena.titulo || ''}</div>
      ${abertura}<div class="gram-cena-corpo">${corpo}</div></div>`;
  },

  _htmlFase1Ancoragem(u) {
    if (!u.alerta) return '';
    return `<div class="gram-alerta">💬 <strong>Por que isso importa?</strong><br>${this._formatarPergunta(u.alerta)}</div>`;
  },

  // ─── FASE 2: Observação (Flip Cards Clicáveis + Botão de Áudio) ───
  _htmlFase2Observacao(u) {
    if (!u.observacao_cards || !u.observacao_cards.length) return '';
    let cards = '';
    for (let i = 0; i < u.observacao_cards.length; i++) {
      const c = u.observacao_cards[i];
      const en = c.ingles || c.italiano || '';
      const safeEn = en.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const badgeTxt = (c.artigo && c.artigo !== '⚠️' && c.artigo !== '📌')
        ? `${c.artigo} · ${c.genero || ''}`
        : (c.genero || 'regra');
      cards += `
        <div class="gram-flip-card" onclick="this.classList.toggle('flipped')">
          <div class="gram-flip-card-inner">
            <div class="gram-flip-card-front">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.4rem">
                <div class="gfc-it">${en}</div>
                <button class="gram-audio-mini-btn" onclick="event.stopPropagation();App.pronunciar('${safeEn}')" title="Ouvir pronúncia">🔊</button>
              </div>
              <div class="gfc-pt">🇧🇷 ${c.traducao || ''}</div>
              <div class="gfc-badge">${badgeTxt}</div>
              <div class="gfc-click">Clique no card para ver o porquê 👆</div>
            </div>
            <div class="gram-flip-card-back">
              <div class="gfc-titulo-regra">💡 Por que funciona assim:</div>
              <div class="gfc-regra-txt">${this._formatarPergunta(c.motivo || '')}</div>
            </div>
          </div>
        </div>`;
    }
    return `
      <div class="gram-camada-bloco">
        <div class="gram-camada-label">🔎 Fase 2: Observar e Descobrir</div>
        <div style="padding: 0.85rem 1.25rem 0.4rem; font-size: 0.9rem; color: #666; line-height: 1.5;">Clique nos cartões abaixo para descobrir regras e padrões de forma prática!</div>
        <div class="gram-observacao-grid">${cards}</div>
      </div>`;
  },

  // ─── FASE 3: Tabela Visual (Sempre Visível) ───
  _htmlFase3Tabela(u) {
    if (!u.tabela_visual) return '';
    return `
      <div class="gram-camada-bloco">
        <div class="gram-camada-label">📋 Fase 3: Tabela de Referência Rápida</div>
        <div class="gram-tabela-sem-details">${u.tabela_visual}</div>
      </div>`;
  },

  // ─── FASE 4: Exemplos P/R/C (Com botão de expandir todos e áudio isolado) ───
  toggleTodosPRC() {
    const cards = document.querySelectorAll('.gram-prc-expandivel');
    const todosAbertos = [...cards].every(c => c.classList.contains('aberto'));
    cards.forEach(c => c.classList.toggle('aberto', !todosAbertos));
  },

  _htmlFase4Exemplos(u) {
    if (!u.exemplos_prc || !u.exemplos_prc.length) return '';
    let rows = '';
    for (let i = 0; i < u.exemplos_prc.length; i++) {
      const e = u.exemplos_prc[i];
      const safe = (e.oracao || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      // Deixa o 1º exemplo já aberto por padrão
      const abertoCls = i === 0 ? ' aberto' : '';
      rows += `
        <div class="gram-prc-expandivel${abertoCls}" id="gram-prc-card-${i}">
          <div class="gram-prc-topo" onclick="this.parentElement.classList.toggle('aberto')">
            <span class="gram-prc-it">
              <button class="gram-audio-mini-btn" onclick="event.stopPropagation();App.pronunciar('${safe}')" title="Ouvir frase">🔊</button>
              <em>${this._formatarPergunta(e.oracao || '')}</em>
            </span>
            <span class="gram-prc-btn-expandir">Ver detalhes ▾</span>
          </div>
          <div class="gram-prc-conteudo-oculto">
            <div class="gram-prc-pq"><span class="gram-prc-tag">Pergunta</span> ${this._formatarPergunta(e.pergunta || '')}</div>
            <div class="gram-prc-pq"><span class="gram-prc-tag">Resposta</span> ${this._formatarPergunta(e.resposta || '')}</div>
            <div class="gram-prc-conclusao"><span class="gram-prc-tag gram-prc-tag-c">Conclusão</span> <strong>${this._formatarPergunta(e.conclusao || '')}</strong></div>
          </div>
        </div>`;
    }
    return `
      <div class="gram-camada-bloco">
        <div class="gram-camada-label" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5rem">
          <span>🗣️ Fase 4: Analisar os Exemplos</span>
          <button class="gram-audio-mini-btn" onclick="Grammatica.toggleTodosPRC()" style="font-size:0.74rem">↕ Expandir / Recolher Todos</button>
        </div>
        <div style="padding: 0.85rem 1.25rem 0.4rem; font-size: 0.9rem; color: #666; line-height: 1.5;">Clique nos exemplos abaixo para praticar seu raciocínio antes de ver a resposta!</div>
        <div class="gram-prc-lista">${rows}</div>
      </div>`;
  },

  // ─── FASE 5: Armadilhas (Lado a Lado Errado ✗ vs Certo ✓ com Áudio) ───
  _htmlFase5Armadilhas(u) {
    if (!u.armadilhas || !u.armadilhas.length) return '';
    let cards = '';
    for (let i = 0; i < u.armadilhas.length; i++) {
      const a = u.armadilhas[i];
      const safeCerto = (a.certo || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const motivo = a.motivo || a.explicacao || '';
      cards += `
        <div class="gram-armadilha-row">
          <div class="gram-armadilha-col gram-arm-errada">
            <span class="gram-arm-icon">✗</span>
            <div class="gram-arm-texto">
              <span class="gram-arm-lbl">Errado</span>
              <strong>${this._formatarPergunta(a.errado)}</strong>
            </div>
          </div>
          <div class="gram-armadilha-col gram-arm-certa" onclick="App.pronunciar('${safeCerto}')" style="cursor:pointer" title="Clique para ouvir a forma correta">
            <span class="gram-arm-icon">✓</span>
            <div class="gram-arm-texto">
              <span class="gram-arm-lbl">Certo 🔊</span>
              <strong>${this._formatarPergunta(a.certo)}</strong>
            </div>
          </div>
          <div class="gram-armadilha-motivo">
            <strong>Por quê?</strong> ${this._formatarPergunta(motivo)}
          </div>
        </div>`;
    }
    return `
      <div class="gram-camada-bloco">
        <div class="gram-camada-label">⚠️ Fase 5: Evitar Armadilhas Comuns</div>
        <div style="padding: 0.85rem 1.25rem 0.4rem; font-size: 0.9rem; color: #666; line-height: 1.5;">Erros comuns de quem está aprendendo e como evitá-los:</div>
        <div class="gram-armadilhas-lista">${cards}</div>
      </div>`;
  },

  // ── Painel de consulta rápida acima dos exercícios ──
  _htmlTabelaVisual(u) {
    if (!u.tabela_visual && !u.tecnica) return '';
    return `<details class="gram-tabela-visual">
      <summary>📋 Consulta Rápida da Regra (clique se precisar lembrar durante os exercícios)</summary>
      <div class="gram-tabela-conteudo">
        ${u.tabela_visual || ''}
        ${u.tecnica ? `<div style="margin-top:0.85rem;padding-top:0.85rem;border-top:1px dashed #d9cbb8">${this._formatarTeoria(u.tecnica)}</div>` : ''}
      </div>
    </details>`;
  },

  // ── Camadas Estruturais NMA ──
  _htmlAlerta(u) {
    if (!u.alerta) return '';
    return `<div class="gram-alerta">💬 ${this._formatarPergunta(u.alerta)}</div>`;
  },

  _htmlInventario(u) {
    if (!u.inventario || !u.inventario.length) return '';
    const items = u.inventario.map(i => `<li>${this._formatarPergunta(i)}</li>`).join('');
    return `<div class="gram-camada-bloco"><div class="gram-camada-label">✅ O que você vai aprender</div><ol class="gram-inventario">${items}</ol></div>`;
  },

  _htmlDefinicao(u) {
    if (!u.definicao) return '';
    const d = u.definicao;
    if (!d.fenomeno && !d.causa && !d.conceito) return '';
    return `<div class="gram-camada-bloco">
      <div class="gram-camada-label">🔍 Observar e entender</div>
      <div class="gram-definicao-row">
        ${d.fenomeno ? `<div class="gram-def-card gram-def-fenomeno"><div class="gram-def-label">Veja</div><div class="gram-def-corpo">${this._formatarPergunta(d.fenomeno)}</div></div>` : ''}
        ${d.causa    ? `<div class="gram-def-card gram-def-causa"><div class="gram-def-label">Pense</div><div class="gram-def-corpo">${this._formatarPergunta(d.causa)}</div></div>` : ''}
        ${d.conceito ? `<div class="gram-def-card gram-def-conceito"><div class="gram-def-label">Entenda</div><div class="gram-def-corpo">${this._formatarPergunta(d.conceito)}</div></div>` : ''}
      </div>
    </div>`;
  },

  _htmlTecnica(u) {
    if (!u.tecnica) return '';
    const ft = this._formatarTeoria(u.tecnica);
    return `<div class="gram-camada-bloco gram-tecnica"><div class="gram-camada-label">📌 Como usar na prática</div><div class="gram-tecnica-corpo">${ft}</div></div>`;
  },

  _htmlPonte(u) {
    if (!u.ponte) return '';
    return `<div class="gram-camada-bloco gram-ponte"><div class="gram-camada-label">🇵🇹 Em português é assim… em inglês é assim:</div><div class="gram-ponte-corpo">${this._formatarTeoria(u.ponte)}</div></div>`;
  },

  _htmlCoda(u) {
    if (!u.coda) return '';
    return `<div class="gram-coda">💡 ${this._formatarPergunta(u.coda)}</div>`;
  }
};

window.Grammatica = Grammatica;
window.Grammar = Grammatica;

if (typeof document !== 'undefined') {
  const initGrammar = () => {
    const sec = document.getElementById('sec-grammar') || document.getElementById('sec-grammatica');
    const c = document.getElementById('gram-niveis-container') || document.getElementById('grammar-container');
    if (sec && (sec.classList?.contains?.('active') || window?.location?.hash?.includes('gramm')) && c) {
      Grammatica.renderizarSeletor();
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGrammar);
  } else {
    initGrammar();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Grammatica;
}
