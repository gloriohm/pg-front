import { json } from '@sveltejs/kit';
import { apiFetch } from '@/utils/api.js';

export async function GET({ url }) {
	const query = url.searchParams.get('query');

	if (!query || query.length < 2) {
		return json([]);
	}

	const res = await apiFetch(`/search?query=${query}`);

	if (!res.ok) {
		return json({ error: 'Search failed' }, { status: res.status });
	}

	const data = await res.json();
	return json(data);
}
