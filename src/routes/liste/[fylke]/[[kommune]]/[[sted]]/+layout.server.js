import { apiFetch } from '@/utils/api.js';

export async function load({ params, url }) {
	const { fylke, kommune, sted } = params;
	let q = `/bars/list?fylke=${fylke}`;
	if (kommune) {
		q += `&kommune=${kommune}`;
	}
	if (sted) {
		q += `&sted=${sted}`;
	}
	if (url.search) {
		const formatted = url.search.replace('?', '&');
		q += formatted;
	}
	console.log('load function for liste kjører me query\n', q);

	const res = await apiFetch(q);
	if (!res.ok) {
		const message = await res.text();
		throw new Error(message);
	}
	const list = await res.json();
	return { list };
}
