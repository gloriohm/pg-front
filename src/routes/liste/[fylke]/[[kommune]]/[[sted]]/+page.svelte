<script lang="js">
	import { page } from '$app/stores';
	import BarList from '@/components/internal/BarList.svelte';
	import Breadcrumb from '@/components/internal/Breadcrumb.svelte';
	import CustomTimeButton from '@/components/internal/CustomTimeButton.svelte';
	import NavGroup from '@/components/internal/NavGroup.svelte';
	import { H2 } from '@/styles/styles.js';
	let { data } = $props();

	let url = $derived($page.url.search);

	const title = $derived(
		$page.params.sted
			? data.list.breadcrumb[2]?.name
			: $page.params.kommune
				? data.list.breadcrumb[1]?.name
				: data.list.breadcrumb[0].name
	);
</script>

<article class="m-auto max-w-xl">
	<Breadcrumb links={data.list.breadcrumb} opts={url} />
	<div class="mb-2">
		<NavGroup links={data.list.links} opts={url} />
	</div>
	<h2 class={H2}>Ølpriser – {title}</h2>
	<div class="mb-2">
		<CustomTimeButton />
	</div>
	<BarList bars={data.list.bars} />
</article>
