function getPaddedBounds(map) {
	const bounds = map.getBounds();
	const zoom = map.getZoom();

	let paddingFactor = 0.25;

	if (zoom < 12) {
		paddingFactor = 0.5;
	} else if (zoom >= 14) {
		paddingFactor = 0.15;
	}

	const lngPadding = (bounds.getEast() - bounds.getWest()) * paddingFactor;
	const latPadding = (bounds.getNorth() - bounds.getSouth()) * paddingFactor;

	return {
		minLng: bounds.getWest() - lngPadding,
		minLat: bounds.getSouth() - latPadding,
		maxLng: bounds.getEast() + lngPadding,
		maxLat: bounds.getNorth() + latPadding
	};
}

export function buildViewportParams(map) {
    const paddedBounds = getPaddedBounds(map);
    const container = map.getContainer();

    return new URLSearchParams({
        minLng: String(paddedBounds.minLng),
        minLat: String(paddedBounds.minLat),
        maxLng: String(paddedBounds.maxLng),
        maxLat: String(paddedBounds.maxLat),
        zoom: String(map.getZoom()),
        viewportWidth: String(container.clientWidth),
        viewportHeight: String(container.clientHeight)
    });
}