/**
 * Service Worker for مركز الأمير للتكييف PWA
 * Provides offline support, caching, and background sync
 */

const CACHE_NAME = 'alamir-ac-v1';
const STATIC_CACHE = 'alamir-static-v1';
const DYNAMIC_CACHE = 'alamir-dynamic-v1';

// Files to cache on install
const STATIC_FILES = [
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/portfolio.html',
    '/contact.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg'
];

// External resources to cache
const EXTERNAL_URLS = [
    'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[SW] Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                // Cache external resources
                return caches.open(DYNAMIC_CACHE).then(cache => {
                    return Promise.allSettled(
                        EXTERNAL_URLS.map(url =>
                            fetch(url).then(response => {
                                if (response.ok) {
                                    return cache.put(url, response);
                                }
                            }).catch(() => {})
                        )
                    );
                });
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
                    .map(name => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') return;

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) return;

    // For navigation requests, try network first, then cache
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // For static assets, use cache-first strategy
    if (STATIC_FILES.some(file => url.pathname.endsWith(file)) || 
        url.origin === self.location.origin) {
        
        event.respondWith(
            caches.match(request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        // Update cache in background
                        fetch(request).then(response => {
                            if (response.ok) {
                                caches.open(DYNAMIC_CACHE).then(cache => {
                                    cache.put(request, response);
                                });
                            }
                        }).catch(() => {});
                        
                        return cachedResponse;
                    }

                    // Not in cache, fetch from network
                    return fetch(request).then(response => {
                        if (response.ok) {
                            const responseClone = response.clone();
                            caches.open(DYNAMIC_CACHE).then(cache => {
                                cache.put(request, responseClone);
                            });
                        }
                        return response;
                    });
                })
                .catch(() => {
                    // Return offline fallback for HTML pages
                    if (request.headers.get('accept')?.includes('text/html')) {
                        return caches.match('/index.html');
                    }
                    return new Response('Offline', { status: 503, statusText: 'Offline' });
                })
        )
    );

    return;
});

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    // Get pending form data from IndexedDB and submit
    console.log('[SW] Syncing contact form data...');
}

// Push notification handling
self.addEventListener('push', (event) => {
    let data = {};
    
    if (event.data) {
        data = event.data.json();
    } else {
        data = {
            title: 'مركز الأمير للتكييف',
            body: 'لديك خدمة صيانة جديدة! تواصل معنا الآن.',
            icon: '/images/5.jpg',
            badge: '/images/5.jpg',
            url: '/contact.html'
        };
    }

    const options = {
        body: data.body,
        icon: data.icon || '/images/5.jpg',
        badge: data.badge || '/images/5.jpg',
        vibrate: [100, 50, 100],
        data: { url: data.url || '/' },
        actions: [
            { action: 'view', title: 'عرض' },
            { action: 'dismiss', title: 'تجاهل' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'dismiss') return;

    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(clientList => {
                // Look for existing window
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        return client.navigate(urlToOpen).then(client => client.focus());
                    }
                }
                // Open new window
                return clients.openWindow(urlToOpen);
            })
    );
});

// Message handling from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('[SW] Service Worker loaded');
