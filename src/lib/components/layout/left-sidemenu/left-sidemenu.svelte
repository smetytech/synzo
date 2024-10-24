<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { User as IUser } from '@supabase/supabase-js';
	import { signOut } from '$lib/controllers/auth.controller';
	import { displayGeneralErrorToast } from '$lib/scripts/toast.script';
	import { LogOut, Settings, User } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let user: IUser;

	$: domain = $page.data.domain;

	let isLoadingSignOut = false;

	const abbreviatedUserDisplayName = user.user_metadata.display_name
		.trim()
		.split(' ')
		.map((item: string) => item.charAt(0))
		.slice(0, 2)
		.join('');

	async function handleSignOutItemClick() {
		isLoadingSignOut = true;

		try {
			await signOut();
			goto('/auth/sign-in');
		} catch {
			displayGeneralErrorToast();
		}

		isLoadingSignOut = false;
	}
</script>

<nav class="bg-zinc-900 sticky top-0 h-screen flex flex-col shrink-0 w-80">
	<div class="p-6 shadow-lg">
		<span class="text-lg font-semibold">{domain.name}</span>
	</div>

	<div class="mt-auto">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button class="rounded-full" variant="ghost" size="icon" builders={[builder]}>
					<Avatar.Root>
						<Avatar.Image
							src={user.user_metadata.profile_picture}
							alt={user.user_metadata.display_name}
						/>
						<Avatar.Fallback class="text-base">{abbreviatedUserDisplayName}</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" side="bottom" align="end">
				<DropdownMenu.Label>
					<span class="block truncate text-sm font-semibold">
						{user.user_metadata.display_name}
					</span>
					<span class="block truncate text-xs font-medium text-muted-foreground">
						{user.email}
					</span>
					<span>{user.user_metadata.credits}</span>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<User class="mr-2 h-4 w-4" />
						<span>Profile</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<Settings class="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item disabled={isLoadingSignOut} on:click={handleSignOutItemClick}>
					<LogOut class="mr-2 h-4 w-4" />
					<span>Sign out</span>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</nav>
