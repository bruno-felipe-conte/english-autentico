// ============================================================
// js/app/tts.js — Native Speech Synthesis & Audio Engine
// ============================================================

const AppTTS = {
  _vozAmericana: null,
  _vozAmericanaResolvida: false,
  _currentUtterance: null,

  _getVozAmericana() {
    if (typeof speechSynthesis === 'undefined') return null;
    if (!this._vozAmericanaResolvida) {
      const vozes = speechSynthesis.getVoices();
      if (!vozes.length) return null;
      this._vozAmericana =
        vozes.find(v => v.lang === 'en-US') ||
        vozes.find(v => v.lang.startsWith('en')) ||
        null;
      this._vozAmericanaResolvida = true;
    }
    return this._vozAmericana;
  },

  _pronunciarRV(texto) {
    if (typeof responsiveVoice !== 'undefined' && responsiveVoice.voiceSupport()) {
      responsiveVoice.cancel();
      const speed = parseFloat(localStorage.getItem('en_audio_speed')) || 0.85;
      responsiveVoice.speak(texto, 'US English Female', { rate: speed, pitch: 1 });
    }
  },

  async speak(text, customRate = null) {
    if (!text) return;
    if (typeof SomFeedback !== 'undefined' && !SomFeedback.ativo) return;

    const normalized = (typeof VoiceEngine !== 'undefined')
      ? VoiceEngine.normalizeForSpeech(text)
      : text;

    if (!normalized) return;

    if (typeof AudioCache !== 'undefined') {
      try {
        const cached = await AudioCache.getAudio(normalized);
        if (cached && cached.url) {
          const a = new Audio(cached.url);
          if (typeof VoiceEngine !== 'undefined') VoiceEngine.applyMasteringAudioElement(a);
          a.play().catch(() => {});
          return;
        }
      } catch (e) {
        console.error("[core:tts] AudioCache error:", e);
      }
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) { console.error("[core:tts] Cancel error:", e); }
      const voice = (typeof VoiceEngine !== 'undefined') ? VoiceEngine.getSelectedVoice() : null;
      let speed = (customRate !== null)
        ? customRate
        : (parseFloat(localStorage.getItem('en_audio_speed')) || 0.85);
      speed = Math.max(0.5, Math.min(2.0, speed));

      const u = new SpeechSynthesisUtterance(normalized);
      u.lang = 'en-US';
      if (voice) u.voice = voice;
      u.rate = speed;
      this._currentUtterance = u;
      u.onend = () => { this._currentUtterance = null; };
      u.onerror = () => { this._currentUtterance = null; };

      window.speechSynthesis.speak(u);
    }
  },

  pronunciar(texto) {
    if (!texto) return;
    if (typeof SomFeedback !== 'undefined' && !SomFeedback.ativo) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this._pronunciarRV(texto);
      return;
    }

    window.speechSynthesis.cancel();

    const tentarFalar = () => {
      const voz = this._getVozAmericana();
      let speed = parseFloat(localStorage.getItem('en_audio_speed')) || 0.85;
      speed = Math.max(0.1, Math.min(2.0, speed));

      const u = new SpeechSynthesisUtterance(texto);
      u.lang  = 'en-US';
      u.rate  = speed;
      u.pitch = 1;
      if (voz) u.voice = voz;

      u.onerror = (e) => {
        window.speechSynthesis.cancel();
        if (['language-unavailable', 'synthesis-failed', 'not-allowed'].includes(e.error)) {
          this._pronunciarRV(texto);
        }
      };

      window.speechSynthesis.speak(u);

      if (!voz && this._vozAmericanaResolvida) {
        this._pronunciarRV(texto);
      }
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      tentarFalar();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.onvoiceschanged = null;
        this._vozAmericanaResolvida = false;
        tentarFalar();
      };
    }
  },

  toggleAudioSpeed() {
    const SPEEDS = [0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5];
    const current = parseFloat(localStorage.getItem('en_audio_speed') || '0.85');
    let idx = SPEEDS.indexOf(current);
    if (idx === -1) idx = SPEEDS.indexOf(1.0);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    try {
      localStorage.setItem('en_audio_speed', next);
    } catch (e) {
      console.warn("Could not save audio speed to localStorage due to quota limits.");
    }
    if (this.estado && this.estado.progresso) {
      this.estado.progresso.audio_rate = next;
      this.salvarProgresso();
    }
    this.atualizarAudioSpeedUI();
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const desc = isEn ? 'Audio Speed: ' : 'Velocidade: ';
    this.notificar(desc + next + 'x', 'info');
  },

  atualizarAudioSpeedUI() {
    const btn = document.getElementById('btn-audio-speed');
    if (!btn) return;
    const rate = parseFloat(localStorage.getItem('en_audio_speed') || '0.85');
    let label = rate % 1 === 0 ? rate.toFixed(0) : rate.toString().replace(/^0\./, '.');
    const ico = document.getElementById('btn-audio-speed-ico') || btn;
    ico.textContent = label + 'x';

    // Sync profile slider if visible
    const slider = document.getElementById('audio-speed-slider');
    const display = document.getElementById('audio-speed-val');
    if (slider) slider.value = rate;
    if (display) display.textContent = rate + 'x';
  }
};

if (typeof window !== 'undefined') {
  window.AppTTS = AppTTS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AppTTS;
}
