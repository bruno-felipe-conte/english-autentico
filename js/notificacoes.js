// notificacoes.js — Study reminders via Push Notifications

const Notificacoes = {
  STORAGE_KEY: 'en_notif_hora',
  STORAGE_PERM: 'en_notif_perm',

  async pedirPermissao() {
    if (!('Notification' in window)) return 'unsupported';
    if (Notification.permission === 'granted') return 'granted';
    if (Notification.permission === 'denied')  return 'denied';

    const result = await Notification.requestPermission();
    try { localStorage.setItem(this.STORAGE_PERM, result); } catch(_) {}

    if (result === 'granted') {
      if (typeof App !== 'undefined') {
        App.notificar('🔔 Reminders enabled!', 'sucesso');
      }
      this.agendarHoje();
    }
    return result;
  },

  habilitado() {
    return ('Notification' in window) && Notification.permission === 'granted';
  },

  agendarHoje() {
    if (!this.habilitado()) return;
    if (!('serviceWorker' in navigator)) return;

    const horaStr = this.getHora();
    const [h, m]  = horaStr.split(':').map(Number);
    const agora   = new Date();
    const alvo    = new Date();
    alvo.setHours(h, m, 0, 0);

    if (alvo <= agora) alvo.setDate(alvo.getDate() + 1);

    const delayMs = alvo.getTime() - agora.getTime();

    const { devidas, novas } = this._contarCartas();
    const total = devidas + novas;

    let corpo;
    if (total === 0) {
      corpo = '✅ No cards due today — great work!';
    } else if (devidas > 0 && novas > 0) {
      corpo = `📚 ${devidas} card${devidas !== 1 ? 's' : ''} to review + ${novas} new word${novas !== 1 ? 's' : ''} waiting for you.`;
    } else if (devidas > 0) {
      corpo = `⏰ ${devidas} card${devidas !== 1 ? 's' : ''} due — don't lose your streak!`;
    } else {
      corpo = `🌱 ${novas} new word${novas !== 1 ? 's' : ''} ready to learn.`;
    }

    navigator.serviceWorker.ready.then(reg => {
      reg.active?.postMessage({
        type:    'AGENDAR_LEMBRETE',
        delayMs,
        titulo:  '🇺🇸 English Autentico',
        corpo,
        tag:     'english-review',
      });
    });
  },

  getHora() {
    try { return localStorage.getItem(this.STORAGE_KEY) || '20:00'; } catch(_) { return '20:00'; }
  },

  setHora(hora) {
    try { localStorage.setItem(this.STORAGE_KEY, hora); } catch(_) {}
    this.agendarHoje();
    if (typeof App !== 'undefined') {
      App.notificar(`🔔 Reminder set for ${hora}`, 'sucesso');
    }
  },

  _contarCartas() {
    const p = typeof App !== 'undefined' ? App.estado.progresso : null;
    if (!p) return { devidas: 0, novas: 0 };
    const agora  = Date.now();
    let devidas  = 0, novas = 0;
    p.templos_desbloqueados.forEach(num => {
      const data = App.estado.templosData[num];
      if (!data || !data.palavras) return;
      data.palavras.forEach(pw => {
        const f = App.estado.flashcardData[pw.id];
        if (!f || f.state === 'new') { novas++; }
        else if ((f.nextReview || 0) <= agora) { devidas++; }
      });
    });
    return { devidas, novas };
  },

  renderizarCard() {
    const suporta = 'Notification' in window;
    const perm    = suporta ? Notification.permission : 'unsupported';
    const hora    = this.getHora();

    if (!suporta) return '';

    const { devidas, novas } = this._contarCartas();

    const cartasTexto = devidas + novas > 0
      ? `📚 ${devidas} to review · ${novas} new today`
      : '✅ No cards due today';

    if (perm === 'granted') {
      return `<div class="notif-card">
        <div class="notif-titulo">🔔 Study Reminders</div>
        <div class="notif-status ativo">✅ Reminders active</div>
        <div class="notif-cartas">${cartasTexto}</div>
        <div class="notif-hora-row">
          <label class="notif-hora-label">⏰ Remind me at:</label>
          <input type="time" class="notif-hora-input" value="${hora}" onchange="Notificacoes.setHora(this.value)">
        </div>
      </div>`;
    }
    if (perm === 'denied') {
      return `<div class="notif-card">
        <div class="notif-titulo">🔔 Study Reminders</div>
        <div class="notif-status negado">🚫 Permission denied in browser</div>
        <p class="notif-dica">To enable: Browser settings → Notifications → Allow for this site.</p>
      </div>`;
    }
    return `<div class="notif-card">
      <div class="notif-titulo">🔔 Study Reminders</div>
      <div class="notif-status pendente">💤 Reminders disabled</div>
      <p class="notif-dica">Enable to receive a daily reminder at your preferred time.</p>
      <button class="btn-primario" onclick="Notificacoes.pedirPermissao()" style="margin-top:0.5rem;width:100%">
        🔔 Enable Reminders
      </button>
    </div>`;
  },

  init() {
    if (this.habilitado()) {
      this.agendarHoje();
    }
  },
};
