<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { days } from '$lib/utils/constants.js';
	import EnhancedForm from './EnhancedForm.svelte';
	let { id } = $props();
	let dialog = $state(false);

	let selectedPriceType = $state('whole_day');
	let disabled = $derived(selectedPriceType == 'whole_day');

	function closeDialog() {
		dialog = false;
	}

	const formOpts = {
		method: 'POST',
		id: 'new-price',
		action: '?/newPrice',
		successMsg: 'Pris registrert!',
		failureMsg: 'Noe gikk galt...',
		onSuccess: closeDialog
	};
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'default' })}
		>Legg til ny pris</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Legg til ny pris</Dialog.Title>
			<Dialog.Description
				>Ny pris er alltid tidsbestemt pris. En pris gjelder én eller flere business-dager. En
				business-dag var fra kl 09 til 03 dagen etter. Dersom prisen begynner eller slutter etter
				midnatt, er det likevel dagen da baren åpner som skal registreres.</Dialog.Description
			>
		</Dialog.Header>
		<EnhancedForm opts={formOpts}>
			<div class="mb-4 flex gap-2">
				<div class="grid gap-2">
					<Label for="price">Pris</Label>
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
			<div class="mb-4 flex gap-2">
				<div class="grid gap-2">
					<Label for="price_type">Pristype</Label>
					<select id="price_type" name="price_type" class="max-w-64" bind:value={selectedPriceType}>
						<option value="whole_day">Hele dagen</option>
						<option value="before_time">Før klokkeslett</option>
						<option value="after_time">Etter klokkeslett</option>
					</select>
				</div>
				<div class="grid gap-2">
					<Label for="time">Klokkeslett</Label>
					<Input
						id="time"
						name="time"
						type="time"
						step="3600"
						class="max-w-xs"
						{disabled}
						required={!disabled}
					/>
				</div>
			</div>
			<Table.Root class="mb-4 w-full table-fixed">
				<Table.Header>
					<Table.Row>
						{#each days as day (day.value)}
							<Table.Cell>{day.name}</Table.Cell>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					<Table.Row>
						{#each days as day (day.value)}
							<Table.Cell class="pointer-events-none">
								<input
									type="checkbox"
									name="days"
									class="pointer-events-auto"
									value={day.value}
									checked
								/>
							</Table.Cell>
						{/each}
					</Table.Row>
				</Table.Body>
			</Table.Root>
			<Input hidden name="drink_id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id}>Oppdater</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
