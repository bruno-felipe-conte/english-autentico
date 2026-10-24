// ============================================================
// profilo.js — Student profile + weekly report
// ============================================================

const Profile = {

  // ── Render full profile page ───────────────────────────────
  render() {
    const container = document.getElementById('profile-container') || document.getElementById('profilo-container');
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
      const hist = JSON.parse(localStorage.getItem('en_quiz_history') || '[]');
      if (hist.length > 0) {
        const media = hist.reduce((s, h) => s + (h.pontuacao || 0), 0) / hist.length;
        quizAcuracia = Math.round(media) + '%';
      }
    } catch(e) {}

    // ── Build HTML ─────────────────────────────────────────
    const currentSpeed = (p.audio_rate !== undefined) ? p.audio_rate : 0.85;

    container.innerHTML = `
      <!-- Stats grid -->
      <div class="profile-grid profilo-grid">

        <!-- General stats -->
        <div class="profile-card profilo-card">
          <div class="profile-card-title profilo-card-titulo">${I18n.t('prof_stats_gerais')}</div>
          ${this._row(I18n.t('prof_nivel_atual'), `${p.nivel || 1}`)}
          ${this._row(I18n.t('prof_xp_total'), `${(p.xp || 0).toLocaleString()} XP`)}
          ${this._row(I18n.t('prof_streak_atual'), `${p.streak || 0} 🔥 ${I18n.t('hm_dias')}`)}
          ${this._row(I18n.t('prof_fc_revisadas'), `${totalRevisoes.toLocaleString()}`)}
          ${this._row(I18n.t('prof_palavras_dom'), `${totalDominadas}`)}
          ${this._row(I18n.t('prof_palavras_dif'), totalDificeis > 0 ? `<span style="color:#C0392B">⚠️ ${totalDificeis}</span>` : '0')}
          ${this._row(I18n.t('prof_tempo_est'), `${tempoEstimadoMin} min`)}
          ${this._row(I18n.t('prof_templos_desb'), `${(p.templos_desbloqueados||[]).length} / 50`)}
          ${this._row(I18n.t('prof_acc_quiz'), quizAcuracia)}
        </div>

        <!-- Weekly report -->
        <div class="profile-card profilo-card">
          <div class="profile-card-title profilo-card-titulo">${I18n.t('prof_esta_semana')}</div>
          ${this._renderGrafico(semana)}
          ${this._row(I18n.t('prof_tot_sessoes'), `${semana.totalSessoes}`)}
          ${this._row(I18n.t('prof_cards_est'), `${semana.totalCards}`)}
          ${this._row(I18n.t('prof_xp_ganho'), `${semana.totalXP} XP`)}
          ${this._row(I18n.t('prof_dias_ativos'), `${semana.giorniAttivi} / 7`)}
        </div>

        <!-- English Audio & Voice Settings -->
        <div class="profile-card profilo-card">
          <div class="profile-card-title profilo-card-titulo">🎧 ${I18n.t('prof_velocidade_audio') || 'Audio & Voice Settings'}</div>
          
          <div style="margin-bottom: 1rem;">
            <label style="font-size: 0.85rem; font-weight: 700; color: var(--cor-inchiostro); display: block; margin-bottom: 0.35rem;">
              🗣️ English Voice (Synthesizer)
            </label>
            <select id="select-english-voice" onchange="Profile.savePreferredVoice(this.value)" style="width: 100%; padding: 0.55rem 0.8rem; border-radius: 8px; border: 1.5px solid #dcd3c5; font-family: inherit; font-size: 0.9rem; background: var(--cor-pergamena, #fbf7ee); color: var(--cor-inchiostro);">
              ${Profile.renderVoiceOptions ? Profile.renderVoiceOptions() : '<option value="">System Default</option>'}
            </select>
            <div style="font-size: 0.75rem; color: #7f6e5d; margin-top: 0.3rem;">
              ✨ <em>Natural/Online/Neural</em> voices provide authentic human pronunciation.
            </div>

            <!-- Banner Voz Neural Offline WebAssembly -->
            <div id="card-voz-neural-status" style="margin-top:0.75rem;padding:0.75rem;border-radius:8px;background:rgba(212,168,67,0.12);border:1px solid rgba(212,168,67,0.3)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem">
                <span style="font-size:0.82rem;font-weight:700;color:#5c3a18">🎙️ Voz Neural Offline (WASM)</span>
                <span id="badge-voz-neural" style="font-size:0.7rem;font-weight:700;padding:0.15rem 0.45rem;border-radius:999px;background:${(typeof VoiceEngine !== 'undefined' && VoiceEngine.statusVozNeural().instalada) ? '#2A9D8F' : '#888'};color:#fff">
                  ${(typeof VoiceEngine !== 'undefined' && VoiceEngine.statusVozNeural().instalada) ? 'Ativa' : 'Disponível'}
                </span>
              </div>
              <div style="font-size:0.75rem;color:#7a6245;line-height:1.4;margin-bottom:0.5rem">
                Sintetiza áudios com qualidade neural direto no seu aparelho, sem servidores e sem internet.
              </div>
              <div id="progresso-voz-neural-wrap" style="display:none;margin-bottom:0.5rem">
                <div style="height:6px;width:100%;background:#e0d6c4;border-radius:3px;overflow:hidden">
                  <div id="barra-voz-neural" style="height:100%;width:0%;background:#2A9D8F;transition:width 0.2s"></div>
                </div>
                <div id="texto-progresso-voz" style="font-size:0.7rem;color:#666;text-align:right;margin-top:2px">0%</div>
              </div>
              <div style="display:flex;gap:0.4rem;flex-wrap:wrap">
                <button type="button" id="btn-gerenciar-voz-neural" class="btn-secondario" onclick="Profile.gerenciarVozNeural()" style="font-size:0.76rem;padding:0.3rem 0.6rem">
                  ${(typeof VoiceEngine !== 'undefined' && VoiceEngine.statusVozNeural().instalada) ? '🔄 Reinstalar Voz' : '⬇️ Baixar Pacote (~28 MB)'}
                </button>
                <button type="button" class="btn-secondario" onclick="Profile.limparCacheAudio()" style="font-size:0.76rem;padding:0.3rem 0.6rem">
                  🗑️ Limpar Cache Áudio
                </button>
              </div>
            </div>
          </div>

          <label style="font-size: 0.85rem; font-weight: 700; color: var(--cor-inchiostro); display: block; margin-bottom: 0.2rem;">
            ⚡ Velocidade de Reprodução
          </label>
          <div style="display:flex; align-items:center; gap:10px; margin-top:5px;">
            <span style="font-size:1.5rem">🐢</span>
            <input type="range" id="audio-speed-slider" min="0.5" max="1.5" step="0.05" value="${currentSpeed}" 
                   onchange="Profile.saveAudioSpeed(this.value)" oninput="document.getElementById('audio-speed-display').textContent = this.value + 'x'" style="flex:1;">
            <span style="font-size:1.5rem">🐇</span>
          </div>
          <div style="text-align:center; margin-top:5px; font-weight:bold; color: #1A365D;" id="audio-speed-display">${currentSpeed}x</div>
          
          <button class="btn-secondario" onclick="App.speak('Hello! This is a test of the English voice.')" style="margin-top:12px; width:100%;">
            🔊 ${I18n.t('prof_testar_audio') || 'Test Audio'}
          </button>
        </div>

        <!-- Categories -->
        <div class="profilo-card">
          <div class="profilo-card-titulo">${I18n.t('prof_cats_est')}</div>
          <div style="font-size:0.87rem;color:#666;line-height:1.8;">${topCats}</div>
        </div>

                <!-- Conquistas -->
        <div class="profilo-card">
          <div class="profilo-card-titulo">${I18n.t('prof_traguardi')}</div>
          ${typeof Conquistas !== 'undefined' ? Conquistas.renderizarPainelCompleto() : ''}
        </div>

        <!-- Lembretes push — só renderiza se o módulo estiver carregado e a API disponível -->
        ${(typeof Notificacoes !== 'undefined' && 'Notification' in window)
          ? `<div class="profilo-card" style="margin-top:0">${Notificacoes.renderizarCard()}</div>`
          : ''}

        <div class="profilo-card" style="margin-top:1.5rem">
          <div class="profilo-card-titulo">${I18n.t('prof_gestao_dati')}</div>
          <p style="font-size:0.85rem; color:#666; margin-bottom:1rem;">${I18n.t('prof_backup_desc')}</p>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn-secondario" onclick="Profile.exportBackup()">${I18n.t('prof_exp_backup')}</button>
            <button class="btn-secondario" onclick="document.getElementById('backup-input').click()">${I18n.t('prof_imp_backup')}</button>
            <button style="margin-left:auto; background:#E74C3C; color:white; border:none; padding:0.4rem 1rem; border-radius:12px; cursor:pointer; font-weight:600;" onclick="Profile.resetProgress()">${I18n.t('prof_azzera')}</button>
          </div>
          <!-- Tour -->
          <div style="border-top:1px solid #f0e8d8;padding-top:0.8rem;margin-top:0.8rem">
            <button class="btn-secondario" style="width:100%;font-size:0.85rem" onclick="App.navegar('temples');setTimeout(()=>Tour.reiniciar(),200)">
              🗺️ Ver tour introdutório novamente
            </button>
          </div>
          <!-- Conteúdo Criado por Mim -->
          <div style="border-top:1px solid #f0e8d8;padding-top:0.8rem;margin-top:0.8rem">
            <div style="font-size:0.78rem;font-weight:700;color:#1A365D;margin-bottom:0.3rem">${I18n.t('prof_conteudo_criado')}</div>
            <div style="font-size:0.75rem;color:#888;margin-bottom:0.5rem">
              ${I18n.idioma==='en'
                ? 'Songs, dialogues, stories, pronunciation, and vocabulary added manually or via AI.'
                : 'Músicas, diálogos, histórias, imitações e vocabulário adicionados manualmente ou via IA.'}
            </div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
              <button class="btn-secondario" onclick="Profile.exportCustomContent()" style="font-size:0.82rem">
                ⬇️ ${I18n.idioma==='en' ? 'Export Content' : 'Exportar Conteúdo'}
              </button>
              <button class="btn-secondario" onclick="document.getElementById('custom-input').click()" style="font-size:0.82rem">
                ⬆️ ${I18n.idioma==='en' ? 'Import Content' : 'Importar Conteúdo'}
              </button>
            </div>
          </div>
        </div>

      </div>`;

    // Render conquistas badges
    if (typeof Conquistas !== 'undefined') {
      Conquistas.renderizarPainel('profilo-conquistas');
    }
    this.updateVoiceSelect();
  },

  // ── Salvar Audio Speed ────────────────────────────────────
  saveAudioSpeed(valor) {
    if (typeof App === 'undefined') return;
    const p = App.estado.progresso;
    if (!p) return;
    p.audio_rate = parseFloat(valor);
    App.salvarProgresso();
    if (typeof App.atualizarAudioSpeedUI === 'function') App.atualizarAudioSpeedUI();
    const display = document.getElementById('audio-speed-display');
    if (display) display.textContent = valor + 'x';
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
      const key = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
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

    // Add quiz XP from en_quiz_history (not stored in diário)
    try {
      const hist = JSON.parse(localStorage.getItem('en_quiz_history') || '[]');
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

  // ── Seletor de Vozes Italianas (VoiceEngine) ───────────
  renderVoiceOptions() {
    const selecionada = localStorage.getItem('en_preferred_voice') || 'auto';
    const autoOpcao = `<option value="auto" ${(selecionada === 'auto' || selecionada === 'wasm_neural') ? 'selected' : ''}>⭐ Melhor Voz Humana do Dispositivo (Recomendado)</option>`;

    if (typeof VoiceEngine === 'undefined') {
      return autoOpcao + '<option value="">Padrão do Sistema</option>';
    }

    const vozes = VoiceEngine.getBestEnglishVoices();
    if (!vozes.length) {
      return autoOpcao + '<option value="">Padrão do Navegador (it-IT)</option>';
    }

    const opcoesNativas = vozes.map(v => {
      const isSel = (v.name === selecionada) ? 'selected' : '';
      let badge = '';
      const nomeLower = v.name.toLowerCase();
      if (nomeLower.includes('natural') || nomeLower.includes('online') || nomeLower.includes('neural')) {
        badge = ' ✨ Neural';
      } else if (nomeLower.includes('premium') || nomeLower.includes('enhanced')) {
        badge = ' 💎 Premium';
      } else if (nomeLower.includes('google')) {
        badge = ' 🌐 Google';
      }
      return `<option value="${v.name}" ${isSel}>${v.name}${badge} (${v.lang})</option>`;
    }).join('');

    return autoOpcao + opcoesNativas;
  },

  gerenciarVozNeural() {
    if (typeof VoiceEngine === 'undefined') return;

    const wrapProgresso = document.getElementById('progresso-voz-neural-wrap');
    const barra = document.getElementById('barra-voz-neural');
    const textoProgresso = document.getElementById('texto-progresso-voz');
    const badge = document.getElementById('badge-voz-neural');
    const btnAcao = document.getElementById('btn-gerenciar-voz-neural');

    if (wrapProgresso) wrapProgresso.style.display = 'block';
    if (barra) barra.style.width = '0%';
    if (textoProgresso) textoProgresso.textContent = 'Iniciando download...';
    if (btnAcao) btnAcao.disabled = true;

    const jaInstalada = VoiceEngine.statusVozNeural().instalada;

    VoiceEngine.baixarVozNeural(
      (percent) => {
        if (barra) barra.style.width = percent + '%';
        if (textoProgresso) textoProgresso.textContent = percent + '% baixado';
      },
      () => {
        if (wrapProgresso) wrapProgresso.style.display = 'none';
        if (btnAcao) {
          btnAcao.disabled = false;
          btnAcao.textContent = '🔄 Reinstalar Voz';
        }
        if (badge) {
          badge.textContent = 'Ativa';
          badge.style.background = '#2A9D8F';
        }
        localStorage.setItem('en_preferred_voice', 'wasm_neural');
        this.updateVoiceSelect();
        if (typeof App !== 'undefined') {
          App.notificar('🎙️ Voz Neural instalada e pronta!', 'sucesso');
          App.speak('Welcome! The neural voice is active and ready for reading.');
        }
      },
      (err) => {
        if (wrapProgresso) wrapProgresso.style.display = 'none';
        if (btnAcao) btnAcao.disabled = false;
        if (typeof App !== 'undefined') {
          App.notificar('❌ Erro no download da voz neural: ' + err, 'erro');
        }
      },
      jaInstalada
    );
  },

  async limparCacheAudio() {
    if (typeof AudioCache === 'undefined') return;
    const stats = await AudioCache.estatisticas();
    if (stats.itens === 0) {
      if (typeof App !== 'undefined') App.notificar('ℹ️ O cache de áudio já está vazio.', 'info');
      return;
    }
    const mb = (stats.bytes / (1024 * 1024)).toFixed(1);
    if (!confirm(`Deseja limpar ${stats.itens} arquivos de áudio em cache (~${mb} MB)?`)) return;

    await AudioCache.limpar();
    if (typeof App !== 'undefined') {
      App.notificar(`🧹 ${stats.itens} áudios removidos do cache local!`, 'sucesso');
    }
  },

  updateVoiceSelect() {
    const sel = document.getElementById('select-english-voice') || document.getElementById('select-voz-italiana');
    if (!sel || typeof this.renderVoiceOptions !== 'function') return;

    const html = this.renderVoiceOptions();
    if (html && html !== sel.innerHTML) {
      const valorAntes = sel.value;
      sel.innerHTML = html;
      if (valorAntes && sel.querySelector(`option[value="${valorAntes}"]`)) {
        sel.value = valorAntes;
      }
    }
  },

  savePreferredVoice(nome) {
    if (nome) {
      localStorage.setItem('en_preferred_voice', nome);
      if (nome === 'wasm_neural') {
        localStorage.setItem('en_use_neural_voice', 'true');
      } else {
        localStorage.setItem('en_use_neural_voice', 'false');
      }
      if (typeof VoiceEngine !== 'undefined') {
        VoiceEngine._cacheVozes = null;
      }
      if (typeof App !== 'undefined') {
        App._englishVoice = null;
        App._vozItaliana = null;
        App._englishVoiceResolved = false;
        App._vozItalianaResolvida = false;
        App.notificar('🗣️ Voz em inglês atualizada!', 'sucesso');
        App.speak('Great! This voice is ready.');
      }
    }
  },

  // ── Audio Speed ───────────────────────────────────────────
  saveAudioSpeed(valor) {
    localStorage.setItem('en_audio_speed', valor);
    if (typeof App !== 'undefined' && App.estado && App.estado.progresso) {
      App.estado.progresso.audio_rate = parseFloat(valor);
      App.salvarProgresso();
      if (typeof App.atualizarAudioSpeedUI === 'function') App.atualizarAudioSpeedUI();
    }
    const display = document.getElementById('audio-speed-display');
    if (display) display.textContent = valor + 'x';
  },

  // ── Exportar backup ───────────────────────────────────────
  exportBackup() {
    // Coleta todos os marcadores de página de livros
    const bookmarks = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('en_book_bookmark_')) {
        bookmarks[k] = localStorage.getItem(k);
      }
    }

    const backup = {
      versao: 4,
      data: new Date().toISOString(),
      progresso:         JSON.parse(localStorage.getItem('en_progress')        || 'null'),
      flashcards:        JSON.parse(localStorage.getItem('en_flashcards')       || '{}'),
      diario:            JSON.parse(localStorage.getItem('en_diario')           || '{}'),
      quiz_historico:    JSON.parse(localStorage.getItem('en_quiz_history')   || localStorage.getItem('en_quiz_historico') || '[]'),
      storie_lidas:      JSON.parse(localStorage.getItem('en_stories_read')     || '[]'),
      onboarding:        localStorage.getItem('en_onboarding_done'),
      tema:              localStorage.getItem('en_tema'),
      idioma:            localStorage.getItem('en_language') || localStorage.getItem('en_idioma') || 'pt',
      audio_speed:       localStorage.getItem('en_audio_speed') || '0.85',
      voz_preferida:     localStorage.getItem('en_preferred_voice') || localStorage.getItem('en_voz_preferida') || null,
      bookmarks:         bookmarks,
      // preferências essenciais v4
      som:                   localStorage.getItem('en_som'),
      sidebar_pinned:        localStorage.getItem('en_sidebar_pinned'),
      usar_voz_neural:       localStorage.getItem('en_usar_voz_neural'),
      voz_neural_instalada:  localStorage.getItem('en_voz_neural_instalada'),
      imersao_usada:         localStorage.getItem('en_immersion_used') || localStorage.getItem('en_imersao_usada'),
      palavra_dia:           localStorage.getItem('en_word_of_the_day') || localStorage.getItem('en_palavra_dia'),
      tour_done:             localStorage.getItem('en_tour_done') || localStorage.getItem('en_onboarding_done'),
      ultimo_aviso_backup:   localStorage.getItem('en_ultimo_aviso_backup') || localStorage.getItem('it_ultimo_aviso_backup'),
      energia:               localStorage.getItem('en_energia'),
      // streaks & SRS
      fc_streak:             localStorage.getItem('en_fc_streak'),
      fc_streak_date:        localStorage.getItem('en_fc_streak_date'),
      gram_streak:           localStorage.getItem('en_gram_streak'),
      gram_streak_date:      localStorage.getItem('en_gram_streak_date'),
      quiz_streak:           localStorage.getItem('en_quiz_streak'),
      quiz_streak_date:      localStorage.getItem('en_quiz_streak_date'),
      dialogues_completed:   JSON.parse(localStorage.getItem('en_dialogues_completed') || '[]'),
      quiz_erros:            JSON.parse(localStorage.getItem('en_quiz_erros') || '[]'),
      // conteúdo customizado
      canzoni_custom:    JSON.parse(localStorage.getItem('en_songs_custom')   || '[]'),
      dialoghi_custom:   JSON.parse(localStorage.getItem('en_dialogues_custom')  || '[]'),
      storie_custom:     JSON.parse(localStorage.getItem('en_stories_custom')    || '[]'),
      imitazioni_custom: JSON.parse(localStorage.getItem('en_pronunciation_custom')|| '[]'),
      vocab_custom:      JSON.parse(localStorage.getItem('en_vocab_custom')     || '[]'),
      // preferências de ocultação
      canzoni_ocultas:   JSON.parse(localStorage.getItem('en_songs_hidden')  || '[]'),
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `english_backup_${new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.notificar('notif_backup_exp', 'sucesso');
  },

  // ── Importar backup ───────────────────────────────────────
  _restaurarBackup(backup) {
    if (!backup.versao || !backup.progresso) throw new Error(I18n.t('prof_erro_formato'));

    if (backup.progresso)         localStorage.setItem('en_progress',         JSON.stringify(backup.progresso));
    if (backup.flashcards)        localStorage.setItem('en_flashcards',        JSON.stringify(backup.flashcards));
    if (backup.diario)            localStorage.setItem('en_diario',            JSON.stringify(backup.diario));
    if (backup.quiz_historico)    localStorage.setItem('en_quiz_history',    JSON.stringify(backup.quiz_historico));
    if (backup.storie_lidas)      localStorage.setItem('en_stories_read',      JSON.stringify(backup.storie_lidas));
    if (backup.onboarding)        localStorage.setItem('en_onboarding_done',   backup.onboarding);
    if (backup.tour_done)         localStorage.setItem('en_tour_done',         backup.tour_done);
    if (backup.tema)              localStorage.setItem('en_tema',              backup.tema);
    if (backup.idioma)            localStorage.setItem('en_language',          backup.idioma);
    if (backup.audio_speed)       localStorage.setItem('en_audio_speed',       backup.audio_speed);
    if (backup.voz_preferida)     localStorage.setItem('en_preferred_voice',   backup.voz_preferida);

    // Preferências v4 (top-level ou aninhadas em backup.preferencias)
    const prefs = backup.preferencias || {};
    const som = backup.som !== undefined ? backup.som : prefs.som;
    if (som !== undefined && som !== null) localStorage.setItem('en_som', String(som));

    const pinned = backup.sidebar_pinned !== undefined ? backup.sidebar_pinned : prefs.sidebar_pinned;
    if (pinned !== undefined && pinned !== null) localStorage.setItem('en_sidebar_pinned', String(pinned));

    const vozNeur = backup.usar_voz_neural !== undefined ? backup.usar_voz_neural : prefs.usar_voz_neural;
    if (vozNeur !== undefined && vozNeur !== null) localStorage.setItem('en_usar_voz_neural', String(vozNeur));

    const vozNeurInst = backup.voz_neural_instalada !== undefined ? backup.voz_neural_instalada : prefs.voz_neural_instalada;
    if (vozNeurInst !== undefined && vozNeurInst !== null) localStorage.setItem('en_voz_neural_instalada', String(vozNeurInst));

    const imersao = backup.imersao_usada || prefs.immersion_used || prefs.imersao_usada;
    if (imersao) localStorage.setItem('en_immersion_used', String(imersao));

    const palavra = backup.palavra_dia || prefs.word_of_the_day || prefs.palavra_dia;
    if (palavra) localStorage.setItem('en_word_of_the_day', String(palavra));

    const ultimoAviso = backup.ultimo_aviso_backup || prefs.ultimo_aviso_backup;
    if (ultimoAviso) localStorage.setItem('en_ultimo_aviso_backup', String(ultimoAviso));

    const energia = backup.energia !== undefined ? backup.energia : prefs.energia;
    if (energia !== undefined && energia !== null) localStorage.setItem('en_energia', String(energia));

    if (backup.fc_streak)         localStorage.setItem('en_fc_streak',         String(backup.fc_streak));
    if (backup.fc_streak_date)    localStorage.setItem('en_fc_streak_date',    String(backup.fc_streak_date));
    if (backup.gram_streak)       localStorage.setItem('en_gram_streak',       String(backup.gram_streak));
    if (backup.gram_streak_date)  localStorage.setItem('en_gram_streak_date',  String(backup.gram_streak_date));
    if (backup.quiz_streak)       localStorage.setItem('en_quiz_streak',       String(backup.quiz_streak));
    if (backup.quiz_streak_date)  localStorage.setItem('en_quiz_streak_date',  String(backup.quiz_streak_date));
    if (backup.dialogues_completed?.length) localStorage.setItem('en_dialogues_completed', JSON.stringify(backup.dialogues_completed));
    if (backup.quiz_erros?.length) localStorage.setItem('en_quiz_erros', JSON.stringify(backup.quiz_erros));

    if (backup.bookmarks && typeof backup.bookmarks === 'object') {
      for (const [k, v] of Object.entries(backup.bookmarks)) {
        if (k.startsWith('en_book_bookmark_')) localStorage.setItem(k, v);
      }
    }

    if (backup.canzoni_custom?.length)    localStorage.setItem('en_songs_custom',    JSON.stringify(backup.canzoni_custom));
    if (backup.dialoghi_custom?.length)   localStorage.setItem('en_dialogues_custom',   JSON.stringify(backup.dialoghi_custom));
    if (backup.storie_custom?.length)     localStorage.setItem('en_stories_custom',     JSON.stringify(backup.storie_custom));
    if (backup.imitazioni_custom?.length) localStorage.setItem('en_pronunciation_custom', JSON.stringify(backup.imitazioni_custom));
    if (backup.vocab_custom?.length)      localStorage.setItem('en_vocab_custom',      JSON.stringify(backup.vocab_custom));
    if (backup.canzoni_ocultas?.length)   localStorage.setItem('en_songs_hidden',   JSON.stringify(backup.canzoni_ocultas));

    if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
      App.notificar('notif_backup_imp', 'sucesso');
    }
    if (typeof window !== 'undefined' && window.location && typeof window.location.reload === 'function') {
      setTimeout(() => window.location.reload(), 1200);
    }
  },

  importBackup(event) {
    if (event && (event.versao || event.progresso)) {
      return this._restaurarBackup(event);
    }
    const file = event?.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);
        if (typeof confirm === 'function' && !confirm(I18n.t('prof_confirm_importar'))) return;
        this._restaurarBackup(backup);
      } catch(err) {
        if (typeof App !== 'undefined' && typeof App.notificar === 'function') {
          App.notificar(I18n.t('notif_arquivo_inv') + err.message, 'erro');
        }
      }
    };
    reader.readAsText(file);
    if (event?.target) event.target.value = '';
  },

  // ── Reset total de progresso ──────────────────────────────
  resetProgress() {
    if (!confirm(I18n.t('prof_confirm_apagar1'))) return;
    if (!confirm(I18n.t('prof_confirm_apagar2'))) return;
    
    // Remove chaves fixas do app
    const chavesFixas = [
      'en_progress', 'en_flashcards', 'en_diario', 'en_onboarding_done', 'en_word_of_the_day',
      'en_quiz_history', 'en_quiz_historico', 'en_stories_read', 'en_tour_done', 'en_audio_speed', 'en_preferred_voice',
      'en_songs_custom', 'en_dialogues_custom', 'en_stories_custom', 'en_pronunciation_custom',
      'en_vocab_custom', 'en_songs_hidden',
      'en_som', 'en_sidebar_pinned', 'en_usar_voz_neural', 'en_voz_neural_instalada',
      'en_immersion_used', 'en_imersao_usada', 'en_palavra_dia', 'en_ultimo_aviso_backup', 'it_ultimo_aviso_backup',
      'en_energia', 'en_fc_streak', 'en_fc_streak_date', 'en_gram_streak', 'en_gram_streak_date',
      'en_quiz_streak', 'en_quiz_streak_date', 'en_dialogues_completed', 'en_quiz_erros'
    ];
    chavesFixas.forEach(k => localStorage.removeItem(k));

    // Remove dinâmicos: marcadores de páginas de histórias (en_book_bookmark_*) e caches SWR (en_swr_*)
    const chavesParaRemover = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith('en_book_bookmark_') || k.startsWith('en_swr_'))) {
        chavesParaRemover.push(k);
      }
    }
    chavesParaRemover.forEach(k => localStorage.removeItem(k));

    App.notificar('notif_prog_reset', 'alerta');
    setTimeout(() => location.reload(), 1200);
  },

  // ── Exportar/Importar Apenas Conteúdo Custom ──────────────
  exportCustomContent() {
    const canzoni    = JSON.parse(localStorage.getItem('en_songs_custom')    || '[]');
    const dialoghi   = JSON.parse(localStorage.getItem('en_dialogues_custom')   || '[]');
    const storie     = JSON.parse(localStorage.getItem('en_stories_custom')     || '[]');
    const imitazioni = JSON.parse(localStorage.getItem('en_pronunciation_custom') || '[]');
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
    a.download = `english_content_${new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    const total = canzoni.length + dialoghi.length + storie.length + imitazioni.length + vocab.length;
    App.notificar(`✅ ${total} item(ns) exportado(s)`, 'sucesso');
  },

  importCustomContent(event) {
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
        if (!confirm(`Importar conteúdo?\n• ${nc} músicas\n• ${nd} diálogos\n• ${ns} histórias\n• ${ni} imitações\n• ${nv} palavras de vocab`)) return;

        // Merge por chave (não sobrescreve itens existentes)
        const _merge = (lsKey, novos) => {
          if (!novos?.length) return;
          const exist = JSON.parse(localStorage.getItem(lsKey) || '[]');
          const ids = new Set(exist.map(x => x.id));
          localStorage.setItem(lsKey, JSON.stringify([...exist, ...novos.filter(x => !ids.has(x.id))]));
        };
        _merge('en_songs_custom',    backup.canzoni);
        _merge('en_dialogues_custom',   backup.dialoghi);
        _merge('en_stories_custom',     backup.storie);
        _merge('en_pronunciation_custom', backup.imitazioni);
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

  // ── Helper: stat row ──────────────────────────────────────
  _row(label, val) {
    return `<div class="profilo-stat-row">
      <span class="profilo-stat-label">${label}</span>
      <span class="profilo-stat-val">${val}</span>
    </div>`;
  }
};


// Garante que o select de vozes seja atualizado quando o navegador carregar a lista de vozes
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const _sincronizarVozes = () => {
    if (typeof Profilo !== 'undefined' && typeof Profile.atualizarSelectVozes === 'function') {
      Profile.updateVoiceSelect();
    }
  };

  window.speechSynthesis.addEventListener('voiceschanged', _sincronizarVozes);

  // Retries proativos para navegadores cujo handshake assíncrono atrasa ou não dispara voiceschanged
  [200, 600, 1500, 3000].forEach(delay => {
    setTimeout(() => {
      if (typeof VoiceEngine !== 'undefined') {
        VoiceEngine.getBestEnglishVoices();
      }
      _sincronizarVozes();
    }, delay);
  });
}



// Backward-compatibility aliases
Profile.renderizar = () => Profile.render();
Profile.salvarAudioSpeed = (v) => Profile.saveAudioSpeed(v);
Profile.salvarVozItaliana = (v) => Profile.savePreferredVoice(v);
Profile.exportarDados = () => Profile.exportBackup();
Profile.importarDados = (e) => Profile.importBackup(e);
Profile.resetProgresso = () => Profile.resetProgress();
Profile.atualizarSelectVozes = () => Profile.updateVoiceSelect();

window.Profile = Profile;
window.Profilo = Profile;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Profile;
}
