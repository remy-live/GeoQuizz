const CACHE_NAME = 'learndaily-atlas-v1';

// Dès que l'app s'installe, le Service Worker s'active immédiatement
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// Nettoyage : si un jour tu changes 'v1' en 'v2', il effacera l'ancien cache pour faire de la place
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) return caches.delete(cache);
                })
            );
        })
    );
});

// LE MOTEUR PRINCIPAL : Intercepte toutes les requêtes (images, cartes, API)
self.addEventListener('fetch', (event) => {
    // On ignore les requêtes bizarres ou les extensions Chrome
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 1. EST-CE DANS LE CACHE ? Si oui, on le donne instantanément (0 milliseconde)
            if (cachedResponse) {
                return cachedResponse;
            }

            // 2. SINON, ON VA SUR INTERNET
            return fetch(event.request).then((networkResponse) => {
                // On vérifie que le téléchargement s'est bien passé
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                // On clone le fichier (un pour l'afficher à l'écran, un pour le ranger dans le cache)
                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    // On sauvegarde ce nouveau fichier (ex: la photo du Chêne ou le GeoJSON) sur le téléphone
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(() => {
                // 3. SI PAS D'INTERNET ET PAS DE CACHE :
                // L'app gérera l'erreur toute seule (comme tes placeholders d'images actuels)
                console.log("Hors-ligne et fichier non mis en cache :", event.request.url);
            });
        })
    );
});