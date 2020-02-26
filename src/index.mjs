import throttle from "./throttle.mjs";
import distanceToElem from "./distance-to-elem.mjs";
import prefetchWithConcurrency from "./prefetch.mjs";

const availableLinks = new Set();

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry =>
    entry.isIntersecting
      ? availableLinks.add(entry.target)
      : availableLinks.delete(entry.target)
  );
});

const excludeKeywords = [];

document
  .querySelectorAll(`a[href^='${window.location.origin}']`)
  .forEach(link => {
    if (new RegExp(excludeKeywords.join("|")).test(link.href)) return;
    observer.observe(link);
  });

const preloadLinksOnMouseMose = e => {
  [...availableLinks].forEach(link => {
    const mouseToElemDistance = distanceToElem(link, e.pageX, e.pageY);
    if (mouseToElemDistance < 200) {
      prefetchWithConcurrency(link.href);
      link.style.color = "red";
    }
  });
};

document.addEventListener("mousemove", throttle(preloadLinksOnMouseMose, 300));
