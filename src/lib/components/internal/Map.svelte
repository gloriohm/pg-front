<script>
	import maplibregl from 'maplibre-gl';
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { XIcon } from '@lucide/svelte';
	import BarCard from './BarCard.svelte';
	import { buildViewportParams, moveUserLocation } from '$lib/utils/location.js';
	import { createMap, handleMapLoad, removeLayerInteractions, BAR_SOURCE_ID, emptyFeatureCollection } from '$lib/utils/map.js';

	let { initialCenter = [10.7522, 59.9139], initialZoom = 12 } = $props();

	let map = $state();
	let mapContainer = $state();
	let selectedBar = $state(null);
	let barDetails = $state(null);
	let selectedFeatureId = $state(null);
	let barLoading = $state(false);
	let barError = $state(null);

	let barDetailsAbortController;
	let mapDataAbortController;
	let cleanupMap;

	async function loadBarsInViewport() {
		if (!map?.getSource(BAR_SOURCE_ID)) return;

		mapDataAbortController?.abort();
		mapDataAbortController = new AbortController();

		try {
			const res = await fetch(`/bff/map?${buildViewportParams(map)}`, {
				signal: mapDataAbortController.signal
			});

			if (!res.ok) {
				throw new Error(`Failed to load bars (${res.status})`);
			}

			const bars = await res.json();
			map.getSource(BAR_SOURCE_ID)?.setData(bars);
		} catch (err) {
			if (err?.name === 'AbortError') return;

			console.error(err);
			map.getSource(BAR_SOURCE_ID)?.setData(emptyFeatureCollection);
		}
	}

	function getFeatureProperties(feature) {
		return feature?.properties ?? null;
	}

	function handleFeatureClick(event) {
		event.preventDefault();

		const feature = event.features?.[0];
		const id = getFeatureId(feature);

		if (!id || selectedFeatureId === id) return;

		void selectBar(feature);
	}

	function getFeatureId(feature) {
		return String(feature?.properties?.id ?? '');
	}

	async function selectBar(feature) {
		const properties = getFeatureProperties(feature);
		const id = getFeatureId(feature);

		if (!properties || !id) return;

		selectedBar = properties;
		selectedFeatureId = id;
		barDetails = null;
		barLoading = true;
		barError = null;

		barDetailsAbortController?.abort();
		barDetailsAbortController = new AbortController();

		try {
			const params = new URLSearchParams({ id });
			const res = await fetch(`/bff/bar?${params}`, {
				signal: barDetailsAbortController.signal
			});

			if (!res.ok) {
				throw new Error(`Failed to load bar (${res.status})`);
			}

			barDetails = await res.json();
		} catch (err) {
			if (err?.name === 'AbortError') return;

			console.error(err);
			barError = err instanceof Error ? err.message : 'Internal Server Error';
			barDetails = null;
		} finally {
			if (selectedFeatureId === id) {
				barLoading = false;
			}
		}
	}

	function closeDialog() {
		barDetailsAbortController?.abort();
		selectedBar = null;
		barDetails = null;
		selectedFeatureId = null;
		barLoading = false;
		barError = null;
	}

	onMount(() => {
		map = createMap(initialCenter, initialZoom, mapContainer);
		map.addControl(new maplibregl.NavigationControl(), 'top-right');
		
		const onLoad = () => {
			cleanupMap = handleMapLoad(map, loadBarsInViewport, handleFeatureClick);
		};

		map.once('load', onLoad);

		return () => {
			barDetailsAbortController?.abort();
			mapDataAbortController?.abort();

			cleanupMap?.();
			removeLayerInteractions(map, handleFeatureClick);

			map?.remove();
		};
	});
</script>

<div class="relative h-150 w-full">
	<div bind:this={mapContainer} class="h-full w-full"></div>

	{#if selectedBar}
		<Card.Root class="absolute bottom-4 left-1/2 z-10 w-full max-w-sm -translate-x-1/2">
			<Card.Header>
				<Card.Title>{selectedBar.name}</Card.Title>

				<Card.Action>
					<Button variant="ghost" onclick={closeDialog} aria-label="Lukk">
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