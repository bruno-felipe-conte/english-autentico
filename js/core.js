// ============================================================
// js/core.js — App Orchestrator & Delegating Façade (< 120 lines)
// ============================================================
// Modular architecture composed of:
// - js/app/state.js       (Persistence, Energy, Word Discovery, Storage)
// - js/app/navigation.js  (Routing, Sidebar Pin, Tab & Section Management)
// - js/app/xp.js          (Gamification, Leveling, Daily/Target Goals, Stats)
// - js/app/tts.js         (Native SpeechSynthesis, Voice Engine, Rate Controls)
// - js/app/templos.js     (Temples Metadata, Word of the Day, Unlocks)
// - js/app/bootstrap.js   (Data Loader, Startup Lifecycles, Event Bindings)

const App = {
  version: '2.0.0-modular'
};

// Compose submodules into App façade
const _submodules = [
  typeof AppState !== 'undefined' ? AppState : (typeof require !== 'undefined' ? require('./app/state.js') : {}),
  typeof AppNavigation !== 'undefined' ? AppNavigation : (typeof require !== 'undefined' ? require('./app/navigation.js') : {}),
  typeof AppXP !== 'undefined' ? AppXP : (typeof require !== 'undefined' ? require('./app/xp.js') : {}),
  typeof AppTTS !== 'undefined' ? AppTTS : (typeof require !== 'undefined' ? require('./app/tts.js') : {}),
  typeof AppTemplos !== 'undefined' ? AppTemplos : (typeof require !== 'undefined' ? require('./app/templos.js') : {}),
  typeof AppBootstrap !== 'undefined' ? AppBootstrap : (typeof require !== 'undefined' ? require('./app/bootstrap.js') : {})
];

for (const sub of _submodules) {
  Object.assign(App, sub);
}

// Ensure property getters are properly transferred (e.g. UNLOCK_CODE)
if (typeof AppTemplos !== 'undefined' || typeof require !== 'undefined') {
  const templosSrc = typeof AppTemplos !== 'undefined' ? AppTemplos : require('./app/templos.js');
  const desc = Object.getOwnPropertyDescriptor(templosSrc, 'UNLOCK_CODE');
  if (desc) Object.defineProperty(App, 'UNLOCK_CODE', desc);
}

// Backward-compatibility aliases
App.pronunciar = function(t, r) { return App.speak(t, r); };
App.navigate = function(s) { return App.navegar(s); };
App.loadTemples = function() { return App.carregarDados ? App.carregarDados() : null; };
App.updateStats = function() { return App.atualizarStats(); };
App.renderTemples = function() { return App.renderizarTemplos(); };

// Global attachment
if (typeof window !== 'undefined') {
  window.App = App;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}

// DOM ready initialization
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      App.init();
      document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
      });
    });
  } else {
    // If DOM is already ready
    setTimeout(() => {
      App.init();
      document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
      });
    }, 0);
  }
}
