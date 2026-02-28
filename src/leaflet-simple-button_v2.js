/*
 * Leaflet.SimpleButton v2.0.0-alpha.1 - 2026-02-28
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
import L from "leaflet";

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
        if (this.options.className) this._button.classList.add(this.options.className);
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
 * Creates a new instance of the SimpleButton control.
 *
 * @function simpleButton
 * @param {Object} options The options for the SimpleButton control.
 * @returns {SimpleButton} A new instance of the SimpleButton control.
 */
export const simpleButton = function (options) {
    return new SimpleButton(options);
};

export default SimpleButton;
