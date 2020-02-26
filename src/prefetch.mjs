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

export default prefetch;
