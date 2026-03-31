<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Label from '../ui/label/label.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { formatNorwegianDate, formatTime24Oslo } from '$lib/utils/dateTime.js';
	let { price } = $props();
	let dialog = $state(false);
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button">
		{#if !price.default}⏰{/if}{price.price},-
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Prisinformasjon</Dialog.Title>
			<Dialog.Description>Når du får pils til denne prisen</Dialog.Description>
		</Dialog.Header>
		{#if price.price !== price.pint}
			<div>
				<p>{price.price},- for {price.size}l tilsvarer {price.pint},- for en halvliter</p>
			</div>
		{/if}
		{#if price.time?.days && price.time?.span}
			<div class="flex justify-between">
				<div class="grid gap-2">
					<Label>Dager</Label>
					<p>{price.time.days}</p>
				</div>
				<div class="grid gap-2">
					<Label>Tid</Label>
					<p>{price.time.span}</p>
				</div>
			</div>
			<div class="flex justify-between">
				<div class="grid gap-2">
					<Label>Sist endret</Label>
					<p>{formatNorwegianDate(price.price_updated)}</p>
				</div>
				<div class="grid gap-2">
					<Label>Sist bekreftet</Label>
					<p>{formatNorwegianDate(price.price_checked)}</p>
				</div>
			</div>
		{/if}
		<Dialog.Footer>
			<Button onclick={() => (dialog = false)}>Tilbake</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
