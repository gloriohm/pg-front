export function moveUserLocation(map) {
    if (!navigator.geolocation) {
			return;
		}

    navigator.geolocation.getCurrentPosition(
        (position) => {
            let userLocation = [
                position.coords.longitude,
                position.coords.latitude
            ];
            map.flyTo({
                center: userLocation,
                zoom: 15
            });
        }, 
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.log('Location denied');
                    break;

                case error.POSITION_UNAVAILABLE:
                    console.log('Location unavailable');
                    break;

                case error.TIMEOUT:
                    console.log('Location timeout');
                    break;

                default:
                    console.log('Unknown location error');
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        }
    );
}

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