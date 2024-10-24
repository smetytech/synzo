<script lang="ts">
	import { onMount } from 'svelte';
	import { getDomains } from '$lib/controllers/domains.controller';
	import { domainsIconMap } from '$lib/data/domains.data';
	import type { IDomain } from '$lib/interfaces/domain.interface';
	import { displayGeneralErrorToast } from '$lib/scripts/toast.script';
	import { Separator } from '$lib/components/ui/separator';

	let domains: Array<IDomain> = [];
	let isLoading = false;

	async function fetchDomains() {
		isLoading = true;

		try {
			domains = await getDomains();
		} catch {
			displayGeneralErrorToast();
		}

		isLoading = false;
	}

	onMount(async () => {
		await fetchDomains();
	});
</script>

<nav class="p-4 bg-background space-y-4">
	<a
		class="p-3 flex items-center justify-center rounded-[2rem] hover:rounded-2xl bg-muted hover:bg-foreground transition-all"
		href="/"
	>
		<img class="h-10 w-10" src="/assets/icons/synzo.svg" alt="Synzo." />
	</a>

	<Separator class="rounded-full h-0.5" />

	{#each domains as domain}
		<a
			class="flex items-center w-16 h-16 justify-center rounded-[2rem] hover:rounded-2xl bg-muted hover:bg-foreground hover:text-[#0072C4] transition-all"
			href="/domains/{domain.id}"
		>
			<svelte:component
				this={domainsIconMap[domain.name as keyof typeof domainsIconMap]}
				class="h-8 w-8"
			/>

			<!-- <div>{domain.name}</div> -->
		</a>
	{/each}
</nav>
