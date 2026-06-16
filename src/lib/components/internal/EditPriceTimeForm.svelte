<script>
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { days } from '$lib/utils/constants.js';
	import EnhancedForm from './EnhancedForm.svelte';
	let { id, formOpts, current } = $props();

	let formValues = $state({
		priceType: current?.price_type ?? 'whole_day',
		price: current?.price ?? '',
		days: current?.days ?? [],
		time: current?.time ?? '',
		endTime: current?.end_time ?? ''
	});
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
				value={formValues.price}
				required
			/>
		</div>
	</div>
	<div class="mb-4 flex gap-2">
		<div class="grid gap-2">
			<Label for="price_type">Pristype</Label>
			<select id="price_type" name="price_type" class="max-w-64" bind:value={formValues.priceType}>
				<option value="whole_day">Hele dagen</option>
				<option value="before_time">Før klokkeslett</option>
				<option value="after_time">Etter klokkeslett</option>
				<option value="interval">Mellom klokkeslett</option>
			</select>
		</div>
		<div class="mb-4 flex gap-2">
			{#if formValues.priceType !== 'whole_day'}
				<div class="grid gap-2">
					<Label for="time"
						>Klokkeslett{#if formValues.priceType === 'interval'}: fra{/if}</Label
					>
					<Input
						id="time"
						name="time"
						type="time"
						step="3600"
						class="max-w-xs"
						value={formValues.time}
						required={formValues.priceType !== 'whole_day'}
					/>
				</div>
			{/if}
			{#if formValues.priceType === 'interval'}
				<div class="grid gap-2">
					<Label for="end_time">Klokkeslett: til</Label>
					<Input
						id="end_time"
						name="end_time"
						type="time"
						step="3600"
						class="max-w-xs"
						value={formValues.endTime}
						required={formValues.priceType === 'interval'}
					/>
				</div>
			{/if}
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
							checked={formValues.days?.includes(day.value)}
						/>
					</Table.Cell>
				{/each}
			</Table.Row>
		</Table.Body>
	</Table.Root>
	<Input hidden name="target_id" value={id} />
</EnhancedForm>
