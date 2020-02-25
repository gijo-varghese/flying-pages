import limitExecution from "./limit-execution.mjs";

const prefetchViaDOM = url =>
  new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });

const prefetchViaFetch = url => fetch(url, { credentials: `include` });

const isDomPrefetchSupported = () => {
  const link = document.createElement("link");
  return (
    link.relList && link.relList.supports && link.relList.supports("prefetch")
  );
};

const prefetch = isDomPrefetchSupported() ? prefetchViaDOM : prefetchViaFetch;

const alreadyPrefetched = new Set();

const [toAdd, isDone] = limitExecution(3);

const prefetchWithConcurrency = url => {
  if (alreadyPrefetched.has(url)) return;
  alreadyPrefetched.add(url);
  toAdd(() => {
    prefetch(url)
      .then(isDone)
      .catch(isDone);
  });
};

export default prefetchWithConcurrency;
