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
	if (!params.path) {
		error(404, 'Not found');
	}

	const parts = params.path
		.split('/')
		.filter(Boolean)
		.map((p) => p.toLowerCase());

	if (parts.length === 0 || parts.length > 3) {
		error(404, 'Not found');
	}

	const [fylke, kommune, sted] = parts;

	if (!FYLKER.has(fylke)) {
		error(404, 'Not found');
	}

	let target = `/liste/${fylke}`;

	if (kommune) target += `/${kommune}`;
	if (sted) target += `/${sted}`;

	redirect(308, target + url.search);
};
