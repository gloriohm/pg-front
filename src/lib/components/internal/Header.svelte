<script>
	import Search from '@/components/internal/Search.svelte';
	import { resolve } from '$app/paths';
</script>

<header class="mb-4 bg-amber-200 py-2 font-semibold max-sm:px-4">
	<nav class="m-auto flex max-w-xl justify-between">
		<div class="flex items-baseline gap-2 pr-4">
			<a
				href={resolve('/')}
				class="rounded-md px-1 py-0.5 text-2xl font-extrabold active:bg-violet-400 md:hover:bg-violet-300"
			>
				Pilsguiden
			</a>
		</div>
		<Search />
	</nav>
</header>
