import throttle from "./throttle.mjs";
import distanceToElem from "./distance-to-elem.mjs";
import prefetch from "./prefetch.mjs";
import limitExecution from "./limit-execution.mjs";

const isIntersectionObserverSupported =
  window.IntersectionObserver &&
  "isIntersecting" in IntersectionObserverEntry.prototype;

const isSlowConnection =
  navigator.connection &&
  (navigator.connection.saveData ||
    (navigator.connection.effectiveType || "").includes("2g"));

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

export function listen(options) {
  if (isSlowConnection || !isIntersectionObserverSupported) return;

  const defaultOptions = {
    throttle: 3,
    desktopPreloadMethod: "nearby-mouse",
    mobilePreloadMethod: "all-in-viewport",
    mouseProximity: 200,
    excludeKeywords: []
  };
  options = { ...defaultOptions, ...options };

  const preloadMethod = isMobile
    ? options.mobilePreloadMethod
    : options.desktopPreloadMethod;

  const availableLinks = new Set();

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      entry.isIntersecting
        ? availableLinks.add(entry.target)
        : availableLinks.delete(entry.target);
    });
  });

  document
    .querySelectorAll(`a[href^='${window.location.origin}']`)
    .forEach(link => {
      if (
        options.excludeKeywords.length &&
        new RegExp(options.excludeKeywords.join("|")).test(link.href)
      )
        return;
      observer.observe(link);
    });

  const alreadyPrefetched = new Set();

  const [toAdd, isDone] = limitExecution(options.throttle);

  const prefetchWithConcurrency = url => {
    if (alreadyPrefetched.has(url)) return;
    alreadyPrefetched.add(url);
    toAdd(() => {
      prefetch(url)
        .then(isDone)
        .catch(isDone);
    });
  };

  const preloadLinksOnMouseMose = e => {
    [...availableLinks].forEach(link => {
      const mouseToElemDistance = distanceToElem(link, e.pageX, e.pageY);
      if (mouseToElemDistance < options.proximity) {
        prefetchWithConcurrency(link.href);
        link.style.color = "red";
      }
    });
  };

  document.addEventListener(
    "mousemove",
    throttle(preloadLinksOnMouseMose, 300)
  );
}
