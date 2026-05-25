<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import BarCard from './BarCard.svelte';
	let { bars } = $props();
</script>

<section class="mb-4 flex flex-col gap-1">
	{#each bars as b (b.id)}
		<Dialog.Root>
			<Dialog.Trigger>
				<div class="w-full rounded-lg bg-violet-200 shadow-lg">
					<div
						class="flex justify-between rounded-lg border-b-2 border-violet-300 px-4 py-2 font-semibold"
					>
						<span class="flex min-w-0 grow items-center text-left">
							<span class="wrap-break-word">{b.name}</span>
						</span>
						<span class="min-w-0 whitespace-nowrap">
							{#if !b.default_price}⏰{/if}
							{#if b.price !== b.pint}*{/if}
							{b.pint},-
						</span>
					</div>
				</div>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>{b.name}</Dialog.Title>
				</Dialog.Header>
				<BarCard bar={b} />
				<Dialog.Footer>
					<Button href={`/bar/${b.slug}`}>Mer detaljer</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
</section>
