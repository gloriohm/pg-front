import { apiFetch } from '@/utils/api.js';

export async function load({ params }) {
	const path = `/bars/${params.slug}`;
	const res = await apiFetch(path);
	if (!res.ok) {
		throw new Error('Failed to load bar data');
	}
	const barObj = await res.json();
	return { barObj };
}
