import {registerRoute} from "workbox-routing";
import {CacheFirst, StaleWhileRevalidate} from "workbox-strategies";
import {CacheableResponsePlugin} from "workbox-cacheable-response";
import {ExpirationPlugin} from "workbox-expiration";

// Google fonts
// Cache the underlying font files with a cache-first strategy for 1 year
registerRoute(
    ({url}) => url.origin === "https://fonts.gstatic.com",
    new CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
            new ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    }),
);

// API
registerRoute(
    ({url}) => url.origin === "https://tabool.com" &&
        url.pathname.startsWith("/api/"),
    new StaleWhileRevalidate(),
);

// Scripts and css
registerRoute(
    ({request}) => (
        request.destination === "script" ||
        request.destination === "style"
    ),
    new StaleWhileRevalidate({
        cacheName: "static-resources",
    }),
);
