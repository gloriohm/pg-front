<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import EditPriceTimeForm from './EditPriceTimeForm.svelte';
	import { ClipboardClock } from '@lucide/svelte';
	let { id } = $props();
	let dialog = $state(false);

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'update-time',
		action: '?/updatePriceTime',
		successMsg: 'Oppdatert!',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'default', size: 'icon' })}
		><ClipboardClock /></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Endre tidspunkt</Dialog.Title>
			<Dialog.Description
				>Ny pris er alltid tidsbestemt pris. En pris gjelder én eller flere business-dager. En
				business-dag var fra kl 09 til 03 dagen etter. Dersom prisen begynner eller slutter etter
				midnatt, er det likevel dagen da baren åpner som skal registreres.</Dialog.Description
			>
		</Dialog.Header>
		<EditPriceTimeForm {id} {formOpts} />
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id}>Oppdater</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
