<script>
    import { onMount } from 'svelte';
    let { stats } = $props();
    const diff = $derived(stats.median - stats.parent_median);

    const diffPercent = $derived(
        Math.round((diff / stats.parent_median) * 1000) / 10
    );
</script>

<section class="my-4 rounded-xl bg-card p-4 shadow-sm ring-1 ring-black/10">
	<h3 class="mb-4 text-lg font-bold">
		Prisstatistikk for {stats.location_name}
	</h3>

	<div class="grid grid-cols-3 gap-4">
		<div class="grid grid-rows-[2.75rem_auto_auto] border-r border-black/10 pr-4 pb-2">
			<p class="line-clamp-2 text-sm leading-tight text-gray-700">
				Medianpris ({stats.location_name})
			</p>

			<p class="mt-2 text-4xl font-bold">{stats.median},-</p>

			<p class="mt-1 text-sm text-gray-600">
				Basert på {stats.count} priser
			</p>
		</div>

		<div class="grid grid-rows-[2.75rem_auto_auto] border-r border-black/10 pr-4 pb-2">
			<p class="line-clamp-2 text-sm leading-tight text-gray-700">
				Medianpris ({stats.parent_name})
			</p>

			<p class="mt-2 text-4xl font-bold">{stats.parent_median},-</p>

			<p class="mt-1 text-sm text-gray-600">
				Basert på {stats.parent_count} priser
			</p>
		</div>

		<div class="grid grid-rows-[2.75rem_auto_auto] pr-4 pb-2">
			<p class="line-clamp-2 text-sm leading-tight text-gray-700">
				Forskjell fra {stats.parent_name}
			</p>

			<p class="mt-2 text-4xl font-bold">
				{diff > 0 ? '+' : ''}{diff},-
			</p>

			<p class="mt-1 text-sm text-gray-600">
				{diff > 0 ? '+' : ''}{diffPercent}%
				{#if stats.median > stats.parent_median}
					dyrere
				{:else}
					billigere
				{/if}
			</p>
		</div>
	</div>

	<p class="mt-4 border-t border-black/10 pt-3 text-sm text-gray-700">
		Alle priser er per halvliter.
	</p>
</section>