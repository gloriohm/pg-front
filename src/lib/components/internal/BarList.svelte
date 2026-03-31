<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { formatNorwegianDate, formatTime24Oslo } from '$lib/utils/dateTime.js';
	let { bars } = $props();
</script>

<section class="mb-4 flex flex-col gap-1">
	{#each bars as b (b.id)}
		<Dialog.Root>
			<Dialog.Trigger>
				<div class="w-full rounded-lg bg-violet-200 shadow-lg">
					<div
						class="flex justify-between rounded-lg border-b-2 border-violet-300 px-4 py-2 font-semibold"
					>
						<span class="flex min-w-0 grow items-center text-left">
							<span class="wrap-break-word">{b.name}</span>
						</span>
						<span class="min-w-0 whitespace-nowrap">
							{#if b.until_time}⏰{/if}
							{#if b.current_price !== b.current_pint}*{/if}
							{b.current_pint},-
						</span>
					</div>
				</div>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>{b.name}</Dialog.Title>
				</Dialog.Header>
				<div>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Pris: </span>
							<span>{b.current_price},- </span>
						</p>
						<p class="flex gap-1">
							<span class="font-semibold">Størrelse: </span>
							<span>{b.current_size}l</span>
						</p>
					</div>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Bryggeri: </span>
							<span>{b.brewery} </span>
						</p>
					</div>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Pris sjekket: </span>
							<span>{formatNorwegianDate(b.price_checked)}</span>
						</p>
					</div>
					<div class="flex gap-4">
						<p class="flex gap-1">
							<span class="font-semibold">Adresse: </span>
							<span>{b.address}</span>
						</p>
					</div>
					{#if b.until_time}
						<div class="flex gap-4">
							<p class="flex gap-1">
								<span class="font-semibold">Pris gyldig til: </span>
								<span class="rounded bg-emerald-300 px-1">kl. {formatTime24Oslo(b.until_time)}</span
								>
							</p>
						</div>
					{/if}
				</div>
				<Dialog.Footer>
					<Button href={`/bar/${b.slug}`}>Mer detaljer</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	{/each}
</section>
