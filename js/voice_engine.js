// ============================================================
// js/voice_engine.js — Lightweight English Pronunciation & Prosody Engine
// Inspired by VoiceStudio speech pre-processing algorithms:
//  • Text normalization (stripping visual artifacts, elisions, and symbols)
//  • Sentence chunking (preserving English abbreviations Mr./Dr./Prof./St.)
//  • Neural voice scoring & ranking (prioritizing high-definition human voices)
//  • Web Audio DSP clarity mastering chain (subtle compression & pop filter)
//
// 100% pure vanilla JavaScript, zero server dependencies, ~8 KB footprint.
// ============================================================

const VoiceEngine = {
  // ── 1. Preservation of English Honorifics & Common Abbreviations ──
  HONORIFICS_EN: [
    'Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Prof', 'Capt', 'Lt',
    'Col', 'Gen', 'Sgt', 'Rev', 'St', 'Hon', 'Pres', 'Gov',
    'Sen', 'Rep', 'Ave', 'Blvd', 'Rd', 'Corp', 'Inc', 'Ltd',
    'Co', 'No', 'vs', 'etc', 'approx', 'e.g', 'i.e'
  ],

  // ── 2. Text Normalization for Natural Speech Synthesis ────
  normalizeForSpeech(text) {
    if (!text || typeof text !== 'string') return '';

    let s = text;

    // A. Strip HTML tags
    s = s.replace(/<[^>]*>/g, ' ');

    // Strip Portuguese instruction prefixes (e.g., "Complete a frase de apresentação: Hello, I am...")
    s = s.replace(/^\s*(Complete|Como\s+(dizer|perguntar|responder)|Para\s+(dizer|clima|expressar)|Escreva|Identifique|Inverta|Observe|Transforme|Pense|Escute|Preencha|Traduza|Diga|Pergunta|Resposta|Atenção|Digite)\b[^:\n]*:\s*/i, '');

    // B. Strip parenthetical Portuguese translations common in bilingual flashcards & lessons
    // Ex: "to understand (compreender, entender)" -> "to understand"
    s = s.replace(/\s*\(=[^)]+\)/g, '');
    s = s.replace(/\s*\([a-zà-úA-ZÀ-Ú\s,;.\-–—\/?!0-9]+\)/gi, (match) => {
      const ptClues = /\b(o|a|os|as|um|uma|de|do|da|em|no|na|para|com|por|que|se|ex|exemplo|verbo|lit|literalmente|trad|tradução|nem|no que)\b/i;
      if (ptClues.test(match)) return '';
      return '';
    });

    // C. Strip IPA brackets and pronunciation guides
    // Ex: "through [thruː]" -> "through"
    s = s.replace(/\s*\[[^\]]+\]/g, '');

    // D. Convert slash alternatives to natural comma pauses
    // Ex: "he / she" -> "he, she"
    s = s.replace(/(\w+)\s*\/\s*(\w+)/g, '$1, $2');

    // E. Remove visual arrows, bullets, and UI emojis
    s = s.replace(/[→↔⇒➔➜]/g, ', ');
    s = s.replace(/[🔵🔴🟢🟡🟣⚪⚫★☆✔✓✗✘💡🔍📖✏️🎧👁️]/g, '');

    // F. Normalize smart/typographic quotes to standard single apostrophe
    // Crucial for English contractions (don’t -> don't, it’s -> it's)
    s = s.replace(/[’‘`´]/g, "'");

    // G. Protect valid English contractions from word boundary splits
    s = s.replace(/\b([a-zA-Z]+)'([a-zA-Z]+)\b/g, "$1'$2");

    // H. Clean up duplicate punctuation and whitespace
    s = s.replace(/\s+([,.;:!?])/g, '$1');
    s = s.replace(/[,;]{2,}/g, ',');
    s = s.replace(/\.{2,}/g, '...');
    s = s.replace(/\s+/g, ' ').trim();

    return s;
  },

  // ── 3. Natural Sentence Chunker with Punctuation & Pause Handling ──
  splitIntoSentences(text) {
    if (!text) return [];
    const t = this.normalizeForSpeech(text);
    if (!t) return [];

    let protectedText = t;
    const placeholders = [];

    // Protect abbreviations so they don't trigger sentence splits
    this.HONORIFICS_EN.forEach((abbrev, idx) => {
      const re = new RegExp(`\\b${abbrev}\\.`, 'gi');
      protectedText = protectedText.replace(re, (m) => {
        const ph = `__HON_${idx}__`;
        placeholders.push({ ph, original: m });
        return ph;
      });
    });

    // Split on terminal punctuation (. ! ?) or major pauses (; :)
    const chunks = protectedText
      .split(/(?<=[.!?])\s+|(?<=[;:])\s+/)
      .map(c => c.trim())
      .filter(Boolean);

    // Restore protected abbreviations
    return chunks.map(chunk => {
      let res = chunk;
      placeholders.forEach(({ ph, original }) => {
        res = res.replace(new RegExp(ph, 'g'), original);
      });
      return res;
    });
  },

  // ── 4. Neural Voices Selector & Scoring Algorithm ──────────
  _voiceCache: null,

  getBestEnglishVoices() {
    if (typeof speechSynthesis === 'undefined') return [];

    let allVoices = [];
    try {
      allVoices = speechSynthesis.getVoices() || [];
    } catch (_) {
      allVoices = [];
    }

    if (allVoices.length > 0) {
      this._voiceCache = allVoices;
    } else if (this._voiceCache && this._voiceCache.length > 0) {
      allVoices = this._voiceCache;
    }

    // Filter for English voices (en-US, en-GB, en-AU, en-CA, etc.)
    const englishVoices = allVoices.filter(v => {
      const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');
      const name = (v.name || '').toLowerCase();
      return lang.startsWith('en') || name.includes('english') || name.includes('us english') || name.includes('uk english');
    });

    if (!englishVoices.length) return [];

    // Neural Quality Scoring Function
    const scoreVoice = (v) => {
      let score = 0;
      const name = (v.name || '').toLowerCase();
      const lang = (v.lang || '').toLowerCase().replace(/_/g, '-');

      // Tier S: Modern Neural & Natural Voices
      if (name.includes('natural') || name.includes('online')) score += 100;
      if (name.includes('neural')) score += 90;
      if (name.includes('premium') || name.includes('enhanced')) score += 80;
      if (name.includes('google')) score += 70;

      // Renowned High-Fidelity Voice Talents
      if (name.includes('jenny')) score += 40;     // Microsoft Jenny Online (Natural)
      if (name.includes('guy')) score += 40;       // Microsoft Guy Online (Natural)
      if (name.includes('aria')) score += 35;      // Microsoft Aria Online (Natural)
      if (name.includes('samantha')) score += 35;  // Apple Samantha (Enhanced)
      if (name.includes('daniel')) score += 35;    // Apple Daniel (Enhanced)
      if (name.includes('sonia')) score += 30;     // Microsoft Sonia Online (UK)
      if (name.includes('ryan')) score += 30;      // Microsoft Ryan Online (UK)

      // Language dialect preferences
      if (lang === 'en-us') score += 20;
      else if (lang === 'en-gb') score += 18;
      else if (lang.startsWith('en-')) score += 10;

      // Heavy penalty for legacy robotic SAPI5 desktop voices
      if (name.includes('desktop') || name.includes('sapi')) score -= 60;

      return score;
    };

    return [...englishVoices].sort((a, b) => scoreVoice(b) - scoreVoice(a));
  },

  getSelectedVoice() {
    const sorted = this.getBestEnglishVoices();
    if (!sorted.length) return null;

    // 1. Check user custom selection in settings
    const saved = (typeof localStorage !== 'undefined')
      ? (localStorage.getItem('en_preferred_voice') || localStorage.getItem('en_voz_preferida'))
      : null;

    if (saved) {
      const match = sorted.find(v => v.name === saved || v.voiceURI === saved);
      if (match) return match;
    }

    // 2. Return highest ranked neural voice
    return sorted[0];
  },

  // ── 5. Web Audio DSP Chain (Audio Mastering & Clarity) ─────
  _audioCtx: null,

  getAudioContext() {
    if (!this._audioCtx && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this._audioCtx = new AudioContextClass();
    }
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      this._audioCtx.resume().catch(() => {});
    }
    return this._audioCtx;
  },

  // Connects an HTMLAudioElement through a high-pass clarity filter & compression
  applyMasteringAudioElement(audioElement) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx || !audioElement) return;

      const source = ctx.createMediaElementSource(audioElement);

      // High-pass filter cuts sub-80Hz pops and microphone rumble
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.value = 80;

      // Subtle dynamics compressor brings vocal presence forward
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -12;
      compressor.knee.value = 4;
      compressor.ratio.value = 3;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.25;

      source.connect(highpass);
      highpass.connect(compressor);
      compressor.connect(ctx.destination);
    } catch (_) {
      // Audio element already connected or Web Audio not available
    }
  },

  // ── 6. Neural Voice (WASM Worker) Integration ─────────────
  _worker: null,
  _pendingSyntheses: new Map(),
  _currentAudioSource: null,
  _workerInitialized: false,
  _workerDownloading: false,

  _getWorker() {
    if (this._worker) return this._worker;
    if (typeof Worker === 'undefined') return null;

    try {
      this._worker = new Worker('js/tts_worker.js');
      this._worker.onmessage = (e) => this._onWorkerMessage(e);
      this._worker.onerror = (err) => {
        console.warn('[VoiceEngine] Web Worker error:', err);
      };
      this._worker.postMessage({ type: 'CHECK_STATUS' });
      return this._worker;
    } catch (e) {
      console.warn('[VoiceEngine] Web Worker unavailable:', e);
      return null;
    }
  },

  _onWorkerMessage(e) {
    const { type, id, error, wavBuffer, isInitialized, percent } = e.data || {};

    if (type === 'STATUS') {
      this._workerInitialized = !!isInitialized;
    } else if (type === 'DOWNLOAD_PROGRESS') {
      if (typeof this._onDownloadProgress === 'function') {
        this._onDownloadProgress(percent);
      }
    } else if (type === 'INIT_SUCCESS') {
      this._workerInitialized = true;
      this._workerDownloading = false;
      localStorage.setItem('en_voz_neural_instalada', 'true');
      if (typeof this._onDownloadSuccess === 'function') {
        this._onDownloadSuccess();
      }
    } else if (type === 'INIT_ERROR') {
      this._workerDownloading = false;
      if (typeof this._onDownloadError === 'function') {
        this._onDownloadError(error);
      }
    } else if (type === 'SYNTHESIZE_SUCCESS') {
      const resolver = this._pendingSyntheses.get(id);
      if (resolver) {
        this._pendingSyntheses.delete(id);
        resolver.resolve(wavBuffer);
      }
    } else if (type === 'SYNTHESIZE_ERROR') {
      const resolver = this._pendingSyntheses.get(id);
      if (resolver) {
        this._pendingSyntheses.delete(id);
        resolver.reject(new Error(error || 'Synthesis error'));
      }
    }
  },

  statusVozNeural() {
    const saved = localStorage.getItem('en_voz_neural_instalada') === 'true';
    return {
      instalada: saved || this._workerInitialized,
      baixando: this._workerDownloading,
      ativa: localStorage.getItem('en_usar_voz_neural') !== 'false'
    };
  },

  baixarVozNeural(onProgress, onSuccess, onError, forceRefresh = false) {
    const worker = this._getWorker();
    if (!worker) {
      if (onError) onError('Web Worker not supported');
      return;
    }
    this._workerDownloading = true;
    this._onDownloadProgress = onProgress;
    this._onDownloadSuccess = onSuccess;
    this._onDownloadError = onError;

    worker.postMessage({
      type: 'INIT_VOICE',
      payload: { id: 'en_US-lessac-low', forceRefresh: !!forceRefresh }
    });
  },

  async desinstalarVozNeural() {
    try {
      if (typeof caches !== 'undefined') {
        await caches.delete('en-voice-cache-v1');
      }
    } catch (_) {}
    localStorage.removeItem('en_voz_neural_instalada');
    if (localStorage.getItem('en_preferred_voice') === 'wasm_neural' || localStorage.getItem('en_voz_preferida') === 'wasm_neural') {
      localStorage.removeItem('en_preferred_voice');
      localStorage.removeItem('en_voz_preferida');
    }
    this._workerInitialized = false;
    this._workerDownloading = false;
    if (this._worker) {
      try { this._worker.terminate(); } catch (_) {}
      this._worker = null;
    }
    return true;
  },

  parar() {
    window._activeVoiceUtterance = null;
    if (typeof speechSynthesis !== 'undefined') {
      try { speechSynthesis.cancel(); } catch (_) {}
    }
    if (this._currentAudioSource) {
      try {
        this._currentAudioSource.stop();
        this._currentAudioSource.disconnect();
      } catch (_) {}
      this._currentAudioSource = null;
    }
  },

  async _tocarBuffer(wavBuffer, opcoes = {}) {
    this.parar();
    const ctx = this.getAudioContext();
    if (!ctx) return false;

    try {
      const audioBuffer = await ctx.decodeAudioData(wavBuffer.slice(0));
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = opcoes.rate || 1.0;

      source.connect(ctx.destination);
      this._currentAudioSource = source;

      source.onended = () => {
        if (this._currentAudioSource === source) {
          this._currentAudioSource = null;
        }
        if (opcoes.onend) opcoes.onend();
      };

      source.start();
      return true;
    } catch (err) {
      console.warn('[VoiceEngine] Failed to decode buffer:', err);
      if (opcoes.onerror) opcoes.onerror(err);
      return false;
    }
  },

  falar(texto, opcoes = {}) {
    if (!texto) return false;
    const textoNorm = this.normalizeForSpeech(texto);
    if (!textoNorm) return false;

    if (typeof speechSynthesis === 'undefined') return false;

    try {
      if (speechSynthesis.paused) {
        try { speechSynthesis.resume(); } catch (_) {}
      }
      this.parar();

      const voz = this.getSelectedVoice();
      const u = new SpeechSynthesisUtterance(textoNorm);
      u.lang = (voz && voz.lang) ? voz.lang : 'en-US';
      if (voz) u.voice = voz;

      const rate = opcoes.rate || parseFloat(localStorage.getItem('en_audio_speed') || '0.85');
      u.rate = Math.max(0.5, Math.min(2.0, rate));
      u.pitch = opcoes.pitch || 1.0;

      u.onend = () => {
        window._activeVoiceUtterance = null;
        if (opcoes.onend) opcoes.onend();
      };
      u.onerror = (e) => {
        window._activeVoiceUtterance = null;
        if (opcoes.onerror) opcoes.onerror(e);
      };

      window._activeVoiceUtterance = u;
      speechSynthesis.speak(u);
      return true;
    } catch (e) {
      console.warn('[VoiceEngine] speechSynthesis failed:', e);
      return false;
    }
  },

  async falarNeural(texto, opcoes = {}) {
    if (!texto) return false;
    const textoNorm = this.normalizeForSpeech(texto);
    if (!textoNorm) return false;

    this.parar();

    if (typeof AudioCache !== 'undefined') {
      try {
        const blobCache = await AudioCache.obter(textoNorm, 'neural_en');
        if (blobCache && blobCache.size > 4096) {
          const buffer = await blobCache.arrayBuffer();
          if (buffer.byteLength > 4096) {
            return await this._tocarBuffer(buffer, opcoes);
          }
        }
      } catch (_) {}
    }

    return this.falar(textoNorm, opcoes);
  }
};

// Aliases for compatibility
VoiceEngine.normalizarParaFala = (t) => VoiceEngine.normalizeForSpeech(t);
VoiceEngine.obterMelhoresVozesInglesas = () => VoiceEngine.getBestEnglishVoices();
VoiceEngine.obterVozSelecionada = () => VoiceEngine.getSelectedVoice();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = VoiceEngine;
}
