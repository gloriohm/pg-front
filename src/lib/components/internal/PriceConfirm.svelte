<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Check } from '@lucide/svelte';
	import EnhancedForm from './EnhancedForm.svelte';
	import Input from '../ui/input/input.svelte';
	let { id } = $props();
	let dialog = $state(false);

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'confirm-price',
		action: '/bar?/confirmPrice',
		successMsg: 'Takk for at du bidrar 🍻',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'secondary', size: 'icon' })}
		><Check /></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Bekreft pris</Dialog.Title>
			<Dialog.Description>
				Stemmer prisen fortsatt? Ved å bekrefte prisen, hjelper du oss med å holde dataen fresh.
			</Dialog.Description>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<Input hidden name="price_id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id}>Oppdater</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
