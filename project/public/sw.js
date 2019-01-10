var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  // Base
  '/',
  '/?utm_source=pwa',
  '/es6/',
  '/es6/?utm_source=pwa',
  '/pwa/',
  '/pwa/?utm_source=pwa',

  // Favicon
  '/images/favicon.ico',

  // Styles
  '/stylesheets/global/styles.1.css',

  // Images
  '/images/me.jpeg',
  '/images/logo.png',
  '/images/background.jpeg',
  // Versions
  '/images/versions/amp.png',
  '/images/versions/angularjs.png',
  '/images/versions/angular.png',
  '/images/versions/javascript-es6.png',
  '/images/versions/reactjs.png',
  // Experience
  '/images/experience/encore.png',
  '/images/experience/b507.png',
  '/images/experience/valusoft_cosmi.png',
  '/images/experience/theoryio.png',
  '/images/experience/preferred_interactive.png',
  '/images/experience/valusoft_thq.png',

  // JavaScripts
  // Regular
  '/javascripts/regular/global/es6.js',
  '/javascripts/regular/global/script.js',
  '/javascripts/regular/navigation/events.js',
  '/javascripts/regular/skills/events.js',
  '/javascripts/regular/portfolio/events.js',
  // ES6
  '/javascripts/es6/global/es6.js',
  '/javascripts/es6/global/script.js',
  '/javascripts/es6/navigation/events.js',
  '/javascripts/es6/skills/events.js',
  '/javascripts/es6/portfolio/events.js',

  // Portfolio Responses
  // '/javascripts/response/portfolio/source.1.json',
  // '/javascripts/response/portfolio/source.2.json',
  // '/javascripts/response/portfolio/source.3.json',
  // '/javascripts/response/portfolio/source.4.json',
  // '/javascripts/response/portfolio/source.5.json',
  '/api/portfolio/getCollection/?collection=1',
  '/api/portfolio/getCollection/?collection=2',
  '/api/portfolio/getCollection/?collection=3',
  '/api/portfolio/getCollection/?collection=4',
  '/api/portfolio/getCollection/?collection=5',

  // Portfolio Images
  // Response 1
  '/images/portfolio/metal-plating-full.jpeg',
  '/images/portfolio/metal-plating-maps.jpeg',
  '/images/portfolio/metal-plating-surface.jpeg',
  '/images/portfolio/metal-plating-nodes.jpeg',
  '/images/portfolio/2d-sidescroller-1.jpeg',
  '/images/portfolio/2d-sidescroller-2.jpeg',
  '/images/portfolio/2d-sidescroller-3.jpeg',
  '/images/portfolio/2d-sidescroller-4.jpeg',
  '/images/portfolio/light-post.jpeg',

  // Response 2
  '/images/portfolio/metal-crates-set.jpeg',
  '/images/portfolio/metal-box-1.jpeg',
  '/images/portfolio/metal-box-2.jpeg',
  '/images/portfolio/wood-crates-set-2.jpeg',
  '/images/portfolio/crate-holder.jpeg',
  '/images/portfolio/wood-box-1.jpeg',
  '/images/portfolio/wood-box-2.jpeg',
  '/images/portfolio/wood-box-3.jpeg',
  '/images/portfolio/wood-crates-set-1.jpeg',
  '/images/portfolio/plastic-crates-set.jpeg',

  // Response 3
  '/images/portfolio/3d-racing-game-1.jpeg',
  '/images/portfolio/3d-racing-game-2.jpeg',
  '/images/portfolio/3d-racing-game-3.jpeg',
  '/images/portfolio/3d-racing-game-4.jpeg',
  '/images/portfolio/wood-barrels-set.jpeg',
  '/images/portfolio/metal-barrels-set.jpeg',
  '/images/portfolio/stairs-set.jpeg',
  '/images/portfolio/stairs-1.jpeg',

  // Response 4
  '/images/portfolio/mastercook.jpeg',
  '/images/portfolio/projectbook.jpeg',
  '/images/portfolio/first-person-shooter-game-1.jpeg',
  '/images/portfolio/first-person-shooter-game-2.jpeg',

  // Response 5
  '/images/portfolio/3d-defend-game.jpeg',
  '/images/portfolio/pipes-set.jpeg',
  '/images/portfolio/propane-tanks.jpeg'
];

self.addEventListener('install', function(event) {
  console.log('Installing: ' + CACHE_NAME);
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
