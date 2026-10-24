// ============================================================
// ia-import.js — Adição de conteúdo via IA (Prompt-Assisted Import)
// Fluxo: copiar prompt → colar no LLM → colar JSON de volta → importar
// ============================================================

const IAImport = {
  tipoAtual: null,
  origemAtual: null,

  // ── Prompts por tipo ─────────────────────────────────────
  prompts: {
    dialogo: `Create a situational dialogue in American English for Brazilian Portuguese students. Return ONLY the JSON, without any introductory or conversational text before or after.

MANDATORY RULES:
1. "level": strictly choose from "A1", "A2", "B1", "B2", or "C1"
2. "context": clear practical description in Portuguese (1-2 sentences)
3. "turns": ordered array alternating character turn and user ("You") turn:
   - Character Turn:
     * "id": sequential number (1, 2, 3...)
     * "speaker": interlocutor name (e.g. "Barista", "Front Desk", "Waiter", "Doctor")
     * "line": natural spoken American English
     * "translation": precise translation in Brazilian Portuguese
     * "audio_ipa": optional phonetic IPA transcription (or "")
   - "You" Turn (user response):
     * "id": sequential number
     * "speaker": "You"
     * "line": the CORRECT answer in English
     * "translation": Portuguese translation of the correct answer
     * "audio_ipa": ""
     * "options": array with 4 plausible options in English (including the correct one)
     * "correct_index": numeric index (0, 1, 2, or 3) pointing to the correct option
4. Alternate turns: Character → You → Character → You...
5. "key_vocabulary": array of 3 to 5 core terms in base form
6. "xp_reward": integer number (e.g. 50)

EXAMPLE JSON STRUCTURE:
{
  "id": "dial_custom_001",
  "title": "At the Coffee Shop",
  "icon": "☕",
  "level": "A1",
  "context": "Você está pedindo um café em Nova York.",
  "turns": [
    {
      "id": 1,
      "speaker": "Barista",
      "line": "Good morning! What can I get for you today?",
      "translation": "Bom dia! O que posso preparar para você hoje?",
      "audio_ipa": ""
    },
    {
      "id": 2,
      "speaker": "You",
      "line": "I'd like an iced latte with oat milk, please.",
      "translation": "Eu gostaria de um latte gelado com leite de aveia, por favor.",
      "audio_ipa": "",
      "options": [
        "I'd like an iced latte with oat milk, please.",
        "I don't drink coffee.",
        "Where is the train station?",
        "How much is a ticket to Boston?"
      ],
      "correct_index": 0
    },
    {
      "id": 3,
      "speaker": "Barista",
      "line": "Sure thing! Small, medium, or large?",
      "translation": "Com certeza! Pequeno, médio ou grande?",
      "audio_ipa": ""
    },
    {
      "id": 4,
      "speaker": "You",
      "line": "Medium, please.",
      "translation": "Médio, por favor.",
      "audio_ipa": "",
      "options": [
        "I have to go.",
        "Medium, please.",
        "It's sunny today.",
        "I prefer tea."
      ],
      "correct_index": 1
    }
  ],
  "key_vocabulary": ["iced latte", "oat milk", "order"],
  "xp_reward": 50
}

DIALOGUE TOPIC: [REPLACE HERE — e.g. "checking in at a hotel in London", "buying a subway ticket in New York", "at the pharmacy asking for medicine"]`,

    canzone: `# Role: Audio Transcriber with Word-by-Word Timestamps

## Objective
Analyze audio files (spoken speech, dialogues, songs) and generate timed transcriptions with word-by-word precision in English, returning the result strictly in JSON format.

## JSON Format Specifications
Each element in the list must be an object containing:
- "w" (string): The single spoken word, including any attached punctuation (e.g. commas, periods, question marks).
- "t" (number): The exact second when vocal emission of the word begins, expressed with 2 decimals (e.g. 2.15).
- "blank" (boolean, optional): Set to true exclusively on the last word of a verse, phrase, or before a major musical break/pause, to indicate a line break.

## Example Schema
[
  { "w": "Hello,", "t": 0.05 },
  { "w": "welcome", "t": 1.10 },
  { "w": "here.", "t": 2.15, "blank": true }
]

## Transcription Rules
1. Temporal accuracy: Align the start ("t") with the actual audio onset.
2. Segmentation: Separate words clearly, keeping punctuation attached to the word.
3. Output format: Return ONLY the valid JSON block, without any markdown or intro text.`,

    storia: `Create a short graded reading story in English for Portuguese-speaking learners. Return ONLY the JSON, without any introductory text or markdown backticks.

MANDATORY RULES:
1. "english" = paragraph in correct natural English
2. "portugues" = COMPLETE Portuguese translation of the paragraph
3. "parole" = array with ALL words of the paragraph — WITHOUT EXCEPTION
   - Include nouns, verbs, adjectives, adverbs, articles, prepositions, pronouns, conjunctions
   - Every word token must have its own entry (do not skip any word)
   - "parola" = the word exactly as it appears in the English text
   - "traduzione" = translation in Brazilian Portuguese (1-3 words)
   - "ipa" = phonetic IPA transcription of the isolated word (e.g. "/ˈsʌn/")
   - "categoria": "noun", "verb", "adjective", "adverb", "article", "preposition", "pronoun", "conjunction" or "expression"
4. Include 4 to 6 paragraphs
5. "nivel" must be "A1", "A2", "B1", "B2", "C1", or "C2"

COMPLETE EXAMPLE STRUCTURE (copy this exact format):
{
  "id": "stor_custom_001",
  "titulo": "A Morning in New York",
  "titulo_pt": "Uma Manhã em Nova York",
  "nivel": "A1",
  "icone": "🗽",
  "autor": "English Autentico",
  "tema": "daily life",
  "descricao": "Mark wakes up early and walks through the streets of Manhattan.",
  "descricao_pt": "Mark acorda cedo e caminha pelas ruas de Manhattan.",
  "xp_recompensa": 80,
  "testo": [
    {
      "id": "stor_custom_001_p1",
      "english": "Mark wakes up at seven. He opens the window and sees the sun.",
      "portugues": "Mark acorda às sete. Ele abre a janela e vê o sol.",
      "parole": [
        {"parola": "Mark",     "traduzione": "Mark",      "ipa": "/mɑːrk/",       "categoria": "noun"},
        {"parola": "wakes",    "traduzione": "acorda",    "ipa": "/weɪks/",       "categoria": "verb"},
        {"parola": "up",       "traduzione": "levantar",  "ipa": "/ʌp/",          "categoria": "adverb"},
        {"parola": "at",       "traduzione": "às",        "ipa": "/æt/",          "categoria": "preposition"},
        {"parola": "seven",    "traduzione": "sete",      "ipa": "/ˈsɛv.ən/",     "categoria": "noun"},
        {"parola": "He",       "traduzione": "Ele",       "ipa": "/hiː/",         "categoria": "pronoun"},
        {"parola": "opens",    "traduzione": "abre",      "ipa": "/ˈoʊ.pənz/",    "categoria": "verb"},
        {"parola": "the",      "traduzione": "a",         "ipa": "/ðə/",          "categoria": "article"},
        {"parola": "window",   "traduzione": "janela",    "ipa": "/ˈwɪn.doʊ/",    "categoria": "noun"},
        {"parola": "and",      "traduzione": "e",         "ipa": "/ænd/",         "categoria": "conjunction"},
        {"parola": "sees",     "traduzione": "vê",        "ipa": "/siːz/",        "categoria": "verb"},
        {"parola": "sun",      "traduzione": "sol",       "ipa": "/sʌn/",         "categoria": "noun"}
      ]
    }
  ]
}

STORY THEME: [REPLACE HERE — e.g. "a shopping day in London", "vacation at a Florida beach", "first day at work in Seattle"]`,

    imitazione: `Create English sentences for guided pronunciation practice (Shadowing). Return ONLY a JSON array, without any surrounding text.

MANDATORY RULES:
1. Generate 8 to 12 idiomatic sentences related to the practical theme
2. "frase_ingles" = authentic spoken English sentence with correct punctuation
3. "frase_portugues" = precise Brazilian Portuguese translation
4. "contexto" = pragmatic usage context (1-2 sentences explaining when and how to use it)
5. "nivel" = "A1", "A2", "B1", "B2", or "C1"
6. "audio_ipa" = phonetic IPA transcription between slashes (e.g. "/kʊd juː/") or empty string ""
7. "xp_recompensa" = 15

COMPLETE EXAMPLE (copy this exact format):
[
  {
    "id": "imi_custom_001",
    "frase_ingles": "Excuse me, could you tell me where the central station is?",
    "frase_portugues": "Com licença, você saberia me dizer onde fica a estação central?",
    "nivel": "A1",
    "contexto": "Use to politely ask for directions on the street.",
    "audio_ipa": "/ɪkˈskjuːz miː kʊd juː tɛl miː wɛər ðə ˈsɛntrəl ˈsteɪʃən ɪz/",
    "xp_recompensa": 15
  },
  {
    "id": "imi_custom_002",
    "frase_ingles": "Could you please speak a bit slower?",
    "frase_portugues": "Você poderia falar um pouco mais devagar, por favor?",
    "nivel": "A2",
    "contexto": "Use when someone speaks too quickly and you need acoustic clarity.",
    "audio_ipa": "/kʊd juː pliːz spiːk ə bɪt ˈsloʊ.ər/",
    "xp_recompensa": 15
  }
]

PHRASE THEME: [REPLACE HERE — e.g. "asking for directions", "at the restaurant asking for the check", "polite formal expressions"]`,

    vocab: `Create English vocabulary cards matching the app Temple standards. Return ONLY a JSON array, without any surrounding text.

MANDATORY RULES:
1. Generate 12 to 20 terms related to the practical theme
2. "english" = English word or expression
3. "portugues" = Brazilian Portuguese translation
4. "exemplo" = natural contextual example sentence in English
5. "exemplo_pt" = full translation of the example sentence to Portuguese
6. "categoria" = thematic category (e.g. "travel", "restaurant", "work", "health")
7. "dificuldade" = "facil" (basic), "medio" (intermediate) or "dificil" (advanced)
8. "audio_ipa" = phonetic IPA transcription between slashes (e.g. "/treɪn/")

COMPLETE EXAMPLE (copy this exact format):
[
  {
    "id": "vocab_custom_001",
    "english": "train",
    "portugues": "trem",
    "exemplo": "The regional train leaves at nine from the central platform.",
    "exemplo_pt": "O trem regional parte às nove da plataforma central.",
    "categoria": "travel",
    "dificuldade": "facil",
    "audio_ipa": "/treɪn/"
  },
  {
    "id": "vocab_custom_002",
    "english": "book",
    "portugues": "reservar",
    "exemplo": "I booked a double room for next weekend.",
    "exemplo_pt": "Reservei um quarto duplo para o próximo fim de semana.",
    "categoria": "hotel",
    "dificuldade": "medio",
    "audio_ipa": "/bʊk/"
  }
]

VOCABULARY THEME: [REPLACE HERE — e.g. "train travel and tickets", "typical foods and dining", "professions and work environment"]`
  },

  // ── Títulos do modal por tipo ────────────────────────────
  titulos: {
    dialogo:    '🤖 Adicionar Diálogo via IA',
    canzone:    '🤖 Adicionar Canção via IA',
    storia:     '🤖 Adicionar História via IA',
    imitazione: '🤖 Adicionar Pronúncia via IA',
    vocab:      '🤖 Adicionar Vocabulário via IA',
  },

  // ── Palavras que o aluno está errando (i+1 targeting) ──
  _obterPalavrasDificeis() {
    if (typeof App === 'undefined' || !App.estado?.flashcardData || !App.estado?.vocabCache) return [];
    const candidatos = [];
    for (const [id, f] of Object.entries(App.estado.flashcardData)) {
      if ((f.lapses > 0) || (f.stability && f.stability < 15) || f.state === 'learning' || f.state === 'new') {
        candidatos.push(id);
      }
    }
    const palavras = candidatos.map(id => {
      const v = App.estado.vocabCache.find(w => w.id === id);
      return v ? (v.english || v.ingles || v.italiano || v.word || v.frase) : null;
    }).filter(Boolean);
    // Embaralha e retorna até 7
    for (let i = palavras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [palavras[i], palavras[j]] = [palavras[j], palavras[i]];
    }
    return palavras.slice(0, 7);
  },

  openModal(tipo, origem = null) {
    return this.abrir(tipo, origem);
  },

  // ── Abrir modal ──────────────────────────────────────────
  abrir(tipo, origem = null) {
    if (tipo === 'pronunciation') tipo = 'imitazione';
    if (tipo === 'dialogue') tipo = 'dialogo';
    if (tipo === 'song') tipo = 'canzone';
    if (tipo === 'story') tipo = 'storia';

    this.tipoAtual = tipo;
    this.origemAtual = origem;
    const modal = document.getElementById('ia-import-modal');
    if (!modal) return;
    document.getElementById('ia-import-titulo').textContent = this.titulos[tipo] || '🤖 Adicionar via IA';

    // Abas de livro (visíveis exclusivamente na seção storie)
    const tabsEl = document.getElementById('ia-storia-tabs');
    if (tabsEl) {
      if (tipo === 'storia') {
        tabsEl.style.display = 'flex';
        this.trocarAbaStoria('prompt');
      } else {
        tabsEl.style.display = 'none';
        const boxP = document.getElementById('ia-box-prompt');
        const boxL = document.getElementById('ia-box-livro');
        if (boxP) boxP.style.display = 'block';
        if (boxL) boxL.style.display = 'none';
      }
    }

    let prompt = this.prompts[tipo] || '';
    if (['dialogo', 'storia', 'imitazione'].includes(tipo)) {
      const dificeis = this._obterPalavrasDificeis();
      if (dificeis.length > 0) {
        prompt += `\n\n🎯 MANDATORY VOCABULARY CHALLENGE:\nYou must organically include the following words in the text (words the student is currently struggling with):\n[ ${dificeis.join(', ')} ]`;
      }
    }

    document.getElementById('ia-prompt-text').textContent = prompt;
    document.getElementById('ia-paste-area').value = '';
    const fb = document.getElementById('ia-feedback');
    if (fb) { fb.textContent = ''; fb.className = 'ia-feedback'; }
    modal.style.display = 'flex';
  },

  trocarAbaStoria(aba) {
    const tabPrompt = document.getElementById('ia-tab-prompt');
    const tabLivro  = document.getElementById('ia-tab-livro');
    const boxPrompt = document.getElementById('ia-box-prompt');
    const boxLivro  = document.getElementById('ia-box-livro');
    const fb = document.getElementById('ia-feedback');
    if (fb) { fb.textContent = ''; fb.className = 'ia-feedback'; }

    if (aba === 'livro') {
      if (tabPrompt) tabPrompt.className = 'btn-secondario';
      if (tabLivro)  tabLivro.className  = 'btn-primario';
      if (boxPrompt) boxPrompt.style.display = 'none';
      if (boxLivro)  boxLivro.style.display  = 'block';
    } else {
      if (tabPrompt) tabPrompt.className = 'btn-primario';
      if (tabLivro)  tabLivro.className  = 'btn-secondario';
      if (boxPrompt) boxPrompt.style.display = 'block';
      if (boxLivro)  boxLivro.style.display  = 'none';
    }
  },

  importarLivroTextoLivre() {
    const titulo = document.getElementById('ia-livro-titulo')?.value.trim() || 'English Book';
    const autor  = document.getElementById('ia-livro-autor')?.value.trim() || 'Letteratura';
    const nivel  = document.getElementById('ia-livro-nivel')?.value || 'B1';
    const raw    = document.getElementById('ia-livro-texto')?.value.trim() || '';

    if (!raw) {
      this._setFeedback('⚠️ Cole o texto em inglês do livro primeiro.', 'warn');
      return;
    }

    // Quebra parágrafos limpos por quebras de linha duplas ou simples
    const linhas = raw.split(/\n\s*\n|\r\n\s*\r\n/).map(l => l.trim()).filter(Boolean);
    if (linhas.length === 0) {
      this._setFeedback('⚠️ Nenhum conteúdo legível encontrado.', 'warn');
      return;
    }

    const paragrafos = linhas.map((parTexto) => ({
      english: parTexto.replace(/\s+/g, ' '),
      italiano: parTexto.replace(/\s+/g, ' '),
      portugues: '',
      parole: []
    }));

    const novoLivro = {
      id: 'book_' + Date.now(),
      titulo: titulo,
      titulo_pt: titulo,
      nivel: nivel,
      icone: '📚',
      autor: autor,
      tema: 'literature',
      descricao: `${titulo} by ${autor}.`,
      descricao_pt: `${titulo} de ${autor}.`,
      xp_recompensa: Math.min(paragrafos.length * 10, 300),
      testo: paragrafos,
      paragraphs: paragrafos,
      _custom: true
    };

    this._importarStoria(novoLivro);
    this.fechar();
    if (typeof App !== 'undefined') {
      App.notificar(`📚 Livro "${titulo}" adicionado com sucesso!`, 'sucesso');
    }
    // Abre imediatamente para leitura no leitor
    if (typeof Stories !== 'undefined') {
      setTimeout(() => Stories.abrirStoria(novoLivro.id), 150);
    }
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

    // Validate JSON schema based on type
    const validationError = this._validateSchema(data, this.tipoAtual);
    if (validationError) {
      this._setFeedback("ERROR: " + validationError, "error");
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
  _sanitizar(str) {
    if (typeof str !== 'string') return str;
    if (typeof Sanitize !== 'undefined' && typeof Sanitize.escapeHtml === 'function') {
      return Sanitize.escapeHtml(str.trim());
    }
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
  },

  _validateSchema(data, type) {
    const schemas = {
      dialogo: (d) => {
        const arr = Array.isArray(d) ? d : (d.dialogues || d.dialogi || [d]);
        if (!Array.isArray(arr)) return "Esperava array de diálogos";
        for (const item of arr) {
          if (!item.titulo && !item.title) return "Diálogo sem título";
          if (!item.turni && !item.turns && !item.turnos) return "Diálogo sem turnos";
          if (!item.nivel && !item.level) return "Diálogo sem nível";
        }
        return null;
      },
      vocab: (d) => {
        const arr = Array.isArray(d) ? d : [d];
        if (!Array.isArray(arr)) return "Esperava array de vocabulário";
        for (const item of arr) {
          if (!item.english && !item.ingles && !item.word) return "Vocabulário sem termo em inglês";
          if (!item.portugues && !item.traducao && !item.translation) return "Vocabulário sem tradução";
        }
        return null;
      },
      storia: (d) => {
        const arr = Array.isArray(d) ? d : (d.stories || d.storie || [d]);
        if (!Array.isArray(arr)) return "Esperava array de histórias";
        for (const item of arr) {
          if (!item.titulo && !item.title) return "História sem título";
          if (!item.testo && !item.paragraphs && !item.paragrafi && !item.paragrafos && !item.text) return "História sem texto";
        }
        return null;
      },
      imitazione: (d) => {
        const arr = Array.isArray(d) ? d : (d.pronunciation || d.imitazioni || d.frases || d.phrases || [d]);
        if (!Array.isArray(arr)) return "Esperava array de frases";
        for (const item of arr) {
          if (!item.frase_ingles && !item.phrase_english && !item.sentence && !item.frase_italiano && !item.frase && !item.english) return "Frase sem texto em inglês";
          if (!item.frase_portugues && !item.phrase_portuguese && !item.translation && !item.traducao && !item.portugues) return "Frase sem tradução";
        }
        return null;
      },
      canzone: (d) => {
        if (Array.isArray(d) && d.length > 0 && (d[0].w !== undefined || d[0].word !== undefined)) return null;
        const arr = Array.isArray(d) ? d : (d.songs || d.canzoni || [d]);
        if (!Array.isArray(arr)) return "Esperava array de canções";
        for (const item of arr) {
          if (!item.titulo && !item.title) return "Canção sem título";
        }
        return null;
      }
    };
    const validator = schemas[type];
    if (!validator) return "Tipo desconhecido: " + type;
    return validator(data);
  },
  _importarDialogo(data) {
    let arr = Array.isArray(data) ? data : (data.dialogues || data.dialogi || [data]);
    const key = 'en_dialogues_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    arr.forEach((d, i) => {
      if (!d.id) d.id = 'dial_custom_' + Date.now() + '_' + i;
      d._custom = true;
      d.titulo = d.titulo || d.title || 'Custom Dialogue';
      d.icone = d.icone || d.icon || '💬';
      d.nivel = d.nivel || d.level || 'A1';
      d.contexto = d.contexto || d.context || '';
      d.turni = d.turni || d.turns || d.turnos || [];
      d.turni.forEach((t, ti) => {
        t.id = t.id || (ti + 1);
        t.personaggio = t.personaggio || t.speaker || (t.options || t.alternativas ? 'You' : 'Character');
        t.frase = t.frase || t.line || '';
        t.traducao = t.traducao || t.translation || '';
        t.audio_ipa = t.audio_ipa || '';
        if (t.options && !t.alternativas) t.alternativas = t.options;
        if (t.correct_index !== undefined && t.resposta_correta === undefined) t.resposta_correta = t.correct_index;
      });
      d.vocabulario_chave = d.vocabulario_chave || d.key_vocabulary || [];
      d.xp_recompensa = d.xp_recompensa || d.xp_reward || 50;
    });
    try { localStorage.setItem(key, JSON.stringify([...existing, ...arr])); } catch(e) { if(e.name === 'QuotaExceededError') { App.notificar('Storage is full! Please delete older custom content.', 'erro'); } }
    // Recarregar módulo se estiver ativo
    if (typeof Dialogues !== 'undefined') {
      Dialogues.dados = null;
      Dialogues.renderizarSeletor?.();
    }
  },

  _importarCanzone(data) {
    let arr;
    if (Array.isArray(data) && data.length > 0 && (data[0].w !== undefined || data[0].word !== undefined)) {
      // Array de palavras com timestamps do Gemini
      arr = [{
        id: 'can_custom_' + Date.now(),
        titulo: 'Música Sincronizada (IA)',
        artista: 'Gemini',
        nivel: 'B1',
        icone: '🎧',
        versos_sincronizados: data,
        letra_raw: JSON.stringify(data),
        _custom: true
      }];
    } else {
      arr = Array.isArray(data) ? data : (data.songs || data.canzoni || [data]);
      arr.forEach((d, i) => {
        if (!d.id) d.id = 'can_custom_' + Date.now() + '_' + i;
        d._custom = true;
        d.titulo = d.titulo || d.title || 'Custom Song';
        d.artista = d.artista || d.artist || 'Unknown Artist';
        d.nivel = d.nivel || d.level || 'A2';
        d.icone = d.icone || d.icon || '🎵';
        if (d.lines && !d.estrofes) d.estrofes = d.lines;
      });
    }
    const key = 'en_songs_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    try { localStorage.setItem(key, JSON.stringify([...existing, ...arr])); } catch(e) { if(e.name === 'QuotaExceededError') { App.notificar('Storage is full! Please delete older custom content.', 'erro'); } }
    if (typeof Songs !== 'undefined') {
      Songs.dados = null;
      Songs.renderizarSeletor?.();
    }
  },

  _importarStoria(data) {
    let arr = Array.isArray(data) ? data : (data.stories || data.storie || [data]);
    const key = 'en_stories_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const normalizadas = arr.map((d, i) => {
      if (!d.id) d.id = 'stor_custom_' + Date.now() + '_' + i;
      d._custom = true;
      if (d.title && !d.titulo) d.titulo = d.title;
      if (!d.testo) {
        d.testo = d.paragraphs || d.paragrafi || d.paragrafos || d.text || [];
      }
      return (typeof Stories !== 'undefined' && Stories._normalizar) ? Stories._normalizar(d) : d;
    });
    try { localStorage.setItem(key, JSON.stringify([...existing, ...normalizadas])); } catch(e) { if(e.name === 'QuotaExceededError') { App.notificar('Storage is full! Please delete older custom content.', 'erro'); } }
    if (typeof Stories !== 'undefined') {
      Stories.dados = null;
      Stories.renderizarSeletor?.();
    }
  },

  _importarImitazione(data) {
    let arr;
    if (Array.isArray(data)) {
      arr = data;
    } else if (data.pronunciation || data.imitazioni || data.frases || data.phrases) {
      arr = data.pronunciation || data.imitazioni || data.frases || data.phrases;
    } else {
      arr = [data];
    }
    const key = 'en_pronunciation_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    arr.forEach((d, i) => {
      if (!d.id) d.id = 'imi_custom_' + Date.now() + '_' + i;
      d._custom = true;
      d.frase_ingles = d.frase_ingles || d.phrase_english || d.sentence || d.phrase || d.frase_italiano || d.frase || d.english || '';
      d.frase_portugues = d.frase_portugues || d.phrase_portuguese || d.translation || d.traducao || d.portugues || '';
      d.nivel = d.nivel || d.level || 'A1';
      d.contexto = d.contexto || d.context || '';
      d.audio_ipa = d.audio_ipa || '';
      d.xp_recompensa = d.xp_recompensa || d.xp_reward || 15;
    });
    try { localStorage.setItem(key, JSON.stringify([...existing, ...arr])); } catch(e) { if(e.name === 'QuotaExceededError') { App.notificar('Storage is full! Please delete older custom content.', 'erro'); } }
    if (typeof Pronunciation !== 'undefined') {
      Pronunciation.dados = null;
      if (typeof Pronunciation.render === 'function') {
        Pronunciation.render();
      } else {
        Pronunciation.renderizar?.();
      }
    }
  },

  _importarVocab(data) {
    const arr = Array.isArray(data) ? data : [data];
    const key = 'en_vocab_custom';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    
    // Normalizador de texto italiano para comparação e slug
    const normalizarTermo = (s) => (s || '')
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');

    // Mapeia termos já existentes em todo o acervo (Templos 1-51 + custom)
    const todosVocab = (typeof App !== 'undefined' && App.estado?.vocabCache)
      ? App.estado.vocabCache
      : existing;
    const termosExistentes = new Set(
      todosVocab.map(w => normalizarTermo(w.english || w.ingles || w.word || w.phrase || w.sentence || w.italiano || ''))
    );

    const palavrasNovas = [];
    let duplicatasIgnoradas = 0;

    arr.forEach((d) => {
      const termo = (d.english || d.ingles || d.word || '').trim();
      if (!termo) return;
      const chaveNorm = normalizarTermo(termo);

      if (termosExistentes.has(chaveNorm)) {
        duplicatasIgnoradas++;
        return;
      }

      // Gera ID determinístico baseado no slug da palavra italiana
      d.id = 'w_custom_' + (chaveNorm || ('rnd_' + Math.random().toString(36).substring(2, 7)));
      d.english = termo; d.ingles = termo;
      d._custom = true;
      if (!d.templo_num) d.templo_num = 0; // "Extra" / deck customizado

      termosExistentes.add(chaveNorm);
      palavrasNovas.push(d);
    });

    if (palavrasNovas.length === 0) {
      if (duplicatasIgnoradas > 0) {
        throw new Error(`Todas as ${duplicatasIgnoradas} palavras já existem no vocabulário!`);
      }
      throw new Error('Nenhuma palavra válida encontrada para importação.');
    }

    try {
      localStorage.setItem(key, JSON.stringify([...existing, ...palavrasNovas]));
    } catch(e) {
      if (e.name === 'QuotaExceededError') {
        App.notificar('Storage is full! Please delete older custom content.', 'erro');
      }
    }

    // Injeta no vocabCache do App
    if (typeof App !== 'undefined' && App.estado?.vocabCache) {
      palavrasNovas.forEach(w => {
        if (!App.estado.vocabCache.find(v => v.id === w.id)) {
          App.estado.vocabCache.unshift(w);
        }
      });
      if (App.estado.progresso) {
        App.estado.progresso.total_palavras = App.estado.vocabCache.length;
        App.salvarProgresso();
        App.atualizarStats();
      }
    }

    // Feedback descritivo
    let msgFeedback = `✅ ${palavrasNovas.length} nova(s) palavra(s) importada(s)!`;
    if (duplicatasIgnoradas > 0) {
      msgFeedback += ` (${duplicatasIgnoradas} já existiam e foram ignoradas)`;
    }
    this._setFeedback(msgFeedback, 'ok');

    if (typeof Vocab !== 'undefined') Vocab.renderizar?.();
    if (typeof Flashcards !== 'undefined') Flashcards.atualizarSelectTemplo?.();

    // Se a importação ocorreu na aba de Flashcards (ou com flag origem = 'flashcard')
    const veioDeFlashcards = this.origemAtual === 'flashcard' || (typeof App !== 'undefined' && App.estado?.secaoAtiva === 'flashcard');
    if (veioDeFlashcards && typeof Flashcards !== 'undefined') {
      setTimeout(() => {
        const sel = document.getElementById('flashcard-temple-select') || document.getElementById('flashcard-templo-select');
        if (sel) sel.value = 'custom';
        Flashcards.init('custom');
        App.notificar('🎴 Estudo iniciado com os novos Flashcards!', 'sucesso');
      }, 500);
    }
  },

  // ── Excluir item customizado ─────────────────────────────
  excluir(tipo, id) {
    if (tipo === 'pronunciation') tipo = 'imitazione';
    if (!confirm('Remover este item?')) return;
    const keys = {
      dialogo: 'en_dialogues_custom',
      canzone: 'en_songs_custom',
      storia:  'en_stories_custom',
      imitazione: 'en_pronunciation_custom',
      pronunciation: 'en_pronunciation_custom',
      vocab:   'en_vocab_custom',
    };
    const key = keys[tipo];
    if (!key) return;
    const arr = JSON.parse(localStorage.getItem(key) || '[]').filter(x => x.id !== id);
    try { localStorage.setItem(key, JSON.stringify(arr)); } catch(e) { if(e.name === 'QuotaExceededError') { App.notificar('Storage is full! Please delete older custom content.', 'erro'); } }
    // Re-renderizar seção
    const renders = {
      dialogo:    () => { if (typeof Dialogues !== 'undefined') { Dialogues.dados=null; Dialogues.renderizarSeletor?.(); } },
      canzone:    () => { if (typeof Songs !== 'undefined')  { Songs.dados=null;  Songs.renderizarSeletor?.();  } },
      storia:     () => { if (typeof Stories !== 'undefined')   { Stories.dados=null;   Stories.renderizarSeletor?.();   } },
      imitazione: () => { if (typeof Pronunciation !== 'undefined') { Pronunciation.dados=null; if (typeof Pronunciation.render === 'function') Pronunciation.render(); else Pronunciation.renderizar?.(); } },
      pronunciation: () => { if (typeof Pronunciation !== 'undefined') { Pronunciation.dados=null; if (typeof Pronunciation.render === 'function') Pronunciation.render(); else Pronunciation.renderizar?.(); } },
      vocab:      () => {
        if (typeof App !== 'undefined' && App.estado?.vocabCache) {
          App.estado.vocabCache = App.estado.vocabCache.filter(v => v.id !== id);
          if (App.estado.progresso) {
            App.estado.progresso.total_palavras = App.estado.vocabCache.length;
            App.salvarProgresso();
            App.atualizarStats();
          }
        }
        if (typeof Vocab !== 'undefined') Vocab.renderizar?.();
      },
    };
    renders[tipo]?.();
  },
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = IAImport;
}
