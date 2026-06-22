import maplibregl from 'maplibre-gl';
import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
import { moveUserLocation } from '$lib/utils/location.js';

export const BAR_SOURCE_ID = 'bars';
const CLICKABLE_LAYERS = ['bars-circle', 'bars-price'];

export const emptyFeatureCollection = {
    type: 'FeatureCollection',
    features: []
};

export function createMap(initialCenter, initialZoom, mapContainer) {
    return new maplibregl.Map({
        container: mapContainer,
        style: `https://api.maptiler.com/maps/bright-v2/style.json?key=${PUBLIC_MAP_TILER_API_KEY}`,
        center: initialCenter,
        zoom: initialZoom
    });
}

export async function handleMapLoad(map, loadBarsInViewport, handleFeatureClick) {
    addBarsSource(map);
    console.log("bars source added")
    addBarsLayers(map);
    console.log("bars layers added")
    addLayerInteractions(map, handleFeatureClick);
    console.log("layer interactions added")

    await loadBarsInViewport();
    console.log("bars in viewport loaded")
    moveUserLocation(map);

    map.on('moveend', loadBarsInViewport);
}

function addBarsSource(map) {
    if (map.getSource(BAR_SOURCE_ID)) return;

    map.addSource(BAR_SOURCE_ID, {
        type: 'geojson',
        data: emptyFeatureCollection
    });
}

function addBarsLayers(map) {
    addCircleLayer(map);
    addPriceLayer(map);
    addCountBadgeLayer(map);
    addCountTextLayer(map);
    addNameLayer(map);
}

function addCircleLayer(map) {
    map.addLayer({
        id: 'bars-circle',
        type: 'circle',
        source: BAR_SOURCE_ID,
        paint: {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'cell_count'], 1],
                1,
                12,
                5,
                14,
                15,
                18,
                40,
                22
            ],
            'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'pint'],
                70,
                '#84cc16',
                100,
                '#fcd34d',
                120,
                '#ef4444'
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.95
        }
    });
}

function addPriceLayer(map) {
    map.addLayer({
        id: 'bars-price',
        type: 'symbol',
        source: BAR_SOURCE_ID,
        layout: {
            'text-field': ['to-string', ['get', 'pint']],
            'text-size': 12,
            'text-font': ['Open Sans Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true
        },
        paint: {
            'text-color': '#ffffff',
            'text-halo-color': '#000000',
            'text-halo-width': 0.8
        }
    });
}

function addCountBadgeLayer(map) {
    map.addLayer({
        id: 'bars-count-badge',
        type: 'circle',
        source: BAR_SOURCE_ID,
        filter: ['>', ['get', 'cell_count'], 1],
        paint: {
            'circle-radius': 8,
            'circle-color': '#f4f4f5',
            'circle-stroke-width': 1,
            'circle-stroke-color': '#18181b',
            'circle-translate': [12, -12]
        }
    });
}

function addCountTextLayer(map) {
    map.addLayer({
        id: 'bars-count-text',
        type: 'symbol',
        source: BAR_SOURCE_ID,
        filter: ['>', ['get', 'cell_count'], 1],
        layout: {
            'text-field': ['to-string', ['get', 'cell_count']],
            'text-size': 10,
            'text-font': ['Open Sans Bold'],
            'text-allow-overlap': true,
            'text-ignore-placement': true,
            'text-offset': [1.2, -1.2]
        },
        paint: {
            'text-color': '#18181b'
        }
    });
}

function addNameLayer(map) {
    map.addLayer({
        id: 'bars-name',
        type: 'symbol',
        source: BAR_SOURCE_ID,
        layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-font': ['Open Sans Semibold'],
            'text-offset': [0, 1.5],
            'text-anchor': 'top',
            'text-radial-offset': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'cell_count'], 1],
                1,
                1.6,
                5,
                1.8,
                15,
                2,
                40,
                2.6
            ],
            'text-max-width': 10,
            'text-allow-overlap': false
        },
        paint: {
            'text-color': '#111827',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1.5
        }
    });
}

function setCursor(cursor, map) {
    map.getCanvas().style.cursor = cursor;
}

export function addLayerInteractions(map, handleFeatureClick) {
    if (typeof handleFeatureClick !== 'function') {
		throw new TypeError('handleFeatureClick must be a function');
	}
    
    for (const layer of CLICKABLE_LAYERS) {
        map.on('mouseenter', layer, () => setCursor('pointer', map));
        map.on('mouseleave', layer, () => setCursor('', map));
        map.on('click', layer, handleFeatureClick);
    }
}

export function removeLayerInteractions(map, handleFeatureClick) {
    if (!map) return;

    for (const layer of CLICKABLE_LAYERS) {
        if (!map.getLayer(layer)) continue;

        map.off('click', layer, handleFeatureClick);
    }
}