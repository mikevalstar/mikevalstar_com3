---
title: CSS and Text
link: css-and-text
template: post.hbt
series:
datetime: 2015-08-28 10:00:00
updated: 2015-08-28 10:00:00
author:
    name: Mike Valstar
    email: mikevalstar@gmail.com
short: >
    <p>When working with text on a website you have a wide range of CSS techniques to manipulate the text.
    These methods do not always act as you may intend and may hinder the readability of your site.
    What's safe and whats not, what ways can you use to keep your websites readable.</p>
meta:
    twitterhandle: "@mikevalstar"
    description: Working with text on your website
---

When working with text on a website you have a wide range of CSS techniques to manipulate the text.
These methods do not always act as you may intend and may hinder the readability of your site.
What's safe and whats not, what ways can you use to keep your websites readable.

Many of the font and text properties that you can modify with CSS are similar in nature to what you can do in programs like Photoshop or Word or any other program on your desktop. However the CSS options are both limited in functionality and can cause rendering in some browsers to not be as nice as might be expected.

**Both Windows and OS X will always render your fonts differently no matter what you do.**

Below you can see the effects of font / text changes on your text:

<div class="css-showcase">
    <div class="row">
        <div class="col-md-5 col-xs-12 css-showcase-left css-showcase-css">
            <span class="class">.text</span> {<br/>

                <span class="prop">font-family: </span>
                <span class="val"><input type="text" data-prop="font-family" value="serif" /></span>

                <span class="prop">font-weight: </span>
                <span class="val"><input type="text" data-prop="font-weight" value="300" /></span>

                <span class="prop">text-indent: </span>
                <span class="val"><input type="text" data-prop="text-indent" value="0em" /></span>

                <span class="prop">letter-spacing: </span>
                <span class="val"><input type="text" data-prop="letter-spacing" value="0em" /></span>

                <span class="prop">word-spacing: </span>
                <span class="val"><input type="text" data-prop="word-spacing" value="0em" /></span>

                <span class="prop">text-decoration: </span>
                <span class="val"><input type="text" data-prop="text-decoration" value="none" /></span>

                <span class="prop">text-align: </span>
                <span class="val"><input type="text" data-prop="text-align" value="left" /></span>

                <span class="prop">line-height: </span>
                <span class="val"><input type="text" data-prop="line-height" value="" /></span>

                <span class="prop">text-transform: </span>
                <span class="val"><input type="text" data-prop="text-transform" value="none" /></span>

                <span class="prop">vertical-align: </span>
                <span class="val"><input type="text" data-prop="vertical-align" value="middle" /></span>

                <span class="prop">font-smooth: </span>
                <span class="val"><input type="text" data-prop="font-smooth" value="none" /></span>
                <br/>
            }
        </div>
        <div class="col-md-7 col-xs-12 css-showcase-right css-showcase-highlight">
            <div class="huge">M</div>
            <h1 class="apply">
                <span class="letter">T</span><span class="letter">h</span><span class="letter">e</span>

                <span class="letter">q</span><span class="letter">u</span><span class="letter">i</span><span class="letter">c</span><span class="letter">k</span>

                <span class="word">brown</span>
                <span class="word">fox</span>

                jumped over the lazy dog</h1>
            <p class="apply">The quick brown fox jumped over the lazy dog</p>
        </div>
    </div>
    <br class="clearfix" />
</div>

## Rendering

Browsers unlike Photoshop has to render text quite often; and browsers are [all about speed](https://www.youtube.com/watch?v=nCgQDjiotG0). To this effect each browser has chosen the fast rendering available via the OS that takes advantage of sub pixel rendering.

Windows uses ClearType as the render engine and OS X uses Quartz as it's render engine. Both of these provide sub-pixel rendering of your fonts and will make them appear to use colors other then the actual font color to make them appear smooth.

Additionally you will get a different rendering feel on higher density screens e.g. Retina displays.

### font-smoothing

Font smoothing was a part of the CSS3 spec originally however has been dropped but still [implemented by Webkit and Gecko for OS X only](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth). This can be used to get a better but more computationally expensive look, but is very limited in which browsers support it: (open the appropriate browser to see the effect here)

<div style="-webkit-font-smoothing: subpixel-antialiased;">-webkit-font-smoothing: subpixel-antialiased; (default)</div>
<div style="-webkit-font-smoothing: none; -moz-osx-font-smoothing: unset;">-webkit-font-smoothing: none; -moz-osx-font-smoothing: unset; (both off)</div>
<div style="-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; (both on)</div>

[Further reading](http://szafranek.net/works/articles/font-smoothing-explained/)

## Sizing & Measurement
Sizing your changes with css is very important in how it display's on a users browser. When sizing if you use the inappropriate unit of measure you can make the fonts inconsistent or worse, blurry.

### px
`px` used to stand for "pixel", but now stands for "point", *not to be confused with pt* due to the rise of high density pixel screens (e.g. retina displays). `px` is also the default go-to sizing for most developers as it's the only way to get "pixel perfect" designs. However if you use non-whole numbers with your sizing of fonts, or font spacing you will find some fonts become blurry on non-high density screens; this is due to the sub-pixel rendering and antialiasing of the fonts by the browser. Try to avoid px sizing whenever possible.

### em, rem, ex
[em, rem](https://j.eremy.net/confused-about-rem-and-em/) and ex are all relative units of measure and when rendered in the browser will use a little bit of a fuzzier math to determine the size of the font, but based on this math the fonts will be smoother. This should be the go-to sizing for all of your fonts as it will allow for better rendering and more flexibility in your designs.  Further it will allow you to "zoom" element

### %
Percentage sizing of text should be avoided whenever possible. there are very few cases where this is beneficial. Test set to percentage size will scale based on the size of the container.

### pt, cm, mm, in, pc
These sizings are for print media only and are very non standard for screen rendering. these should be avoided for anything but print stylesheets.

## Fonts

### font-family
The [font family](https://developer.mozilla.org/en/docs/Web/CSS/font-family) property is used to determine which fonts are rendered for your text.
However not every font on your computer can be used on a website; depending on what OS you are using and what applications you have installed on your system will determine what fonts are available on your computer.

There is however a set of "web safe" fonts that can generally be guaranteed to be installed on all computers. [See here](http://www.cssfontstack.com/)

Additionally you can install web fonts from sites like [google fonts](https://www.google.com/fonts). these will work on pretty much any browser these days, however note that some corporate networks will block web fonts so make sure to add a web safe font to the end of your font family definition for those users.

### font-weight
font weight determines how bold your font is. The "gotcha" for this is that not all fonts support all font weights, web fonts are notorious for this to reduce the size of the font download you will generally have to make sure to include all font weights you use on your site.

## Text

### text-indent
### letter-spacing, word-spacing
### text-decoration
### text-align
### line-height
### text-transform
### vertical-align

<script>
$(function(){

    $( ".css-showcase input" ).change( function() {
        var $ele = $(this);
        var prop = $ele.data( "prop" );
        var val = $ele.val();

        $('.apply').css(prop, val);
    } );

})
</script>
