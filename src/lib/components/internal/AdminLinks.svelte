<script>
	import { Button } from '$lib/components/ui/button/index.js';

	const root = '/admin';
	const links = [
		{ url: root, name: 'Dashboard' },
		{ url: root + '/create-bar', name: 'Ny bar' },
		{ url: root + '/create-brewery', name: 'Nytt bryggeri' }
	];
</script>

<nav class="space-y-1 space-x-2">
	<ul class="flex gap-2 font-semibold">
		{#each links as { url, name }}
			<li>
				<Button href={url} variant="outline" size="sm">{name}</Button>
			</li>
		{/each}
	</ul>
</nav>
