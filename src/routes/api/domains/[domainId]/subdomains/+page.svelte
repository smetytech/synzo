<script lang="ts">
    import { onMount } from 'svelte';
	  import type { ISubdomain } from "$lib/interfaces/subdomain.interface";
	  import { fetchSubDomains } from 'src/lib/controllers/subdomains.controller';

    let subDomains: ISubdomain[];
    $: subDomains;


    // Load the subDomains when the component mounts
    onMount(() => {
      fetchSubDomains();
    });
</script>

<main>
  <h1>subDomains List</h1>

  {#if subDomains.length > 0}
    <ul>
      {#each subDomains as subdomain}
        <li>{subdomain.name}</li>
      {/each}
    </ul>
  {:else}
    <p>No subDomains found.</p>
  {/if}
</main>