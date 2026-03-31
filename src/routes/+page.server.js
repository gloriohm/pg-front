import { apiFetch } from '@/utils/api.js';

export async function load() {
	const res = await apiFetch('/stats/home');
	if (!res.ok) {
		throw new Error('Failed to load home data');
	}
	const home = await res.json();
	return { home };
}
