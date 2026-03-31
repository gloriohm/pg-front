<script lang="js">
	import * as Card from '$lib/components/ui/card/index.js';
	import PriceList from '@/components/internal/PriceList.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { page } from '$app/stores';
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
		<div class="mb-4">
			<p>Bryggeri: {data.barObj.bar.brewery}</p>
		</div>
		<PriceList prices={data.barObj.prices} />
	</Card.Content>
</Card.Root>
