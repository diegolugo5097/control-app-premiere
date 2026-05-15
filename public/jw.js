// public/sw.js
const CACHE_VERSION = "v1";
const VIDEO_CACHE = `video-cache-${CACHE_VERSION}`;
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;

// 👉 Lista de videos a pre-cachear (pon aquí todos los MP4 que uses)
const VIDEO_URLS = [
  "/media/ALIEN.mp4",
  "/media/FRANKY.mp4",
  "/media/V-INVASION-EXTRATERRESTRE.mp4",
  "/media/GRAN-HEROE.mp4",
  "/media/ET.mp4",
  "/media/CAPITAN-PREMIER.mp4",
  "/media/STARMAN.mp4",
  "/media/ORION-EL-ATLANTE.mp4",
  "/media/MARS-ATTACK.mp4",
  "/media/hombre-nuclear.mp4",
  "/media/VECNA.mp4",
];

// (opcional) estáticos críticos
const STATIC_URLS = [
  "/", // tu shell
];

// Util: parsear "bytes=start-end"
function parseRange(rangeHeader, totalLength) {
  // ejemplo "bytes=1000-" o "bytes=1000-2000"
  const m = /bytes=(\d*)-(\d*)/.exec(rangeHeader || "");
  let start = 0,
    end = totalLength - 1;
  if (!m) return { start, end };
  if (m[1] !== "") start = parseInt(m[1], 10);
  if (m[2] !== "") end = parseInt(m[2], 10);
  if (isNaN(start) || start < 0) start = 0;
  if (isNaN(end) || end >= totalLength) end = totalLength - 1;
  if (start > end) start = 0;
  return { start, end };
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    Promise.all([
      caches.open(VIDEO_CACHE).then((cache) => cache.addAll(VIDEO_URLS)),
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_URLS)),
    ])
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      // limpia versiones antiguas
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => ![VIDEO_CACHE, STATIC_CACHE].includes(k))
          .map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

// Respuesta parcial desde un Blob en cache
async function respondRangeFromCache(cache, request) {
  const cached = await cache.match(request.url, {
    ignoreVary: true,
    ignoreSearch: false,
  });
  if (!cached) return null;

  // Necesitamos Blob para poder hacer slice()
  const blob = await cached.blob(); // requiere que NO sea opaque
  const total = blob.size;

  const rangeHeader = request.headers.get("Range");
  if (!rangeHeader)
    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Length": total,
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });

  const { start, end } = parseRange(rangeHeader, total);
  const chunk = blob.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Content-Length": chunk.size,
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Sólo maneja tu mismo origen (evita problemas CORS/opaque)
  const isSameOrigin = url.origin === self.location.origin;

  // ---- Videos MP4: estrategia cache-first con soporte Range ----
  if (
    isSameOrigin &&
    (event.request.destination === "video" || url.pathname.endsWith(".mp4"))
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(VIDEO_CACHE);

        // Si ya está en cache, respondemos (con 200 o 206 si hay Range)
        const rangeResp = await respondRangeFromCache(cache, event.request);
        if (rangeResp) return rangeResp;

        // Si no está, lo traemos de red y lo guardamos completo
        const netResp = await fetch(event.request);
        // Sólo cachea respuestas 200 OK completas (no 206 parciales)
        if (netResp && netResp.ok && netResp.status === 200) {
          // Clonamos para cachear como objeto completo
          const clone = netResp.clone();
          // Nota: si tu servidor sirve con CORS bloqueante, clone.blob() puede quedar 'opaque' y no servirá para Range.
          // Asegura CORS correcto (ver notas más abajo).
          await cache.put(event.request.url, clone);
        }
        return netResp;
      })()
    );
    return;
  }

  // ---- Estáticos: stale-while-revalidate simple ----
  if (
    isSameOrigin &&
    (event.request.destination === "document" ||
      event.request.destination === "style" ||
      event.request.destination === "script")
  ) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(event.request);
        const fetchPromise = fetch(event.request)
          .then((networkResp) => {
            if (networkResp && networkResp.ok)
              cache.put(event.request, networkResp.clone());
            return networkResp;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })()
    );
    return;
  }

  // Otros: pasa-through (o podrías añadir más estrategias por tipo)
});
