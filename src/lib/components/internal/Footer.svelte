<script>
    import vipps from '$lib/assets/vipps_pilz.jpeg?enhanced';
    import { Button } from "$lib/components/ui/button/index.js";
	import CookiesUpdate from './CookiesUpdate.svelte';
</script>

<footer>
    <div class="flex flex-col items-center my-12 max-sm:px-4">
        <div class="flex flex-col items-center mb-12">
            <enhanced:img
                src={vipps}
                alt="Vipps-donasjon QR-kode"
                class="w-36 h-36"
            />
            <h4 class="font-semibold text-md">Støtte Pilsguiden?</h4>
            <p class="text-sm">Pengene går til utvikling og drift av siden.</p>
            <p class="text-md font-semibold">Vipps: <span class="text-orange-600">#965991</span></p>
        </div>
        <nav class="font-bold flex gap-4 mb-6">
            <a href="/om-oss">Om oss</a>
            <a href="/kontakt">Kontakt</a>
            <a href="/donasjon">Donasjon</a>
            <a href="/media">Media</a>
        </nav>
        <div class="flex gap-4">
            <a href="/cookies" class="font-light">Personvernserklæring</a>
            <CookiesUpdate />
        </div>
    </div>
    <hr />
    <div class="my-2">
        <div class="m-auto max-w-xl">
            <div class="flex gap-4 text-sm font-light justify-between mx-2">
                <p>© Pilz-gruppen</p>
                <p>Et Pilz-gruppen konsept</p>
            </div>
        </div>
    </div>
</footer>