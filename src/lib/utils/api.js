import { PUBLIC_API_BASE } from '$env/static/public';
import { PRIVATE_API_KEY } from '$env/static/private';

export function apiFetch(endpoint, admin) {
	const headers = {
		'Api-Key': PRIVATE_API_KEY
	};

	if (admin?.accessToken && admin?.refreshToken) {
		headers['Authorization'] = `Bearer ${userJwt}`;
		headers['refresh-token'] = admin.refreshToken;
	}
	return fetch(`${PUBLIC_API_BASE}/api/v1${endpoint}`, {
		headers: headers
	});
}

export function apiPost(endpoint, data, admin) {
	const headers = {
		'Content-Type': 'application/json',
		'Api-Key': PRIVATE_API_KEY
	};

	if (admin?.accessToken && admin?.refreshToken) {
		headers['Authorization'] = `Bearer ${admin.accessToken}`;
		headers['refresh-token'] = admin.refreshToken;
	}
	return fetch(`${PUBLIC_API_BASE}/api/v1${endpoint}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data)
	});
}
