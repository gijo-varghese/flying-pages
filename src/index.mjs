import throttle from "./throttle.mjs";
import distanceToElem from "./distance-to-elem.mjs";
import prefetchWithConcurrency from "./prefetch.mjs";
import limitExecution from "./limit-execution.mjs";

const isPrefetchSupported = () => {
  const link = document.createElement("link");
  return (
    link.relList && link.relList.supports && link.relList.supports("prefetch")
  );
};

// Check IntersectionObserver is supported
// If IntersectionObserver is not supported, we won't be able to run
// Browser support: https://caniuse.com/#feat=intersectionobserver
const isIntersectionObserverSupported =
  window.IntersectionObserver &&
  "isIntersecting" in IntersectionObserverEntry.prototype;

// Check user is on a solution connection (like 2G) or has enabled Data-saver
// Don't preload if user is on slow connection
const isSlowConnection =
  navigator.connection &&
  (navigator.connection.saveData ||
    (navigator.connection.effectiveType || "").includes("2g"));

// Detect mobile (and tablet)
// Separate settings can be conifgured for mobile and desktop. In mobile, it's ideal
// to preload all links since the viewport is small and there is no mouse pointer
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Main function
export function listen(options) {
  // Return if user is on slow connection or intersectionObserver is not supported
  if (
    isSlowConnection ||
    !isIntersectionObserverSupported ||
    !isPrefetchSupported()
  )
    return;

  const defaultOptions = {
    throttle: 3,
    desktopPreloadMethod: "nearby-mouse",
    mobilePreloadMethod: "all-in-viewport",
    mouseProximity: 200,
    excludeKeywords: [],
  };

  // Merge received options with our default options.
  options = { ...defaultOptions, ...options };

  const linksInViewport = new Set();
  const [toAdd, isDone] = limitExecution(options.throttle);

  const preloadMethod = isMobile
    ? options.mobilePreloadMethod
    : options.desktopPreloadMethod;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (preloadMethod === "all-in-viewport")
        entry.isIntersecting &&
          prefetchWithConcurrency(entry.target.href, toAdd, isDone);

      if (preloadMethod === "nearby-mouse")
        entry.isIntersecting
          ? linksInViewport.add(entry.target)
          : linksInViewport.delete(entry.target);
    });
  });

  document
    .querySelectorAll(`a[href^='${window.location.origin}']`)
    .forEach((link) => {
      const excludeRegex = new RegExp(options.excludeKeywords.join("|"));
      if (options.excludeKeywords.length && excludeRegex.test(link.href))
        return;
      observer.observe(link);
    });

  if (preloadMethod === "nearby-mouse") {
    const preloadLinksOnMouseMove = (e) => {
      [...linksInViewport].forEach((link) => {
        const mouseToElemDistance = distanceToElem(link, e.pageX, e.pageY);
        if (mouseToElemDistance < options.mouseProximity) {
          prefetchWithConcurrency(link.href, toAdd, isDone);
          link.style.color = "red";
        }
      });
    };

    document.addEventListener(
      "mousemove",
      throttle(preloadLinksOnMouseMove, 300)
    );
  }
}
