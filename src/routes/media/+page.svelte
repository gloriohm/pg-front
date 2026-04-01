<script>
	const mediaLinks = [
		{
			id: 8,
			siteName: 'Dagbladet',
			articleTitle: 'Her er pilsen billigst',
			date: '2025-03-21',
			url: 'https://dinside.dagbladet.no/fritid/her-er-pisler-billigst/82858106'
		},
		{
			id: 7,
			siteName: 'Dagbladet',
			articleTitle: 'Utepils - Koste seg',
			date: '2025-02-05',
			url: 'https://dinside.dagbladet.no/fritid/koste-seg/82637399'
		},
		{
			id: 6,
			siteName: 'Dagbladet',
			articleTitle: 'Øl: Her er det billigst',
			date: '2024-09-05',
			url: 'https://dinside.dagbladet.no/okonomi/her-er-det-billigst/81899314'
		},
		{
			id: 5,
			siteName: 'Universitas',
			articleTitle: 'Bydelsguide for nye Osloborgere',
			date: '2024-08-15',
			url: 'https://www.universitas.no/grunerlokka-oslo-osloguide/bydelsguide-for-nye-osloborgere/378786'
		},
		{
			id: 4,
			siteName: 'VårtOslo',
			articleTitle: 'Ny i byen? Sjekk ut VårtOslos studentguide her!',
			date: '2024-08-04',
			url: 'https://www.vartoslo.no/bla-brod-og-sirkus-caesar-bar-cafe/ny-i-byen-sjekk-ut-vartoslos-studentguide-her/596800'
		},
		{
			id: 3,
			siteName: 'Dagbladet',
			articleTitle: 'Utepils: Enorm prisforskjell',
			date: '2024-05-10',
			url: 'https://dinside.dagbladet.no/okonomi/enorm-prisforskjell/81372677'
		},
		{
			id: 2,
			siteName: 'TV2',
			articleTitle: 'Var frustrert over dyr øl, startet pilsguide',
			date: '2024-05-04',
			url: 'https://www.tv2.no/nyheter/innenriks/var-frustrert-over-dyr-ol-startet-pilsguide-pa-nett/16661019/'
		},
		{
			id: 1,
			siteName: 'Erik Nords nettside',
			articleTitle: 'Sol og Pils',
			date: null,
			url: 'https://www.eriknord.no/Hvavildu.htm'
		}
	];

	const seo = {
		title: 'Medieomtaler – Pilsguiden i media',
		description:
			'Dykk ned i medieoppslag hvor Pilsguiden blir nevnt med lenker til de aktuelle mediene.',
		canonicalUrl: 'https://pilsguiden.no/media'
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:url" content={seo.canonicalUrl} />
	<meta property="og:type" content="website" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<link rel="canonical" href={seo.canonicalUrl} />
</svelte:head>

<article class="m-auto max-w-xl">
	<h1 class="pb-4 text-3xl font-extrabold">Medieomtale:</h1>
	<div class="mb-6">
		<p class="max-w-prose">
			Journalist? Vi i Pilsguiden stiller gjerne opp for den fjerde statsmakt (også første til
			tredje statsmakt, samt den femte). Ta kontakt på <a
				href="mailto:pilsguiden@hotmail.com"
				class="font-semibold">pilsguiden@hotmail.com</a
			> så bistår vi så godt vi kan. Under finner du lenker til tidligere saker hvor vi er omtalt.
		</p>
	</div>
	<div class="flex flex-col">
		<ul>
			{#each mediaLinks as l (l.id)}
				<li class="mb-4 flex flex-col">
					<div>
						<span class="text-lg font-semibold">{l.siteName}</span>
						<span class="text-sm font-thin italic"
							>{#if l.date}({l.date}){/if}</span
						>
					</div>
					<div>
						<a
							href={l.url}
							class="text-lg font-semibold text-blue-600 underline"
							target="_blank"
							rel="noopener noreferrer">{l.articleTitle}</a
						>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</article>
