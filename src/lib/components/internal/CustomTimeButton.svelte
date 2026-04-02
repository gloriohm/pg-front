<script lang="js">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';
	import { days } from '$lib/utils/constants.js';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const time = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
	const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });

	let dialog = $state(false);
	let customDay = $state(day.toLowerCase());
	let customTime = $state(time);

	function closeDialog() {
		const url = new URL(window.location.href);
		const path = url.pathname;
		goto(resolve(path), { replaceState: true, keepfocus: true, noscroll: true });
		dialog = false;
	}

	function useCustomTime() {
		const url = new URL(window.location.href);
		const customTimeHyphen = customTime.replace(':', '-');
		url.searchParams.set('day', customDay);
		url.searchParams.set('time', customTimeHyphen);

		const path = url.pathname + url.search;
		goto(resolve(path), { replaceState: true, keepfocus: true, noscroll: true });
		dialog = false;
	}
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger type="button" class={buttonVariants({ variant: 'outline' })}>
		Velg tidspunkt
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Bekreft pris</Dialog.Title>
			<Dialog.Description>
				Vi lever ikke alltid i sanntid. Legg inn ukedag og klokkeslett under for å se hva pilsen
				koster på ønsket tidspunkt.
			</Dialog.Description>
		</Dialog.Header>
		<div class="mb-4 flex gap-2">
			<Label for="day">Dag</Label>
			<select name="day" class="max-w-64" bind:value={customDay}>
				{#each days as day (day.id)}
					<option value={day.value}>{day.full}</option>
				{/each}
			</select>
		</div>
		<div class="mb-4 flex gap-2">
			<Label for="time">Klokkeslett</Label>
			<Input
				bind:value={customTime}
				id="time"
				name="time"
				type="time"
				min="00:00"
				max="23:59"
				step="60"
				required
			/>
		</div>
		<Dialog.Footer class="flex-col gap-2">
			<Button onclick={closeDialog} variant="outline">Tilbakestill</Button>
			<Button onclick={useCustomTime}>Bruk valg</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
