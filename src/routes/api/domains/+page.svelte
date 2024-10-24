<script lang="ts">
	import { onMount } from 'svelte';
	import type { IDomain } from '$lib/interfaces/domain.interface';
	import { fetchDomains } from '$lib/controllers/domains.controller';
    import { page } from '$app/stores';
	let domains: IDomain[] = [];
	$: domains;


	// Load the domains when the component mounts
	onMount(() => {
		fetchDomains();
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
