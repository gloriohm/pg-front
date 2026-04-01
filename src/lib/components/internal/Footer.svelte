<script>
	import vipps from '$lib/assets/vipps_pilz.jpeg?enhanced';
	import CookiesUpdate from './CookiesUpdate.svelte';
	import { resolve } from '$app/paths';
</script>

<footer>
	<div class="my-12 flex flex-col items-center max-sm:px-4">
		<div class="mb-12 flex flex-col items-center">
			<enhanced:img src={vipps} alt="Vipps-donasjon QR-kode" class="h-36 w-36" />
			<h4 class="text-md font-semibold">Støtte Pilsguiden?</h4>
			<p class="text-sm">Pengene går til utvikling og drift av siden.</p>
			<p class="text-md font-semibold">Vipps: <span class="text-orange-600">#965991</span></p>
		</div>
		<nav class="mb-6 flex gap-4 font-bold">
			<a href={resolve('/om-oss')}>Om oss</a>
			<a href={resolve('/kontakt')}>Kontakt</a>
			<a href={resolve('/donasjon')}>Donasjon</a>
			<a href={resolve('/media')}>Media</a>
		</nav>
		<div class="flex gap-4">
			<a href={resolve('/cookies')} class="font-light">Personvernserklæring</a>
			<CookiesUpdate />
		</div>
	</div>
	<hr />
	<div class="my-2">
		<div class="m-auto max-w-xl">
			<div class="mx-2 flex justify-between gap-4 text-sm font-light">
				<p>© Pilz-gruppen</p>
				<p>Et Pilz-gruppen konsept</p>
			</div>
		</div>
	</div>
</footer>
