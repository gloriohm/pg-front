<script>
	import { formatNorwegianDate } from '$lib/utils/dateTime.js';
	let { bar } = $props();
</script>

<div>
	<div class="flex gap-4">
		<p class="flex gap-1">
			<span class="font-semibold">Pris: </span>
			<span>{bar.price},- </span>
		</p>
		<p class="flex gap-1">
			<span class="font-semibold">Størrelse: </span>
			<span>{bar.size}l</span>
		</p>
	</div>
	<div class="flex gap-4">
		<p class="flex gap-1">
			<span class="font-semibold">Bryggeri: </span>
			<span>{bar.brewery} </span>
		</p>
	</div>
	<div class="flex gap-4">
		<p class="flex gap-1">
			<span class="font-semibold">Pris sjekket: </span>
			<span>{formatNorwegianDate(bar.price_checked)}</span>
		</p>
	</div>
	<div class="flex gap-4">
		<p class="flex gap-1">
			<span class="font-semibold">Adresse: </span>
			<span>{bar.address}</span>
		</p>
	</div>
	<div class="flex gap-4">
		<p class="flex gap-1">
			<span class="rounded bg-emerald-300 px-1">{bar.valid_to}</span>
		</p>
	</div>
</div>
