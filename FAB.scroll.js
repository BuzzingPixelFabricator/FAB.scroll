/**
 * Fab Scroll API
 *
 * @package FAB.scroll
 * @author TJ Draper <tj@buzzingpixel.com>
 * @version 1.0.0
 */

// Make sure FAB is defined
window.FAB = window.FAB || {};

(function(F, W, D) {
	'use strict';

	/**
	 * left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33,
	 * pagedown: 34, end: 35, home: 36
	 */
	var keys = {
		32: 1,
		33: 1,
		34: 1,
		35: 1,
		36: 1,
		37: 1,
		38: 1,
		39: 1,
		40: 1
	};

	/**
	 * Prevent default function
	 * @param {event} e
	 */
	var preventDefault = function(e) {
		e = e || W.event;

		if (e.preventDefault) {
			e.preventDefault();
		}

		e.returnValue = false;
	};

	/**
	 * Prevent default for keys that cause scrolling
	 * @param {event} e
	 * @return {Boolean}
	 */
	var preventDefaultForScrollKeys = function(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);

			return false;
		}
	};

	/**
	 * Scroll API
	 */
	F.scroll = {
		/**
		 * Disable scrolling
		 */
		disable: function() {
			// Older Firefox
			if (W.addEventListener) {
				W.addEventListener(
					'DOMMouseScroll',
					preventDefault,
					false
				);
			}

			// Modern standard
			W.onwheel = preventDefault;

			// Older browsers, IE
			W.onmousewheel = D.onmousewheel = preventDefault;

			// Mobile
			W.ontouchmove = preventDefault;

			// Keyboard
			D.onkeydown = preventDefaultForScrollKeys;
		},

		/**
		 * Enable scrolling
		 */
		enable: function() {
			// Older Firefox
			if (W.removeEventListener) {
				W.addEventListener(
					'DOMMouseScroll',
					preventDefault,
					false
				);
			}

			// Modern standard
			W.onwheel = null;

			// Older browsers, IE
			W.onmousewheel = D.onmousewheel = null;

			// Mobile
			W.ontouchmove = null;

			// Keyboard
			D.onkeydown = null;
		}
	};

})(window.FAB, window, document);
