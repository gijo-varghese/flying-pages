// Prefetch a give URL. Browser support: https://caniuse.com/#feat=link-rel-prefetch

const alreadyPrefetched = new Set();

const prefetch = (url) =>
  new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "document";
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });

const prefetchWithConcurrency = (url, limiter) => {
  const [toAdd, isDone] = limiter;
  if (alreadyPrefetched.has(url)) return;
  alreadyPrefetched.add(url);
  document.querySelector(`a[href='${url}']`).style.color = "red";
  toAdd(() => prefetch(url).then(isDone).catch(isDone));
};

export default prefetchWithConcurrency;
