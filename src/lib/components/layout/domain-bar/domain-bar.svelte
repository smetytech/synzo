<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { User as IUser } from '@supabase/supabase-js';
	import { signOut } from '$lib/controllers/auth.controller';
	import { getDomains } from '$lib/controllers/domains.controller';
	import { domainsIconMap } from '$lib/data/domains.data';
	import type { IDomain } from '$lib/interfaces/domain.interface';
	import { displayGeneralErrorToast } from '$lib/scripts/toast.script';
	import { Loader, LogOut, MessageCircle, User } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let user: IUser;

	let domains: Array<IDomain> = [];
	let isLoadingDomains = false;
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

	async function fetchDomains() {
		isLoadingDomains = true;

		try {
			domains = await getDomains();
		} catch {
			displayGeneralErrorToast();
		}

		isLoadingDomains = false;
	}

	onMount(async () => {
		await fetchDomains();
	});
</script>

<nav class="p-4 bg-background sticky top-0 h-screen flex space-y-4">
	<div class="overflow-y-auto flex flex-col gap-y-4">
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button
					class="h-14 w-14 shrink-0 rounded-[2rem] hover:rounded-2xl bg-muted hover:bg-foreground transition-all"
					variant="ghost"
					size="icon"
					href="/"
					builders={[builder]}
				>
					<img class="h-8 w-8" src="/assets/icons/synzo.svg" alt="Synzo." />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={8}>Home</Tooltip.Content>
		</Tooltip.Root>

		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button
					class="h-14 w-14 shrink-0 rounded-[2rem] hover:rounded-2xl bg-muted hover:bg-foreground hover:text-[#0072C4] transition-all"
					variant="ghost"
					size="icon"
					href="/threads"
					builders={[builder]}
				>
					<MessageCircle />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={8}>Threads</Tooltip.Content>
		</Tooltip.Root>

		<Separator class="rounded-full h-0.5" />

		{#if isLoadingDomains}
			<Tooltip.Root openDelay={0}>
				<Tooltip.Trigger class="w-14 h-14 flex shrink-0 items-center justify-center">
					<Loader class="animate-spin" />
				</Tooltip.Trigger>
				<Tooltip.Content side="right" sideOffset={8}>Loading domains...</Tooltip.Content>
			</Tooltip.Root>
		{:else}
			{#each domains as domain}
				<Tooltip.Root openDelay={0}>
					<Tooltip.Trigger asChild let:builder>
						<Button
							class="h-14 w-14 shrink-0 rounded-[2rem] hover:rounded-2xl bg-muted hover:bg-foreground hover:text-[#0072C4] transition-all"
							variant="ghost"
							size="icon"
							href="/domains/{domain.id}"
							builders={[builder]}
						>
							<svelte:component
								this={domainsIconMap[domain.name as keyof typeof domainsIconMap]}
								class="h-6 w-6"
							/>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={8}>{domain.name}</Tooltip.Content>
				</Tooltip.Root>
			{/each}
		{/if}

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder={dropdownMenuBuilder}>
				<Tooltip.Root openDelay={0}>
					<Tooltip.Trigger asChild let:builder={tooltipBuilder}>
						<Button
							class="shrink-0 mt-auto w-14 h-14 rounded-full"
							variant="ghost"
							size="icon"
							builders={[dropdownMenuBuilder, tooltipBuilder]}
						>
							<Avatar.Root class="w-14 h-14">
								<Avatar.Image
									src={user.user_metadata.profile_picture}
									alt={user.user_metadata.display_name}
								/>
								<Avatar.Fallback class="text-base">{abbreviatedUserDisplayName}</Avatar.Fallback>
							</Avatar.Root>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={8}>User menu</Tooltip.Content>
				</Tooltip.Root>
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
