<script>
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import EnhancedForm from '@/components/internal/EnhancedForm.svelte';

	const formOpts = {
		method: 'POST',
		id: 'create-brewery',
		successMsg: 'Bryggeri opprettet!',
		failureMsg: 'Noe gikk galt...'
	};
</script>

<div class="grid gap-2">
	<EnhancedForm opts={formOpts}>
		<div class="grid gap-2">
			<Label for="brewery">Nytt bryggeri</Label>
			<Input id="brewery" name="brewery" type="text" required />
		</div>
	</EnhancedForm>
	<Button type="submit" form={formOpts.id}>Opprett</Button>
</div>
