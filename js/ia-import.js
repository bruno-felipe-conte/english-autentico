// ============================================================
// ia-import.js — Adição de conteúdo via IA (Prompt-Assisted Import)
// Fluxo: copiar prompt → colar no LLM → colar JSON de volta → importar
// ============================================================

const IAImport = {
  tipoAtual: null,

  // ── Prompts por tipo ─────────────────────────────────────
  prompts: {
    dialogo: `Create a dialogue in American English for Portuguese-speaking learners. Return ONLY the JSON, no text before or after.

MANDATORY RULES:
1. CHARACTER turns: fields "frase" (English), "traducao" (Portuguese), "audio_ipa" (leave "")
2. "Tu" turns: "frase" = the CORRECT English answer, "traducao" = Portuguese translation, PLUS "alternativas" (4 options in English, correct one INCLUDED) and "resposta_correta" = 0-3 index of correct option
3. Always alternate: CHARACTER → Tu → CHARACTER → Tu... (no limit on turns)
4. All speech in natural American English, all translations in Brazilian Portuguese

FULL EXAMPLE (copy exactly this format):
{
  "id": "dial_custom_001",
  "titulo": "At the Coffee Shop",
  "icone": "☕",
  "nivel": "A1",
  "contexto": "You are ordering coffee at a café.",
  "turni": [
    {
      "id": 1,
      "personaggio": "Barista",
      "frase": "Hi! What can I get for you?",
      "traducao": "Oi! O que posso te oferecer?",
      "audio_ipa": ""
    },
    {
      "id": 2,
      "personaggio": "Tu",
      "frase": "I'd like a large coffee, please.",
      "traducao": "Eu gostaria de um café grande, por favor.",
      "audio_ipa": "",
      "alternativas": [
        "I'd like a large coffee, please.",
        "I don't like coffee at all.",
        "Where is the bathroom?",
        "How much does this cost?"
      ],
      "resposta_correta": 0
    }
  ],
  "vocabulario_chave": ["order", "large", "please"],
  "xp_recompensa": 50
}

DIALOGUE TOPIC: [REPLACE HERE — e.g., "buying a subway ticket in New York", "asking for help at a pharmacy", "checking in at a hotel"]`,

    canzone: `Create data for an American English song for study. It can be any song — original or popular. Return ONLY the JSON, no text before or after.

MANDATORY RULES:
1. Include ALL lines of the song, no limit
2. For lines with a unique, pedagogically interesting word:
   - "palavra_oculta" = the word to guess
   - "texto_lacuna" = the line with that word replaced by ___
   - "dica" = brief grammatical note
   - "repeticoes" = how many consecutive times this line appears (1 if no repeat)
3. For PURELY repetitive lines (identical refrain already included, filler with no learning value):
   - Leave "palavra_oculta" as "" (empty string)
   - "texto_lacuna" = "" (empty)
   - "dica" = "" (empty)
   - "repeticoes" = number of times it appears in sequence
4. NEVER omit lines — use "repeticoes" for repetitions instead of duplicating

FULL EXAMPLE (copy exactly this format):
{
  "id": "can_custom_001",
  "titulo": "Take Me Home, Country Roads",
  "artista": "John Denver",
  "nivel": "A2",
  "icone": "🏔️",
  "tema": "travel",
  "estrofes": [
    {
      "id": 1,
      "texto_completo": "Almost heaven, West Virginia",
      "texto_lacuna": "Almost ___, West Virginia",
      "palavra_oculta": "heaven",
      "traducao": "Quase paraíso, West Virginia",
      "dica": "noun — heaven = paraíso, céu",
      "repeticoes": 1
    },
    {
      "id": 2,
      "texto_completo": "Take me home, country roads",
      "texto_lacuna": "Take me ___, country roads",
      "palavra_oculta": "home",
      "traducao": "Me leve para casa, estradas do interior",
      "dica": "noun/adverb — home = casa, lar",
      "repeticoes": 2
    }
  ],
  "vocabulario_chave": ["heaven", "home", "country"],
  "xp_recompensa": 40
}

SONG: [REPLACE HERE — e.g., "Hey Jude by The Beatles", "a song I wrote about New York City", "Somewhere Over the Rainbow"]`,

    storia: `Create a short story in American English for learners. Return ONLY the JSON, no text before or after.

MANDATORY RULES:
1. "italiano" = paragraph in correct American English (this field keeps the name "italiano" for technical compatibility)
2. "portugues" = COMPLETE translation of the paragraph in Brazilian Portuguese
3. "parole" = list with ALL words of the paragraph — NO EXCEPTIONS
   - Include nouns, verbs, adjectives, adverbs, articles, prepositions, pronouns, conjunctions
   - Each word token must have its own entry (do not skip any word)
   - "parola" = the word exactly as it appears in the English text
   - "traduzione" = translation in Portuguese (1-3 words)
   - "ipa" = IPA phonetic transcription of the word in isolation (e.g., "/hɛloʊ/")
   - "categoria": "noun", "verb", "adjective", "adverb", "article", "preposition", "pronoun", "conjunction" or "expression"
4. Include 4 to 6 paragraphs
5. "nivel" must be A1, A2, B1, B2, C1 or C2

FULL EXAMPLE — note ALL words appear in "parole" (copy exactly this format):
{
  "id": "stor_custom_001",
  "titulo": "A Morning in New York",
  "titulo_pt": "Uma Manhã em Nova York",
  "nivel": "A1",
  "icone": "🗽",
  "autor": "English Autentico",
  "tema": "everyday",
  "descricao": "Sarah wakes up early and walks through the streets of New York.",
  "descricao_pt": "Sarah acorda cedo e caminha pelas ruas de Nova York.",
  "xp_recompensa": 80,
  "testo": [
    {
      "id": "stor_custom_001_p1",
      "italiano": "Sarah wakes up at seven. She opens the window and sees the sun.",
      "portugues": "Sarah acorda às sete. Ela abre a janela e vê o sol.",
      "parole": [
        {"parola": "Sarah",   "traduzione": "Sarah",   "ipa": "/ˈsɛrə/",    "categoria": "noun"},
        {"parola": "wakes",   "traduzione": "acorda",  "ipa": "/weɪks/",    "categoria": "verb"},
        {"parola": "up",      "traduzione": "up",      "ipa": "/ʌp/",       "categoria": "adverb"},
        {"parola": "at",      "traduzione": "às",      "ipa": "/æt/",       "categoria": "preposition"},
        {"parola": "seven",   "traduzione": "sete",    "ipa": "/ˈsɛvən/",   "categoria": "noun"},
        {"parola": "She",     "traduzione": "ela",     "ipa": "/ʃiː/",      "categoria": "pronoun"},
        {"parola": "opens",   "traduzione": "abre",    "ipa": "/ˈoʊpənz/",  "categoria": "verb"},
        {"parola": "the",     "traduzione": "a",       "ipa": "/ðə/",       "categoria": "article"},
        {"parola": "window",  "traduzione": "janela",  "ipa": "/ˈwɪndoʊ/",  "categoria": "noun"},
        {"parola": "and",     "traduzione": "e",       "ipa": "/ænd/",      "categoria": "conjunction"},
        {"parola": "sees",    "traduzione": "vê",      "ipa": "/siːz/",     "categoria": "verb"},
        {"parola": "sun",     "traduzione": "sol",     "ipa": "/sʌn/",      "categoria": "noun"}
      ]
    }
  ]
}

STORY TOPIC: [REPLACE HERE — e.g., "a day at a farmer's market in Chicago", "a road trip through California", "first day at work in San Francisco"]`,

    imitazione: `Create American English phrases for pronunciation practice. Return ONLY a JSON array, no text before or after.

MANDATORY RULES:
1. Generate 8 to 12 phrases related to the topic
2. "frase_italiano" = natural American English phrase (this field keeps the name for technical compatibility)
3. "frase_portugues" = translation in Brazilian Portuguese
4. "contexto" = Portuguese explanation of when/how to use the phrase (1-2 sentences)
5. "nivel" must be A1, A2, B1, B2 or C1
6. Leave "audio_ipa" always as empty string ""

FULL EXAMPLE (copy exactly this format):
[
  {
    "id": "imi_custom_001",
    "frase_italiano": "Excuse me, do you know where the subway is?",
    "frase_portugues": "Com licença, você sabe onde fica o metrô?",
    "nivel": "A1",
    "contexto": "Use to politely ask a stranger for directions to the subway.",
    "audio_ipa": "",
    "xp_recompensa": 15
  },
  {
    "id": "imi_custom_002",
    "frase_italiano": "Could you please speak more slowly?",
    "frase_portugues": "Poderia falar mais devagar, por favor?",
    "nivel": "A2",
    "contexto": "Use when you didn't understand what someone said and need them to repeat more slowly.",
    "audio_ipa": "",
    "xp_recompensa": 15
  }
]

PHRASE TOPIC: [REPLACE HERE — e.g., "asking for directions on the street", "at a restaurant ordering food", "expressions of surprise and admiration"]`,

    vocab: `Create American English vocabulary words. Return ONLY a JSON array, no text before or after.

MANDATORY RULES:
1. Generate 12 to 20 words related to the topic
2. "genero": null (English has no grammatical gender — always null)
3. "plural": plural form of the noun, null for verbs and expressions
4. "exemplo" = real English sentence using the word in context
5. "exemplo_pt" = translation of the example sentence in Brazilian Portuguese
6. "audio_ipa" = IPA transcription of the word (the word only, not the sentence)
7. "dificuldade": "facil" (basic), "medio" (intermediate) or "dificil" (advanced)

FULL EXAMPLE (copy exactly this format):
[
  {
    "id": "vocab_custom_001",
    "italiano": "subway",
    "portugues": "metrô",
    "genero": null,
    "plural": "subways",
    "exemplo": "The subway is the fastest way to get around New York.",
    "exemplo_pt": "O metrô é a forma mais rápida de se deslocar em Nova York.",
    "categoria": "travel",
    "dificuldade": "facil",
    "audio_ipa": "/ˈsʌbweɪ/"
  },
  {
    "id": "vocab_custom_002",
    "italiano": "commute",
    "portugues": "deslocamento diário",
    "genero": null,
    "plural": null,
    "exemplo": "My commute to work takes about forty minutes.",
    "exemplo_pt": "Meu trajeto até o trabalho leva cerca de quarenta minutos.",
    "categoria": "work",
    "dificuldade": "medio",
    "audio_ipa": "/kəˈmjuːt/"
  }
]

VOCABULARY TOPIC: [REPLACE HERE — e.g., "travel vocabulary for airports", "restaurant and food words", "parts of the human body"]`
  },

  // ── Títulos do modal por tipo ────────────────────────────
  titulos: {
    dialogo:    '🤖 Adicionar Diálogo via IA',
    canzone:    '🤖 Adicionar Canção via IA',
    storia:     '🤖 Adicionar História via IA',
    imitazione: '🤖 Adicionar Imitação via IA',
    vocab:      '🤖 Adicionar Vocabulário via IA',
  },

  // ── Abrir modal ──────────────────────────────────────────
  _obterPalavrasDificeis() {
    if (typeof App === 'undefined' || !App.estado?.flashcardData || !App.estado?.vocabCache) return [];
    
    // Procura cards difíceis (erros > 0 ou recém-aprendidos)
    const hardIds = [];
    for (const [id, f] of Object.entries(App.estado.flashcardData)) {
      if ((f.erros > 0) || (f.stability && f.stability < 15) || (f.state === 'learning') || (f.state === 'new')) {
        hardIds.push(id);
      }
    }
    
    // Busca a palavra real no cache
    const words = hardIds.map(id => {
      const v = App.estado.vocabCache.find(w => w.id === id);
      return v ? (v.italiano || v.word) : null;
    }).filter(w => w);

    // Embaralha e pega até 7 palavras
    return words.sort(() => 0.5 - Math.random()).slice(0, 7);
  },

  abrir(tipo) {
    this.tipoAtual = tipo;
    const modal = document.getElementById('ia-import-modal');
    if (!modal) return;
    document.getElementById('ia-import-titulo').textContent = this.titulos[tipo] || '🤖 Adicionar via IA';
    
    let basePrompt = this.prompts[tipo] || '';
    
    // Injetar palavras difíceis dinamicamente
    if (tipo === 'dialogo' || tipo === 'storia' || tipo === 'imitazione') {
      const dificeis = this._obterPalavrasDificeis();
      if (dificeis.length > 0) {
        basePrompt += `\n\n🎯 MANDATORY VOCABULARY CHALLENGE:\nYou MUST organically include the following words in the English text (they are words the student is currently struggling with):\n[ ${dificeis.join(', ')} ]`;
      }
    }

    document.getElementById('ia-prompt-text').textContent = basePrompt;
    document.getElementById('ia-paste-area').value = '';
    const fb = document.getElementById('ia-feedback');
    if (fb) { fb.textContent = ''; fb.className = 'ia-feedback'; }
    modal.style.display = 'flex';
  },

  fechar() {
    const modal = document.getElementById('ia-import-modal');
    if (modal) modal.style.display = 'none';
  },

  // ── Copiar prompt para a área de transferência ───────────
  copiarPrompt() {
    const txt = document.getElementById('ia-prompt-text')?.textContent || '';
    navigator.clipboard.writeText(txt).then(() => {
      const btn = document.querySelector('.ia-copy-btn');
      if (!btn) return;
      const orig = btn.textContent;
      btn.textContent = '✅ Copiado!';
      btn.style.background = '#27ae60';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2000);
    }).catch(() => {
      // Fallback para navegadores sem clipboard API
      const ta = document.createElement('textarea');
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      const btn = document.querySelector('.ia-copy-btn');
      if (btn) { btn.textContent = '✅ Copiado!'; setTimeout(() => btn.textContent = '📋 Copiar Prompt', 2000); }
    });
  },

  // ── Importar JSON colado pelo usuário ────────────────────
  importar() {
    const raw = document.getElementById('ia-paste-area')?.value.trim() || '';
    const fb = document.getElementById('ia-feedback');
    if (!raw) {
      this._setFeedback('⚠️ Cole o conteúdo gerado pela IA primeiro.', 'warn');
      return;
    }

    let data;
    try {
      // Extrai JSON mesmo que o LLM adicione texto introdutório antes/depois
      const match = raw.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
      if (!match) throw new Error('Nenhum JSON encontrado na resposta.');
      data = JSON.parse(match[1]);
    } catch (e) {
      this._setFeedback('❌ JSON inválido. Verifique se a IA gerou o formato correto e tente novamente.', 'error');
      return;
    }

    try {
      switch (this.tipoAtual) {
        case 'dialogo':    this._importarDialogo(data); break;
        case 'canzone':    this._importarCanzone(data); break;
        case 'storia':     this._importarStoria(data); break;
        case 'imitazione': this._importarImitazione(data); break;
        case 'vocab':      this._importarVocab(data); break;
        default: throw new Error('Tipo desconhecido: ' + this.tipoAtual);
      }
      this._setFeedback('✅ Importado com sucesso!', 'ok');
      setTimeout(() => this.fechar(), 1400);
    } catch (e) {
      this._setFeedback('❌ Erro ao importar: ' + e.message, 'error');
    }
  },

  _setFeedback(msg, tipo) {
    const fb = document.getElementById('ia-feedback');
    if (!fb) return;
    fb.textContent = msg;
    fb.className = 'ia-feedback ia-feedback-' + tipo;
  },

  // ── Importadores por tipo ────────────────────────────────
  _importarDialogo(data) {
    const arr = Array.isArray(data) ? data : [data];
    const key = 'en_dialoghi_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    arr.forEach((d, i) => {
      if (!d.id) d.id = 'dial_custom_' + Date.now() + '_' + i;
      d._custom = true;
    });
    localStorage.setItem(key, JSON.stringify([...existing, ...arr]));
    // Recarregar módulo se estiver ativo
    if (typeof Dialoghi !== 'undefined') {
      Dialoghi.dados = null;
      Dialoghi.renderizarSeletor?.();
    }
  },

  _importarCanzone(data) {
    const arr = Array.isArray(data) ? data : [data];
    const key = 'en_canzoni_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    arr.forEach((d, i) => {
      if (!d.id) d.id = 'can_custom_' + Date.now() + '_' + i;
      d._custom = true;
    });
    localStorage.setItem(key, JSON.stringify([...existing, ...arr]));
    if (typeof Canzoni !== 'undefined') {
      Canzoni.dados = null;
      Canzoni.renderizarSeletor?.();
    }
  },

  _importarStoria(data) {
    const arr = Array.isArray(data) ? data : [data];
    const key = 'en_storie_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    arr.forEach((d, i) => {
      if (!d.id) d.id = 'stor_custom_' + Date.now() + '_' + i;
      d._custom = true;
    });
    localStorage.setItem(key, JSON.stringify([...existing, ...arr]));
    if (typeof Storie !== 'undefined') {
      Storie.dados = null;
      Storie.renderizarSeletor?.();
    }
  },

  _importarImitazione(data) {
    const arr = Array.isArray(data) ? data : [data];
    const key = 'en_imitazioni_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    arr.forEach((d, i) => {
      if (!d.id) d.id = 'imi_custom_' + Date.now() + '_' + i;
      d._custom = true;
    });
    localStorage.setItem(key, JSON.stringify([...existing, ...arr]));
    if (typeof Imitazione !== 'undefined') {
      Imitazione.dados = null;
      Imitazione.renderizar?.();
    }
  },

  _importarVocab(data) {
    const arr = Array.isArray(data) ? data : [data];
    const key = 'en_vocab_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    arr.forEach((d, i) => {
      if (!d.id) d.id = 'vocab_custom_' + Date.now() + '_' + i;
      d._custom = true;
    });
    localStorage.setItem(key, JSON.stringify([...existing, ...arr]));
    // Injeta no vocabCache do App e re-renderiza
    if (typeof App !== 'undefined' && App.estado?.vocabCache) {
      arr.forEach(w => {
        if (!w.templo_num) w.templo_num = 0; // "Extra" / sem templo
        if (!App.estado.vocabCache.find(v => v.id === w.id)) {
          App.estado.vocabCache.push(w);
        }
      });
    }
    if (typeof Vocab !== 'undefined') Vocab.renderizar?.();
  },

  // ── Excluir item customizado ─────────────────────────────
  excluir(tipo, id) {
    if (!confirm('Remover este item?')) return;
    const keys = {
      dialogo: 'en_dialoghi_custom',
      canzone: 'en_canzoni_custom',
      storia:  'en_storie_custom',
      imitazione: 'en_imitazioni_custom',
      vocab:   'en_vocab_custom',
    };
    const key = keys[tipo];
    if (!key) return;
    const arr = JSON.parse(localStorage.getItem(key) || '[]').filter(x => x.id !== id);
    localStorage.setItem(key, JSON.stringify(arr));
    // Re-renderizar seção
    const renders = {
      dialogo:    () => { if (typeof Dialoghi !== 'undefined') { Dialoghi.dados=null; Dialoghi.renderizarSeletor?.(); } },
      canzone:    () => { if (typeof Canzoni !== 'undefined')  { Canzoni.dados=null;  Canzoni.renderizarSeletor?.();  } },
      storia:     () => { if (typeof Storie !== 'undefined')   { Storie.dados=null;   Storie.renderizarSeletor?.();   } },
      imitazione: () => { if (typeof Imitazione !== 'undefined') { Imitazione.dados=null; Imitazione.renderizar?.(); } },
      vocab:      () => {
        if (typeof App !== 'undefined' && App.estado?.vocabCache) {
          App.estado.vocabCache = App.estado.vocabCache.filter(v => v.id !== id);
        }
        if (typeof Vocab !== 'undefined') Vocab.renderizar?.();
      },
    };
    renders[tipo]?.();
  },
};
