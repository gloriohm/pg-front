import { apiFetch } from '@/utils/api.js';

export async function load({ params }) {
	const { fylke, kommune, sted } = params;
	let q = `/bars/list?fylke=${fylke}`;
	if (kommune) {
		q += `&kommune=${kommune}`;
	}
	if (sted) {
		q += `&sted=${sted}`;
	}

	const res = await apiFetch(q);
	if (!res.ok) {
		const message = await res.text();
		throw new Error(message);
	}
	const list = await res.json();
	return { list };
}
