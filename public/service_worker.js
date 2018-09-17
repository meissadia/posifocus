const version = "0.0.1b";
const cacheName = `posifocus-web-${version}`;

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/static/js/bundle.js`,
        `/static/js/bundle.js.map`,
        `/index.html`,
        `/images/posifocus-logo.png`,
        `/images/bgimage_small.jpg`,
        `/images/blank-user.png`,
        `/images/contacts-instructions-tableview.png`,
        `/images/delete-icon.png`,
        `/images/edit-icon.png`,
        `/images/gratitudes-instructions-tableview.png`,
        `/images/gratitudes@2x.png`,
        `/images/iTunesArtwork@1x.png`,
        `/images/priorities-instructions-tableview.png`,
        `/images/priorities@2x.png`,
        `/images/projects-instructions-tableview.png`,
        `/images/projects@2x.png`,
        `/images/relationships-instructions-tableview.png`,
        `/images/relationships@2x.png`,
        `/images/tasks-instructions-tableview.png`,
        `/images/tasks@2x.png`,
        `/manifest.json`,
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cache_names) {
      return Promise.all(
        cache_names.map(function(cache_name) {
          if (cache_name.startsWith('posifocus-web-') && (cache_name !== cacheName)) {
            return caches.delete(cache_name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
        if(response){
          return response
        } else {
          return fetch(event.request);
        }
    })
  );
});
