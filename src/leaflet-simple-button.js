/*
 * Leaflet.SimpleButton v1.0.2 - 2025-3-23
 *
 * Copyright 2024 mfhsieh
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
     * @extends L.Control
     * @classdesc A Leaflet control that creates a simple button.
     * @param {Object} options - Control options.
     */
    const SimpleButton = L.Control.extend({
        /**
         * @property {Object} options - Default options for the control.
         * @property {string} options.className - Custom CSS class name for the button.
         * @property {string} options.html - HTML content of the button.
         * @property {string} options.title - Title attribute of the button.
         * @property {string} options.ariaLabel - ARIA label for the button.
         * @property {Function} options.afterClick - Callback function for click event.
         */
        options: {
            className: "",
            html: "&nbsp;",
            title: "a simple button",
            ariaLabel: "",
            afterClick: null,
        },

        /**
         * @function initialize
         * @memberof SimpleButton.prototype
         * @description Initializes the control with the given options.
         * @param {Object} options - Control options.
         */
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

        /**
         * @function onAdd
         * @memberof SimpleButton.prototype
         * @description Adds the control to the map.
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
     * @function simpleButton
     * @memberof L.control
     * @description Creates a new SimpleButton control.
     * @param {Object} options - Control options.
     * @returns {SimpleButton} A new SimpleButton control.
     */
    L.control.simpleButton = function (options) {
        return new SimpleButton(options);
    }

    return SimpleButton;
});
