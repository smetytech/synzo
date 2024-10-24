<script lang="ts">
    import { onMount } from 'svelte';
	  import type { ISubdomain } from "$lib/interfaces/subdomain.interface";

  let subdomains: ISubdomain[] = $state([]);

  // Fetch the subdomains from the API route
  const fetchsubdomains = async () => {
    const res = await fetch('/api/subdomains');
    subdomains = await res.json();
  };

  // Load the subdomains when the component mounts
  onMount(() => {
    fetchsubdomains();
  });
</script>

<main>
  <h1>subdomains List</h1>

  {#if subdomains.length > 0}
    <ul>
      {#each subdomains as subdomain}
        <li>{subdomain.name}</li>
      {/each}
    </ul>
  {:else}
    <p>No subdomains found.</p>
  {/if}
</main>