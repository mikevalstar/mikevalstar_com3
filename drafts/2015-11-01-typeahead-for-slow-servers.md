---
title: Typeahead for slow servers or expensive queries
link: typeahead-for-slow-servers
layout: post.jsx
series:
pubDate: 2015-11-01 20:00:00
updated: 2015-11-01 20:00:00
author:
    name: Mike Valstar
    email: mikevalstar@gmail.com
excerpt: >
    <p>With the web getting more and more dynamic every day the clients I work with are often asking for more Google-like functionality; this means typeaheads and "instant results" similar to google. These are relatively simple to implement these days from a display perspective, there are hundreds of plugins and very good frameworks for doing these. But what if your underlying data is slow?</p><p>For things like adding tags to a news post, filling out products from your inventory or searching for people that work at your company, you can do the straight forward method; write a query `SELECT * FROM tags WHERE tag LIKE "%search%" LIMIT 10` and return the results. done... </p>
meta:
    twitterhandle: "@mikevalstar"
    description: Typeahead and realtime search queries in a way that wont destroy your servers.
---

With the web getting more and more dynamic every day the clients I work with are often asking for more Google-like functionality; this means typeaheads and "instant results" similar to google. These are relatively simple to implement these days from a display perspective, there are hundreds of plugins and very good frameworks for doing these. But what if your underlying data is slow?

For things like adding tags to a news post, filling out products from your inventory or searching for people that work at your company, you can do the straight forward method; write a query `SELECT * FROM tags WHERE tag LIKE "%search%" LIMIT 10` and return the results. done. but what if you're hooking into Salesforce or SAP, or your API is built by lowest bidder contractors? this is something I deal with often enough and recently I needed a method of returning some slow search queries like they were instant, while at the same time not destroying the API server.

So I needed a typeahead that would appear fast, but actually work off an API that takes 200-500ms to return (longer if your search was too short) and display it to the user. _I suspect our contracting friends forgot to put a limit clause on their search and limited programmatically, but in either case they were unable to improve response times._

My first step was to determine what the pipeline and expected response flow should look like to account for this. The key is to spread out the load times across animations and to ensure we were only ever making a single query to the API (a little caching also helps with a typeahead, since the user may backspace to a point already searched)

TODO: Diagram:  `Type --> wait --> search (api) --> animation (searching) --> get results (api) --> display results animated`
