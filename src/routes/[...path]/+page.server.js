import { redirect } from '@sveltejs/kit';

const FYLKER = new Set([
	'oslo',
	'akershus',
	'ostfold',
	'buskerud',
	'innlandet',
	'vestfold',
	'telemark',
	'agder',
	'rogaland',
	'vestland',
	'more-og-romsdal',
	'trøndelag',
	'nordland',
	'troms',
	'finnmark'
]);

export const load = ({ params, url }) => {
	if (!params.path) return;

	// split + normalize
	const parts = params.path
		.split('/')
		.filter(Boolean)
		.map((p) => p.toLowerCase());

	if (parts.length > 3) return;

	const [fylke, kommune, sted] = parts;

	if (!FYLKER.has(fylke)) return;

	// preserve query string
	const qs = url.search;

	// build target dynamically
	let target = `/liste/${fylke}`;

	if (kommune) target += `/${kommune}`;
	if (sted) target += `/${sted}`;

	throw redirect(308, target + qs);
};
