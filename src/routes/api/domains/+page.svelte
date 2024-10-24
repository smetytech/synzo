<script lang="ts">
	import { onMount } from 'svelte';
	import type { IDomain } from '$lib/interfaces/domain.interface';
	let domains: IDomain[] = $state([]);

	// Fetch the domains from the API route
	const fetchdomains = async () => {
		const res = await fetch('/api/domains');
		domains = await res.json();
	};

	// Load the domains when the component mounts
	onMount(() => {
		fetchdomains();
	});
</script>

<main>
	<h1>domains List</h1>

	{#if domains.length > 0}
		<ul>
			{#each domains as domain}
				<li>{domain.name}</li>
			{/each}
		</ul>
	{:else}
		<p>No domains found.</p>
	{/if}
</main>
