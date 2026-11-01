/**
 * English Text Normalizer & Readability Engine
 * Suporta descompactação de contrações, possessivos, lematização de verbos/plurais
 * e cálculo do índice Flesch Reading Ease para textos em inglês.
 * Compatível com Browser e Node.js.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TextNormalizer = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // Mapeamento de contrações comuns do inglês
  const CONTRACTIONS = {
    "aren't": ["are", "not"],
    "can't": ["can", "not"],
    "couldn't": ["could", "not"],
    "didn't": ["did", "not"],
    "doesn't": ["does", "not"],
    "don't": ["do", "not"],
    "hadn't": ["had", "not"],
    "hasn't": ["has", "not"],
    "haven't": ["have", "not"],
    "he'd": ["he", "would"],
    "he'll": ["he", "will"],
    "he's": ["he", "is"],
    "i'd": ["i", "would"],
    "i'll": ["i", "will"],
    "i'm": ["i", "am"],
    "i've": ["i", "have"],
    "isn't": ["is", "not"],
    "it's": ["it", "is"],
    "let's": ["let", "us"],
    "mightn't": ["might", "not"],
    "mustn't": ["must", "not"],
    "shan't": ["shall", "not"],
    "she'd": ["she", "would"],
    "she'll": ["she", "will"],
    "she's": ["she", "is"],
    "shouldn't": ["should", "not"],
    "that's": ["that", "is"],
    "there's": ["there", "is"],
    "they'd": ["they", "would"],
    "they'll": ["they", "will"],
    "they're": ["they", "are"],
    "they've": ["they", "have"],
    "we'd": ["we", "would"],
    "we'll": ["we", "will"],
    "we're": ["we", "are"],
    "we've": ["we", "have"],
    "weren't": ["were", "not"],
    "what's": ["what", "is"],
    "who's": ["who", "is"],
    "won't": ["will", "not"],
    "wouldn't": ["would", "not"],
    "you'd": ["you", "would"],
    "you'll": ["you", "will"],
    "you're": ["you", "are"],
    "you've": ["you", "have"]
  };

  // Dicionário de formas irregulares frequentes do inglês
  const IRREGULAR_LEMMAS = {
    // Verbo to be
    "am": "be", "is": "be", "are": "be", "was": "be", "were": "be", "been": "be", "being": "be",
    // Verbos de alta frequência
    "had": "have", "has": "have", "having": "have",
    "did": "do", "does": "do", "doing": "do", "done": "do",
    "said": "say", "saying": "say", "says": "say",
    "went": "go", "goes": "go", "going": "go", "gone": "go",
    "got": "get", "getting": "get", "gotten": "get", "gets": "get",
    "made": "make", "making": "make", "makes": "make",
    "knew": "know", "knowing": "know", "known": "know", "knows": "know",
    "thought": "think", "thinking": "think", "thinks": "think",
    "took": "take", "taking": "take", "taken": "take", "takes": "take",
    "saw": "see", "seeing": "see", "seen": "see", "sees": "see",
    "came": "come", "coming": "come", "comes": "come",
    "could": "can",
    "wanted": "want", "wanting": "want", "wants": "want",
    "looked": "look", "looking": "look", "looks": "look",
    "told": "tell", "telling": "tell", "tells": "tell",
    "became": "become", "becoming": "become", "becomes": "become",
    "felt": "feel", "feeling": "feel", "feels": "feel",
    "found": "find", "finding": "find", "finds": "find",
    "left": "leave", "leaving": "leave", "leaves": "leave",
    "brought": "bring", "bringing": "bring", "brings": "bring",
    "began": "begin", "beginning": "begin", "begun": "begin", "begins": "begin",
    "kept": "keep", "keeping": "keep", "keeps": "keep",
    "held": "hold", "holding": "hold", "holds": "hold",
    "wrote": "write", "writing": "write", "written": "write", "writes": "write",
    "stood": "stand", "standing": "stand", "stands": "stand",
    "lost": "lose", "losing": "lose", "loses": "lose",
    "paid": "pay", "paying": "pay", "pays": "pay",
    "met": "meet", "meeting": "meet", "meets": "meet",
    "sat": "sit", "sitting": "sit", "sits": "sit",
    "spoke": "speak", "speaking": "speak", "spoken": "speak", "speaks": "speak",
    "read": "read", "reading": "read", "reads": "read",
    "spent": "spend", "spending": "spend", "spends": "spend",
    "grew": "grow", "growing": "grow", "grown": "grow", "grows": "grow",
    "won": "win", "winning": "win", "wins": "win",
    "bought": "buy", "buying": "buy", "buys": "buy",
    "sent": "send", "sending": "send", "sends": "send",
    "built": "build", "building": "build", "builds": "build",
    "fell": "fall", "falling": "fall", "fallen": "fall", "falls": "fall",
    "ran": "run", "running": "run", "runs": "run",
    "drove": "drive", "driving": "drive", "driven": "drive", "drives": "drive",
    "chose": "choose", "choosing": "choose", "chosen": "choose", "chooses": "choose",
    "broke": "break", "breaking": "break", "broken": "break", "breaks": "break",
    "ate": "eat", "eating": "eat", "eaten": "eat", "eats": "eat",
    "drank": "drink", "drinking": "drink", "drunk": "drink", "drinks": "drink",
    "slept": "sleep", "sleeping": "sleep", "sleeps": "sleep",
    "swam": "swim", "swimming": "swim", "swum": "swim", "swims": "swim",
    "flew": "fly", "flying": "fly", "flown": "fly", "flies": "fly",
    "taught": "teach", "teaching": "teach", "teaches": "teach",
    "caught": "catch", "catching": "catch", "catches": "catch",
    "heard": "hear", "hearing": "hear", "hears": "hear",
    "understood": "understand", "understanding": "understand", "understands": "understand",

    // Plurais irregulares
    "children": "child",
    "men": "man",
    "women": "woman",
    "people": "person",
    "feet": "foot",
    "teeth": "tooth",
    "mice": "mouse",
    "geese": "goose",
    "lives": "life",
    "knives": "knife",
    "wives": "wife",
    "halves": "half",
    "leaves": "leaf",
    "shelves": "shelf",
    "thieves": "thief",
    "wolves": "wolf"
  };

  const TextNormalizer = {
    /**
     * Tokeniza texto em inglês separando pontuação, descompactando contrações
     * e possessivos ('s), e convertendo em caixa baixa.
     * @param {string} text
     * @returns {string[]}
     */
    tokenize(text) {
      if (!text || typeof text !== 'string') return [];
      const trimmed = text.trim();
      if (!trimmed) return [];

      // Divide em palavras aproximadas
      const rawTokens = trimmed
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"“”«»\[\]\\|<>]/g, ' ')
        .split(/\s+/)
        .filter(t => t.length > 0);

      const tokens = [];

      for (let i = 0; i < rawTokens.length; i++) {
        let t = rawTokens[i].toLowerCase();

        // Limpeza de apóstrofos no início ou fim
        t = t.replace(/^['’]+|['’]+$/g, '');
        if (!t) continue;

        // Normalização de apóstrofo tipográfico
        t = t.replace(/’/g, "'");

        // Trata contrações conhecidas
        if (CONTRACTIONS[t]) {
          tokens.push(...CONTRACTIONS[t]);
          continue;
        }

        // Trata possessivos e contrações genéricas com apóstrofo
        if (t.includes("'")) {
          const parts = t.split("'");
          if (parts.length === 2) {
            const [base, suffix] = parts;
            if (suffix === 's') {
              // Possessivo ou 'is' -> extrai base limpa
              if (base) tokens.push(base);
              continue;
            } else if (suffix === 'm' && base === 'i') {
              tokens.push('i', 'am');
              continue;
            } else if (suffix === 're') {
              tokens.push(base, 'are');
              continue;
            } else if (suffix === 've') {
              tokens.push(base, 'have');
              continue;
            } else if (suffix === 'll') {
              tokens.push(base, 'will');
              continue;
            } else if (suffix === 'd') {
              tokens.push(base, 'would');
              continue;
            } else if (suffix === 't' && base.endsWith('n')) {
              tokens.push(base.slice(0, -1), 'not');
              continue;
            }
          }
        }

        tokens.push(t);
      }

      return tokens;
    },

    /**
     * Mapeia uma palavra em inglês para seu lema base canônico.
     * @param {string} word
     * @returns {string}
     */
    lemmatize(word) {
      if (!word || typeof word !== 'string') return '';
      const w = word.trim().toLowerCase().replace(/['’]/g, '');
      if (!w) return '';

      // 1. Busca em irregulares conhecidos
      if (IRREGULAR_LEMMAS[w]) {
        return IRREGULAR_LEMMAS[w];
      }

      // 2. Advérbios em -ly -> adjetivo base
      if (w.length > 4 && w.endsWith('ly')) {
        if (w.endsWith('ily')) {
          return w.slice(0, -3) + 'y'; // happily -> happy, easily -> easy
        }
        if (w.endsWith('ably') || w.endsWith('ibly')) {
          return w.slice(0, -1) + 'e'; // probably -> probable, possibly -> possible
        }
        return w.slice(0, -2); // quickly -> quick, quietly -> quiet
      }

      // 3. Verbos em -ing (gerúndio)
      if (w.length > 5 && w.endsWith('ing')) {
        const stem = w.slice(0, -3);
        // Dobras consonantais (running -> run, swimming -> swim)
        if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
          return stem.slice(0, -1);
        }
        // E mudo omitido (making -> make, writing -> write)
        if (/[bcdfghjklmnpqrstvwxyz][aeiou][bcdfghjklmnpqrstvwxyz]$/.test(stem)) {
          return stem + 'e';
        }
        return stem;
      }

      // 4. Verbos em -ed (passado regular)
      if (w.length > 4 && w.endsWith('ed')) {
        const stem = w.slice(0, -2);
        if (w.endsWith('ied')) {
          return w.slice(0, -3) + 'y'; // carried -> carry, tried -> try
        }
        // Dobras (stopped -> stop, planned -> plan)
        if (stem.length >= 3 && stem[stem.length - 1] === stem[stem.length - 2]) {
          return stem.slice(0, -1);
        }
        if (w.endsWith('eed')) {
          return stem + 'd'; // agreed -> agree
        }
        return stem;
      }

      // 5. Plurais regulares em -ies, -es, -s
      if (w.length > 3 && w.endsWith('ies')) {
        return w.slice(0, -3) + 'y'; // cities -> city, baby -> babies
      }
      if (w.length > 4 && w.endsWith('es')) {
        // sibilantes: -s, -ss, -sh, -ch, -x, -z
        const base = w.slice(0, -2);
        if (/(s|sh|ch|x|z)$/.test(base)) {
          return base; // boxes -> box, watches -> watch
        }
        return w.slice(0, -1); // lives -> life já tratado, houses -> house
      }
      if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) {
        return w.slice(0, -1); // books -> book, cats -> cat
      }

      return w;
    },

    /**
     * Conta sílabas de uma palavra em inglês por heurística fonética.
     * @param {string} word
     * @returns {number}
     */
    countSyllables(word) {
      if (!word || typeof word !== 'string') return 0;
      let w = word.trim().toLowerCase().replace(/[^a-z]/g, '');
      if (w.length <= 3) return 1;

      // Exceções e e-mudo no final
      w = w.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
      w = w.replace(/^y/, '');

      const matches = w.match(/[aeiouy]{1,2}/g);
      return matches ? Math.max(1, matches.length) : 1;
    },

    /**
     * Calcula o índice Flesch Reading Ease para textos em inglês:
     * RE = 206.835 - 1.015 * (TotalWords / TotalSentences) - 84.6 * (TotalSyllables / TotalWords)
     * @param {string} text
     * @returns {{ score: number, gradeLevel: number, interpretacao: string }}
     */
    calculateFleschIndex(text) {
      if (!text || typeof text !== 'string') {
        return { score: 100, gradeLevel: 1, interpretacao: 'Muito Fácil' };
      }
      const trimmed = text.trim();
      if (!trimmed) {
        return { score: 100, gradeLevel: 1, interpretacao: 'Muito Fácil' };
      }

      // Contagem de sentenças
      const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const totalSentences = Math.max(1, sentences.length);

      // Contagem de palavras
      const words = trimmed
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"“”«»\[\]\\|<>]/g, ' ')
        .split(/\s+/)
        .filter(w => /[a-zA-Z]/.test(w));

      const totalWords = Math.max(1, words.length);

      // Contagem de sílabas
      let totalSyllables = 0;
      for (let i = 0; i < words.length; i++) {
        totalSyllables += this.countSyllables(words[i]);
      }
      totalSyllables = Math.max(1, totalSyllables);

      const wordsPerSentence = totalWords / totalSentences;
      const syllablesPerWord = totalSyllables / totalWords;

      const rawScore = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
      const score = Math.round(Math.max(0, Math.min(100, rawScore)) * 10) / 10;

      // Flesch-Kincaid Grade Level: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
      const rawGrade = (0.39 * wordsPerSentence) + (11.8 * syllablesPerWord) - 15.59;
      const gradeLevel = Math.round(Math.max(1, rawGrade) * 10) / 10;

      let interpretacao = 'Padrão';
      if (score >= 90) interpretacao = 'Muito Fácil';
      else if (score >= 80) interpretacao = 'Fácil';
      else if (score >= 70) interpretacao = 'Razoavelmente Fácil';
      else if (score >= 60) interpretacao = 'Padrão';
      else if (score >= 50) interpretacao = 'Razoavelmente Difícil';
      else if (score >= 30) interpretacao = 'Difícil';
      else interpretacao = 'Muito Difícil';

      return { score, gradeLevel, interpretacao };
    }
  };

  return TextNormalizer;
});
