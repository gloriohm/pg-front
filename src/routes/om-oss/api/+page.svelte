<script lang="ts">
	import MailToPilsguiden from '@/components/internal/MailToPilsguiden.svelte';
	import { H2, H3 } from '@/styles/styles.js';
</script>

<article class="m-auto max-w-xl">
	<section>
		<h2 class={H2}>Pilsguiden-API</h2>
		<div class="flex flex-col gap-1">
			<p class="max-w-prose">
				Pilsguiden-API er et frittstående REST API som håndterer all datatrafikk mellom databasen og
				pilsguiden.no. Det er åpnet for at dette API-et kan brukes av andre som er interessert i å
				benytte seg av dataen Pilsguiden forvalter.
			</p>
			<p class="max-w-prose">
				For vilkår og priser, vennligst ta kontakt med <MailToPilsguiden />. Dette er uforpliktende,
				og så lenge du ikke lager en konkurrerende tjenete, mellom rimelig og gratis til å begynne
				med.
			</p>
			<p class="max-w-prose">
				Er du journalist med litt teknisk know-how og ønsker å benytte deg av prisdata til saker? Ta
				kontakt slik at vi kan kartlegge behov og tilrettelegge for en gratisversjon av APIet.
			</p>
			<p class="max-w-prose">
				Er du journalist med litt teknisk know-how og ønsker å benytte deg av prisdata til saker? Ta
				kontakt slik at vi kan kartlegge behov og tilrettelegge for en gratisversjon av APIet.
			</p>
		</div>
		<h3 class={H3}>Dokumentasjon</h3>
		<div class="flex flex-col gap-1">
			<p class="max-w-prose">
				For øyeblikket foreligger det ikke noe dokumentasjon på endepunkter og datatyper, men det
				jobbes med å utvikle dokumentasjon iht. OpenAPI-spesifikasjonen. Det vil bli lenket til
				denne her når den er klar. Inntil da, sender vi instruksjoner for bruk i plaintekst dersom
				en avtale om bruk av API blir inngått.
			</p>
		</div>
	</section>
</article>
