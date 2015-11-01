---
title: Less & Bootstrap for Metalsmith
link: less-bootstrap-metalsmith
layout: post.jsx
series: beginning-metalsmith
pubDate: 2015-04-04 21:00:00
author:
    name: Mike Valstar
    email: mikevalstar@gmail.com
excerpt: >
    <p>When writing a new website I, like everyone else, like to take shortcuts.
    This by itself is not a bad thing, `We stand on the shoulders of giants` after all.
    A common method is to use a starter template, Bootstrap, Foundation, Pure or others...</p>
---

When writing a new website I, like everyone else, like to take shortcuts.
This by itself is not a bad thing, `We stand on the shoulders of giants` after all.
A common method is to use a starter template, [Bootstrap](http://getbootstrap.com/), [Foundation](http://foundation.zurb.com/), [Pure](http://purecss.io/) or others. But far too often (and I'm guilty of this as well) we tend to just drop in the full framework; but this leads to a lot of CSS bloat, e.g. bootstrap itself is 110kb minified (24kb if you have gzip), not a lot but when your page source is 10kb and your CSS is required for your page to load (images and javascript are not required if imported correctly).

If you strip bootstrap down to just the basics, normalize and grid, you can get this down to under 15kb. This will reduce load times, improve your site's render time in older browsers (IE9) and make it easier to debug any rendering issues. For Bootstrap (My choice for a starter template) the easiest way to do this is to first copy out the variables.less file to your local directory, and the bootstrap.less file. Comment out all of the imports except for the for the required items and you're ready to get started:

<script src="https://gist.github.com/mikevalstar/477bbff204844468a795.js"></script>

From here you can add your own less files to the bottom to add-on and take precedent for any overrides to the basic bootstrap theme. As well as enable any portions of Bootstrap you wish to use on your site.
