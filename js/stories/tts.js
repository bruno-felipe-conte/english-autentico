// ============================================================
// js/stories/tts.js — Sequential Story Audio & Speech Player
// ============================================================

const StoriesTTS = {
  _listenCurrentPage() {
    if (!this.storAttuale || !this._paginas || this._paginas.length === 0) return;
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';

    if (this._reproduzindoAudio) {
      this._stopPageAudio();
      return;
    }

    const isMobile = this._isMobile();
    const pag1 = this._paginas[this.paginaAtual - 1];
    const pag2 = isMobile ? null : this._paginas[this.paginaAtual];

    const frasesExtraidas = [];
    const coletarFrases = (pag) => {
      if (!pag || !pag.blocos) return;
      pag.blocos.forEach(b => {
        const txt = ((b.english || b.ingles || b.italiano || "") || '').trim();
        if (!txt) return;
        const partes = txt.match(/[^.!?\n]+[.!?]+|[^.!?\n]+$/g) || [txt];
        partes.forEach(p => {
          const limpo = p.trim();
          if (limpo) frasesExtraidas.push(limpo);
        });
      });
    };

    coletarFrases(pag1);
    coletarFrases(pag2);

    if (frasesExtraidas.length === 0) {
      if (typeof App !== 'undefined' && App.notificar) {
        App.notificar(isEn ? 'No text to read on this page' : 'Nenhum texto para ouvir nesta página', 'info');
      }
      return;
    }

    this._audioFilaSentencas = frasesExtraidas;
    this._audioIndexSentenca = 0;
    this._reproduzindoAudio  = true;

    const btn = document.getElementById('book-btn-ouvir');
    if (btn) {
      btn.innerHTML = `⏹️ <span class="label">${isEn ? 'Stop' : 'Parar'}</span>`;
      btn.classList.add('active');
    }

    this._playNextSentence();
  },

  _playNextSentence() {
    if (!this._reproduzindoAudio) return;

    if (this._audioIndexSentenca >= this._audioFilaSentencas.length) {
      this._stopPageAudio();
      return;
    }

    const fraseOriginal = this._audioFilaSentencas[this._audioIndexSentenca];
    const fraseNormalizada = (typeof VoiceEngine !== 'undefined' && typeof VoiceEngine.normalizarParaFala === 'function')
      ? VoiceEngine.normalizarParaFala(fraseOriginal)
      : fraseOriginal;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (typeof App !== 'undefined' && App._pronunciarRV) {
        App._pronunciarRV(fraseNormalizada || fraseOriginal);
      }
      this._stopPageAudio();
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
    } catch (_) {}

    let voz = null;
    if (typeof VoiceEngine !== 'undefined' && typeof VoiceEngine.obterVozSelecionada === 'function') {
      voz = VoiceEngine.obterVozSelecionada();
    }
    if (!voz && typeof App !== 'undefined') {
      if (typeof App._getVozAmericana === 'function') voz = App._getVozAmericana();
    }

    let rate = parseFloat(localStorage.getItem('en_audio_speed'));
    if (isNaN(rate) || rate <= 0) rate = 0.88;
    rate = Math.max(0.5, Math.min(1.8, rate));

    if (typeof VoiceEngine !== 'undefined' && typeof VoiceEngine.falarNeural === 'function') {
      VoiceEngine.falarNeural(fraseOriginal, {
        rate: rate,
        onend: () => {
          if (!this._reproduzindoAudio) return;
          this._audioIndexSentenca++;
          setTimeout(() => {
            if (this._reproduzindoAudio) {
              this._playNextSentence();
            }
          }, 110);
        },
        onerror: (e) => {
          console.warn('[Stories Audio Error]', e);
          if (!this._reproduzindoAudio) return;
          this._audioIndexSentenca++;
          setTimeout(() => {
            if (this._reproduzindoAudio) {
              this._playNextSentence();
            }
          }, 90);
        }
      });
      return;
    }

    const u = new SpeechSynthesisUtterance(fraseNormalizada || fraseOriginal);
    u.lang = (voz && voz.lang) ? voz.lang : 'en-US';
    u.rate = rate;
    if (voz) u.voice = voz;

    if (fraseOriginal.endsWith('?')) {
      u.pitch = 1.05;
    } else if (fraseOriginal.endsWith('!')) {
      u.pitch = 1.02;
    } else {
      u.pitch = 1.0;
    }

    if (typeof window !== 'undefined') {
      window._storyActiveUtterance = u;
    }

    u.onend = () => {
      if (!this._reproduzindoAudio) return;
      this._audioIndexSentenca++;
      setTimeout(() => {
        if (this._reproduzindoAudio) {
          this._playNextSentence();
        }
      }, 110);
    };

    u.onerror = (e) => {
      console.warn('[Stories Audio Error]', e);
      if (!this._reproduzindoAudio) return;
      this._audioIndexSentenca++;
      setTimeout(() => {
        if (this._reproduzindoAudio) {
          this._playNextSentence();
        }
      }, 90);
    };

    try {
      window.speechSynthesis.speak(u);
    } catch (err) {
      console.warn('[Stories Speech Exception]', err);
      this._stopPageAudio();
    }
  },

  _stopPageAudio() {
    this._reproduzindoAudio = false;
    this._audioFilaSentencas = [];
    this._audioIndexSentenca = 0;
    if (typeof window !== 'undefined') {
      window._storyActiveUtterance = null;
    }

    if (typeof VoiceEngine !== 'undefined' && typeof VoiceEngine.parar === 'function') {
      VoiceEngine.parar();
    } else {
      try {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch (_) {}
    }

    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    const btn = document.getElementById('book-btn-ouvir');
    if (btn) {
      btn.innerHTML = `🔊 <span class="label">${isEn ? 'Listen' : 'Ouvir'}</span>`;
      btn.classList.remove('active');
    }
  }
};

if (typeof window !== 'undefined') {
  window.StoriesTTS = StoriesTTS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoriesTTS;
}
