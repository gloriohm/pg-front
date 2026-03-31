<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { X } from '@lucide/svelte';
	import EnhancedForm from './EnhancedForm.svelte';
	import Input from '../ui/input/input.svelte';
	let { id } = $props();
	let dialog = $state(false);

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'deactivate-bar',
		action: '?/deactivateBar',
		successMsg: 'Auf wiedersehen 💀',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'destructive', size: 'icon' })}
		><X /></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Deaktiver bar</Dialog.Title>
			<Dialog.Description>
				Deaktiverte barer er gjemt fra søkeresultater, men lever fortsatt videre i minnet.
			</Dialog.Description>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<Input hidden name="id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" variant="destructive" form={formOpts.id}>Deaktiver</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
