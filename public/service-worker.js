const CACHE_NAME = 'coursehub-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/images/Logo192p.png',
  '/images/Logo512p.png',
  '/images/apple-touch-icon.png.png',
  '/src/index.tsx'
];

// Установка service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Исключаем API запросы из кеширования
  if (url.pathname.startsWith('/api/') || 
      url.pathname.includes('/auth/') ||
      request.headers.has('Authorization') ||
      request.method !== 'GET') {
    // Для API запросов всегда делаем сетевой запрос
    event.respondWith(fetch(request));
    return;
  }
  
  // Для статических ресурсов используем кеш
  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Возвращаем кэшированный ответ, если он есть
        if (response) {
          return response;
        }
        
        // Иначе делаем сетевой запрос
        return fetch(request).then(
          (response) => {
            // Проверяем, что получили валидный ответ
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Клонируем ответ
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Обновление service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Принудительно обновляем страницу после очистки кеша
      return self.clients.claim();
    })
  );
}); 