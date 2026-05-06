import { apiFetch } from '@/utils/api.js';

export async function GET() {
	const res = await apiFetch('/sitemap');

	if (!res.ok) {
		throw new Error('Failed to load sitemap');
	}

	const slugs = await res.json();
	const site = 'https://www.pilsguiden.no';

	const staticUrls = [
		{ loc: '', lastmod: new Date().toISOString() },
		{ loc: '/om-oss', lastmod: '2026-04-27' },
		{ loc: '/kontakt', lastmod: '2026-04-27' },
		{ loc: '/media', lastmod: '2026-04-27' },
		{ loc: '/donasjon', lastmod: '2026-04-27' },
		{ loc: '/api', lastmod: '2026-04-27' },
		{ loc: '/cookies', lastmod: '2026-04-27' }
	];

	const urls = [
		...staticUrls,
		...slugs.map((slug) => ({
			loc: slug.loc,
			lastmod: slug.lastmod
		}))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(url) => `	<url>
		<loc>${site}${url.loc}</loc>
		<lastmod>${url.lastmod}</lastmod>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
}
