function distanceFromElemToMouse(elem, mouseX, mouseY) {
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (elem.offsetLeft + elem.offsetWidth / 2), 2) +
        Math.pow(mouseY - (elem.offsetTop + elem.offsetHeight / 2), 2)
    )
  );
}

function throttle(callback, limit) {
  var wait = false;
  return function() {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(function() {
        wait = false;
      }, limit);
    }
  };
}

const preloadedLinks = new Set();

function preload(url) {
  return new Promise((resolve, reject) => {
    if (preloadedLinks.has(url)) return;
    preloadedLinks.add(url);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

const availableLinks = new Set();

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry =>
    entry.isIntersecting
      ? availableLinks.add(entry.target)
      : availableLinks.delete(entry.target)
  );
});

document.querySelectorAll("a").forEach(link => observer.observe(link));

function preloadLinksOnMouseMose(e) {
  [...availableLinks].forEach(link => {
    const distance = distanceFromElemToMouse(link, e.pageX, e.pageY);
    if (distance < 200) {
      preload(link.href);
      link.style.color = "red";
    }
  });
}

document.addEventListener("mousemove", throttle(preloadLinksOnMouseMose, 300));
