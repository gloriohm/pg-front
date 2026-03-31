<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { SquarePen } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import EnhancedForm from './EnhancedForm.svelte';
	let { id } = $props();
	let newPrice = $state();
	let dialog = $state(false);
	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'update-price',
		action: '/bar?/updatePrice',
		successMsg: 'Takk for at du bidrar 🍻',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'default', size: 'icon' })}
		><SquarePen /></Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Oppdater pris</Dialog.Title>
			<Dialog.Description>
				Har prisen endret seg? Send oss gjerne ny pris. Oppgi prisen for enheten, vi tar oss av
				konvertering til halvliterspris dersom baren har falt offer for shrinkflation. For å sikre
				datakvalitet, kontrollerer vi alle prisene som blir sendt inn. Det kan derfor ta litt tid
				før prisen blir oppdatert på nettsiden.
			</Dialog.Description>
		</Dialog.Header>
		<EnhancedForm class="grid gap-4 py-4" opts={formOpts}>
			<div class="grid grid-cols-4 items-center gap-4">
				<Label for="price" class="text-end">Ny pris:</Label>
				<Input id="price" name="price" type="number" class="col-span-3" bind:value={newPrice} />
				<Input hidden name="price_id" value={id} />
			</div>
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id}>Oppdater</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
