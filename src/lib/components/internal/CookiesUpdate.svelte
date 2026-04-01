<script>
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { clearOptionalCookies } from '$lib/utils/cookies';
	let dialog = $state(false);

	function clearCookiesWrapper() {
		clearOptionalCookies();
		dialog = false;
	}
</script>

<Dialog.Root bind:open={dialog}>
	<Dialog.Trigger class="font-light hover:cursor-pointer">Oppdater samtykke</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-106.25">
		<Dialog.Header>
			<Dialog.Title>Trekke tilbake samtykke?</Dialog.Title>
			<Dialog.Description>
				Ved å trykke "Slett" fjernes informasjonskapselen som forteller nettsiden om du har
				samtykket eller takket nei til cookies. Om du tidligere har samtykket til cookies,
				oppdaterer du samtidig til "kun nødvendige."
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button onclick={clearCookiesWrapper}>Slett</Button>
			<Button onclick={() => (dialog = false)}>Tilbake</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
