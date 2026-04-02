<script>
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	let { links, opts } = $props();
</script>

<nav class="mb-4 ml-1">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Hjem</Breadcrumb.Link>
			</Breadcrumb.Item>
			{#each links as link (link.id)}
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Link href={`/liste${link.slug}${opts}`}>{link.name}</Breadcrumb.Link>
				</Breadcrumb.Item>
			{/each}
		</Breadcrumb.List>
	</Breadcrumb.Root>
</nav>
