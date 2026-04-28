<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import PriceList from '@/components/internal/PriceList.svelte';
	import NewPrice from '@/components/internal/NewPrice.svelte';
	import EnhancedForm from '@/components/internal/EnhancedForm.svelte';
	import DeactivateBar from '@/components/internal/DeleteBar.svelte';
	import PriceSchedule from '@/components/internal/PriceSchedule.svelte';
	import UpdateBrewery from '@/components/internal/UpdateBrewery.svelte';

	let { data, form } = $props();

	const formOpts = {
		method: 'POST',
		id: 'update-bar',
		action: '?/updateBar',
		successMsg: 'Bar oppdatert!',
		failureMsg: 'Noe gikk galt...'
	};

	let barFields = $state({ ...data.barPrice });

	$effect(() => {
		if (form?.success) {
			barFields = { ...data.barPrice };
		}
	});
</script>

<div class="mt-8 flex items-center justify-center">
	<Card.Root class="-my-4 w-full max-w-sm">
		<Card.Header>
			<Card.Title>Oppdater bar</Card.Title>
			<Card.Description>{data.barPrice.name}</Card.Description>
			<Card.Action>
				<DeactivateBar id={data.barPrice.id} />
			</Card.Action>
		</Card.Header>
		<Card.Content>
			{#if barFields}
				<EnhancedForm opts={formOpts}>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label for="name">Navn</Label>
							<Input id="name" name="name" type="text" bind:value={barFields.name} required />
						</div>

						<div class="grid gap-2">
							<Label for="address">Adresse</Label>
							<Input
								id="address"
								name="address"
								type="text"
								bind:value={barFields.address}
								required
							/>
						</div>

						<div class="grid gap-2">
							<Label>Bryggeri:</Label>
							<div class="flex items-center gap-2">
								<p>{data.barPrice.brewery}</p>
								<UpdateBrewery
									drinkID={data.barPrice.drink_id}
									currentBrew={data.barPrice.brewery_id}
									breweries={data.breweries}
								/>
							</div>
						</div>

						<PriceList prices={data.barPrice.prices} size={data.barPrice.size} />
						<div class="grid gap-2">
							<NewPrice id={data.barPrice.drink_id} />
							<PriceSchedule id={data.barPrice.drink_id} />
						</div>

						<div class="grid gap-2">
							<Label for="orgnummer">Orgnummer</Label>
							<Input
								id="orgnummer"
								name="orgnummer"
								type="text"
								maxlength="9"
								minlength="9"
								bind:value={barFields.orgnummer}
								required
							/>
						</div>
					</div>
					<Input hidden name="id" value={data.barPrice.id} />
				</EnhancedForm>
			{/if}
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button
				type="reset"
				variant="outline"
				onclick={() => (barFields = data.barPrice)}
				class="w-full">Tilbakestill</Button
			>
			<Button type="submit" class="w-full" form={formOpts.id}>Oppdater</Button>
		</Card.Footer>
	</Card.Root>
</div>
