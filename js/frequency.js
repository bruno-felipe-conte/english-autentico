/**
 * Client de Frequência Vocabular para Inglês (NGSL / COCA Top 3000)
 * Suporta lookup O(1) e amostragem estratificada por bandas.
 * Compatível com Browser (IIFE/Window) e Node.js (CommonJS).
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FrequencyClient = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  let _dataset = null;
  const _index = new Map();

  const FrequencyClient = {
    /**
     * Inicializa o cliente com dados fornecidos ou via fetch.
     * @param {Object} [customData]
     * @returns {Promise<boolean>}
     */
    async init(customData = null) {
      if (customData) {
        this._loadDataset(customData);
        return true;
      }

      if (_dataset) return true;

      try {
        if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
          const resp = await window.fetch('data/frequency_3000.json');
          if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
          const json = await resp.json();
          this._loadDataset(json);
          return true;
        } else if (typeof require === 'function') {
          const path = require('path');
          const fs = require('fs');
          const filePath = path.resolve(__dirname, '../data/frequency_3000.json');
          const content = fs.readFileSync(filePath, 'utf-8');
          this._loadDataset(JSON.parse(content));
          return true;
        }
      } catch (err) {
        console.warn('[FrequencyClient] Falha ao carregar data/frequency_3000.json:', err.message);
        return false;
      }
      return false;
    },

    /**
     * Carrega e indexa o dataset na memória para lookup O(1).
     * @param {Object} data
     */
    _loadDataset(data) {
      if (!data || !Array.isArray(data.lemmi)) return;
      _dataset = data;
      _index.clear();
      for (let i = 0; i < data.lemmi.length; i++) {
        const item = data.lemmi[i];
        if (item && item.lemma) {
          _index.set(item.lemma.toLowerCase(), item);
        }
      }
    },

    /**
     * Verifica se o dataset está carregado.
     * @returns {boolean}
     */
    isLoaded() {
      return _dataset !== null && _index.size > 0;
    },

    /**
     * Busca um lema com custo O(1).
     * @param {string} lemma
     * @returns {{ lemma: string, rank: number, banda: number } | null}
     */
    lookup(lemma) {
      if (!lemma || typeof lemma !== 'string') return null;
      return _index.get(lemma.trim().toLowerCase()) || null;
    },

    /**
     * Retorna se a palavra pertence a uma banda específica (1, 2 ou 3).
     * @param {string} lemma
     * @param {number} banda
     * @returns {boolean}
     */
    isInBand(lemma, banda) {
      const info = this.lookup(lemma);
      return info !== null && info.banda === Number(banda);
    },

    /**
     * Retorna os metadados de uma banda.
     * @param {number} banda
     * @returns {{ nome: string, range: [number, number], dimensione: number } | null}
     */
    getBandInfo(banda) {
      if (!_dataset || !_dataset.bande) return null;
      return _dataset.bande[String(banda)] || null;
    },

    /**
     * Amostragem determinística estratificada de uma banda.
     * @param {number} banda (1, 2 ou 3)
     * @param {number} count Quantidade de palavras a sortear
     * @param {Function} [rng] Gerador de número pseudo-aleatório [0, 1)
     * @returns {Array<{ lemma: string, rank: number, banda: number }>}
     */
    sampleBand(banda, count, rng = Math.random) {
      if (!_dataset || !Array.isArray(_dataset.lemmi) || count <= 0) return [];
      const numBanda = Number(banda);
      const pool = _dataset.lemmi.filter(item => item.banda === numBanda);
      if (pool.length === 0) return [];

      const n = Math.min(count, pool.length);
      // Algoritmo de Fisher-Yates parcial
      const copy = pool.slice();
      const result = [];

      for (let i = 0; i < n; i++) {
        const randVal = typeof rng === 'function' ? rng() : Math.random();
        const clampedRand = Math.max(0, Math.min(0.999999999, Number(randVal) || 0));
        const pickedIdx = i + Math.floor(clampedRand * (copy.length - i));
        const temp = copy[i];
        copy[i] = copy[pickedIdx];
        copy[pickedIdx] = temp;
        result.push(copy[i]);
      }

      return result;
    },

    /**
     * Retorna a contagem total de lemas indexados.
     * @returns {number}
     */
    getTotalCount() {
      return _index.size;
    }
  };

  return FrequencyClient;
});
