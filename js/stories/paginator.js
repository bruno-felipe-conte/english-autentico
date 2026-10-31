// ============================================================
// js/stories/paginator.js — Editorial Line-Budget Paginator & Layout
// ============================================================

const StoriesPaginator = {
  _isMobile() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  },

  _playPageTurnSound() {
    try {
      if (typeof window === 'undefined') return;
      if (typeof SomFeedback !== 'undefined' && !SomFeedback.ativo) return;

      let ctx = null;
      if (typeof SomFeedback !== 'undefined' && typeof SomFeedback._ctx === 'function') {
        ctx = SomFeedback._ctx();
      } else if (typeof VoiceEngine !== 'undefined' && typeof VoiceEngine.getAudioContext === 'function') {
        ctx = VoiceEngine.getAudioContext();
      } else {
        if ((!this._sharedAudioCtx || this._sharedAudioCtx.state === 'closed') && typeof (window.AudioContext || window.webkitAudioContext) !== 'undefined') {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          this._sharedAudioCtx = new AudioCtx();
        }
        ctx = this._sharedAudioCtx;
      }

      if (!ctx) return;
      if (ctx.state === 'suspended' && typeof ctx.resume === 'function') {
        ctx.resume().catch(() => {});
      }

      const dur = 0.22;
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + dur);
      filter.Q.value = 1.5;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      try { noise.stop(ctx.currentTime + dur); } catch (_) {}

      const cleanup = () => {
        try {
          noise.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch (_) {}
      };

      if (typeof noise.addEventListener === 'function') {
        noise.addEventListener('ended', cleanup, { once: true });
      } else {
        noise.onended = cleanup;
      }
      setTimeout(cleanup, dur * 1000 + 60);
    } catch (_) {}
  },

  _calculateLineBudget(isMobile) {
    const winW = (typeof window !== 'undefined' && window.innerWidth) ? window.innerWidth : 1200;
    const winH = (typeof window !== 'undefined' && window.innerHeight) ? window.innerHeight : 800;

    if (isMobile) {
      const alturaUtil = Math.max(320, winH - 170);
      const alturaLinha = this.traduzirVisivel ? 24 : 26;
      const linhasDisponiveis = Math.floor(alturaUtil / alturaLinha);
      const charsPorLinha = Math.max(36, Math.min(48, Math.floor((winW - 50) / 8.5)));
      const linhasCapa = Math.max(8, Math.floor(linhasDisponiveis * 0.45));
      return { linhasDisponiveis, charsPorLinha, linhasCapa };
    } else {
      const alturaUtil = Math.max(400, winH - 200);
      const alturaLinha = this.traduzirVisivel ? 25 : 28;
      const linhasDisponiveis = Math.floor(alturaUtil / alturaLinha);
      const larguraFolha = Math.min(580, Math.max(420, (winW - 120) / 2));
      const charsPorLinha = Math.max(58, Math.floor(larguraFolha / 7.5));
      const linhasCapa = Math.max(10, Math.floor(linhasDisponiveis * 0.45));
      return { linhasDisponiveis, charsPorLinha, linhasCapa };
    }
  },

  _generatePages(s, isMobile) {
    if (!s || !Array.isArray(s.testo) || s.testo.length === 0) return [];

    const geo = this._calculateLineBudget(isMobile);
    const paginas = [];
    let blocosAtuais = [];
    let linhasAtuais = 0;
    let isFirstPage = true;
    let capituloAtivo = s.titulo || 'Chapter 1';

    const empilharPagina = () => {
      if (blocosAtuais.length === 0) return;
      paginas.push({
        numero: paginas.length + 1,
        isFirstPage: paginas.length === 0,
        capituloTitulo: capituloAtivo,
        blocos: [...blocosAtuais]
      });
      blocosAtuais = [];
      linhasAtuais = 0;
      isFirstPage = false;
    };

    const calcularCustoLinhas = (lenIt, lenPt) => {
      const linIt = Math.ceil(lenIt / geo.charsPorLinha);
      if (this.traduzirVisivel) {
        const linPt = Math.ceil((lenPt || lenIt) / geo.charsPorLinha);
        return linIt + linPt + 1.2;
      }
      return linIt + 0.8;
    };

    const fatiarEmSentencas = (texto) => {
      if (!texto) return [];
      return (texto.match(/[^.!?\n]+(?:[.!?\n]+|$)/g) || [texto]).map(str => str.trim()).filter(Boolean);
    };

    s.testo.forEach((p, parIdx) => {
      const textoIt = (p.english || p.ingles || p.italiano || p.text || '').trim();
      const textoPt = (p.portugues || p.traducao || '').trim();
      const parole = (p.words || p.vocabulary || p.vocabulario || p.parole || []) || [];
      if (!textoIt) return;

      const matchCap = textoIt.match(/^(?:###\s*|Chapter\s+\d+|Capitolo\s+\d+|Capítulo\s+\d+|Part\s+\d+)/i);
      if (matchCap && blocosAtuais.length > 0) {
        empilharPagina();
        capituloAtivo = textoIt.replace(/^###\s*/, '').trim();
      }

      const limiteFolha = () => isFirstPage ? geo.linhasCapa : geo.linhasDisponiveis;
      const custoParagrafo = calcularCustoLinhas(textoIt.length, textoPt.length);

      if (linhasAtuais + custoParagrafo <= limiteFolha()) {
        blocosAtuais.push({
          english: textoIt,
          portugues: textoPt,
          parole: parole,
          parIdx: parIdx,
          continua: false,
          temCapitular: isFirstPage && blocosAtuais.length === 0
        });
        linhasAtuais += custoParagrafo;
        return;
      }

      if (linhasAtuais > 0 && (linhasAtuais / limiteFolha() >= 0.58)) {
        empilharPagina();
        const novoLimite = limiteFolha();
        if (custoParagrafo <= novoLimite) {
          blocosAtuais.push({
            english: textoIt,
            portugues: textoPt,
            parole: parole,
            parIdx: parIdx,
            continua: false,
            temCapitular: isFirstPage && blocosAtuais.length === 0
          });
          linhasAtuais += custoParagrafo;
          return;
        }
      }

      const sentencasIt = fatiarEmSentencas(textoIt);
      const sentencasPt = fatiarEmSentencas(textoPt);

      let bufferIt = '';
      let chunkStartIdx = 0;
      let ePrimeiraFatia = true;

      sentencasIt.forEach((sent, sIdx) => {
        const proporcao = textoPt.length / (textoIt.length || 1);
        const custoSent = calcularCustoLinhas(sent.length, Math.round(sent.length * proporcao));
        const lim = limiteFolha();

        if (linhasAtuais + custoSent > lim && bufferIt.trim()) {
          let ptChunk = '';
          if (sentencasPt.length > 0) {
            const ptStart = Math.floor((chunkStartIdx / sentencasIt.length) * sentencasPt.length);
            const ptEnd = Math.floor((sIdx / sentencasIt.length) * sentencasPt.length);
            ptChunk = sentencasPt.slice(ptStart, Math.max(ptStart + 1, ptEnd)).join(' ').trim();
          }

          blocosAtuais.push({
            english: bufferIt.trim(),
            portugues: ptChunk,
            parole: parole,
            parIdx: parIdx,
            continua: !ePrimeiraFatia,
            temCapitular: ePrimeiraFatia && isFirstPage && blocosAtuais.length === 0
          });

          empilharPagina();
          bufferIt = sent;
          chunkStartIdx = sIdx;
          linhasAtuais = custoSent;
          ePrimeiraFatia = false;
        } else {
          bufferIt += (bufferIt ? ' ' : '') + sent;
          linhasAtuais += custoSent;
        }
      });

      if (bufferIt.trim()) {
        let ptChunk = '';
        if (sentencasPt.length > 0) {
          const ptStart = Math.floor((chunkStartIdx / sentencasIt.length) * sentencasPt.length);
          ptChunk = sentencasPt.slice(ptStart).join(' ').trim();
        }

        blocosAtuais.push({
          english: bufferIt.trim(),
          portugues: ptChunk,
          parole: parole,
          parIdx: parIdx,
          continua: !ePrimeiraFatia,
          temCapitular: ePrimeiraFatia && isFirstPage && blocosAtuais.length === 0
        });
      }
    });

    empilharPagina();
    return paginas;
  },

  _tokenizeWords(texto, parole, parIdx, temCapitular = false) {
    if (!texto) return '';
    const tokens = texto.match(/[A-Za-zÀ-öø-ÿ']+|[^A-Za-zÀ-öø-ÿ'\s]+|\s+/g) || [];
    let primeiraWord = temCapitular;

    return tokens.map((tok, wIdx) => {
      if (/^\s+$/.test(tok)) return tok;
      if (/^[^A-Za-zÀ-öø-ÿ']+$/.test(tok)) return this._escape(tok);

      const vocabDado = parole.find(p =>
        this._normWord(p.ingles || p.english || p.parola || p.word) === this._normWord(tok)
      );
      const jaSalva = typeof this._verificarSalva === 'function' ? this._verificarSalva(tok) : false;

      const classes = ['storie-palavra', 'story-word'];
      if (jaSalva)   classes.push('storie-palavra-salva');
      if (vocabDado) classes.push('storie-palavra-vocab');

      const attrs = [
        `data-palavra="${this._escAttr(tok)}"`,
        `data-par="${parIdx}"`,
        `data-widx="${wIdx}"`,
      ];
      if (vocabDado) {
        const ipaVal = vocabDado.ipa || '';
        const tradVal = vocabDado.traducao_portugues || vocabDado.traducao || vocabDado.traduzione || vocabDado.portugues || '';
        const catVal = vocabDado.categoria || '';
        if (ipaVal)  attrs.push(`data-ipa="${this._escAttr(ipaVal)}"`);
        if (tradVal) attrs.push(`data-trad="${this._escAttr(tradVal)}"`);
        if (catVal)  attrs.push(`data-cat="${this._escAttr(catVal)}"`);
      }

      let inner = this._escape(tok);
      if (primeiraWord) {
        primeiraWord = false;
        inner = `<span class="antique-drop-cap">${this._escape(tok[0])}</span>${this._escape(tok.slice(1))}`;
      }

      return `<span class="${classes.join(' ')}" ${attrs.join(' ')}>${inner}</span>`;
    }).join('');
  },

  _normWord(w) {
    return (w || '').toLowerCase().replace(/[''']/g, "'");
  },

  _escape(s) {
    if (typeof window !== 'undefined' && window.Sanitize && window.Sanitize.escapeHtml) {
      return window.Sanitize.escapeHtml(s);
    }
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },

  _escAttr(s) {
    return String(s || '')
      .replace(/&/g,'&amp;').replace(/"/g,'&quot;')
      .replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/'/g,'&#39;');
  }
};

if (typeof window !== 'undefined') {
  window.StoriesPaginator = StoriesPaginator;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoriesPaginator;
}
