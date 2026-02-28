/*
 * Leaflet.SimpleButton v1.0.3 - 2026-02-28
 *
 * Copyright 2026 mfhsieh
 * mfhsieh@gmail.com
 *
 * Licensed under the MIT license.
 *
 * Demos:
 * https://mfhsieh.github.io/leaflet-simple-button/
 *
 * Source:
 * git@github.com:mfhsieh/leaflet-simple-button.git
 *
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD module
        define(["leaflet"], factory);

    } else if (typeof exports === "object") {
        // CommonJS module
        module.exports = factory(require("leaflet"));

    } else if (typeof window !== "undefined") {
        // Browser globals
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.Control.SimpleButton = factory(window.L);
    }
})(function (L) {
    "use strict";

    /**
     * @class SimpleButton
     * @augments L.Control
     * @classdesc A Leaflet control that creates a simple button.
     */
    const SimpleButton = L.Control.extend({
        /**
         * @typedef {Object} SimpleButtonOptions
         * @description Default options for the control.
         * 
         * @property {string} [className=""] - Custom CSS class name for the button.
         * @property {string} [html="&nbsp;"] - HTML content of the button.
         * @property {string} [title="a simple button"] - Title attribute of the button.
         * @property {string} [ariaLabel=""] - ARIA label for the button. If empty, the title will be used.
         * @property {Function} [afterClick=null] - Callback function called after the button is clicked.
         */

        /**
         * @type {SimpleButtonOptions}
         * @description Default options for the control.
         */
        options: {
            className: "",
            html: "&nbsp;",
            title: "a simple button",
            ariaLabel: "",
            afterClick: null,
        },

        /**
         * @method initialize
         * @memberof SimpleButton.prototype
         * @description Initializes the control with the given options.
         * @param {SimpleButtonOptions} options - Configuration options for the control.
         */
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        /**
         * @method onAdd
         * @memberof SimpleButton.prototype
         * @description Adds the control to the map and creates the button element.
         * @param {L.Map} map - The Leaflet map instance.
         * @returns {HTMLElement} The created button element.
         */
        onAdd: function (map) {
            this._map = map;

            this._button = L.DomUtil.create("button", "leaflet-simple-button");
            if (this.options.className) L.DomUtil.addClass(this._button, this.options.className);
            L.DomEvent.disableClickPropagation(this._button);

            this._button.innerHTML = this.options.html;
            this._button.title = this.options.title;
            this._button.setAttribute("aria-label", this.options.ariaLabel ? this.options.ariaLabel : this.options.title);

            L.DomEvent
                .on(this._button, "click", L.DomEvent.stopPropagation)
                .on(this._button, "click", L.DomEvent.preventDefault);

            if (this.options.afterClick)
                L.DomEvent.on(this._button, "click", this.options.afterClick, this);

            return this._button;
        },
    });

    /**
     * Creates a new SimpleButton instance.
     *
     * @function simpleButton
     * @memberof L.control
     * @param {SimpleButtonOptions} options - Configuration options for the control.
     * @returns {SimpleButton} A new SimpleButton instance.
     */
    L.control.simpleButton = function (options) {
        return new SimpleButton(options);
    }

    return SimpleButton;
});
