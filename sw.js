const V="maxwell-202611101724";const CORE=["./","index.html","manifest.webmanifest","icon-180.png","icon-192.png","icon-512.png","katex.min.js","data.js"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
// Network-first for everything on this origin (so new content shows up right away), cache fallback when offline.
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
 e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r.mode==="navigate"?"index.html":r,cp));}return res;})
  .catch(()=>caches.match(r.mode==="navigate"?"index.html":r).then(m=>m||caches.match(r,{ignoreSearch:true}))));});
