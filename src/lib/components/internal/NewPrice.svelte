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
			<Dialog.Description>Lager en ny tidsbestemt pris.</Dialog.Description>
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
				<div class="grid gap-2">
					<Label for="size">Str.</Label>
					<Input
						id="size"
						name="size"
						type="number"
						step="0.01"
						min="0.1"
						placeholder="0.5"
						class="max-w-xs"
						required
					/>
				</div>
			</div>
			<div class="mb-4 flex gap-2">
				<div class="grid gap-2">
					<Label for="from_time">Fra kl.</Label>
					<Input
						id="from_time"
						name="from_time"
						type="time"
						min="09:00"
						max="23:59"
						step="60"
						class="max-w-xs"
						required
					/>
				</div>
				<div class="grid gap-2">
					<Label for="until_time">Fra kl.</Label>
					<Input
						id="until_time"
						name="until_time"
						type="time"
						step="60"
						class="max-w-xs"
						required
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
			<Input hidden name="bar_id" value={id} />
		</EnhancedForm>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbake</Button>
			<Button type="submit" form={formOpts.id}>Oppdater</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
