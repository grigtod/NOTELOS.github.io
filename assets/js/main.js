(function() {

	"use strict";

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Vars.
		var	$body = document.querySelector('body');

	// Disable animations/transitions until everything's loaded.
		$body.classList.add('is-loading');

		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-loading');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'images/5.jpg': 'left',		
							'images/2.jpg': 'left',
							'images/3.jpg': 'left',
							'images/7.jpg': 'left',
							'images/1.jpg': 'left',
							'images/4.jpg': 'left',	
							'images/6.jpg': 'left'	
						},
					// Delay.
						delay: 10000
				};
				var quotes = ["Life’s but a walking shadow, a poor player<br>That struts and frets his hour upon the stage<br>And then is heard no more.<br>– William Shakespeare, Macbeth <br> <br>",
				"Do not go gentle into that good night,<br> Old age should burn and rave at close of day; <br> Rage, rage against the dying of the light.<br> – Dylan Thomas <br> <br>",
				"Just because something bears the aspect of the inevitable<br> one should not, therefore, go along willingly with it.<br>– Philip K. Dick, The Transmigration of Timothy Archer <br> <br> <br>",
				"Immortality is the only thing which doesn't tolerate being postponed.<br>– Karl Kraus<br> <br> <br> <br>",
				"Woe, destruction, ruin, and decay;<br>The worst is death, and death will have his day.<br>– William Shakespeare, Richard II<br> <br> <br>",
				"Our hope of immortality does not come from any religions,<br>but nearly all religions come from that hope.<br>– Robert Ingersoll<br> <br> <br>",
				"Some pirates achieved immortality by great deeds of cruelty or derring-do. <br>Some achieved immortality by amassing great wealth.<br>But the captain had long ago decided that he would, on the whole, prefer to achieve <br>immortality by not dying. <br>– Terry Pratchett, The Color of Magic Antonio Porchia"
							 ,];
							 
							 
			// Vars.
				var	pos = 0, lastPos = 0, 		
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);
					
				pos = Math.floor(Math.random() * 6);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}
				document.getElementById('quote').innerHTML = quotes[pos];
	

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');
						document.getElementById('quote').innerHTML = quotes[pos];


					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);
				
				
		})();
})();