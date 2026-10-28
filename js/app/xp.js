// ============================================================
// js/app/xp.js — Gamification, Goals & Stats Management
// ============================================================

const AppXP = {
  atualizarStats() {
    const p = this.estado.progresso;
    if (!p) return;

    const elNivel   = document.getElementById('stat-nivel');
    const elXp      = document.getElementById('stat-xp');
    const elTempli  = document.getElementById('stat-templi');
    const elParole  = document.getElementById('stat-parole');
    const elBarFill = document.getElementById('xp-bar-fill');
    const elStreak  = document.getElementById('stat-streak');

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
    if (elNivel)   elNivel.textContent   = (typeof I18n !== 'undefined' ? I18n.t('stats_level') : 'Level {n}').replace('{n}', p.nivel);
    if (elXp)      elXp.textContent      = `XP: ${p.xp}/${xpFim}`;
    if (elTempli)  elTempli.textContent  = (typeof I18n !== 'undefined' ? I18n.t('stats_temples') : '{a}/{b} Temples').replace('{a}', p.templos_desbloqueados.length).replace('{b}', totalTemplos);
    if (elParole)  elParole.textContent  = (typeof I18n !== 'undefined' ? I18n.t('stats_words') : '{n} Words').replace('{n}', p.total_palavras);
    if (elBarFill) elBarFill.style.width = percent + '%';
    const s = p.streak || 0;
    if (elStreak)  elStreak.textContent  = typeof I18n !== 'undefined' ? I18n.t(s !== 1 ? 'streak_dias' : 'streak_dia').replace('{n}', s) : `${s} days`;

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
      if (helper && typeof Flashcards !== 'undefined' && !Flashcards.cartaAtual) {
        helper.style.display = vencidas > 0 ? 'none' : '';
      }
    }

    // Daily goal bar — reset xp_hoje when the date rolls over
    const now = new Date();
    const hoje = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    if (p.data_xp_hoje !== hoje) {
      p.xp_hoje = 0;
      p.data_xp_hoje = hoje;
      this.salvarProgresso();
    }
    const meta     = p.meta_diaria || 100;
    const ganhoHj  = p.xp_hoje || 0;
    const metaPct  = Math.min(100, Math.round((ganhoHj / meta) * 100));
    const elMetaFill  = document.getElementById('meta-bar-fill');
    const elMetaLabel = document.getElementById('meta-bar-label');
    const elMetaXp    = document.getElementById('meta-bar-xp');
    const elGoalBar   = document.getElementById('daily-goal-bar');
    if (elMetaFill)  elMetaFill.style.width   = metaPct + '%';
    if (elMetaLabel) elMetaLabel.textContent  = typeof I18n !== 'undefined' ? I18n.t('meta_do_dia_label') : 'Daily Goal';
    if (elMetaXp)    elMetaXp.textContent     = `${ganhoHj}/${meta} XP${ganhoHj >= meta ? ' ✅' : ''}`;
    if (elGoalBar) {
      const labelTxt = typeof I18n !== 'undefined' ? I18n.t('meta_do_dia_label') : 'Meta do dia';
      const tooltipMsg = `🎯 ${labelTxt}: ${ganhoHj}/${meta} XP (${metaPct}%)${ganhoHj >= meta ? ' ✅' : ''} • Clique para configurar`;
      elGoalBar.setAttribute('data-tooltip', tooltipMsg);
      elGoalBar.title = tooltipMsg;
    }
  },

  ganharXP(quantidade) {
    if (typeof Progressao !== 'undefined') {
      Progressao.ganhar(quantidade);
    } else {
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

  // ── Meta Diária settings ──────────────────────────────────
  abrirMetaSettings() {
    const modal = document.getElementById('meta-settings-modal');
    if (!modal) return;
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
    const msg = typeof I18n !== 'undefined' ? I18n.t('notif_meta_definida').replace('{val}', valor) : `Goal set to ${valor} XP`;
    this.notificar(msg, 'sucesso');
  },

  // ── Meta Prazo Modal ────────────────────────────────────────
  _renderizarMetaPrazo() {
    const p = this.estado.progresso;
    if (!p || !p.meta_prazo) {
      const lbl = typeof I18n !== 'undefined' ? I18n.t('meta_definir_prazo') : 'Set Target Goal';
      return `<div class="card-meta-prazo card-meta-vazia" onclick="App.abrirModalMetaPrazo()">
        <span>🎯</span>
        <span>${lbl}</span>
        <span class="cc-cta">→</span>
      </div>`;
    }
    const dados = typeof Progressao !== 'undefined' ? Progressao.calcularMetaPrazo() : null;
    if (!dados) return '';
    const cor = dados.atingeNoPrazo ? '#27AE60' : '#E74C3C';
    const emoji = dados.atingeNoPrazo ? '✅' : '⚠️';
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    return `<div class="card-meta-prazo" onclick="App.abrirModalMetaPrazo()">
      <div class="meta-prazo-titulo">${emoji} ${isEn ? 'Goal' : 'Meta'}: ${isEn ? 'Level' : 'Nível'} ${dados.nivel_alvo} ${isEn ? 'by' : 'até'} ${new Date(dados.data_alvo).toLocaleDateString(isEn ? 'en-US' : 'pt-BR', {timeZone: 'UTC'})}</div>
      <div class="meta-prazo-info">
        <span style="color:${cor}">${dados.xpPorDia} ${I18n.t('meta_xp_necessarios')}</span>
        <span>·</span>
        <span>${I18n.t('meta_dias_restantes').replace('{n}', dados.diasRestantes)}</span>
      </div>
      <div class="meta-prazo-previsao">${I18n.t('meta_no_ritmo')} ${dados.dataPrevisao}</div>
    </div>`;
  },

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

    if (new Date(dataAlvo).getTime() <= Date.now()) {
      this.notificar('notif_data_futura', 'erro');
      return;
    }

    if (typeof Progressao !== 'undefined') Progressao.definirMetaPrazo(nivelAlvo, dataAlvo);
    this.fecharModalMetaPrazo();
    this.renderizarTemplos();
  }
};

if (typeof window !== 'undefined') {
  window.AppXP = AppXP;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppXP;
}
