// ============================================================
// js/stories/loader.js — Stories Data Loading & Normalization
// ============================================================

const StoriesLoader = {
  dados: null,
  storAttuale: null,
  traduzirVisivel: false,
  completate: [],
  paginaAtual: 1,
  _paginas: [],
  _indiceAberto: false,
  _touchStartX: 0,
  _touchStartY: 0,
  _keyListener: null,
  _resizeListener: null,
  _animandoVirada: false,
  _reproduzindoAudio: false,
  _audioFilaSentencas: [],
  _audioIndexSentenca: 0,
  _filtroNivel: '',
  _filtroTexto: '',
  _filtroOrigem: '',
  _escListener: null,
  _tradCache: {},
  _tradQueue: [],
  _tradProcessing: false,
  _modalData: null,
  _storieBase: null,

  async carregar() {
    if (!this.dados) {
      try {
        const cached = localStorage.getItem('en_swr_stories_v2') || localStorage.getItem('en_swr_stories');
        if (cached) {
          const raw = JSON.parse(cached);
          const hasVocab = raw?.storie?.[0]?.testo?.[0]?.vocabulario || (raw?.storie?.[0]?.testo?.[0]?.parole && raw.storie[0].testo[0].parole.length > 0);
          if (hasVocab) {
            raw.storie = (raw.storie || []).map(s => this._normalize(s));
            this.dados = raw;
            fetch('data/stories.json')
              .then(r => r.ok ? r.json() : null)
              .then(fresh => {
                if (fresh && Array.isArray(fresh.storie)) {
                  fresh.storie = fresh.storie.map(s => this._normalize(s));
                  this.dados = fresh;
                  try { localStorage.setItem('en_swr_stories_v2', JSON.stringify(fresh)); } catch (_) {}
                }
              })
              .catch(() => {});
          } else {
            localStorage.removeItem('en_swr_stories');
          }
        }
      } catch (_) {}
    }

    if (!this.dados) {
      try {
        const r = await fetch('data/stories.json');
        if (r.ok) {
          const raw = await r.json();
          raw.storie = (raw.storie || []).map(s => this._normalize(s));
          this.dados = raw;
          try { localStorage.setItem('en_swr_stories_v2', JSON.stringify(raw)); } catch (_) {}
        } else this.dados = { storie: [] };
      } catch { this.dados = { storie: [] }; }
    }

    if (!this._storieBase && this.dados && this.dados.storie) {
      this._storieBase = [...this.dados.storie];
    }
    try {
      const custom = JSON.parse(localStorage.getItem('en_stories_custom') || '[]');
      const normalizadas = custom.map(s => this._normalize(s));
      this.dados.storie = [...normalizadas, ...(this._storieBase || [])];
    } catch (e) {
      this.dados.storie = [...(this._storieBase || [])];
    }
    try {
      this.completate = JSON.parse(localStorage.getItem('en_stories_read') || '[]');
    } catch { this.completate = []; }
  },

  _normalize(s) {
    if (!s) return s;
    const out = Object.assign({}, s);
    if (!out.titulo && out.titolo) out.titulo = out.titolo;
    if (!out.titulo_pt) out.titulo_pt = out.titulo || out.titolo || '';
    if (!out.nivel && out.livello) out.nivel = out.livello;
    if (!out.descricao) out.descricao = out.tema || out.sinossi || '';
    if (!out.descricao_pt) out.descricao_pt = out.descricao;
    if (!out.icone) out.icone = '📜';
    if (!out.xp_recompensa) out.xp_recompensa = 60;

    if (!out.testo && Array.isArray(out.capitoli)) {
      const flat = [];
      out.capitoli.forEach((cap, cIdx) => {
        const capTit = cap.titulo || cap.titolo || `Chapter ${cIdx + 1}`;
        const pars = Array.isArray(cap.paragrafi) ? cap.paragrafi : (Array.isArray(cap.testo) ? cap.testo : []);
        pars.forEach((p, pIdx) => {
          flat.push({
            ...(typeof p === 'string' ? { english: p } : p),
            capituloTitulo: pIdx === 0 ? capTit : undefined
          });
        });
      });
      out.testo = flat;
    }

    if (!out.testo && Array.isArray(out.paragrafi)) {
      out.testo = out.paragrafi;
    }

    if (typeof out.testo === 'string') {
      const linhas = out.testo.split(/\n\s*\n|\r\n\s*\r\n/).map(l => l.trim()).filter(Boolean);
      out.testo = linhas.map((l, i) => ({
        id: `p${i}`,
        english: l,
        ingles: l,
        italiano: l,
        portugues: '',
        traducao: '',
        parole: [],
        vocabulario: [],
        words: []
      }));
    }

    if (Array.isArray(out.testo)) {
      out.testo = out.testo.map((p, idx) => {
        if (typeof p === 'string') {
          return {
            id: `p${idx}`,
            english: p,
            ingles: p,
            italiano: p,
            portugues: '',
            traducao: '',
            parole: [],
            vocabulario: [],
            words: []
          };
        }
        const en = (p.english || p.ingles || p.text || p.italiano || p.it || p.testo || p.frase || p.paragrafo || '').trim();
        const pt = (p.portugues || p.traducao || p.traducao_portugues || p.traduzione || p.pt || p.portoghese || p.traducao_pt || p.translation || '').trim();

        const rawVocab = (p.words || p.vocabulary || p.vocabulario || p.parole || []);
        const parole = Array.isArray(rawVocab) ? rawVocab.map(w => {
          const termo = (w.ingles || w.english || w.parola || w.word || w.termo || '').trim();
          const trad  = (w.traducao_portugues || w.portugues || w.traducao || w.translation || w.trad || w.traduzione || '').trim();
          const ipaVal = (w.ipa || '').trim();
          const catVal = (w.categoria || w.category || '').trim();
          return {
            parola: termo,
            word: termo,
            english: termo,
            ingles: termo,
            traduzione: trad,
            traducao: trad,
            portugues: trad,
            traducao_portugues: trad,
            translation: trad,
            ipa: ipaVal,
            categoria: catVal,
            category: catVal
          };
        }) : [];

        return {
          id: p.id || `p${idx}`,
          english: en,
          ingles: en,
          italiano: en,
          portugues: pt,
          traducao: pt,
          parole: parole,
          vocabulario: parole,
          words: parole,
          capituloTitulo: p.capituloTitulo
        };
      });
    }

    return out;
  },

  _saveCustomStoryUpdated(storia) {
    if (!storia) return;
    try {
      const custom = JSON.parse(localStorage.getItem('en_stories_custom') || '[]');
      const idx = custom.findIndex(s => s.id === storia.id);
      if (idx !== -1) {
        custom[idx] = storia;
        localStorage.setItem('en_stories_custom', JSON.stringify(custom));
      }
    } catch (_) {}
  },

  _saveCompleted() {
    try {
      localStorage.setItem('en_stories_read', JSON.stringify(this.completate));
    } catch (_) {}
  },

  _markAsRead() {
    if (!this.storAttuale) return;
    const id = this.storAttuale.id;
    const isEn = typeof I18n !== 'undefined' && I18n.idioma === 'en';
    if (this.completate.includes(id)) {
      const msg = (typeof I18n !== 'undefined' && I18n.t('storie_notif_ja_lida'))
        ? I18n.t('storie_notif_ja_lida')
        : (isEn ? 'You have already read this story.' : 'Você já leu esta história.');
      if (typeof App !== 'undefined' && App.notificar) App.notificar(msg, 'info');
      return;
    }
    this.completate.push(id);
    this._saveCompleted();
    const xp = this.storAttuale.xp_recompensa || 50;
    if (typeof App !== 'undefined' && App.ganharXP) App.ganharXP(xp);
    const msgLida = (typeof I18n !== 'undefined' && I18n.t('storie_notif_lida'))
      ? I18n.t('storie_notif_lida').replace('{xp}', xp)
      : (isEn ? `📖 +${xp} XP for finishing the story!` : `📖 +${xp} XP por concluir a história!`);
    if (typeof App !== 'undefined' && App.notificar) App.notificar(msgLida, 'sucesso');
    if (typeof this._renderizarStoria === 'function') this._renderizarStoria();
  },

  init() {
    if (typeof this.renderSelector === 'function') this.renderSelector();
  }
};

if (typeof window !== 'undefined') {
  window.StoriesLoader = StoriesLoader;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StoriesLoader;
}
