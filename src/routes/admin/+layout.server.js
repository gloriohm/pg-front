import { redirect } from '@sveltejs/kit';
import { apiFetch } from '@/utils/api.js';

export async function load({ cookies }) {
	const token = cookies.get('access_token');

	if (!token) {
		throw redirect(303, '/login');
	}

	const res = await apiFetch('/brewery/list-breweries');
	if (!res.ok) {
		throw new Error('Failed to load brewery data');
	}
	const breweries = await res.json();
	return { breweries };
}
