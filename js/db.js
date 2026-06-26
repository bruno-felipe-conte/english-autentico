// ============================================================
// db.js — IndexedDB store layer (camada de abstração de dados)
// ============================================================
// Futuro: substituir localStorage por IndexedDB para:
// - Storage assíncrono (non-blocking)
// - Limite de 50MB+ (vs 5-10MB)
// - Índices para busca rápida
// - Transações atômicas

const DB = {
  _db: null,
  _name: 'EnglishLearningApp',
  _version: 1,
  _stores: ['progresso', 'flashcards', 'vocab', 'config'],

  // Inicializar banco de dados
  async init() {
    if (this._db) return this._db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this._name, this._version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        this._stores.forEach(storeName => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'key' });
          }
        });
      };

      request.onsuccess = (event) => {
        this._db = event.target.result;
        resolve(this._db);
      };

      request.onerror = (event) => {
        console.error('IndexedDB init error:', event.target.error);
        reject(event.target.error);
      };
    });
  },

  // Obter item
  async get(store, key) {
    if (!this._db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result?.value ?? null);
      req.onerror = () => reject(req.error);
    });
  },

  // Salvar item
  async set(store, value, key = 'main') {
    if (!this._db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(store, 'readwrite');
      tx.objectStore(store).put({ key, value });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  },

  // Remover item
  async remove(store, key) {
    if (!this._db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(store, 'readwrite');
      tx.objectStore(store).delete(key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  },

  // Obter todos os itens de uma store
  async getAll(store) {
    if (!this._db) await this.init();
    return new Promise((resolve, reject) => {
      const tx = this._db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result.map(r => r.value));
      req.onerror = () => reject(req.error);
    });
  },

  // Função auxiliar: tenta usar IndexedDB, fallback para localStorage
  async getWithFallback(storageKey) {
    try {
      const val = await this.get('config', storageKey);
      if (val !== null) return val;
      // Fallback: ler do localStorage e migrar para IndexedDB
      const localVal = localStorage.getItem(storageKey);
      if (localVal) {
        const parsed = JSON.parse(localVal);
        await this.set('config', parsed, storageKey);
        return parsed;
      }
      return null;
    } catch (e) {
      console.warn('IndexedDB não disponível, usando localStorage');
      try {
        return JSON.parse(localStorage.getItem(storageKey));
      } catch (e2) {
        return null;
      }
    }
  },

  // Função auxiliar: salva em IndexedDB com fallback para localStorage
  async setWithFallback(storageKey, value) {
    try {
      await this.set('config', value, storageKey);
    } catch (e) {
      console.warn('IndexedDB write failed, falling back to localStorage');
    }
    // Sempre salvar em localStorage como backup
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (_) {}
  },
};
