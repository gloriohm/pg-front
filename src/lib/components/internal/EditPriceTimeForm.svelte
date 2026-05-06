<script>
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { days } from '$lib/utils/constants.js';
	import EnhancedForm from './EnhancedForm.svelte';
	let { id, formOpts } = $props();
	let selectedPriceType = $state('whole_day');
	let disabled = $derived(selectedPriceType == 'whole_day');
</script>

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
	<Input hidden name="target_id" value={id} />
</EnhancedForm>
