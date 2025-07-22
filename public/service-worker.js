const CACHE_NAME = 'coursehub-v3';

// Установка service worker - пропускаем кеширование
self.addEventListener('install', (event) => {
  console.log('Service Worker installed - no caching');
  event.waitUntil(self.skipWaiting());
});

// Перехват запросов - отключаем кеширование полностью
self.addEventListener('fetch', (event) => {
  // Всегда делаем сетевой запрос, не используем кеш
  event.respondWith(fetch(event.request));
});

// Обновление service worker - очищаем все кеши
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Принудительно обновляем страницу после очистки кеша
      return self.clients.claim();
    })
  );
}); 