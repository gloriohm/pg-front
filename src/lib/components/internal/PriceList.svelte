<script lang="js">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import PriceConfirm from './PriceConfirm.svelte';
	import PriceUpdate from './PriceUpdate.svelte';
	import PriceInfo from './PriceInfo.svelte';
	import { formatNorwegianDate } from '$lib/utils/dateTime.js';
	let { prices } = $props();

	let confirmDialog = $state(false);
	let updateDialog = $state(false);
	console.log(prices[0]);
</script>

<section>
	<Table.Root>
		{#if prices[0].price !== prices[0].pint}
			<Table.Caption></Table.Caption>
		{/if}
		<Table.Header>
			<Table.Row>
				<Table.Head>Pris</Table.Head>
				<Table.Head>Str.</Table.Head>
				<Table.Head>Sjekket</Table.Head>
				<Table.Head class="text-end">Oppdater/Bekreft</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each prices as p}
				<Table.Row>
					<Table.Cell>
						{#if p.time?.span}⏰{/if}{p.price},-
					</Table.Cell>
					<Table.Cell>{p.size}l</Table.Cell>
					<Table.Cell>{formatNorwegianDate(p.price_checked)}</Table.Cell>
					<Table.Cell class="text-end">
						<PriceUpdate id={p.id} />
						<PriceConfirm id={p.id} />
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</section>
