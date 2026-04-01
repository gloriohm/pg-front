<script>
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { formatNorwegianDate } from '$lib/utils/dateTime.js';
	import EnhancedForm from '@/components/internal/EnhancedForm.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { H2 } from '@/styles/styles.js';

	let { data } = $props();

	const formOpts = {
		method: 'POST',
		id: 'price-control',
		successMsg: 'Pris håndtert!',
		failureMsg: 'Noe gikk galt...'
	};
</script>

<section class="mb-4 flex flex-col gap-1">
	<h2 class={H2}>Priskontroll</h2>
	{#each data.control as p (p.id)}
		<Dialog.Root>
			<Dialog.Trigger>
				<div class="w-full rounded-lg bg-violet-200 shadow-lg">
					<div
						class="flex justify-between rounded-lg border-b-2 border-violet-300 px-4 py-2 font-semibold"
					>
						<span class="flex min-w-0 grow items-center text-left">
							<span class="wrap-break-word">{p.bar_name}</span>
						</span>
						<p class="flex min-w-20 whitespace-nowrap">
							{p.current_price}->{p.price}
						</p>
					</div>
				</div>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>{p.bar_name}</Dialog.Title>
				</Dialog.Header>
				<EnhancedForm opts={formOpts}>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Differanse:</span>
							<span>{p.price_dif},-</span>
						</p>
					</div>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Sist oppdatert: </span>
							<span>{formatNorwegianDate(p.price_updated)}</span>
						</p>
					</div>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Pris sjekket: </span>
							<span>{formatNorwegianDate(p.price_checked)}</span>
						</p>
					</div>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Pris sendt inn: </span>
							<span>{formatNorwegianDate(p.price_reported)}</span>
						</p>
					</div>
					<Input hidden name="id" value={p.id} />
				</EnhancedForm>
				<Dialog.Footer>
					<Button
						type="submit"
						name="action"
						value="reject"
						variant="destructive"
						form={formOpts.id}>Avvis</Button
					>
					<Button type="submit" name="action" value="accept" form={formOpts.id}>Aksepter</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
</section>
