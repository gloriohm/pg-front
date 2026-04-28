<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Trash2 } from '@lucide/svelte';
	import EnhancedForm from './EnhancedForm.svelte';
	import Input from '../ui/input/input.svelte';
	let { id } = $props();
	let dialog = $state(false);

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'delete-price',
		action: '?/deletePrice',
		successMsg: 'Pris slettet 💀',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'destructive', size: 'icon' })}
		><Trash2 /></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Slett pris</Dialog.Title>
			<Dialog.Description>
				Tidsbestemt pris kan slettes. Obs: dette sletter også prishistorien til prisen. Foretrekk å
				endre tidspunkt dersom det bare er dager/tidspunkt som har endret seg.
			</Dialog.Description>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<Input hidden name="price_id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" variant="destructive" form={formOpts.id}>SLETT</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
