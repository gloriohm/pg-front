<script lang="js">
	import * as Table from '$lib/components/ui/table/index.js';
</script>

<article class="m-auto mx-1 flex max-w-xl flex-col gap-2">
	<div>
		<h2 class="mb-2 text-2xl font-bold">Cookies-erklæring for Pilsguiden.no</h2>
		<div class="flex flex-col gap-2">
			<p class="max-w-prose">
				Denne erklæringen gir deg en oversikt over bruken av informasjonskapsler (cookies) på
				Pilsguiden.no.
			</p>
			<p class="max-w-prose">
				Informasjonskapsler er små tekstfiler som lagres på enheten din når du besøker en nettside.
				Vi bruker cookies for å sikre at nettsiden fungerer som den skal, og for å analysere
				trafikken vår med hjelp av tredjepartsverktøy som Google Analytics og Google Tag Manager.
			</p>
			<p class="max-w-prose">
				Du kan når som helst trekke tilbake ditt samtykke eller justere innstillingene for cookies.
				Se mer informasjon om hvordan vi bruker cookies nedenfor.
			</p>
		</div>
	</div>
	<hr class="border border-violet-200" />
	<div>
		<h3 class="mb-2 text-xl font-bold">Formål med cookies på Pilsguiden.no</h3>
		<div>
			<p>Vi bruker cookies til følgende:</p>
			<ol>
				<li>
					<span class="font-bold">1. Nødvendige cookies:</span>
					<span>For at nettsiden skal fungere teknisk, inkludert sikkerhet og lastbalansering.</span
					>
				</li>
				<li>
					<span class="font-bold">2. Analysecookies:</span>
					<span
						>For å forstå hvordan besøkende bruker nettsiden og forbedre opplevelsen. Disse settes
						kun med ditt samtykke.</span
					>
				</li>
			</ol>
		</div>
	</div>
	<hr class="border border-violet-200" />
	<section>
		<Table.Root>
			<Table.Caption>Oversikt over cookies</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head>Navn</Table.Head>
					<Table.Head>Formål</Table.Head>
					<Table.Head>Valgfrihet</Table.Head>
					<Table.Head>Lagringstid</Table.Head>
					<Table.Head>Mottaker</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>cookie_consent</Table.Cell>
					<Table.Cell>Administrasjon av samtykke</Table.Cell>
					<Table.Cell>Nødvendig</Table.Cell>
					<Table.Cell>1 år</Table.Cell>
					<Table.Cell>Pilsguiden.no</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>session_id</Table.Cell>
					<Table.Cell>Funksjonalitet</Table.Cell>
					<Table.Cell>Nødvendig</Table.Cell>
					<Table.Cell>30 min</Table.Cell>
					<Table.Cell>Pilsguiden.no</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>_ga</Table.Cell>
					<Table.Cell>Analyse med Google Analytics</Table.Cell>
					<Table.Cell>Valgfri</Table.Cell>
					<Table.Cell>14 måneder</Table.Cell>
					<Table.Cell>Google</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
		<p>
			<span class="font-bold">Merk:</span>
			<span>Ingen valgfri cookie settes uten ditt samtykke</span>
		</p>
	</section>
	<hr class="border border-violet-200" />
	<div>
		<h3 class="mb-2 text-xl font-bold">Detaljert informasjon om cookies</h3>
		<h4 class="text-lg font-bold">1. Nødvendige cookies</h4>
		<div>
			<p>Disse er nødvendige for at Pilsguiden.no skal fungere:</p>
			<ul>
				<li class="flex gap-1">
					<span class="font-bold">•</span>
					<span>
						<span class="font-bold"> cookie_consent: </span>
						<span>
							Lagrer informasjon om samtykkevalg for cookies. Den lagres til den trekkes tilbake for
							å unngå gjentatte forespørsler.
						</span>
					</span>
				</li>
			</ul>
		</div>
		<h4 class="text-lg font-bold">2. Analysecookies</h4>
		<div>
			<p>Hvis du samtykker, vil vi bruke følgende cookies:</p>
			<ul>
				<li class="flex gap-1">
					<span class="font-bold">•</span>
					<span>
						<span class="font-bold"> Google Analytics (_ga): </span>
						<span>
							Samler data om hvordan brukere navigerer på nettsiden, som sidevisninger og klikk.
						</span>
					</span>
				</li>
			</ul>
		</div>
	</div>
	<hr class="border border-violet-200" />
	<div>
		<h3 class="mb-2 text-xl font-bold">Administrasjon av cookies</h3>
		<div class="flex flex-col gap-1">
			<p class="max-w-prose">
				Du kan administrere ditt samtykke ved å klikke på "Oppdater samtykke" nederst på nettsiden.
			</p>
			<p class="max-w-prose">
				I tillegg kan du blokkere eller slette cookies gjennom innstillingene i nettleseren din. For
				mer informasjon om hvordan dette gjøres, besøk
				<a class="underline" href="https://nettvett.no">Nettvett.no</a>.
			</p>
		</div>
	</div>
	<hr class="border border-violet-200" />
	<div>
		<h3 class="text-xl font-bold">Kontakt oss</h3>
		<p class="max-w-prose">
			Har du spørsmål om vår bruk av cookies? Ta gjerne kontakt på
			<a class="underline" href="mailto:pilsguiden@hotmail.com">pilsguiden@hotmail.com</a>
		</p>
	</div>
</article>
