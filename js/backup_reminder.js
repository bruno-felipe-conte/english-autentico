// ============================================================
// js/backup_reminder.js — Lembrete de Backup Periódico & Proteção de Dados
// ============================================================

const BackupReminder = {
  CHAVE_STORAGE: 'en_ultimo_aviso_backup',
  CHAVE_FALLBACK: 'it_ultimo_aviso_backup',
  INTERVALO_MS: 3 * 24 * 60 * 60 * 1000, // 3 dias (72 horas)
  DURACAO_MS: 20000,                     // 20 segundos

  _timerId: null,
  _tempoRestante: 20000,
  _inicioTimer: null,
  _popupElement: null,
  _isPausado: false,

  deveExibir() {
    try {
      if (typeof localStorage === 'undefined') return false;
      const ultimo = localStorage.getItem(this.CHAVE_STORAGE) || localStorage.getItem(this.CHAVE_FALLBACK);
      if (!ultimo) return true;
      const passado = Date.now() - parseInt(ultimo, 10);
      return passado >= this.INTERVALO_MS;
    } catch (_) {
      return false;
    }
  },

  verificarLembrete() {
    if (this.deveExibir()) {
      if (typeof document === 'undefined') return;
      setTimeout(() => this.exibir(), 1200);
    }
  },

  exibir() {
    if (typeof document === 'undefined') return;
    if (document.getElementById('backup-popup-container')) return;

    this._tempoRestante = this.DURACAO_MS;
    this._isPausado = false;

    const titulo = (typeof I18n !== 'undefined' && I18n.t) ? I18n.t('backup_popup_titulo') : '⚠️ Salve seu Progresso!';
    const desc   = (typeof I18n !== 'undefined' && I18n.t) ? I18n.t('backup_popup_desc')   : 'Se o cache ou histórico do navegador forem limpos, sua evolução nos estudos (XP, flashcards e templos) será perdida. Faça um backup regular!';
    const btnTxt = (typeof I18n !== 'undefined' && I18n.t) ? I18n.t('backup_popup_btn')    : '💾 Fazer Backup Agora';
    const fecharTxt = (typeof I18n !== 'undefined' && I18n.t) ? I18n.t('backup_popup_fechar') : 'Fechar';

    const container = document.createElement('div');
    container.id = 'backup-popup-container';
    container.className = 'backup-popup-container';
    container.setAttribute('role', 'alert');
    container.setAttribute('aria-live', 'polite');

    container.innerHTML = `
      <div class="backup-popup-card" id="backup-popup-card">
        <div class="backup-popup-header">
          <div class="backup-popup-titulo">${titulo}</div>
          <button class="backup-popup-close" id="backup-popup-close-btn" aria-label="${fecharTxt}" title="${fecharTxt}">✕</button>
        </div>
        <div class="backup-popup-desc">${desc}</div>
        <button class="backup-popup-btn" id="backup-popup-action-btn">
          ${btnTxt}
        </button>
        <div class="backup-popup-progress" id="backup-popup-progress-bar"></div>
      </div>
    `;

    document.body.appendChild(container);
    this._popupElement = container;

    // Hover pausar / retomar
    container.addEventListener('mouseenter', () => this.pausar());
    container.addEventListener('mouseleave', () => this.retomar());

    const closeBtn = document.getElementById('backup-popup-close-btn');
    if (closeBtn) closeBtn.onclick = () => this.fechar(false);

    const actionBtn = document.getElementById('backup-popup-action-btn');
    if (actionBtn) actionBtn.onclick = () => this.acionarBackup();

    this._iniciarTemporizador(this.DURACAO_MS);
  },

  _iniciarTemporizador(ms) {
    if (this._timerId) clearTimeout(this._timerId);
    this._inicioTimer = Date.now();
    this._timerId = setTimeout(() => {
      this.fechar(false);
    }, ms);
  },

  pausar() {
    if (this._isPausado || !this._timerId) return;
    this._isPausado = true;
    clearTimeout(this._timerId);
    this._timerId = null;
    const decorrido = Date.now() - this._inicioTimer;
    this._tempoRestante = Math.max(0, this._tempoRestante - decorrido);
    const bar = document.getElementById('backup-popup-progress-bar');
    if (bar) {
      bar.style.animationPlayState = 'paused';
    }
  },

  retomar() {
    if (!this._isPausado) return;
    this._isPausado = false;
    if (this._tempoRestante > 0) {
      this._iniciarTemporizador(this._tempoRestante);
      const bar = document.getElementById('backup-popup-progress-bar');
      if (bar) {
        bar.style.animationPlayState = 'running';
      }
    } else {
      this.fechar(false);
    }
  },

  acionarBackup() {
    try {
      if (typeof Profile !== 'undefined' && typeof Profile.exportarDados === 'function') {
        Profile.exportarDados();
      } else if (typeof Profile !== 'undefined' && typeof Profile.exportBackup === 'function') {
        Profile.exportBackup();
      }
    } catch (e) {
      console.error('[BackupReminder] Erro ao exportar backup:', e);
    }
    this.registrarTimestamp();
    this.fechar(true);
  },

  registrarTimestamp() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.CHAVE_STORAGE, Date.now().toString());
      }
    } catch (_) {}
  },

  fechar(foiBackup = false) {
    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = null;
    }
    this.registrarTimestamp();

    if (this._popupElement) {
      this._popupElement.classList.add('backup-popup-saindo');
      setTimeout(() => {
        if (this._popupElement && this._popupElement.parentNode) {
          this._popupElement.parentNode.removeChild(this._popupElement);
        }
        this._popupElement = null;
      }, 250);
    }
  }
};

if (typeof window !== 'undefined') {
  window.BackupReminder = BackupReminder;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BackupReminder;
}
