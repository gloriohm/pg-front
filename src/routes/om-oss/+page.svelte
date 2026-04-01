<script lang="ts">
	import MailToPilsguiden from '@/components/internal/MailToPilsguiden.svelte';
	import { resolve } from '$app/paths';
	import { H2, H3, Link } from '@/styles/styles.js';

	let { data } = $props();
</script>

<article class="m-auto max-w-xl">
	<section>
		<h2 class={H2}>Om Pilsguiden</h2>
		<div class="flex flex-col gap-1">
			<p class="max-w-prose">
				Pilsguiden ble etablert i september 2023 med et mål om å være den mest komplette og
				oppdaterte siden for ølpriser i Norge. Akkurat nå har vi priser for {data.about.total_bars} serveringssteder
				på siden fordelt over hele Norge.
			</p>
			<p class="max-w-prose">
				Ølprisen kan variere voldsomt i Norge. Blant serveringsstedene på siden, koster den
				billigste ølen {data.about.min_price}kr og den dyreste {data.about.max_price}kr, noe som
				utgjør en forskjell på {data.about.price_dif}kr.* Pilsguiden ble til for å lose deg i
				retning et serveringssted som passer din økonomi og for å skape litt forutsigbarhet når du
				ber om en pils.
			</p>
			<p class="max-w-prose">* Alle oppgitte priser er NOK per halvliter øl.</p>
		</div>
	</section>
	<section>
		<h3 class={H3}>En pils, takk!</h3>
		<div class="flex flex-col gap-1">
			<p class="max-w-prose">
				Prisene på Pilsguiden er samlet om et enkelt spørsmål: hva betaler du når du ber om en pils.
				Fordi vi hater shrinkflation og elsker halvliteren, er prisgrunnlaget på hele nettsiden i
				halvliterspris.
			</p>
			<p class="max-w-prose">
				Vi ser det også er et ønske om innsikt i resten av menyen til barer. Dette aspirerer vi ikke
				til å vise på Pilsguiden, men vi oppfordrer andre til å lage tjenester som tar et mer
				helhetlig blikk på serveringssteder. Vi tilbyr i dag en API-tjeneste du kan lese mer om <a
					href={resolve('/om-oss/api')}
					class={Link}>her</a
				>.
			</p>
			<p class="max-w-prose">
				Vi er også opptatt av at det er en pris alle kan få. Vi samler derfor ikke inn student-
				eller vennepriser.
			</p>
		</div>
	</section>
	<section>
		<h3 class="my-2 text-xl font-bold">Datakilde og -kvalitet</h3>
		<div class="flex max-w-prose flex-col gap-2">
			<p>
				Prisdata er samlet i dugnadsånd. Vi foretar i dag både maskinell og menneskelig kontroll av
				prisen, men vi er avhengige av at brukerne bidrar til å rapportere feil. Først og fremst
				gjennom å bekrefte prisene som stemmer, og sende inn oppdatert pris der det ikke stemmer.
				For mer kompliserte feil, setter vi pris på at vi kontakter på <MailToPilsguiden />.
			</p>
		</div>
	</section>
	<section>
		<h3 class="my-2 text-xl font-bold">Uavhengighetserklæring</h3>
		<div class="flex flex-col gap-2">
			<p class="max-w-prose">
				Pilsguiden og API-et i bakkant er laget og driftet av <a
					href="https://www.linkedin.com/in/tonynorgaard/"
					class="font-semibold underline">Tony Norgaard</a
				>
				og
				<a href="https://www.linkedin.com/in/garu/" class="font-semibold underline">Gard Ruud</a>.
				Vi er ikke affiliert med serveringsbransjen og forplikter oss til å forbli uavhengige så
				lenge vi forvalter Pilsguiden og Pilsguiden-API som en del av Pilz-gruppens produktpakke.
			</p>
		</div>
	</section>
</article>
