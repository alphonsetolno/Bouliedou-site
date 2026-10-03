/* Bouliedou — service worker minimal (réseau d'abord, pas de cache agressif
   pour que les mises à jour s'affichent toujours). */
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).catch(function(){ return caches.match(e.request); })
  );
});
