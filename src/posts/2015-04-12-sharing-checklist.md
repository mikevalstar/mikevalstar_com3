---
title: Sharing & SEO Checklist
link: sharing-seo-checklist
template: post.hbt
series:
datetime: 2015-04-12 10:00:00
updated: 2015-04-12 10:00:00
author: 
    name: Mike Valstar
    email: mikevalstar@gmail.com
short: >
    <p>When creating a website for a client it's always difficult to remember all the items you're going to need. You need images for sharing on social networks, favicons for adding to home screen on iOS devices and browsers, and you need text to describe all sorts of things. Some of these need to be done before you start, some need to be done as you build your pages.</p>
meta:
    twitterhandle: "@mikevalstar"
    description: A checklist for for Sharing and SEO on your blog. 
---

When creating a website for a client it's always difficult to remember all the items you're going to need.
You need images for sharing on social networks, favicons for adding to home screen on iOS devices and browsers, 
and you need text to describe all sorts of things. Some of these need to be done before you start, some need to be done as you build your pages.

Here is my checklist:

## Before you start

<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-favicon" data-toggle="#favicon-desc">
    <label for="chklist-favicon" class="b">
        Favicons
    </label>
</div>
<div id="favicon-desc" style="margin-left: 40px;">

The [Favicon](http://en.wikipedia.org/wiki/Favicon) is an old standard on the web and is still used by both browsers and some mobile devices. Older browsers use 16x16px images for this newer browsers use 32x32px. I suspect this will soon be 64x64px on retina desktop displays.

But for now I'm sticking with 32x32 and letting older bwosers scale the image down.

<br/><br/>

<script src="https://gist.github.com/mikevalstar/07828079d0c6d4b17f87.js"></script>

</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-ios" data-toggle="#ios-desc">
    <label for="chklist-ios" class="b">
        iOS and Mobile Icons
    </label>
</div>
<div id="ios-desc" style="margin-left: 40px;">

For iOS devices you can further describe larger icons for people who may want to add your website to their home screen. or to show on the recently viewed pages.

<br/><br/>

<script src="https://gist.github.com/mikevalstar/7485dc82efa4042f4e5c.js"></script>

</div>

## Setting the Overall Site and Layout

<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-robots" data-toggle="#robots-desc">
    <label for="chklist-robots" class="b">
        Robots.txt file
    </label>
</div>
<div id="robots-desc" style="margin-left: 40px;">

Important if you want your site to show up on Google or any other search engine. 

</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-mobile" data-toggle="#mobile-desc">
    <label for="chklist-mobile" class="b">
        Site Mobile Headers
    </label>
</div>
<div id="mobile-desc" style="margin-left: 40px;">

For most site's you're going to want to make sure your site renders at native width and not a scaled down version:

<br/><br/>

<script src="https://gist.github.com/mikevalstar/083c87ac12a5c25dd871.js"></script>

</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-meta" data-toggle="#meta-desc">
    <label for="chklist-meta" class="b">
        Generic Meta Tags
    </label>
</div>
<div id="meta-desc" style="margin-left: 40px;">

Every site needs their generic meta tags. Title, Description, Charset, Content Type, Short Url.

<br/><br/>

<script src="https://gist.github.com/mikevalstar/59981b2bfa89c3568e85.js"></script>

</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-schema" data-toggle="#schema-desc">
    <label for="chklist-schema" class="b">
        Schema.org
    </label>
</div>
<div id="schema-desc" style="margin-left: 40px;">

For Google+ and Schema.org, 3 items items should be added to your layout to describe each page:

<br/><br/>

<script src="https://gist.github.com/mikevalstar/3f8c26582b313d5ce835.js"></script>

</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-facebook" data-toggle="#facebook-desc">
    <label for="chklist-facebook" class="b">
        Facebook and Open Graph meta tags
    </label>
</div>
<div id="facebook-desc" style="margin-left: 40px;">
    
Facebook uses "Open Graph" to read information about your site's pages. It has [best practices](https://developers.facebook.com/docs/sharing/best-practices) and you can calidate your settings here: https://developers.facebook.com/tools/debug/

<br/><br/>

<script src="https://gist.github.com/mikevalstar/6b6acd973eb87e3e6708.js"></script>
    
</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-desc" data-toggle="#twitter-desc">
    <label for="chklist-desc" class="b">
        Twitter Cards
    </label>
</div>
<div id="twitter-desc" style="margin-left: 40px;">

Twitter uses [it's own standard](https://dev.twitter.com/cards/overview) for reading data about your site with it's own settings. Validate it here: https://cards-dev.twitter.com/validator

<br/><br/>

<script src="https://gist.github.com/mikevalstar/78b66cf9914fab377287.js"></script>

</div>


## The Home Page

<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-hpupdates" data-toggle="#hpupdates-desc">
    <label for="chklist-hpupdates" class="b">
        Updates Indicated
    </label>
</div>
<div id="hpupdates-desc" style="margin-left: 40px;">

Fairly standard, but you should indicate all updates to your site on the homepage. This geneerally means a listing of your blog posts with a short description under each.

</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-linkimportanthp" data-toggle="#linkimportanthp-desc">
    <label for="chklist-linkimportanthp" class="b">
        Link Important Pages
    </label>
</div>
<div id="linkimportanthp-desc" style="margin-left: 40px;">

When creating a site, the depth of your pages is important, both for usability and for search engines, he more clicks the engine/user has to go through the harder it is to get to and the less likly it'll show up on google.

</div>


## Static Pages

<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-lastupdatestatic" data-toggle="#lastupdatestatic-desc">
    <label for="chklist-lastupdatestatic" class="b">
        Last Updated Indicator
    </label>
</div>
<div id="lastupdatestatic-desc" style="margin-left: 40px;">

Even you static pages should show when they were last updated. This should be a reminder to the website owner to update them often and to keep them fresh on search engines. The longer the time since content change the less likly it is to show.

</div>


## Your Blog/News Pages

<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-blogimage" data-toggle="#blogimage-desc">
    <label for="chklist-blogimage" class="b">
        Image
    </label>
</div>
<div id="blogimage-desc" style="margin-left: 40px;">

The web has become increasingly visual over the last few years and it's important to have a representative image for your pages, especially ones you hope will be shared on the internet. The largest one asked for by social sites right now is: *1200 x 630* so your share images should be at least this big.

</div>


<div class="checkbox checkbox-success">
    <input type="checkbox" id="chklist-author" data-toggle="#author-desc">
    <label for="chklist-author" class="b">
        Description & Author
    </label>
</div>
<div id="author-desc" style="margin-left: 40px;">

Lastly, less important for SEO, but good for the writers of the anything on your site is to show author info. 

</div>


## Am I Missing Something?

Am I missing something from this list? Email me: mikevalstar@gmail.com

## Where's the keywords?

At my day job clients constantly ask for keywordsa to be added to their meta tags, this is either some old knowledge they have or something they were told to do from an "SEO expert", this is now, and had been for a few years outdated. See http://googlewebmastercentral.blogspot.com/2009/09/google-does-not-use-keywords-meta-tag.html

## References

* http://moz.com/blog/meta-data-templates-123
* http://www.iacquire.com/blog/18-meta-tags-every-webpage-should-have-in-2013
* http://moz.com/blog/the-web-developers-seo-cheat-sheet-2013-edition


<script>
$(function(){

    $(":checkbox").change(function(){
        $($(this).data('toggle')).toggle();
    });

})
</script>