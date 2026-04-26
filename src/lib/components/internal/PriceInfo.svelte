<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Label from '../ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { formatNorwegianDate } from '$lib/utils/dateTime.js';
	let { price } = $props();
	let dialog = $state(false);
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button">
		{#if !price.default}⏰{/if}{price.price},-
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Prisinformasjon</Dialog.Title>
			<Dialog.Description>Når du får pils til denne prisen</Dialog.Description>
		</Dialog.Header>
		{#if price.price !== price.pint}
			<div>
				<p>{price.price},- for {price.size}l tilsvarer {price.pint},- for en halvliter</p>
			</div>
		{/if}
		<div class="flex justify-between">
			<div class="grid gap-2">
				<Label>Gyldighet</Label>
				<p>{price.valid}</p>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="grid gap-2">
				<Label>Sist bekreftet</Label>
				<p>{formatNorwegianDate(price.price_checked)}</p>
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={() => (dialog = false)}>Tilbake</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
