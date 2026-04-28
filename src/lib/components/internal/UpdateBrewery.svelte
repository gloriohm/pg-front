<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { SquarePen } from '@lucide/svelte';
	import EnhancedForm from './EnhancedForm.svelte';
	let { drinkID, currentBrew, breweries } = $props();
	let dialog = $state(false);

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'update-brewery',
		action: '?/updateBrewery',
		successMsg: 'Bryggeri oppdatert 🍻',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'default', size: 'icon' })}
		><SquarePen /></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Endre bryggeri</Dialog.Title>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<div class="grid gap-2">
				<Label for="brewery">Bryggeri</Label>
				<select id="brewery" name="brewery_id" class="max-w-64" bind:value={currentBrew}>
					{#each breweries as brew (brew.id)}
						<option value={brew.id}>{brew.name}</option>
					{/each}
				</select>
			</div>
			<Input hidden name="drink_id" value={drinkID} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id}>Oppdater</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
