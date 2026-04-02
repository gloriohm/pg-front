<script lang="js">
	import { page } from '$app/stores';
	import BarList from '@/components/internal/BarList.svelte';
	import NavGroup from '@/components/internal/NavGroup.svelte';
	import { H2 } from '@/styles/styles.js';
	let { data } = $props();

	let url = $derived($page.url.search);
</script>

<article class="px-1">
	<div class="mb-2">
		<NavGroup links={data.home.links} opts={url} />
	</div>
	<div class="mb-4">
		<p class="prose text-left">
			Pilsguiden har samlet ølprisene fra <span class="font-bold">{data.home.total_bars}</span> serveringssteder
			over hele landet. Bruk søkefeltet til å finne frem til fylket, kommunen eller bydelen din og sjekk
			hvor mye pilsen koster. Noen barer har tidsbestemte priser ⏰ og listen oppdateres i sanntid.
		</p>
	</div>
	<div>
		<h2 class={H2}>Norges billigste øl</h2>
		<BarList bars={data.home.top_ten_bars} />
		<h2 class={H2}>Norges dyreste øl</h2>
		<BarList bars={data.home.bottom_ten_bars} />
	</div>
</article>
