<p align="center">
  <img src="cover.png">
</p>

# Flying Pages

> Flying Pages preload pages before the user click on it, making them load instantly

## Quick Links

- Demo: open [https://wpspeedmatters.com](https://wpspeedmatters.com) and click on any post
- [WordPress Plugin](https://wordpress.org/plugins/flying-pages/)
- [Quicklink vs Instant page vs Flying Pages](https://wpspeedmatters.com/quicklink-vs-instant-page-vs-flying-pages/)
- Join [Facebook Group](https://www.facebook.com/groups/wpspeedmatters/), a community of WordPress speed enthusiasts

<style>.bmc-button img{width: 27px !important;margin-bottom: 1px !important;box-shadow: none !important;border: none !important;vertical-align: middle !important;}.bmc-button{line-height: 36px !important;height:37px !important;text-decoration: none !important;display:inline-flex !important;color:#FFFFFF !important;background-color:#FF813F !important;border-radius: 3px !important;border: 1px solid transparent !important;padding: 1px 9px !important;font-size: 22px !important;letter-spacing:0.6px !important;box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;margin: 0 auto !important;font-family:'Cookie', cursive !important;-webkit-box-sizing: border-box !important;box-sizing: border-box !important;-o-transition: 0.3s all linear !important;-webkit-transition: 0.3s all linear !important;-moz-transition: 0.3s all linear !important;-ms-transition: 0.3s all linear !important;transition: 0.3s all linear !important;}.bmc-button:hover, .bmc-button:active, .bmc-button:focus {-webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;text-decoration: none !important;box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;opacity: 0.85 !important;color:#FFFFFF !important;}</style><link href="https://fonts.googleapis.com/css?family=Cookie" rel="stylesheet"><a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/gijovarghese"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">Buy me a coffee</span></a>

## Usage

Quickstart:

```html
<script src="flying-pages.min.js"></script>
<script>
  flyingPages();
</script>
```

With async/defer (recommended):

```html
<script defer src="flying-pages.min.js"></script>
<script>
  window.addEventListener("load", () => {
    flyingPages();
  });
</script>
```

With options:

```html
<script defer src="flying-pages.min.js"></script>
<script>
  window.addEventListener("load", () => {
    flyingPages({
      delay: 0,
      ignoreKeywords: [],
      maxRPS: 3,
      hoverDelay: 200
    });
  });
</script>
```

`flyingPages` accepts optional options object with the following parameters:

- `delay`: Start prefetching after a delay (in seconds). Will be started when the browser becomes idle, using `requestIdleCallback`. Default to 0.
- `ignoreKeywords`: An array of keywords to ignore from prefetching. Example `['/logout','/cart','about.html','sample.png','#']`.
- `maxRPS`: Maximum requests per second the queue should process. Set to 0 to process all requests immediately (without queue). Default to 3.
- `hoverDelay`: Delay in prefetching links on mouse hover (in milliseconds). Default 200.

## How it Works?

Flying Pages injects a tiny JavaScript code (1KB gzipped), waits until the browser becomes idle. Then it detects pages in the viewport and on mouse hover and preloads them.

Flying Pages is intelligent to make sure preloading doesn't crash your server or make it slow.

- **Preload pages in the viewport** - Detect links within the viewport (current viewing area) using 'Intersection Observer' and tells the browser to preload them using 'prefetch', switch to xhr if not available (similar to [Quicklink](https://github.com/GoogleChromeLabs/quicklink)).

- **Preload pages on mouse hover** - On hovering links, if it's not preloaded yet using above 'viewport', then Flying Pages will prefetch them instantly (similar to [Instant page](https://instant.page/)).

- **Limits the number of preloads per second** - If your page has too many links, prefetching all at the same time will cause the server to crash or slow down the website to visitors. Flying Pages limits the number of preloads per second (3 req/sec by default) using an in-built queue. For example, if you've 10 links in the viewport, preloading all these are span into 4 seconds.

- **Stops preloading if the server is busy** - In case the server starts to respond slowly or return errors, preloading will be stopped to reduce the server load.

- **Understands user's connection and preferences** - Checks if the user is on a slow connection like 2G or has enabled data-saver. Flying Pages won't preload anything in this case.
