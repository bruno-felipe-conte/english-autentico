// ============================================================
// js/audio_cache.js — Persistent Local Audio Cache (IndexedDB)
// Stores synthesized speech or downloaded audio clips directly
// in the user's browser, enabling zero-latency (0ms) offline audio
// for reading passages, stories, flashcards, and sentences.
// ============================================================

const AudioCache = {
  DB_NAME: 'en_audio_db',
  DB_VERSION: 1,
  STORE_NAME: 'audio_cache',
  _dbPromise: null,

  // Opens or retrieves active IndexedDB connection
  _openDB() {
    if (this._dbPromise) return this._dbPromise;

    this._dbPromise = new Promise((resolve) => {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }

      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'hash' });
        }
      };

      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => {
        console.warn('[AudioCache] Failed to open IndexedDB:', e);
        resolve(null);
      };
    });

    return this._dbPromise;
  },

  // Generates consistent SHA-256 or FNV-1a hash key for text + voice ID
  async generateHash(text, voiceId = 'default') {
    const raw = `${voiceId}:${(text || '').trim().toLowerCase()}`;
    if (typeof crypto !== 'undefined' && crypto.subtle && crypto.subtle.digest) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(raw);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 32);
      } catch (_) {}
    }

    // FNV-1a 32-bit fast fallback
    let h = 0x811c9dc5;
    for (let i = 0; i < raw.length; i++) {
      h ^= raw.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return 'fnv_' + (h >>> 0).toString(16);
  },

  // Retrieves cached audio blob or array buffer by text and voice
  async getAudio(text, voiceId = 'default') {
    const db = await this._openDB();
    if (!db) return null;

    const hash = await this.generateHash(text, voiceId);

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.STORE_NAME, 'readonly');
        const store = tx.objectStore(this.STORE_NAME);
        const req = store.get(hash);

        req.onsuccess = () => {
          if (req.result && req.result.audioBlob) {
            resolve({
              hash,
              blob: req.result.audioBlob,
              url: URL.createObjectURL(req.result.audioBlob),
              timestamp: req.result.timestamp
            });
          } else {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
      } catch (err) {
        console.warn('[AudioCache] Error reading cache:', err);
        resolve(null);
      }
    });
  },

  // Saves an audio blob into IndexedDB with LRU protection
  async saveAudio(text, voiceId = 'default', audioBlob) {
    if (!audioBlob) return false;
    const db = await this._openDB();
    if (!db) return false;

    const hash = await this.generateHash(text, voiceId);

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);

        const record = {
          hash,
          voiceId,
          text: (text || '').substring(0, 150),
          audioBlob,
          size: audioBlob.size || 0,
          timestamp: Date.now()
        };

        store.put(record);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (err) {
        console.warn('[AudioCache] Error saving audio to cache:', err);
        resolve(false);
      }
    });
  },

  // Clears all cached audio files
  async clearCache() {
    const db = await this._openDB();
    if (!db) return false;

    return new Promise((resolve) => {
      try {
        const tx = db.transaction(this.STORE_NAME, 'readwrite');
        const store = tx.objectStore(this.STORE_NAME);
        store.clear();
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
      } catch (_) {
        resolve(false);
      }
    });
  }
};
