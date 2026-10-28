// ============================================================
// audio.js — Programmatic sound feedback via Web Audio API
// No external files — all sounds generated in-browser
// ============================================================

const SomFeedback = {
  ativo: true,
  // NOTE: backing store for the AudioContext is this.__ctx (double underscore).
  // _ctx is a method (lazy getter) defined below — do NOT add a _ctx: null
  // property here as it would be silently overwritten by the method definition.

  init() {
    // Garante que o app abra por padrão com o som liberado e não mutado
    if (!localStorage.getItem('en_som_default_v2')) {
      try {
        localStorage.setItem('en_som', '1');
        localStorage.setItem('en_som_default_v2', 'true');
      } catch (_) {}
    }
    const salvo = localStorage.getItem('en_som');
    this.ativo = salvo !== '0' && salvo !== 'false';
    this._atualizarBotao();
  },

  toggle() {
    this.ativo = !this.ativo;
    localStorage.setItem('en_som', this.ativo ? '1' : '0');
    this._atualizarBotao();
    // Ao mutar: para imediatamente qualquer fala em andamento
    if (!this.ativo && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    if (typeof App !== 'undefined' && App.notificar) {
      App.notificar(this.ativo ? 'notif_sons_ativados' : 'notif_sons_desativados', 'alerta');
    }
  },

  _atualizarBotao() {
    const btn = document.getElementById('btn-som');
    const ico = document.getElementById('btn-som-ico');
    if (ico) {
      ico.textContent = this.ativo ? '🔔' : '🔕';
    } else if (btn) {
      btn.textContent = this.ativo ? '🔔' : '🔕';
    }
    if (btn) {
      if (typeof I18n !== 'undefined') {
        const titleText = this.ativo
          ? (I18n.t('btn_som_ativo_title') || 'Sons: ativados (clique para desligar)')
          : (I18n.t('btn_som_desativo_title') || 'Sons: desativados (clique para ligar)');
        btn.title = titleText;
        btn.setAttribute('aria-label', titleText);
      } else {
        const titleText = this.ativo ? 'Sons: ativados' : 'Sons: desativados';
        btn.title = titleText;
        btn.setAttribute('aria-label', titleText);
      }
    }
  },

  _ctx() {
    if (!this.__ctx) {
      try {
        this.__ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (_) { return null; }
    }
    return this.__ctx;
  },

  _tocar(freq, durMs, tipo = 'sine', vol = 0.28) {
    if (!this.ativo) return;
    const ctx = this._ctx();
    if (!ctx) return;
    try {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = tipo;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durMs / 1000);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + durMs / 1000);
    } catch (_) {}
  },

  // ── Correct answer: bright ascending two-tone ──────────────
  correto() {
    this._tocar(659, 70);
    setTimeout(() => this._tocar(880, 90), 65);
  },

  // ── Wrong answer: low flat buzz ───────────────────────────
  errado() {
    this._tocar(196, 130, 'sawtooth', 0.18);
  },

  // ── Level-up: ascending triad ─────────────────────────────
  nivelUp() {
    const seq = [523, 659, 784, 1046];
    seq.forEach((freq, i) => setTimeout(() => this._tocar(freq, 140), i * 110));
  },

  // ── Card flip: subtle soft click ──────────────────────────
  virar() {
    this._tocar(440, 40, 'sine', 0.1);
  },
};
