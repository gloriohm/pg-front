<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import EnhancedForm from './EnhancedForm.svelte';
	import Input from '../ui/input/input.svelte';
	let { id } = $props();
	let dialog = $state(false);

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'recreate-schedule',
		action: '?/recreateSchedule',
		successMsg: 'Pris-skjema regenerert 🍻',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'destructive' })}
		>Regenerer pris-skjema</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Regenerer pris-skjema</Dialog.Title>
			<Dialog.Description>
				Bruk denne dersom noe gikk galt under generering av skjema etter å ha opprettet bar,
				opprettet ny tidsbestemt pris, eller endret tidspunkt / pristype for tidsbestemt pris.
			</Dialog.Description>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<Input hidden name="drink_id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id}>Regenerer</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
