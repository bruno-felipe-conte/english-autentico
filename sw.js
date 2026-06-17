// ============================================================
// sw.js — Service Worker  |  Cache v47  |  Offline-first PWA
// Estratégia:
//   • Static assets  → cache-first  (JS, CSS, HTML, ícones)
//   • /data/*.json   → network-first com fallback de cache
//   • Google Fonts   → stale-while-revalidate (cache após 1ª carga)
// ============================================================

const CACHE = 'english-v1016';

// Todos os arquivos necessários para rodar 100% offline
const STATIC = [
  './',
  './index.html',
  './css/english.css',
  './css/styles.css',
  // JS — módulos da aplicação (URLs com ?v=1001 para forçar atualização de cache)
  './js/audio.js?v=1001',
  './js/conquistas.js?v=1001',
  './js/core.js?v=1001',
  './js/dialoghi.js?v=1001',
  './js/audio-store.js?v=1006',
  './js/canzoni.js?v=1012',
  './js/imitazione.js?v=1001',
  './js/flashcards.js?v=1001',
  './js/grammar.js?v=1001',
  './js/heatmap.js?v=1001',
  './js/onboarding.js?v=1001',
  './js/profilo.js?v=1001',
  './js/progression.js?v=1001',
  './js/quiz.js?v=1001',
  './js/quiz_data.js',
  './js/vocab.js?v=1001',
  './js/i18n.js?v=1001',
  './js/notificacoes.js?v=1001',
  './js/tour.js?v=1001',
  './js/storie.js?v=1001',
  './js/ia-import.js?v=1001',
  // Dados
  './data/conjugacoes.json',
  './data/grammar.json',
  './data/quizzes.json',
  './data/dialogi.json',
  './data/canzoni.json',
  './data/imitazioni.json',
  './data/storie.json',
  // Templos 1-51 (gerados dinamicamente)
  ...Array.from({length: 51}, (_, i) => `./data/templo-${i+1}.json`),
  // Manifesto e ícone
  './manifest.webmanifest',
  './icons/icon.svg',
];

// ── Install: pré-cache de tudo ────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      // addAll falha se qualquer recurso não for encontrado;
      // tentamos individualmente para não abortar por arquivos opcionais
      Promise.allSettled(STATIC.map(url => cache.add(url)))
    )
  );
  self.skipWaiting();
});

// ── Activate: apaga caches antigos ───────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1. Google Fonts — stale-while-revalidate
  //    Após a primeira visita ficam disponíveis offline
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE).then(cache =>
        cache.match(req).then(cached => {
          const network = fetch(req).then(res => {
            cache.put(req, res.clone());
            return res;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // Ignora requisições cross-origin que não sejam fontes
  if (url.origin !== self.location.origin) return;

  // 2. /data/*.json — network-first (recebe atualizações de conteúdo)
  //    Se offline, entrega do cache. Se não tiver no cache, entrega fallback estruturado.
  if (url.pathname.includes('/data/')) {
    event.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req).then(cached => {
          if (cached) return cached;
          // Fallback estruturado para prevenir WSOD
          const fallbackData = { 
            palavras: [], 
            storie: [], 
            dialogi: [], 
            canzoni: [], 
            grammar: [], 
            quizzes: [], 
            imitazioni: [] 
          };
          return new Response(JSON.stringify(fallbackData), {
            headers: { 'Content-Type': 'application/json' }
          });
        }))
    );
    return;
  }

  // 3. Tudo o mais — cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      if (res.ok) {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(req, clone));
      }
      return res;
    }))
  );
});

// ── Push Notifications ────────────────────────────────────
// Recebe mensagem da página para agendar lembretes locais
self.addEventListener('message', event => {
  if (!event.data) return;

  if (event.data.type === 'AGENDAR_LEMBRETE') {
    const { delayMs, titulo, corpo, tag } = event.data;
    // NOTE: setTimeout inside a SW is unreliable — Chrome/Firefox kill idle SWs
    // in ~30s. For delays > 30s this will silently fail. A proper fix requires
    // the Background Sync API or server-side Web Push. For now we only fire
    // if the delay is short enough to be safe (< 25 seconds).
    if (delayMs < 25000) {
      setTimeout(() => {
        self.registration.showNotification(titulo, {
          body:    corpo,
          icon:    './icons/icon.svg',
          badge:   './icons/icon.svg',
          tag:     tag || 'english-reminder',
          renotify: true,
          data:    { url: './' },
        });
      }, delayMs);
    }
    // Long-delay reminders are a no-op until Background Sync is implemented.
  }
});

// Clique na notificação → abre o app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(lista => {
      const existente = lista.find(c => c.url.includes('english') || c.url.endsWith('/'));
      if (existente) return existente.focus();
      return clients.openWindow(event.notification.data?.url || './');
    })
  );
});
