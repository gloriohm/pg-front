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