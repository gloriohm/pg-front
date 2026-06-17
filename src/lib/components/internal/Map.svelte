<script>
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import { PUBLIC_MAP_TILER_API_KEY } from '$env/static/public';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { XIcon } from '@lucide/svelte';
	import BarCard from './BarCard.svelte';
	import { moveUserLocation, getPaddedBounds } from '$lib/utils/location.js'

	let { initialCenter = [10.7522, 59.9139], initialZoom = 12 } = $props();

	let map = $state();
	let mapContainer = $state();
	let selectedBar = $state(null);
	let barDetails = $state(null);
	let selectedFeatureId = $state(null);

	let barLoading = $state(false);
	let barError = $state(null);

	async function selectBar(feature) {
		selectedBar = feature.properties;

		barLoading = true;
		barError = null;

		try {
			const params = new URLSearchParams({
				id: selectedBar.id
			});

			const res = await fetch(`/bff/bar?${params}`);

			if (!res.ok) {
				throw new Error(`Failed to load bar (${res.status})`);
			}

			barDetails = await res.json();
		} catch (err) {
			console.error(err);

			barError = err instanceof Error ? err.message : 'Internal Server Error';

			barDetails = null;
		} finally {
			barLoading = false;
		}
	}

	function closeDialog() {
		selectedBar = null;
		//barDetails = null;
	}

	async function loadBarsInViewport() {
		const paddedBounds = getPaddedBounds(map);

		const params = new URLSearchParams({
			minLng: paddedBounds.minLng,
			minLat: paddedBounds.minLat,
			maxLng: paddedBounds.maxLng,
			maxLat: paddedBounds.maxLat,
			zoom: map.getZoom(),
			viewportWidth: map.getContainer().clientWidth,
			viewportHeight: map.getContainer().clientHeight
		});

		const res = await fetch(`/bff/map?${params}`);
		const bars = await res.json();

		map.getSource('bars')?.setData(bars);
	}

	onMount(() => {
		map = new maplibregl.Map({
			container: mapContainer,
			style: `https://api.maptiler.com/maps/bright-v2/style.json?key=${PUBLIC_MAP_TILER_API_KEY}`,
			center: initialCenter,
			zoom: initialZoom
		});

		map.addControl(new maplibregl.NavigationControl(), 'top-right');

		map.on('load', async () => {
			map.addSource('bars', {
				type: 'geojson',
				data: {
					type: 'FeatureCollection',
					features: []
				}
			});

			map.addLayer({
				id: 'bars-circle',
				type: 'circle',
				source: 'bars',
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

			map.addLayer({
				id: 'bars-price',
				type: 'symbol',
				source: 'bars',
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

			map.addLayer({
				id: 'bars-count-badge',
				type: 'circle',
				source: 'bars',
				filter: ['>', ['get', 'cell_count'], 1],
				paint: {
					'circle-radius': 8,
					'circle-color': '#f4f4f5',
					'circle-stroke-width': 1,
					'circle-stroke-color': '#18181b',
					'circle-translate': [12, -12]
				}
			});

			map.addLayer({
				id: 'bars-count-text',
				type: 'symbol',
				source: 'bars',
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

			map.addLayer({
				id: 'bars-name',
				type: 'symbol',
				source: 'bars',
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

			// initial load
			await loadBarsInViewport();

			moveUserLocation(map)

			// reload on viewport change
			map.on('moveend', loadBarsInViewport);
		});

		for (const layer of ['bars-circle', 'bars-price']) {
			map.on('mouseenter', layer, () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', layer, () => {
				map.getCanvas().style.cursor = '';
			});

			map.on('click', layer, (event) => {
				event.preventDefault();

				const feature = event.features[0];
				const id = feature.properties.id;

				if (selectedFeatureId === id) return;

				selectedFeatureId = id;
				void selectBar(feature);
			});
		}

		return () => {
			map?.remove();
		};
	});
</script>

<div class="relative h-150 w-full">
	<div bind:this={mapContainer} class="h-full w-full"></div>

	{#if selectedBar && barDetails}
		<Card.Root class="absolute bottom-4 left-1/2 z-10 w-full max-w-sm -translate-x-1/2">
			<Card.Header>
				<Card.Title>{selectedBar.name}</Card.Title>

				<Card.Action>
					<Button variant="ghost" onclick={closeDialog}>
						<XIcon />
					</Button>
				</Card.Action>
			</Card.Header>

			<Card.Content>
				{#if barLoading}
					<p>Laster...</p>
				{:else if barError}
					<p>{barError}</p>
				{:else if barDetails}
					<BarCard bar={barDetails} />
				{/if}
			</Card.Content>
		</Card.Root>
	{/if}
</div>
