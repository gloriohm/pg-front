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

export function getPaddedBounds(map) {
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