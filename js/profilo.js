// ============================================================
// profilo.js — Student profile + weekly report
// ============================================================

const Profilo = {

  // ── Render full profile page ───────────────────────────────
  renderizar() {
    const container = document.getElementById('profilo-container');
    if (!container) return;

    const p  = App.estado.progresso  || {};
    const fd = App.estado.flashcardData || {};

    // ── Compute stats ──────────────────────────────────────
    let totalRevisoes = 0, totalAgain = 0, totalHard = 0, totalGood = 0, totalEasy = 0;
    let totalDominadas = 0, totalDificeis = 0, tempoEstimadoMin = 0;
    const categorias = {};

    for (const id in fd) {
      const sm = fd[id];
      const reps = sm.reps || sm.repeticoes || 0;
      totalRevisoes += reps;
      totalAgain += sm.erros || 0;
      // Approximate good/easy from reps (no exact breakdown stored)
      if ((sm.reps >= 3) || (sm.repeticoes >= 3) || (sm.stability > 7)) totalDominadas++;
      if ((sm.erros || 0) >= 3) totalDificeis++;
      // Category from vocab cache
      const palavra = (App.estado.vocabCache || []).find(w => w.id === id);
      if (palavra && palavra.categoria) {
        categorias[palavra.categoria] = (categorias[palavra.categoria] || 0) + reps;
      }
    }
    // ~8s per card average
    tempoEstimadoMin = Math.round(totalRevisoes * 8 / 60);

    // Use stored data_inicio; fall back to ultimo_estudo (approximate).
    // Never fall back to Date.now() — that would show today for old saves.
    const dataInicio = (p.data_inicio || p.ultimo_estudo)
      ? new Date(p.data_inicio || p.ultimo_estudo).toLocaleDateString('pt-BR')
      : '—';

    // Sort categories by usage
    const topCats = Object.entries(categorias)
      .sort((a,b) => b[1] - a[1])
      .slice(0, 5)
      .map(([cat, n]) => `${cat} (${n})`).join(', ') || '—';

    // ── Weekly report data ─────────────────────────────────
    const semana = this._dadosSemana();

    // ── Quiz history stats ─────────────────────────────────
    let quizAcuracia = '—';
    try {
      const hist = JSON.parse(localStorage.getItem('en_quiz_historico') || '[]');
      if (hist.length > 0) {
        const media = hist.reduce((s, h) => s + (h.pontuacao || 0), 0) / hist.length;
        quizAcuracia = Math.round(media) + '%';
      }
    } catch(e) {}

    // ── Build HTML ─────────────────────────────────────────
    container.innerHTML = `
      <!-- Stats grid -->
      <div class="profilo-grid">

        <!-- General stats -->
        <div class="profilo-card">
          <div class="profilo-card-titulo">${I18n.t('prof_stats_gerais')}</div>
          ${this._row(I18n.t('prof_nivel_atual'), `${p.nivel || 1}`)}
          ${this._row(I18n.t('prof_xp_total'), `${(p.xp || 0).toLocaleString()} XP`)}
          ${this._row(I18n.t('prof_sequencia_atual'), `${p.streak || 0} 🔥 days`)}
          ${this._row(I18n.t('prof_fc_revisados'), `${totalRevisoes.toLocaleString()}`)}
          ${this._row(I18n.t('prof_palavras_dom'), `${totalDominadas}`)}
          ${this._row(I18n.t('prof_palavras_dif'), totalDificeis > 0 ? `<span style="color:#C0392B">⚠️ ${totalDificeis}</span>` : '0')}
          ${this._row(I18n.t('prof_tempo_estimado'), `${tempoEstimadoMin} min`)}
          ${this._row(I18n.t('prof_templos_desbloq'), `${(p.templos_desbloqueados||[]).length} / 50`)}
          ${this._row(I18n.t('prof_precisao_quiz'), quizAcuracia)}
        </div>

        <!-- Weekly report -->
        <div class="profilo-card">
          <div class="profilo-card-titulo">${I18n.t('prof_esta_semana')}</div>
          ${this._renderGrafico(semana)}
          ${this._row(I18n.t('prof_sessoes'), `${semana.totalSessoes}`)}
          ${this._row(I18n.t('prof_cards_estudados'), `${semana.totalCards}`)}
          ${this._row(I18n.t('prof_xp_ganho'), `${semana.totalXP} XP`)}
          ${this._row(I18n.t('prof_dias_ativos'), `${semana.giorniAttivi} / 7`)}
        </div>

        <!-- Categories -->
        <div class="profilo-card">
          <div class="profilo-card-titulo">${I18n.t('prof_categorias')}</div>
          <div style="font-size:0.87rem;color:#666;line-height:1.8;">${topCats}</div>
        </div>

        <!-- Conquistas -->
        <div class="profilo-card">
          <div class="profilo-card-titulo">${I18n.t('prof_conquistas')}</div>
          ${typeof Conquistas !== 'undefined' ? Conquistas.renderizarPainelCompleto() : ''}
        </div>

        <!-- Lembretes push — só renderiza se o módulo estiver carregado e a API disponível -->
        ${(typeof Notificacoes !== 'undefined' && 'Notification' in window)
          ? `<div class="profilo-card" style="margin-top:0">${Notificacoes.renderizarCard()}</div>`
          : ''}

        <div class="profilo-card" style="margin-top:1.5rem">
          <div class="profilo-card-titulo" data-i18n="prof_audio_speed">${I18n.t('prof_audio_speed') || 'Audio Speed'}</div>
          <div style="display:flex; align-items:center; gap:1rem; margin-top:1rem;">
            <span style="font-size:1.5rem">🐢</span>
            <input type="range" min="0.5" max="1.5" step="0.05" id="audio-speed-slider" value="${localStorage.getItem('en_audio_speed') || '0.85'}" oninput="document.getElementById('audio-speed-val').innerText = this.value + 'x'" onchange="Profilo.salvarAudioSpeed(this.value)" style="flex:1;">
            <span style="font-size:1.5rem">🐇</span>
          </div>
          <div style="text-align:center; font-weight:bold; color:var(--cor-brand);" id="audio-speed-val">${localStorage.getItem('en_audio_speed') || '0.85'}x</div>
          <div style="text-align:center; margin-top:1rem;">
            <button class="btn-secondario" onclick="App.pronunciar('The quick brown fox jumps over the lazy dog')" data-i18n="prof_test_audio">${I18n.t('prof_test_audio') || '🔊 Test Audio'}</button>
          </div>
        </div>

        <div class="profilo-card" style="margin-top:1.5rem">
          <div class="profilo-card-titulo" data-i18n="prof_gestao_dati">${I18n.t('prof_gestao_dati')}</div>
          <p style="font-size:0.85rem; color:#666; margin-bottom:1rem;" data-i18n="prof_backup_desc">${I18n.t('prof_backup_desc')}</p>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-secondario" onclick="Profilo.exportarDados()" data-i18n="prof_exp_backup">${I18n.t('prof_exp_backup')}</button>
            <button class="btn-secondario" onclick="document.getElementById('backup-input').click()" data-i18n="prof_imp_backup">${I18n.t('prof_imp_backup')}</button>
            <button style="margin-left:auto; background:#E74C3C; color:white; border:none; padding:0.4rem 1rem; border-radius:12px; cursor:pointer; font-weight:600;" onclick="Profilo.resetProgresso()" data-i18n="prof_azzera">${I18n.t('prof_azzera')}</button>
          </div>
          <!-- Tour -->
          <div style="border-top:1px solid #f0e8d8;padding-top:0.8rem;margin-top:0.8rem">
            <button class="btn-secondario" style="width:100%;font-size:0.85rem" onclick="App.navegar('templi');setTimeout(()=>Tour.reiniciar(),200)">
              ${I18n.t('prof_reiniciar_tour')}
            </button>
          </div>
          <!-- Conteúdo Criado por Mim -->
          <div style="border-top:1px solid #f0e8d8;padding-top:0.8rem;margin-top:0.8rem">
            <div style="font-size:0.78rem;font-weight:700;color:#9B2335;margin-bottom:0.3rem">${I18n.t('prof_conteudo_criado')}</div>
            <div style="font-size:0.75rem;color:#888;margin-bottom:0.5rem">
              ${I18n.idioma==='it'
                ? 'Canzoni, dialoghi, storie, imitazioni e vocabolario aggiunti manualmente o via IA.'
                : 'Songs, dialogues, stories, listen phrases, and vocabulary added manually or via AI.'}
            </div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
              <button class="btn-secondario" onclick="Profilo.exportarConteudoCustom()" style="font-size:0.82rem">
                ${I18n.t('prof_export_content')}
              </button>
              <button class="btn-secondario" onclick="document.getElementById('custom-input').click()" style="font-size:0.82rem">
                ${I18n.t('prof_import_content')}
              </button>
            </div>
          </div>
        </div>

      </div>`;

    // Render conquistas badges
    if (typeof Conquistas !== 'undefined') {
      Conquistas.renderizarPainel('profilo-conquistas');
    }
  },

  // ── Build last-7-days chart data ──────────────────────────
  _dadosSemana() {
    const diario = (() => {
      try { return JSON.parse(localStorage.getItem('en_diario') || '{}'); }
      catch(e) { return {}; }
    })();

    const hoje = new Date();
    const dias = [];
    let totalCards = 0, totalSessoes = 0, totalXP = 0, giorniAttivi = 0;

    for (let i = 6; i >= 0; i--) {
      const d = new Date(hoje);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      // _lerEntrada handles both legacy number format and new {cards,xp} format
      const entry = (typeof Calor !== 'undefined')
        ? Calor._lerEntrada(diario[key])
        : { cards: (typeof diario[key] === 'number' ? diario[key] : (diario[key] || {}).cards || 0), xp: (diario[key] || {}).xp || 0 };
      const cards   = entry.cards;
      const xpDia   = entry.xp;
      const sessoes = cards > 0 ? 1 : 0;
      dias.push({ dia: d.toLocaleDateString('pt-BR', { weekday:'short' }).slice(0,3), cards, xp: xpDia, sessoes });
      totalCards   += cards;
      totalSessoes += sessoes;
      totalXP      += xpDia;
      if (cards > 0) giorniAttivi++;
    }

    // Add quiz XP from it_quiz_historico (not stored in diário)
    try {
      const hist = JSON.parse(localStorage.getItem('en_quiz_historico') || '[]');
      const semanaAtras = Date.now() - 7 * 86400000;
      totalXP += hist.filter(h => h.data >= semanaAtras).reduce((s, h) => s + (h.xp_ganho || 0), 0);
    } catch(e) {}

    return { dias, totalCards, totalSessoes, totalXP, giorniAttivi };
  },

  // ── Render bar chart ──────────────────────────────────────
  _renderGrafico(semana) {
    const max = Math.max(1, ...semana.dias.map(d => d.cards));
    const bars = semana.dias.map(d => {
      const h = Math.round((d.cards / max) * 68);
      return `
        <div class="chart-bar-wrap">
          <div class="chart-val">${d.cards || ''}</div>
          <div class="chart-bar" style="height:${h}px"></div>
          <div class="chart-day">${d.dia}</div>
        </div>`;
    }).join('');
    return `<div class="relatorio-chart">${bars}</div>`;
  },

  // ── Exportar backup ───────────────────────────────────────
  exportarDados() {
    const backup = {
      versao: 2,
      data: new Date().toISOString(),
      progresso:         JSON.parse(localStorage.getItem('en_progresso')        || 'null'),
      flashcards:        JSON.parse(localStorage.getItem('en_flashcards')       || '{}'),
      diario:            JSON.parse(localStorage.getItem('en_diario')           || '{}'),
      onboarding:        localStorage.getItem('en_onboarding_done'),
      tema:              localStorage.getItem('en_tema'),
      idioma:            localStorage.getItem('en_idioma') || 'pt',
      // conteúdo customizado
      canzoni_custom:    JSON.parse(localStorage.getItem('en_canzoni_custom')   || '[]'),
      dialoghi_custom:   JSON.parse(localStorage.getItem('en_dialoghi_custom')  || '[]'),
      storie_custom:     JSON.parse(localStorage.getItem('en_storie_custom')    || '[]'),
      imitazioni_custom: JSON.parse(localStorage.getItem('en_imitazioni_custom')|| '[]'),
      vocab_custom:      JSON.parse(localStorage.getItem('en_vocab_custom')     || '[]'),
      // preferências de ocultação
      canzoni_ocultas:   JSON.parse(localStorage.getItem('en_canzoni_ocultas')  || '[]'),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `italiano_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.notificar('notif_backup_exp', 'sucesso');
  },

  // ── Importar backup ───────────────────────────────────────
  importarDados(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (!backup.versao || !backup.progresso || typeof backup.progresso !== 'object') throw new Error(I18n.t('prof_erro_formato'));
        // A2: validate array fields before writing to avoid type corruption
        const isArr = (v) => Array.isArray(v);
        if (!confirm(I18n.t('prof_confirm_importar'))) return;
        try {
          if (backup.progresso)         localStorage.setItem('en_progresso',         JSON.stringify(backup.progresso));
          if (backup.flashcards)        localStorage.setItem('en_flashcards',        JSON.stringify(backup.flashcards));
          if (backup.diario)            localStorage.setItem('en_diario',            JSON.stringify(backup.diario));
          if (backup.onboarding)        localStorage.setItem('en_onboarding_done',   String(backup.onboarding));
          if (backup.tema)              localStorage.setItem('en_tema',              String(backup.tema));
          if (backup.idioma)            localStorage.setItem('en_idioma',            String(backup.idioma));
          if (isArr(backup.canzoni_custom)    && backup.canzoni_custom.length)    localStorage.setItem('en_canzoni_custom',    JSON.stringify(backup.canzoni_custom));
          if (isArr(backup.dialoghi_custom)   && backup.dialoghi_custom.length)   localStorage.setItem('en_dialoghi_custom',   JSON.stringify(backup.dialoghi_custom));
          if (isArr(backup.storie_custom)     && backup.storie_custom.length)     localStorage.setItem('en_storie_custom',     JSON.stringify(backup.storie_custom));
          if (isArr(backup.imitazioni_custom) && backup.imitazioni_custom.length) localStorage.setItem('en_imitazioni_custom', JSON.stringify(backup.imitazioni_custom));
          if (isArr(backup.vocab_custom)      && backup.vocab_custom.length)      localStorage.setItem('en_vocab_custom',      JSON.stringify(backup.vocab_custom));
          if (isArr(backup.canzoni_ocultas)   && backup.canzoni_ocultas.length)   localStorage.setItem('en_canzoni_ocultas',   JSON.stringify(backup.canzoni_ocultas));
        } catch (quotaErr) {
          throw new Error('Storage quota exceeded. Free up space and try again.');
        }
        App.notificar('notif_backup_imp', 'sucesso');
        setTimeout(() => location.reload(), 1200);
      } catch(err) {
        App.notificar(I18n.t('notif_arquivo_inv') + err.message, 'erro');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // reset input
  },

  // ── Reset total de progresso ──────────────────────────────
  resetProgresso() {
    if (!confirm(I18n.t('prof_confirm_apagar1'))) return;
    if (!confirm(I18n.t('prof_confirm_apagar2'))) return;
    ['en_progresso','en_flashcards','en_diario','en_onboarding_done','en_palavra_dia',
     'en_canzoni_custom','en_dialoghi_custom','en_storie_custom','en_imitazioni_custom',
     'en_vocab_custom','en_canzoni_ocultas',
     'en_audio_speed','en_idioma','en_tema','en_quiz_historico'].forEach(k => localStorage.removeItem(k));
    App.notificar('notif_prog_reset', 'alerta');
    setTimeout(() => location.reload(), 1200);
  },

  // ── Exportar/Importar Apenas Conteúdo Custom ──────────────
  exportarConteudoCustom() {
    const canzoni    = JSON.parse(localStorage.getItem('en_canzoni_custom')    || '[]');
    const dialoghi   = JSON.parse(localStorage.getItem('en_dialoghi_custom')   || '[]');
    const storie     = JSON.parse(localStorage.getItem('en_storie_custom')     || '[]');
    const imitazioni = JSON.parse(localStorage.getItem('en_imitazioni_custom') || '[]');
    const vocab      = JSON.parse(localStorage.getItem('en_vocab_custom')      || '[]');
    const backup = {
      versao: 2,
      tipo: 'conteudo_custom',
      data: new Date().toISOString(),
      canzoni, dialoghi, storie, imitazioni, vocab
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `italiano_conteudo_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    const total = canzoni.length + dialoghi.length + storie.length + imitazioni.length + vocab.length;
    App.notificar(`✅ ${total} item(ns) exportado(s)`, 'sucesso');
  },

  importarConteudoCustom(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (backup.tipo !== 'conteudo_custom') throw new Error('Arquivo inválido (deve ser conteúdo custom)');

        // Contagens para confirmação
        const nc = backup.canzoni?.length||0, nd = backup.dialoghi?.length||0,
              ns = backup.storie?.length||0,  ni = backup.imitazioni?.length||0,
              nv = backup.vocab?.length||0;
        if (!confirm(I18n.t('prof_importar_conteudo').replace('{nc}',nc).replace('{nd}',nd).replace('{ns}',ns).replace('{ni}',ni).replace('{nv}',nv))) return;

        // Merge por chave (não sobrescreve itens existentes)
        const _merge = (lsKey, novos) => {
          if (!novos?.length) return;
          const exist = JSON.parse(localStorage.getItem(lsKey) || '[]');
          const ids = new Set(exist.map(x => x.id));
          localStorage.setItem(lsKey, JSON.stringify([...exist, ...novos.filter(x => !ids.has(x.id))]));
        };
        _merge('en_canzoni_custom',    backup.canzoni);
        _merge('en_dialoghi_custom',   backup.dialoghi);
        _merge('en_storie_custom',     backup.storie);
        _merge('en_imitazioni_custom', backup.imitazioni);
        _merge('en_vocab_custom',      backup.vocab);

        App.notificar(`✅ Conteúdo importado com sucesso!`, 'sucesso');
        setTimeout(() => location.reload(), 1200);
      } catch(err) {
        App.notificar(I18n.t('notif_arquivo_inv') + err.message, 'erro');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  },

  // ── Salvar Velocidade do Áudio ────────────────────────────
  salvarAudioSpeed(val) {
    localStorage.setItem('en_audio_speed', val);
    if (typeof App !== 'undefined') App.atualizarAudioSpeedUI();
  },

  // ── Helper: stat row ──────────────────────────────────────
  _row(label, val) {
    return `<div class="profilo-stat-row">
      <span class="profilo-stat-label">${label}</span>
      <span class="profilo-stat-val">${val}</span>
    </div>`;
  }
};
