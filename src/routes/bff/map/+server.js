import { json } from '@sveltejs/kit';
import { apiFetch } from '@/utils/api.js';

export async function GET({ url }) {
	const res = await apiFetch(`/bars/map?${url.searchParams.toString()}`);

	if (!res.ok) {
		return json({ error: 'Error getting bars' }, { status: res.status });
	}

	const data = await res.json();
	return json(data);
}
