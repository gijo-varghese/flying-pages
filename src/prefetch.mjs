// Prefetch a give URL. Use native DOM prefetch if available,
// Otherwise use native Fetch.
// XHR is not implement since it's only needed for Internet Explorer
// and IE doesn't support intersectionObserver which is necessary
// Prefetch browser support: https://caniuse.com/#feat=link-rel-prefetch
// `Fetch` browser support: https://caniuse.com/#feat=fetch

const alreadyPrefetched = new Set();

const prefetch = (url) =>
  new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });

const prefetchWithConcurrency = (url, toAdd, isDone) => {
  if (alreadyPrefetched.has(url)) return;
  alreadyPrefetched.add(url);
  document.querySelector(`a[href='${url}']`).style.color = "red";
  toAdd(() => {
    prefetch(url).then(isDone).catch(isDone);
  });
};

export default prefetchWithConcurrency;
