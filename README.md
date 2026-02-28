# Leaflet.SimpleButton

A [Leaflet](https://leafletjs.com/) plugin that creates **a simple button control**.

* Demo Page: [Leaflet 1 demo](https://mfhsieh.github.io/leaflet-simple-button/index.html) or [Leaflet 2 demo](https://mfhsieh.github.io/leaflet-simple-button/index_v2.html)
* Current Version: v1.0.3 / v2.0.0-alpha.1 (2026-02-28)
* Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

## Usage

### Leaflet 1.x (Classic)

Simply include the [JS](dist/leaflet-simple-button.min.js) in the head (after Leaflet).

```html
<head>
    ...
    <script src="dist/leaflet-simple-button.min.js"></script>
    ...
</head>
```

Then create a `SimpleButton` instance and add it to the map.

```js
new L.Control.SimpleButton({
    html: '<i class="fas fa-bars"></i>',
    afterClick: () => {
        alert("button click");
    },
}).addTo(map);
```

### Leaflet 2.x (ESM)

For Leaflet 2.x, use the ESM-ready version [leaflet-simple-button_v2.js](dist/leaflet-simple-button_v2.min.js).

```js
import L from 'leaflet';
import SimpleButton from './dist/leaflet-simple-button_v2.min.js';

new SimpleButton({
    html: '<i class="fas fa-bars"></i>',
    afterClick: () => {
        alert("button click");
    },
}).addTo(map);
```

For more details, refer to the [Leaflet 1 demo](index.html) or [Leaflet 2 demo](index_v2.html).

## Options

| Option | Type | Default | Description |
| ---- | ---- | ---- | ---- |
| className | String | "" | Custom CSS class name for the button. |
| html | String | "&nbsp;" | HTML content of the button. |
| title | String | "a simple button" | Title attribute of the button. |
| ariaLabel | String | "" | ARIA label for the button. If empty, uses `title`. |
| afterClick | Function | null | Callback function for the click event. |

## Where

* Source Code: [Github](https://github.com/mfhsieh/leaflet-simple-button)

## Author

* email: mfhsieh at gmail.com
* Github: [Github](https://github.com/mfhsieh/)
