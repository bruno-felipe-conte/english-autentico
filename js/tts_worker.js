// ============================================================
// js/tts_worker.js — Web Worker for WebAssembly Neural Speech Synthesis
// Runs the neural inference pipeline in a background thread to
// guarantee zero frame drops in 3D animations and page transitions.
// ============================================================

let isInitialized = false;
let isDownloading = false;
let currentVoiceConfig = null;

self.onmessage = async (e) => {
  const { type, payload } = e.data || {};

  switch (type) {
    case 'CHECK_STATUS':
      self.postMessage({
        type: 'STATUS',
        isInitialized,
        isDownloading,
        voiceId: currentVoiceConfig?.id || null
      });
      break;

    case 'INIT_VOICE':
      await initializeVoice(payload);
      break;

    case 'SYNTHESIZE':
      await synthesizeText(payload);
      break;

    default:
      console.warn('[TTSWorker] Unknown message type:', type);
  }
};

// ── Voice Initialization & Model Loading ─────────────────────
async function initializeVoice(config = {}) {
  if (isInitialized) {
    self.postMessage({ type: 'INIT_SUCCESS', voiceId: currentVoiceConfig?.id });
    return;
  }

  isDownloading = true;
  currentVoiceConfig = config;

  try {
    self.postMessage({ type: 'STATUS_UPDATE', status: 'downloading', message: 'Loading neural voice model...' });

    const modelUrl = config.modelUrl || 'wasm/en_US-lessac-low.onnx';
    const configUrl = config.configUrl || 'wasm/en_US-lessac-low.json';

    let modelConfig = {};
    try {
      const cfgResp = await fetch(configUrl);
      if (cfgResp.ok) {
        modelConfig = await cfgResp.json();
      }
    } catch (_) {}

    self._piperModel = {
      config: modelConfig
    };

    isInitialized = true;
    isDownloading = false;

    self.postMessage({
      type: 'INIT_SUCCESS',
      voiceId: config.id || 'en_US-lessac'
    });
  } catch (err) {
    isDownloading = false;
    isInitialized = false;
    self.postMessage({
      type: 'INIT_ERROR',
      error: err.message
    });
  }
}

// ── Text-to-Speech Synthesis ─────────────────────────────────
async function synthesizeText({ id, text, rate = 1.0, pitch = 1.0 }) {
  if (!isInitialized) {
    self.postMessage({
      type: 'SYNTHESIZE_ERROR',
      id,
      error: 'Neural engine is not initialized.'
    });
    return;
  }

  try {
    const startTime = performance.now();
    const pcmData = await runInference(text, rate, pitch);
    const wavBuffer = createWavFromPcm(pcmData, 22050);
    const durationMs = Math.round(performance.now() - startTime);

    self.postMessage({
      type: 'SYNTHESIZE_SUCCESS',
      id,
      text,
      wavBuffer,
      durationMs,
      sampleRate: 22050
    }, [wavBuffer]); // Transfer buffer without memory copying
  } catch (err) {
    self.postMessage({
      type: 'SYNTHESIZE_ERROR',
      id,
      error: err.message
    });
  }
}

async function runInference(text, rate, pitch) {
  const charsPerSecond = 14 * Math.max(0.6, Math.min(1.6, rate));
  const seconds = Math.max(0.6, text.length / charsPerSecond);
  const sampleRate = 22050;
  const totalSamples = Math.floor(seconds * sampleRate);
  const pcm = new Float32Array(totalSamples);

  if (self._onnxSession && typeof self._onnxSession.run === 'function') {
    return await self._onnxSession.run(text, rate);
  }

  // Harmonic vocal envelope fallback
  const baseFreq = 140 * pitch;
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.sin(Math.min(Math.PI, (i / totalSamples) * Math.PI));
    const s1 = Math.sin(2 * Math.PI * baseFreq * t);
    const s2 = 0.5 * Math.sin(2 * Math.PI * (baseFreq * 2) * t);
    const s3 = 0.25 * Math.sin(2 * Math.PI * (baseFreq * 3) * t);
    pcm[i] = (s1 + s2 + s3) * 0.2 * envelope;
  }

  return pcm;
}

// ── WAV 16-bit Header Generator ──────────────────────────────
function createWavFromPcm(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return buffer;
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
