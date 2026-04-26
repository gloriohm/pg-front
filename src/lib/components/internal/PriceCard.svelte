<script lang="js">
	import PriceConfirm from './PriceConfirm.svelte';
	import PriceUpdate from './PriceUpdate.svelte';
	import { formatNorwegianDate } from '$lib/utils/dateTime.js';
	import { H4 } from '@/styles/styles.js';

	let { drink } = $props();
	console.log(drink);

	let sortedPrices = $derived(drink.prices.toSorted((a, b) => Number(b.active) - Number(a.active)));

	let morePrices = $derived(drink.prices.length > 1);
</script>

<h4 class={H4}>
	Pris{#if morePrices}er{/if}
</h4>
<div class="grid gap-2">
	{#each sortedPrices as p (p.id)}
		<div class="grid gap-2 rounded-xl bg-amber-200 px-4 py-2 shadow" class:bg-slate-200={!p.active}>
			<div>
				<p class="text-xs">{p.valid}</p>
			</div>
			<div>
				<div>
					<p>
						<span class="font-semibold">{p.price},-</span> for
						<span class="font-semibold">{drink.size}l </span>
						{drink.brewery}
						{#if p.price !== p.pint}
							| tilsvarer {p.pint},- for 0.5l{/if}
					</p>
				</div>
				<div class="flex grow justify-between">
					<p class="text-xs">Sist sjekket {formatNorwegianDate(p.price_checked)}</p>
					<div>
						<PriceUpdate id={p.id} />
						<PriceConfirm id={p.id} />
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
