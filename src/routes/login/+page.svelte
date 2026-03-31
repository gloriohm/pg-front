<script>
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
</script>

<svelte:head>
	<title>Login</title>
    <meta
        name="description"
        content="Logg inn på Pilsguiden"
    />
    <link rel="canonical" href="https://www.pilsguiden.no/login" />
</svelte:head>

<div class="mt-8 flex items-center justify-center">
	<Card.Root class="-my-4 w-full max-w-sm">
		<Card.Header>
			<Card.Title>Logg inn</Card.Title>
		</Card.Header>
		<Card.Content>
			<form method="POST" id="login">
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">E-post</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="admin@pilsguiden.no"
							required
						/>
					</div>

					<div class="grid gap-2">
						<Label for="password">Passord</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Passord"
							required
						/>
					</div>
				</div>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button type="submit" class="w-full" form="login">Login</Button>
		</Card.Footer>
	</Card.Root>
</div>
