<p align="center">
  <img src="cover.png">
</p>

# Flying Pages

> Flying Pages prefetch pages before the user click on links, making them load instantly


## Quick Links

- Demo: Open [https://wpspeedmatters.com](https://wpspeedmatters.com) and click on any post
- [WordPress Plugin](https://wordpress.org/plugins/flying-pages/)
- [Quicklink vs Instant page vs Flying Pages](https://wpspeedmatters.com/quicklink-vs-instant-page-vs-flying-pages/)
- Join our [Facebook Group](https://www.facebook.com/groups/wpspeedmatters/), a community of WordPress speed enthusiasts

<a href="https://www.buymeacoffee.com/gijovarghese" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

## Usage

Quickstart:

```html
<script src="flying-pages.min.js"></script>
<script>
  flyingPages.listen();
</script>
```

With options:

```html
<script src="flying-pages.min.js"></script>
<script>
  flyingPages.listen({
    delay: 2,
    ignoreKeywords: [
      '/connexion',
      '/deconnexion',
      '#'
    ],
    maxRPS: 5,
    hoverDelay: 25
  });
</script>
```

- `delay`: Start prefetching after a delay (in seconds). Will be started when the browser becomes idle, using `requestIdleCallback`. Default to 0.
- `ignoreKeywords`: An array of keywords to ignore from prefetching. Example `['/logout','/cart','about.html','sample.png','#']`.
- `maxRPS`: Maximum requests per second the queue should process. Set to 0 to process all requests immediately (without queue). Default to 3.
- `hoverDelay`: Delay in prefetching links on mouse hover (in milliseconds). Default 50.


## How it Works?

Flying Pages injects a tiny JavaScript code (1KB gzipped), waits until the browser becomes idle. Then it detects pages in the viewport and on mouse hover and prefetch them.

Flying Pages is intelligent to make sure prefetching doesn't crash your server or make it slow.

- **Prefetch pages in the viewport** - Detect links within the viewport (current viewing area) using 'Intersection Observer' and tells the browser to prefetch them using 'prefetch', switch to xhr if not available (similar to [Quicklink](https://github.com/GoogleChromeLabs/quicklink)).

- **Prefetch pages on mouse hover** - On hovering links, if it's not prefetched yet using above 'viewport', then Flying Pages will prefetch them instantly (similar to [Instant page](https://instant.page/)).

- **Limits the number of prefetch per second** - If your page has too many links, prefetching all at the same time will cause the server to crash or slow down the website to visitors. Flying Pages limits the number of prefetchs per second (3 req/sec by default) using an in-built queue. For example, if you've 10 links in the viewport, prefetching all these are span into 4 seconds.

- **Stops prefetching if the server is busy** - In case the server starts to respond slowly or return errors, prefetching will be stopped to reduce the server load.

- **Understands user's connection and preferences** - Checks if the user is on a slow connection like 2G or has enabled data-saver. Flying Pages won't prefetch anything in this case.


# Changelog

**2021-04-05**: mod to make the script work without defer and without having to set options before the script call. Replacing window.FPConfig{}; before the script call with flyingPages.listen(); after the script call (see [Usage](#Usage)).
