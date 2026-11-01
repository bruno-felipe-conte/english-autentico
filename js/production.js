/**
 * Production Validator para Língua Inglesa (A Provocação)
 * Valida respostas digitadas ativamente pelo usuário em Quizzes e Exercícios.
 * Combina tolerância a typos leves (Levenshtein <= 1) com diagnósticos morfológicos estritos
 * (contrações, artigos a/an, preposições in/on/at, plurais irregulares e verbos irregulares).
 * Compatível com Browser e Node.js.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ProductionValidator = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // Pares mínimos de preposições e artigos que NÃO podem ser tolerados como typo
  const CRITICAL_PARTICLES = new Set([
    'in', 'on', 'at', 'to', 'of', 'for', 'by', 'up', 'as', 'a', 'an'
  ]);

  // Plurais e verbos irregulares comuns
  const IRREGULAR_PAIRS = {
    'child': 'children',
    'foot': 'feet',
    'tooth': 'teeth',
    'man': 'men',
    'woman': 'women',
    'person': 'people',
    'mouse': 'mice',
    'go': 'went',
    'see': 'saw',
    'buy': 'bought',
    'do': 'did',
    'have': 'had',
    'write': 'wrote',
    'eat': 'ate'
  };

  const ProductionValidator = {
    /**
     * Normaliza a string de entrada: minúsculas, remove pontuação redundante,
     * unifica apóstrofos e remove espaços múltiplos.
     * @param {string} str
     * @returns {string}
     */
    normalize(str) {
      if (!str || typeof str !== 'string') return '';
      return str
        .trim()
        .toLowerCase()
        .replace(/[’`]/g, "'") // normaliza apóstrofos
        .replace(/[.,!?;:"]/g, '') // remove pontuação terminal
        .replace(/\s+/g, ' ');
    },

    /**
     * Calcula a distância de Levenshtein entre duas strings.
     * @param {string} a
     * @param {string} b
     * @returns {number}
     */
    levenshtein(a, b) {
      if (a === b) return 0;
      if (!a.length) return b.length;
      if (!b.length) return a.length;

      const matrix = [];
      for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }
      for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substituição
              matrix[i][j - 1] + 1,     // inserção
              matrix[i - 1][j] + 1      // remoção
            );
          }
        }
      }
      return matrix[b.length][a.length];
    },

    /**
     * Valida a resposta do usuário contra a resposta esperada.
     * @param {string} input Resposta digitada
     * @param {string} expected Resposta correta
     * @returns {{ isCorrect: boolean, isTypo: boolean, diagnostic: string | null }}
     */
    validate(input, expected) {
      const normInput = this.normalize(input);
      const normExpected = this.normalize(expected);

      if (!normInput) {
        return { isCorrect: false, isTypo: false, diagnostic: 'Digite uma resposta antes de enviar.' };
      }

      // Correspondência exata
      if (normInput === normExpected) {
        return { isCorrect: true, isTypo: false, isFuzzy: false, distance: 0, diagnostic: null };
      }

      // ── Diagnóstico 1: Contrações sem apóstrofo (dont vs don't) ──
      const noAposInput = normInput.replace(/'/g, '');
      const noAposExpected = normExpected.replace(/'/g, '');
      if (noAposInput === noAposExpected && normExpected.includes("'") && !normInput.includes("'")) {
        return {
          isCorrect: false,
          isTypo: false,
          isFuzzy: false,
          distance: 1,
          diagnostic: `Atenção à contração: em inglês formal usa-se o apóstrofo (${normExpected}).`
        };
      }

      // ── Diagnóstico 2: Artigos 'a' vs 'an' ──
      if (normExpected === 'a' && normInput === 'an') {
        return { isCorrect: false, isTypo: false, isFuzzy: false, distance: 1, diagnostic: "Usa-se 'a' antes de sons consonantais." };
      }
      if (normExpected === 'an' && normInput === 'a') {
        return { isCorrect: false, isTypo: false, isFuzzy: false, distance: 1, diagnostic: "Usa-se 'an' antes de sons vocálicos." };
      }

      // ── Diagnóstico 3: Preposições críticas (in, on, at, to) ──
      if (CRITICAL_PARTICLES.has(normExpected) && CRITICAL_PARTICLES.has(normInput)) {
        return {
          isCorrect: false,
          isTypo: false,
          isFuzzy: false,
          distance: 1,
          diagnostic: `Preposição incorreta: '${normInput}' em vez de '${normExpected}'.`
        };
      }

      // ── Diagnóstico 4: Plurais ou verbos irregulares ──
      for (const [singular, plural] of Object.entries(IRREGULAR_PAIRS)) {
        if (normExpected === plural && normInput === singular) {
          return {
            isCorrect: false,
            isTypo: false,
            isFuzzy: false,
            distance: Math.abs(normExpected.length - normInput.length),
            diagnostic: `Forma incorreta: '${normExpected}' é irregular (não use '${normInput}').`
          };
        }
        if (normExpected === singular && normInput === plural) {
          return {
            isCorrect: false,
            isTypo: false,
            isFuzzy: false,
            distance: Math.abs(normExpected.length - normInput.length),
            diagnostic: `Esperava-se a forma base '${normExpected}'.`
          };
        }
      }

      // ── Diagnóstico 5: Distância de Levenshtein para typos ──
      const dist = this.levenshtein(normInput, normExpected);

      // Typos leves: distância 1 em palavras com 4 ou mais letras
      if (dist === 1 && normExpected.length >= 4) {
        return {
          isCorrect: true,
          isTypo: true,
          isFuzzy: true,
          distance: 1,
          diagnostic: `Pequeno erro de digitação aceito (${normInput} → ${normExpected}).`
        };
      }

      return {
        isCorrect: false,
        isTypo: false,
        isFuzzy: false,
        distance: dist,
        diagnostic: `Resposta incorreta. A forma certa é: "${expected}".`
      };
    }
  };

  return ProductionValidator;
});
