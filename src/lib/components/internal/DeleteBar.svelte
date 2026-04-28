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
		id: 'delete-bar',
		action: '?/deleteBar',
		successMsg: 'Auf wiedersehen 💀',
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
			<Dialog.Title>Slett bar</Dialog.Title>
			<Dialog.Description>
				Noen ganger går det ålreit, andre ganger går det under... Jekk en pils for et fallent
				vannhøl mens vi venter på at en Los Tacos skal gjenoppstå fra asken. Obs: Denne handlingen
				kan ikke angres; den er endelig som døden.
			</Dialog.Description>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<Input hidden name="bar_id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" variant="destructive" form={formOpts.id}>SLETT</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
