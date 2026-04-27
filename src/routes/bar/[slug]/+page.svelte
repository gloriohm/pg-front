<script lang="js">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
	import PriceCard from '@/components/internal/PriceCard.svelte';
	let { data } = $props();
	let { admin } = data;
	const root = '/admin/update-bar/';
	const url = root + $page.params.slug;
	console.log(data.barObj);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{data.barObj.name}</Card.Title>
		<Card.Description>
			{data.barObj.address}
		</Card.Description>
		<Card.Action>
			{#if admin}
				<Button href={url} variant="outline" size="sm">Rediger</Button>
			{/if}
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<PriceCard prices={data.barObj.prices} brewery={data.barObj.brewery} size={data.barObj.size} />
	</Card.Content>
</Card.Root>
