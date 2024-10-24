<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getDomains } from '$lib/controllers/domains.controller';
	import { domainsIconMap } from '$lib/data/domains.data';
	import type { IDomain } from '$lib/interfaces/domain.interface';
	import { displayGeneralErrorToast } from '$lib/scripts/toast.script';
	import { Compass, Loader, MessageCircle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let domains: Array<IDomain> = [];
	let isLoadingDomains = false;

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

<nav class="bg-background sticky top-0 h-screen flex space-y-4">
	<div class="p-4 overflow-y-auto flex flex-col gap-y-4">
		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button
					class="{$page.route.id === '/'
						? 'text-background rounded-2xl bg-foreground'
						: 'rounded-[2rem] bg-muted'} h-14 w-14 shrink-0 hover:rounded-2xl hover:bg-foreground transition-all"
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
					class="{$page.route.id?.startsWith('/threads')
						? 'text-background rounded-2xl bg-foreground'
						: 'rounded-[2rem] bg-muted'} h-14 w-14 shrink-0 hover:rounded-2xl hover:bg-foreground hover:text-background transition-all"
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
					<Loader class="animate-spin text-muted-foreground" />
				</Tooltip.Trigger>
				<Tooltip.Content side="right" sideOffset={8}>Loading domains...</Tooltip.Content>
			</Tooltip.Root>
		{:else}
			{#each domains as domain}
				<Tooltip.Root openDelay={0}>
					<Tooltip.Trigger asChild let:builder>
						<Button
							class="{$page.params.domainId === domain.id
								? 'text-[#0072C4] rounded-2xl bg-foreground'
								: 'rounded-[2rem] bg-muted text-primary'} h-14 w-14 shrink-0 hover:rounded-2xl hover:bg-foreground hover:text-[#0072C4] transition-all"
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

		<Tooltip.Root openDelay={0}>
			<Tooltip.Trigger asChild let:builder>
				<Button
					class="h-14 w-14 shrink-0 mt-auto rounded-[2rem] hover:rounded-2xl bg-muted hover:bg-foreground hover:text-background transition-all"
					variant="ghost"
					size="icon"
					href="/discover"
					builders={[builder]}
				>
					<Compass />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right" sideOffset={8}>Discover</Tooltip.Content>
		</Tooltip.Root>
	</div>
</nav>
