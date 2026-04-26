<script lang="js">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
	import PriceCard from '@/components/internal/PriceCard.svelte';
	let { data } = $props();
	let { admin } = data;
	const root = '/admin/update-bar/';
	const url = root + $page.params.slug;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{data.barObj.bar.name}</Card.Title>
		<Card.Description>
			{data.barObj.bar.address}
		</Card.Description>
		<Card.Action>
			{#if admin}
				<Button href={url} variant="outline" size="sm">Rediger</Button>
			{/if}
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<PriceCard drink={data.barObj.drink} />
	</Card.Content>
</Card.Root>
