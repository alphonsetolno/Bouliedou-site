/* Bouliedou — service worker (v2)
   Stratégie : réseau d'abord (pour toujours avoir la dernière version),
   avec mise en cache automatique de l'app et de ses ressources afin que
   l'application s'ouvre même SANS connexion. Les appels à Supabase (données
   et connexion) ne sont jamais mis en cache : ils passent toujours par le
   réseau, et l'application gère elle-même le mode hors ligne (file d'attente). */
var CACHE = 'bgb-v3';

self.addEventListener('install', function(e){ self.skipWaiting(); });

self.addEventListener('activate', function(e){
  e.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k===CACHE?null:caches.delete(k); }));
    })
  ]));
});

/* Notifications push (nouvelle commande) */
self.addEventListener('push', function(e){
  var data = {};
  try { data = e.data ? e.data.json() : {}; }
  catch(err){ try { data = { title:'Bouliedou', body: e.data.text() }; } catch(e2){ data = {}; } }
  var title = data.title || 'Bouliedou';
  var opts = {
    body: data.body || 'Nouvelle commande reçue',
    icon: '/bgb-192.png',
    badge: '/bgb-192.png',
    tag: data.tag || 'bgb-order',
    renotify: true,
    data: { url: data.url || '/gerant' }
  };
  e.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener('notificationclick', function(e){
  e.notification.close();
  var target = (e.notification.data && e.notification.data.url) || '/gerant';
  e.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(list){
      for (var i=0;i<list.length;i++){
        if (list[i].url.indexOf(target) >= 0 && 'focus' in list[i]) return list[i].focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(target);
    })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url;
  try { url = new URL(req.url); } catch(err){ return; }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  // Ne jamais mettre en cache les appels Supabase (API, auth, fonctions) :
  // toujours le réseau ; hors ligne, l'app bascule sur ses données locales.
  if (url.hostname.indexOf('supabase.co') >= 0) return;

  e.respondWith(
    fetch(req).then(function(res){
      if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ try { c.put(req, copy); } catch(e2){} });
      }
      return res;
    }).catch(function(){
      return caches.match(req).then(function(hit){
        if (hit) return hit;
        // Pour une navigation hors ligne sans page en cache, tenter la racine de l'app.
        if (req.mode === 'navigate') return caches.match(url.pathname) || caches.match('/');
        return undefined;
      });
    })
  );
});
