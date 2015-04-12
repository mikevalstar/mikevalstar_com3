---
title: Anaotomy of an HTTP Request
link: http-request-anatomy
template: post-wide.hbt
series: how-the-web-works
datetime: 2015-04-12 18:00:00
updated: 2015-04-12 18:00:00
author: 
    name: Mike Valstar
    email: mikevalstar@gmail.com
short: >
    <p></p>
meta:
    twitterhandle: "@mikevalstar"
    description: How an HTTP request happens from start to finish.
---

<section id="scroll-description" class="thin">

<h2>How Does an HTTP Request Work?</h2>

When debugging a website, it's often adventagious to understand how an HTTP request works in order to fully debug why your webpage is not rendering properly.

</section>

<section class="DNS">
    <div class="spacer s3"></div>
    <div id="trigger1" class="spacer s0"></div>
    <div id="pin1">
        <img src="/img/chrome-image.jpg" />
    </div>
    <div class="spacer s8"></div>
</section>

<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.3/plugins/debug.addIndicators.min.js"></script>

<script>
    var controller = new ScrollMagic.Controller();

	$(function () { // wait for document ready
		// build scene
		var scene = new ScrollMagic.Scene({triggerElement: "#trigger1", duration: 400})
                .setPin("#pin1")
                .addIndicators({name: "1 (duration: 400)"}) // add indicators (requires plugin)
                .addTo(controller);
	});
</script>

<style>

.spacer {
	text-align: center;
	min-height: 100px;
}
.spacer.s0 {
	min-height: 1px;
}
.spacer.s1 {
	min-height: 100px;
}
.spacer.s2 {
	min-height: 200px;
}
.spacer.s3 {
	min-height: 300px;
}
.spacer.s4 {
	min-height: 400px;
}
.spacer.s5 {
	min-height: 500px;
}
.spacer.s6 {
	min-height: 600px;
}
.spacer.s7 {
	min-height: 700px;
}
.spacer.s8 {
	min-height: 800px;
}
.spacer.s9 {
	min-height: 900px;
}
.spacer.s10 {
	min-height: 1000px;
}

</style>