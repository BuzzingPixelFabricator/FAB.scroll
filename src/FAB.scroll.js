/*----------------------------------------------------------------------------*\
 # Copyright 2017, BuzzingPixel, LLC

 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the Apache License 2.0.
 # http://www.apache.org/licenses/LICENSE-2.0
 \*----------------------------------------------------------------------------*/

// Make sure FAB is defined
window.FABNAMESPACE = window.FABNAMESPACE || 'FAB';
window[window.FABNAMESPACE] = window.window[window.FABNAMESPACE] || {};

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
                W.removeEventListener(
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
        },

        /**
         * Lock window scroll
         */
        lockWindowScroll: function() {
            // Save a reference to the object
            var self = this;

            // Set current scroll positions
            var x = W.scrollX;
            var y = W.scrollY;

            // Check if scroll has already been locked
            if (W.scrollLocked === true) {
                return;
            }

            // Save x and y values
            self.windowCurrentX = x;
            self.windowCurrentY = y;

            // On window scroll, set back to x and y values
            W.onscroll = function() {
                W.scrollTo(x, y);
            };

            // Set scroll locked as true
            W.scrollLocked = true;
        },

        // Unlock window scroll
        unlockWindowScroll: function() {
            // Save a reference to the object
            var self = this;

            // Check if the scroll was locked
            if (W.scrollLocked === false) {
                return;
            }

            // Set scroll locked as false
            W.scrollLocked = false;

            // Set a timer to prevent weird things from happening
            setTimeout(function() {
                W.onscroll = null;

                W.scrollTo(self.windowCurrentX, self.windowCurrentY);
            }, 300);
        }
    };
})(window.FAB, window, document);
