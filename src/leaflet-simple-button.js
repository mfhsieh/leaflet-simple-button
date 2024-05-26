/* 
 * Leaflet Control SimpleButton v0.1 - 2024-05-24 
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

    if (typeof define === 'function' && define.amd) {
        // define an AMD module that relies on 'leaflet'
        define(['leaflet'], factory);

    } else if (typeof exports === 'object') {
        // define a Common JS module that relies on 'leaflet'
        module.exports = factory(require('leaflet'));

    } else if (typeof window !== 'undefined') {
        // attach your plugin to the global 'L' variable
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.Control.SimpleButton = factory(window.L);
    }
})(function (L) {
    "use strict";

    let control = L.Control.extend({
        options: {
            className: "",
            html: "&nbsp;",
            title: "a simple button",
            ariaLabel: "",
            afterClick: null,
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);
        },

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

    return control;
});