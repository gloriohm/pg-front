<script>
	import Input from '@/components/ui/input/input.svelte';
	import { clickOutside } from '$lib/actions/clickOutside.js';
	import { resolve } from '$app/paths';

	let query = '';
	let results = [];
	let showResults = false;
	let timer;

	$: if (query.length >= 2) {
		showResults = true;
		clearTimeout(timer);
		timer = setTimeout(async () => {
			const res = await fetch(`/bff/search?query=${encodeURIComponent(query)}`);
			results = await res.json();
		}, 250);
	} else {
		results = [];
		showResults = false;
	}

	function selectResult() {
		showResults = false;
	}
</script>

<div class="relative w-full" use:clickOutside={() => (showResults = false)}>
	<Input
		bind:value={query}
		placeholder="Søk på bar eller sted"
		onfocus={() => {
			if (results.length > 0) showResults = true;
		}}
	/>

	{#if showResults && results.length >= 1}
		<div
			class="absolute z-50 mb-2 flex w-full flex-col gap-1 overflow-y-auto rounded-md border border-gray-300 bg-slate-100 shadow-lg"
		>
			{#each results as r (r.id)}
				<a
					href={resolve(`${r.type}${r.slug}`)}
					class="cursor-pointer justify-start px-4 py-2 text-left text-sm hover:bg-slate-200"
					variant="link"
					size="sm"
					onclick={selectResult}
				>
					{r.name}
				</a>
			{/each}
		</div>
	{/if}
</div>
