<script>
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
</script>

<NavigationMenu.Root>
	<NavigationMenu.List>
		<NavigationMenu.Item>
			<NavigationMenu.Trigger>Lenker</NavigationMenu.Trigger>
			<NavigationMenu.Content>
				<ul class="grid w-[200px] gap-4 p-2">
					<li>
						<NavigationMenu.Link href="/om-oss">Om oss</NavigationMenu.Link>
						<NavigationMenu.Link href="/media">Media</NavigationMenu.Link>
						<NavigationMenu.Link href="/kontakt">Kontakt</NavigationMenu.Link>
						<NavigationMenu.Link href="/donasjoner">Donasjoner</NavigationMenu.Link>
					</li>
				</ul>
			</NavigationMenu.Content>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
