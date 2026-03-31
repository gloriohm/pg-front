<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.png';
	import Footer from '@/components/internal/Footer.svelte';
	import Header from '@/components/internal/Header.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { setConsent } from '$lib/utils/cookies';

	let { children, data } = $props();
	let showCookiesBanner = $state(!data.consent);

	function setConsentWrapper(consent) {
		showCookiesBanner = false;
		setConsent(consent);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pilsguiden</title>
    <meta
        name="description"
        content="Få oversikt over ølpriser i Norge"
    />
    <link rel="canonical" href="https://www.pilsguiden.no" />
</svelte:head>

<Header />
<main class="m-auto max-w-xl max-sm:px-4">
	<Toaster position="top-center" />
	{@render children()}
</main>
<Footer />

{#if showCookiesBanner}
	<div class="flex justify-center">
		<div
			role="alert"
			class="fixed bottom-4 z-50 w-full max-w-xl rounded-lg bg-secondary px-2 py-4 text-slate-100"
		>
			<div class="flex items-center justify-between gap-1 max-sm:flex-col">
				<span>Denne siden bruker cookies.</span>
				<span class="flex gap-1">
					<Button onclick={() => setConsentWrapper(false)}>Kun nødvendige</Button>
					<Button onclick={() => setConsentWrapper(true)}>Godta alle</Button>
				</span>
			</div>
		</div>
	</div>
{/if}
