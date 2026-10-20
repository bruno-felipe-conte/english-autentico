// ============================================================
// js/stories.js — Stories Orchestrator & Delegating Façade (< 120 lines)
// ============================================================
// Modular architecture composed of:
// - js/stories/loader.js      (Data loading, SWR caching, normalization, completion)
// - js/stories/paginator.js   (Line-budget geometry, 3D audio, word tokenization)
// - js/stories/renderer.js    (Selector grid, antique book stage, drawer, navigation)
// - js/stories/tts.js         (Sequential page audio, sentence queue, speech events)
// - js/stories/translator.js  (Retry-backed translation APIs, rate limiter, word modal)

const Stories = {
  version: '2.0.0-modular'
};

const _storyModules = [
  typeof StoriesLoader !== 'undefined' ? StoriesLoader : (typeof require !== 'undefined' ? require('./stories/loader.js') : {}),
  typeof StoriesPaginator !== 'undefined' ? StoriesPaginator : (typeof require !== 'undefined' ? require('./stories/paginator.js') : {}),
  typeof StoriesRenderer !== 'undefined' ? StoriesRenderer : (typeof require !== 'undefined' ? require('./stories/renderer.js') : {}),
  typeof StoriesTTS !== 'undefined' ? StoriesTTS : (typeof require !== 'undefined' ? require('./stories/tts.js') : {}),
  typeof StoriesTranslator !== 'undefined' ? StoriesTranslator : (typeof require !== 'undefined' ? require('./stories/translator.js') : {})
];

for (const sub of _storyModules) {
  Object.assign(Stories, sub);
}

// Backward-compatibility aliases and Italian method parity
Stories._normalizar = function(s) { return Stories._normalize(s); };
Stories.renderizarSeletor = function() { return Stories.renderSelector(); };
Stories.abrirLeitor = function(id) { return Stories.abrirStoria(id); };
Stories.openReader = function(id) { return Stories.abrirStoria(id); };
Stories.openStory = function(id) { return Stories.abrirStoria(id); };
Stories.fecharLeitor = function() { return Stories.closeReader(); };
Stories.proximaPagina = function() { return Stories.nextPage(); };
Stories.paginaAnterior = function() { return Stories.prevPage(); };
Stories.irParaPagina = function(p) { return Stories.goToPage(p); };
Stories._calcularOrcamentoGeometria = function(h, f, l) { return Stories._calculateLineBudget(h, f, l); };
Stories._gerarPaginas = function(s, m) { return Stories._generatePages(s, m); };
Stories._tocarSomFolhear = function() { return Stories._playPageTurnSound(); };
Stories._toggleSegnalibro = function() { return Stories._toggleBookmark(); };
Stories._toggleTraduzir = function() { return Stories._toggleTranslation(); };
Stories._ouvirPaginaAtual = function() { return Stories._listenCurrentPage(); };
Stories._abrirIndiceCapitulos = function() { return Stories._openChapterDrawer(); };
Stories._fecharIndiceCapitulos = function() { return Stories._closeChapterDrawer(); };
Stories._abrirModalPalavra = function(el) { return Stories._openWordModal(el); };
Stories._fecharModal = function(r) { return Stories._closeWordModal(r); };
Stories._salvarModalDeck = function() { return Stories._saveModalDeck(); };
Stories._salvarNoDeck = function(p, d) { return Stories._saveWordToFlashcards(p, d); };
Stories._marcarLida = function() { return Stories._markAsRead(); };
Stories._pararAudioPagina = function() { return Stories._stopPageAudio(); };
Stories._tocarProximaSentenca = function() { return Stories._playNextSentence(); };
Stories._marcarPalavras = function(t, p, i, c) { return Stories._tokenizeWords(t, p, i, c); };
Stories._marcarPalavraSalvaNoDOM = function(p) { return Stories._markWordSavedInDOM(p); };

// Global attachment
if (typeof window !== 'undefined') {
  window.Stories = Stories;
  window.Storie = Stories;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Stories;
}
