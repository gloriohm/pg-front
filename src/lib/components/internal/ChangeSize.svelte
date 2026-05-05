<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import EnhancedForm from './EnhancedForm.svelte';
	let { id, size } = $props();
	let dialog = $state(false);

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'change-size',
		action: '?/changeSize',
		successMsg: 'Størrelse oppdatert!',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'default' })}
		>Endre størrelse</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Endre serveringsstørrelse</Dialog.Title>
			<Dialog.Description>
				OBS: Dette er en destruktiv handling. Dagens pris og eventuelle tidsbestemte priser vil bli
				slettet.
			</Dialog.Description>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<div class="mb-4 flex gap-2">
				<div class="grid gap-2">
					<Label for="size">Ny størrelse</Label>
					<Input
						id="size"
						name="size"
						type="number"
						step="0.01"
						min="0.1"
						placeholder={`I dag: ${size}`}
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="price">Ny pris</Label>
					<Input
						id="price"
						name="price"
						type="number"
						min="20"
						placeholder="69"
						class="max-w-xs"
						required
					/>
				</div>
			</div>
			<Input hidden name="drink_id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id} variant="destructive">Oppdater</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
