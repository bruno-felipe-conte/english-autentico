// ============================================================
// sw.js — Service Worker | Cache v1138 | Offline-first PWA
// Strategy:
//   • Static assets  → cache-first (JS, CSS, HTML, icons)
//   • /data/*.json   → network-first with cache fallback
//   • Google Fonts   → stale-while-revalidate (cached after 1st load)
// ============================================================

const CACHE = 'english-v1138';

// All critical assets required for 100% offline functionality
const STATIC = [
  './',
  './index.html',
  './favicon.ico',
  './css/variables.css',
  './css/variables.css?v=1125',
  './css/header.css',
  './css/header.css?v=1125',
  './css/modals.css',
  './css/modals.css?v=1125',
  './css/flashcard.css',
  './css/flashcard.css?v=1125',
  './css/quiz.css',
  './css/quiz.css?v=1125',
  './css/vocab.css',
  './css/vocab.css?v=1125',
  './css/stories.css',
  './css/stories.css?v=1125',
  './css/english.css',
  './css/english.css?v=1125',
  './css/components.css',
  './css/components.css?v=1138',
  './css/phrasal_verbs.css',
  './css/phrasal_verbs.css?v=1129',
  // Decoupled i18n locales
  './data/locales/pt-BR.json',
  './data/locales/en-US.json',
  // Core infrastructure & security
  './js/constants.js?v=1125',
  './js/sanitize.js?v=1125',
  './js/error-boundary.js?v=1125',
  // Application JS modules with cache busting
  './js/audio.js?v=1125',
  './js/conquistas.js?v=1125',
  './js/app/state.js?v=1125',
  './js/app/navigation.js?v=1125',
  './js/app/xp.js?v=1125',
  './js/app/tts.js?v=1125',
  './js/app/templos.js?v=1125',
  './js/app/bootstrap.js?v=1125',
  './js/core.js?v=1125',
  './js/dialogues.js?v=1125',
  './js/audio-store.js?v=1125',
  './js/audio_cache.js?v=1125',
  './js/voice_engine.js?v=1125',
  './js/tts_worker.js?v=1125',
  './js/songs.js?v=1125',
  './js/pronunciation.js?v=1125',
  './js/ebbinghaus.js',
  './js/ebbinghaus.js?v=1137',
  './js/flashcards.js?v=1138',
  './js/grammar.js?v=1138',
  './js/phrasal_verbs.js',
  './js/phrasal_verbs.js?v=1129',
  './js/heatmap.js?v=1125',
  './js/onboarding.js?v=1125',
  './js/backup_reminder.js?v=1125',
  './js/profile.js?v=1125',
  './js/progression.js?v=1125',
  './js/quiz.js?v=1138',
  './js/quiz_data.js',
  './js/vocab.js?v=1138',
  './js/i18n.js?v=1125',
  './js/notificacoes.js?v=1125',
  './js/tour.js?v=1125',
  './js/stories/loader.js?v=1125',
  './js/stories/paginator.js?v=1125',
  './js/stories/renderer.js?v=1125',
  './js/stories/tts.js?v=1125',
  './js/stories/translator.js?v=1125',
  './js/stories.js?v=1125',
  './js/ia-import.js?v=1125',
  // Datasets
  './data/conjugacoes.json',
  './data/grammar.json',
  './data/phrasal_verbs.json',
  './data/quizzes.json',
  './data/dialogues.json',
  './data/songs.json',
  './data/pronunciation.json',
  './data/stories.json',
  './data/top1000_frequencia.json',
  // Temples 1-76
  ...Array.from({ length: 76 }, (_, i) => `./data/temple-${i + 1}.json`),
  // WASM Neural Config
  './wasm/en_US-lessac-low.json',
  // Web Manifest & App Icons
  './manifest.webmanifest',
  './icons/icon.svg',
];

// ── Install: Pre-cache static assets ─────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      Promise.allSettled(STATIC.map(url => cache.add(url)))
    ).then(() => self.skipWaiting())
  );
});

// ── Activate: Clean up outdated caches ───────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Push Notifications (No Server Required) ──────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'AGENDAR_LEMBRETE') {
    const { delayMs, titulo, corpo, tag } = event.data;
    setTimeout(() => {
      self.registration.showNotification(titulo, {
        body: corpo,
        icon: './icons/icon.svg',
        badge: './icons/icon.svg',
        tag: tag || 'study-reminder',
        renotify: true,
        data: { url: './' }
      });
    }, delayMs);
  }
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
      const existing = clientList.find(c => c.url.includes(self.location.origin));
      if (existing) return existing.focus();
      return clients.openWindow(event.notification.data?.url || './');
    })
  );
});

// ── Fetch: Cache-first for statics, network-first for data ───
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and browser extensions
  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // External audio files (MP3/WAV/streaming) - fetch normally or cache if requested
  if (url.pathname.match(/\.(mp3|wav|ogg|m4a)$/i)) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
    return;
  }

  // Google Fonts: Stale-While-Revalidate
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(request).then(cached => {
          const fetchPromise = fetch(request).then(networkResponse => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // /data/*.json: Network-first with cache fallback
  if (url.pathname.includes('/data/')) {
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          if (networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE).then(cache => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Static assets: Cache-first with network fallback
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return caches.match(request, { ignoreSearch: true });
    }).then(cached => {
      if (cached) return cached;

      return fetch(request).then(networkResponse => {
        if (networkResponse.ok && (url.origin === self.location.origin)) {
          const clone = networkResponse.clone();
          caches.open(CACHE).then(cache => cache.put(request, clone));
        }
        return networkResponse;
      }).catch(() => {
        // Offline HTML navigation fallback
        if (request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
