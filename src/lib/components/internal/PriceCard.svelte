<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import PriceUpdate from './PriceUpdate.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	let { price } = $props();
	let dialog = $state(false);
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'default' })}>...</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Prisinfo</Dialog.Title>
		</Dialog.Header>
		<div class="mb-5 flex items-start justify-between gap-4 border-b pb-4">
			<div>
				<p class="text-sm text-muted-foreground">Pris</p>
				<div class="flex items-end gap-3">
					<p class="text-3xl font-semibold tracking-tight">{price.price}</p>
					<p class="pb-1 text-sm text-muted-foreground">{price.size} l</p>
				</div>
			</div>

			<div class="text-right">
				<p class="text-sm text-muted-foreground">Halvliterpris</p>
				<p class="text-lg font-medium">{price.pint}</p>
			</div>
		</div>

		<dl class="grid gap-x-8 gap-y-4 sm:grid-cols-2">
			<div>
				<dt class="text-sm text-muted-foreground">Standardpris</dt>
				<dd class="mt-1 font-medium">{price.default ? 'Ja' : 'Nei'}</dd>
			</div>

			<div>
				<dt class="text-sm text-muted-foreground">Sist oppdatert</dt>
				<dd class="mt-1 font-medium">{price.price_updated}</dd>
			</div>

			<div>
				<dt class="text-sm text-muted-foreground">Sist bekreftet</dt>
				<dd class="mt-1 font-medium">{price.price_checked}</dd>
			</div>

			{#if !price.default}
				<div class="sm:col-span-2">
					<dt class="text-sm text-muted-foreground">Tilgjengelig</dt>
					<dd class="mt-1 space-y-1">
						<p class="font-medium">{price.time.days}</p>
						<p class="text-sm text-muted-foreground">{price.time.span}</p>
					</dd>
				</div>
			{/if}
		</dl>
		<Dialog.Footer>
			<PriceUpdate id={price.id} />
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
