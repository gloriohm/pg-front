<script>
	import Input from '@/components/ui/input/input.svelte';
	import { clickOutside } from '$lib/actions/clickOutside.js';
	import { resolve } from '$app/paths';

	let query = '';
	let debouncedQuery = '';
	let showResults = false;
	let timer;

	$: debounce(query);

	function debounce(q) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			debouncedQuery = q.trim();
		}, 250);
	}

	$: searchPromise = debouncedQuery.length >= 2 ? search(debouncedQuery) : Promise.resolve([]);

	async function search(q) {
		const params = new URLSearchParams({ query: q });
		const res = await fetch(`/bff/search?${params}`);

		if (!res.ok) throw new Error('Search failed');

		return res.json();
	}

	function closeResults() {
		showResults = false;
	}
</script>

<div class="relative w-full" use:clickOutside={closeResults}>
	<Input
		bind:value={query}
		placeholder="Søk på bar eller sted"
		onfocus={() => (showResults = true)}
	/>

	{#if showResults && debouncedQuery.length >= 2}
		<div
			class="absolute z-50 mb-2 flex w-full flex-col gap-1 overflow-y-auto rounded-md border border-gray-300 bg-slate-100 shadow-lg"
		>
			{#await searchPromise}
				<div class="p-3 text-sm text-muted-foreground">Søker...</div>
			{:then results}
				{#if results.length}
					{#each results as result (result)}
						<a
							href={resolve(`${result.type}${result.slug}`)}
							class="cursor-pointer justify-start px-4 py-2 text-left text-sm hover:bg-slate-200"
							variant="link"
							size="sm"
							onclick={() => (showResults = false)}
						>
							{result.name}
						</a>
					{/each}
				{:else}
					<div class="p-3 text-sm text-muted-foreground">Ingen treff</div>
				{/if}
			{:catch}
				<div class="p-3 text-sm">Noe gikk galt...</div>
			{/await}
		</div>
	{/if}
</div>
