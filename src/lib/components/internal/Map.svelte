<script>
	import maplibregl from 'maplibre-gl';
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { XIcon } from '@lucide/svelte';
	import BarCard from './BarCard.svelte';
	import EnhancedForm from '@/components/internal/EnhancedForm.svelte';
	import { buildViewportParams } from '$lib/utils/location.js';
	import { createMap, handleMapLoad, removeLayerInteractions, BAR_SOURCE_ID, emptyFeatureCollection } from '$lib/utils/map.js';

	const MAP_MODE = {
		VIEW: 'view',
		MOVE_BAR: 'move_bar'
	};

	let { initialCenter = [10.7522, 59.9139], initialZoom = 12 } = $props();

	let map = $state();
	let mapContainer = $state();
	let selectedBar = $state(null);
	let barDetails = $state(null);
	let selectedFeatureId = $state(null);
	let barLoading = $state(false);
	let barError = $state(null);

	let mapMode = $state(MAP_MODE.VIEW);
	let movingBar = $state(null);
	let proposedLocation = $state(null);
	let moveLoading = $state(false);
	let moveError = $state(null);

	const formOpts = {
		method: 'POST',
		id: 'update-location',
		action: '',
		successMsg: 'Bar flyttet!',
		failureMsg: 'Noe gikk galt...',
		onSuccess: cancelMoveBar
	};

	let barDetailsAbortController;
	let mapDataAbortController;
	let cleanupMap = () => {};

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

	function startMovingBar() {
		if (!selectedBar) return;

		movingBar = selectedBar;
		proposedLocation = {
			lng: 0,
			lat: 0
		};
		moveError = null;
		mapMode = MAP_MODE.MOVE_BAR;

		closeDialog();
	}

	function cancelMoveBar() {
		mapMode = MAP_MODE.VIEW;
		movingBar = null;
		proposedLocation = null;
		moveLoading = false;
		moveError = null;
	}

	function getFeatureProperties(feature) {
		return feature?.properties ?? null;
	}

	function handleFeatureClick(event) {
		if (mapMode === MAP_MODE.MOVE_BAR) return;

		event.preventDefault();

		const feature = event.features?.[0];
		const id = getFeatureId(feature);

		if (!id || selectedFeatureId === id) return;

		void selectBar(feature);
	}

	function handleMapClick(event) {
		if (mapMode !== MAP_MODE.MOVE_BAR) return;

		proposedLocation = {
			lng: event.lngLat.lng,
			lat: event.lngLat.lat
		};
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

		const onLoad = () => {
			const cleanup = handleMapLoad(map, loadBarsInViewport, handleFeatureClick, handleMapClick);

			if (typeof cleanup === 'function') {
				cleanupMap = cleanup;
			}
		};

		map.once('load', onLoad);

		return () => {
			barDetailsAbortController?.abort();
			mapDataAbortController?.abort();

			map.off('load', onLoad);
			cleanupMap();

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
					<Button type="button" variant="outline" onclick={startMovingBar}>
						Juster plassering
					</Button>
				{/if}
			</Card.Content>
		</Card.Root>
	{/if}
	{#if mapMode === MAP_MODE.MOVE_BAR}
		<Card.Root class="absolute bottom-4 left-1/2 z-10 w-full max-w-sm -translate-x-1/2">
			<Card.Header>
				<Card.Title>Flytter {movingBar?.name}</Card.Title>
				<Card.Description>
					{#if proposedLocation}
						Ny plassering: {proposedLocation.lat.toFixed(6)}, {proposedLocation.lng.toFixed(6)}
					{:else}
						Trykk på kartet for å velge ny plassering
					{/if}
				</Card.Description>
			</Card.Header>

			<Card.Content>
				{#if moveError}
					<p class="text-sm text-red-600">{moveError}</p>
				{/if}
				<EnhancedForm opts={formOpts}>
					<Input hidden name="bar_id" value={movingBar.id} />
					<Input hidden name="lat" value={proposedLocation.lat} />
					<Input hidden name="lng" value={proposedLocation.lng} />
				</EnhancedForm>
			</Card.Content>
			<Card.Footer class="flex-col gap-2">
				<Button onclick={cancelMoveBar} class="w-full" variant="outline">Avbryt</Button>
				<Button type="submit" class="w-full" form={formOpts.id}>Bekreft</Button>
			</Card.Footer>
		</Card.Root>
	{/if}
</div>

