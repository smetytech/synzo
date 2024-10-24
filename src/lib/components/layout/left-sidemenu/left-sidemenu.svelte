<script lang="ts">
	import { goto } from '$app/navigation';
	import type { User as IUser } from '@supabase/supabase-js';
	import { signOut } from '$lib/controllers/auth.controller';
	import { getCourses } from 'src/lib/controllers/courses.controller';
	import { getSubdomains } from '$lib/controllers/subdomains.controller';
	import type { ICourse } from '$lib/interfaces/course.interface';
	import type { IDomain } from '$lib/interfaces/domain.interface';
	import type { ISubdomain } from '$lib/interfaces/subdomain.interface';
	import { displayGeneralErrorToast } from '$lib/scripts/toast.script';
	import { Hash, Headphones, Loader, LogOut, Mic, Settings, User } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	export let selectedDomain: IDomain;
	export let selectedSubdomain: ISubdomain | null = null;
	export let selectedCourse: ICourse | null = null;
	export let user: IUser;

	$: {
		if (selectedDomain && selectedDomain.id !== previousDomainId) {
			previousDomainId = selectedDomain.id;
			fetchSubdomains();
		}
	}
	$: {
		if (selectedSubdomain && selectedSubdomain.id !== previousSubdomainId) {
			previousSubdomainId = selectedSubdomain.id;
			fetchCourses();
		}
	}

	let previousDomainId: string | null = null;
	let previousSubdomainId: string | null = null;
	let subdomains: Array<ISubdomain> = [];
	let courses: Array<ICourse> = [];
	let isLoadingSubdomains = false;
	let isLoadingCourses = false;
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

	async function fetchSubdomains() {
		isLoadingSubdomains = true;

		try {
			subdomains = await getSubdomains(selectedDomain.id);
		} catch {
			displayGeneralErrorToast();
		}

		isLoadingSubdomains = false;
	}

	async function fetchCourses() {
		if (!selectedSubdomain) {
			return;
		}

		isLoadingCourses = true;

		try {
			courses = await getCourses(selectedSubdomain.id);
		} catch {
			displayGeneralErrorToast();
		}

		isLoadingCourses = false;
	}
</script>

<nav class="bg-zinc-900 sticky top-0 h-screen flex flex-col w-[21.25rem]">
	<div class="p-5 shadow-lg">
		<span class="text-lg font-semibold">{selectedDomain.name}</span>
	</div>

	<div class="p-5 flex gap-y-1 flex-col">
		{#if isLoadingSubdomains}
			<div class="flex items-center text-muted-foreground gap-2">
				<Loader class="h-5 w-5 animate-spin" />
				<span>Loading...</span>
			</div>
		{:else}
			{#each subdomains as subdomain}
				<Button
					class="{selectedSubdomain && selectedSubdomain.id === subdomain.id
						? 'text-primary hover:text-primary'
						: 'text-foreground'} block truncate text-base font-normal text-left"
					variant="ghost"
					href={`/domains/${selectedDomain.id}/subdomains/${subdomain.id}`}
				>
					{subdomain.name}
				</Button>
			{/each}
		{/if}
	</div>

	{#if selectedSubdomain}
		<Separator />

		<div class="p-5 flex gap-y-1 flex-col">
			{#if isLoadingCourses}
				<div class="flex items-center text-muted-foreground gap-2">
					<Loader class="h-5 w-5 animate-spin" />
					<span>Loading...</span>
				</div>
			{:else}
				{#each courses as course}
					<Button
						class="{selectedCourse && selectedCourse.id === course.id
							? 'text-foreground'
							: 'text-muted-foreground'} flex items-center justify-start gap-2 text-base font-normal text-left"
						variant="ghost"
						href={`/domains/${selectedDomain.id}/subdomains/${selectedSubdomain.id}/courses/${course.id}`}
					>
						<Hash class="shrink-0 h-5 w-5" />
						<span class="truncate">{course.title}</span>
					</Button>
				{/each}
			{/if}
		</div>
	{/if}

	<div class="mt-auto px-5 py-4 bg-zinc-950/50 flex items-center gap-4 justify-between">
		<div class="flex items-center gap-2.5">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button class="relative rounded-full" variant="ghost" size="icon" builders={[builder]}>
						<Avatar.Root>
							<Avatar.Image
								src={user.user_metadata.profile_picture}
								alt={user.user_metadata.display_name}
							/>
							<Avatar.Fallback>{abbreviatedUserDisplayName}</Avatar.Fallback>
						</Avatar.Root>

						<span class="absolute bottom-0 right-0 p-0.5 h-3.5 w-3.5 bg-zinc-900/50 rounded-full">
							<span class="block h-2.5 w-2.5 rounded-full bg-[#22A559]"></span>
						</span>
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

			<div class="space-y-1">
				<span class="block leading-none truncate font-semibold">
					{user.user_metadata.display_name.split(' ')[0]}
				</span>
				<span
					class="block leading-none truncate text-sm text-muted-foreground capitalize font-medium"
				>
					{user.user_metadata.role.toLowerCase()}
				</span>
			</div>
		</div>

		<div class="flex items-center justify-center">
			<Button
				class="h-9 w-9 text-muted-foreground hover:text-foreground transition"
				variant="ghost"
				size="icon"
			>
				<Mic class="h-5 w-5" />
			</Button>
			<Button
				class="h-9 w-9 text-muted-foreground hover:text-foreground transition"
				variant="ghost"
				size="icon"
			>
				<Headphones class="h-5 w-5" />
			</Button>
			<Button
				class="h-9 w-9 text-muted-foreground hover:text-foreground transition"
				variant="ghost"
				size="icon"
			>
				<Settings class="h-5 w-5" />
			</Button>
		</div>
	</div>
</nav>
