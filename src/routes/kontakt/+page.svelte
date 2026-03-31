<script>
	const seo = {
		title: "Kontakt oss | Pilsguiden.no",
		description: "Ta kontakt med Pilsguiden for spørsmål, tilbakemeldinger, prisoppdateringer eller pressemeldinger.",
		canonicalUrl: "https://pilsguiden.no/kontakt"
	}
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
	<h1 class="text-3xl font-extrabold pb-4">Kontakt oss</h1>
	<div class="flex flex-col">
		<p class="max-w-prose text-justify mb-2">
			Har du tips til ølpriser, samarbeidsønsker, eller andre henvendelser? Vi kan kontaktes på: <a
				href="mailto:pilsguiden@hotmail.com"
				class="font-semibold">pilsguiden@hotmail.com</a
			>
		</p>
		<p class="max-w-prose text-justify">
			Vi jobber for øyeblikket med å forenkle hvordan du kan bidra til å holde Pilsguiden oppdatert.
			Inntil videre, send oss en beskjed om <span class="font-medium">pris</span>,
			<span class="font-medium">størrelse</span>
			(vi konverter automatisk til halvliterpris), og gjerne også hva som er husets
			<span class="font-medium">ølmerke</span>, så oppdaterer vi fortløpende.
		</p>
	</div>
</article>
