// Use requestIdleCallback if supoprted, otherwise use polyfill.
// Browser support: https://caniuse.com/#feat=requestidlecallback

const requestIdleCallback =
  window.requestIdleCallback ||
  function(cb) {
    const start = Date.now();
    return setTimeout(function() {
      cb({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  };

export default requestIdleCallback;
