---
title: Caching with javascript
link: caching-with-javascript
layout: post.jsx
series:
pubDate: 2016-06-09 14:15:00
updated: 2016-06-09 14:15:00
author:
    name: Mike Valstar
    email: mikevalstar@gmail.com
excerpt: >
    <p>Databases and filesystems are slow, you should be caching API and database calls. Here's a simple way to do so.</p>
meta:
    twitterhandle: "@mikevalstar"
    description: Caching with javascript
---

Wether you are building a frontend for your website or a backend api you should be doing some forms of caching.
The slowest items in your infrastructure are often limited to things like IO and index lookup times;
in my experience the slowest parts of your infrastructure are database, file system IO, network IO, in that order.

Caching your data will both give the perception of your website or api being faster, but will also save you server and network resources.
The first part of caching is of course figuring out how you're going to cache your data, the fastest and easiest to implement is in-memory caching.
so lets build a simple memory caching application.

Similar to my [Pub/Sub](/post/simple-pubsub-intro) model we're going to create a simple object for our project and a simple object to store our cached data.
We'll need a way to store items in the cache, we will want a reference key the item to store and (optionally) a way to expire the item,
we need a way to retrieve the cached item and a way to clear it.

### Caching
<script src="https://gist.github.com/mikevalstar/e26a81b90a856af83b0f6ff2af952bd2.js"></script>

Now that we have a simple caching object, we'll need to come up with a pattern in our application to use the cache. I'm partial to [qwest](https://github.com/pyrsmk/qwest) for my API calls.

### Using the cache
Lets setup a simple caching system for customer API calls:

<script src="https://gist.github.com/mikevalstar/658a825bbdfefdab5e8ca17503ce8f6e.js"></script>

Now with this model you can call the api as often as you would like for your single page app and it'll only call the server side API once every 5 min instead of constantly hitting the database. Keep in mind you can build a similar structure on your server side applications as well to limit hits on your database or file system.

### Caveats

This is a very basic model, here are a few things that I've missed:
* [Debouncing](https://lodash.com/docs#debounce) the API requests
* If you return the saved object on save, setting the cache with the return
* [Cloning objects](https://lodash.com/docs#cloneDeep) from the cache, or making them [immutable](https://facebook.github.io/immutable-js/), otherwise cached items are technically editable after being returned.

### Mesusa JS

<div class="alert alert-info" role="alert"> <strong>Note:</strong> I have an advanced version of this caching module that uses promises published here: https://github.com/mikevalstar/medusajs also available as an npm module `npm install medusajs`  </div>
