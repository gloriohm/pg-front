<script lang="js">
	import * as Table from '$lib/components/ui/table/index.js';
	import PriceConfirm from './PriceConfirm.svelte';
	import PriceUpdate from './PriceUpdate.svelte';
	import { formatNorwegianDate } from '$lib/utils/dateTime.js';
	import PriceDelete from './PriceDelete.svelte';
	let { prices, size } = $props();
	console.log(prices);
</script>

<section>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Pris</Table.Head>
				<Table.Head>Str.</Table.Head>
				<Table.Head>Sjekket</Table.Head>
				<Table.Head class="text-end">Oppdater/Bekreft</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each prices as p (p.id)}
				<Table.Row>
					<Table.Cell>{p.price},-</Table.Cell>
					<Table.Cell>{size}l</Table.Cell>
					<Table.Cell>{formatNorwegianDate(p.price_checked)}</Table.Cell>
					<Table.Cell class="text-end">
						<PriceDelete id={p.id} />
						<PriceUpdate id={p.id} />
						<PriceConfirm id={p.id} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</section>
