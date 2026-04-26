<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import EnhancedForm from '@/components/internal/EnhancedForm.svelte';
	let { data } = $props();

	const formOpts = {
		method: 'POST',
		id: 'create-bar',
		action: '',
		successMsg: 'Bar oppdatert!',
		failureMsg: 'Noe gikk galt...'
	};
</script>

<div class="mt-8 flex items-center justify-center">
	<Card.Root class="-my-4 w-full max-w-sm">
		<Card.Header>
			<Card.Title>Legg til ny bar</Card.Title>
		</Card.Header>
		<Card.Content>
			<EnhancedForm opts={formOpts}>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="name">Navn</Label>
						<Input id="name" name="name" type="text" placeholder="Café Sara" required />
					</div>

					<div class="grid gap-2">
						<Label for="address">Adresse</Label>
						<Input
							id="address"
							name="address"
							type="text"
							placeholder="Toftes gate 69, 0420 Oslo"
							required
						/>
					</div>

					<div class="flex gap-2">
						<div class="grid gap-2">
							<Label for="price">Pris</Label>
							<Input id="price" name="price" type="number" min="20" placeholder="69" required />
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
								required
							/>
						</div>
					</div>

					<div class="grid gap-2">
						<Label for="brewery">Bryggeri</Label>
						<select name="brewery" class="max-w-64">
							<option disabled selected>Velg bryggeri</option>
							<optgroup label="Mest brukt">
								{#each data.breweries as brew (brew.id)}
									{#if brew.popular}
										<option value={brew.id}>{brew.name}</option>
									{/if}
								{/each}
							</optgroup>
							<optgroup label="Resten">
								{#each data.breweries as brew (brew.id)}
									{#if !brew.popular}
										<option value={brew.id}>{brew.name}</option>
									{/if}
								{/each}
							</optgroup>
						</select>
					</div>

					<div class="grid gap-2">
						<Label for="orgnummer">Orgnummer</Label>
						<Input
							id="orgnummer"
							name="orgnummer"
							type="text"
							maxlength="9"
							minlength="9"
							placeholder="123456789"
							required
						/>
					</div>

					<div class="grid gap-2">
						<p class="font-medium">
							Søk opp bar eller nærmeste adresse <a
								href="https://nominatim.openstreetmap.org/ui/search.html"
								target="_blank"
								rel="noopener noreferrer"
								class="underline">her</a
							>
						</p>
						<Label for="osm_id">OSM-adresse</Label>
						<Input id="osm_id" name="osm_id" type="text" placeholder="N6292723037" required />
					</div>
				</div>
			</EnhancedForm>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full" form={formOpts.id}>Opprett bar</Button>
		</Card.Footer>
	</Card.Root>
</div>
