<script>
	import { Button } from '$lib/components/ui/button/index.js';
	import { H3 } from '@/styles/styles';

	let { links } = $props();
	let showModal = $state(false);
	function toggleModal() {
		showModal = !showModal;
	}
</script>

<div class="m-auto">
	<h3 class={H3}>Velg sted:</h3>
	<nav class="space-y-1 space-x-2">
		{#each links as l (l.id)}
			<Button href={`/liste${l.slug}`} variant="link" size="sm" onclick={toggleModal}
				>{l.name}</Button
			>
		{/each}
	</nav>
</div>
