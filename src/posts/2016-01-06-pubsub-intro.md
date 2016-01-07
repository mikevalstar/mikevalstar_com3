---
title: Introduction to Pub/Sub model
link: simple-pubsub-intro
layout: post.jsx
series:
pubDate: 2016-01-06 14:15:00
updated: 2016-01-06 14:15:00
author:
    name: Mike Valstar
    email: mikevalstar@gmail.com
excerpt: >
    <p>With the rise of event driven websites recently (most notably React based websites), the Pub/Sub model has gained popularity in the Javascript world for use on the frontend. In this article I describe what the Pub/Sub model is, when to use it and how to build your own Pub/Sub object from scratch.</p>
meta:
    twitterhandle: "@mikevalstar"
    description: Introduction to Pub/Sub model for Javascript
---

With the rise of event driven websites recently (most notably React based websites), the Pub/Sub model has gained popularity in the Javascript world for use on the frontend. In this article I describe what the Pub/Sub model is, when to use it and how to build your own Pub/Sub object from scratch.

## What is Pub/Sub?
The [Publish / Subscribe model](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) is actually quite old but has only recently become popular with Javascript applications. This model can both apply to remote and local events, but for the purposes of this article we will be focusing on local events in the browser.

The primary purpose of this model is to provide a way of both triggering and listening for global or semi-global events. There are many libraries that do this: [PubSubJS](https://github.com/mroderick/PubSubJS), jQuery has it built in, There are [basic examples](https://davidwalsh.name/pubsub-javascript) on the web, etc. These are all good, but it's important to understand whats happening to the the most out of your events.

## When and why should I use it?

The best use of the this model is when you have multiple areas of your application that need to know about an event. For example:

* An AJAX request has been made (to show an activity indicator)
* An request error has happened (show an error on the page)
* User has clicked the window (for popup hiding)
* User has or will log in / log out (for cleanup)
* Most window level events

## When not to use it?

This model is not the best choice when you want to have consequences for actions (you should use Promises or callbacks) or when you need to guarantee delivery / receipt of a message (you will need a more complex event manager). For example:

* When you need feedback on the operation (AJAX request &#8594; display data on screen)
* When operations need to chain (e.g. A &#8594; B &#8594; C)

## Basic Pub/Sub

Here is a very basic Pub/Sub model:

<script src="https://gist.github.com/mikevalstar/408d9877e19de1bdf8c0.js"></script>

What this will do is create a object `events` that allows you "subscribe" to a named event `var e = events.subscribe('topic', callback)`, and it will return an object that will allow you to unsubscribe from the event `e.unsubscribe()`. Additionally anywhere else in your code you can publish an event `events.publish('topic', data)` and all listeners will hear it.

An example I like to use for use of this simple event model is showing a global error message whenever a HTTP request fails. (For this example I'm using [qwest](https://github.com/pyrsmk/qwest) as my ajax library and I'm [monkey patching](https://en.wikipedia.org/wiki/Monkey_patch) it. Note: using ES6 syntax in this example)

<script src="https://gist.github.com/mikevalstar/1441c981c552d3deb536.js"></script>

_note: you should keep monkey patching to a minimum in your applications. It can make your code very hard to debug later if used excessivly_

What this allows is that whenever a catch condition fires on a qwest request we fire an event and we can listen for it on the page level `events.subscribe('', displayGlobalError)`

With this system you can get a simple model that will support small to medium sized sites with a very minimal pub/sub implementation.

## Intermediate Pub/Sub

As you start using this model a little more you'll find that you will end up publishing for the same event multiple times to his separate listeners. e.g. `action` and `save` for a user hitting a save button to both show a global "saving" and another more generic event `action` so that we can cancel any items on the page waiting on an action.

In this case it would be helpful to have an event `action.save` so that we can do tiered actions that will trigger both `action` and `action.save`. Additionally you could add the ability to trigger unrelated actions with an event like: `save,profile-change`.  So for this advanced ability we would add in some additional flow to our above events object.

<script src="https://gist.github.com/mikevalstar/24596908d739c651f072.js"></script>

With this we can use commas or dots to publish to multiple subscribers.

## Advanced uses
Any advanced implementation of a this type of model becomes project specific, you can very easily add in things like automatic logging, automatic error reporting and even adding things like one time events or limited use events, but these always end up being project specific.

## Gotchas

When using this model the primary thing to work watch out for is not cleaning up events `e.unsubscribe()`. Your events will live in this events object forever and do not automatically get cleaned up.  In the case of React every time the object is created it'll add an event to the object, and if you don't remove it you'll end up holding the entire react object in memory for the duration of the app; this can be __very__ bad for memory usage.

## References
* https://davidwalsh.name/pubsub-javascript
* https://github.com/pyrsmk/qwest

And special thanks to [Rob McDiarmid](https://github.com/robianmcd) for his contributions to the article.
