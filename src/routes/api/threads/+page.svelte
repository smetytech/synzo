<script lang="ts">
  import { onMount } from 'svelte';
	import type { IThread } from "$lib/interfaces/thread.interface";
	import { fetchTreads } from 'src/lib/controllers/thread.controller';

  let threads: IThread[] = [];
  $: threads;
  // Fetch the threads from the API route
  
  // Load the threads when the component mounts
  onMount(() => {
    fetchTreads();
  });

</script>

<main>
  <h1>threads List</h1>

  {#if threads.length > 0}
    <ul>
      {#each threads as thread}
        <li>{thread.name}</li>
      {/each}
    </ul>
  {:else}
    <p>No threads found.</p>
  {/if}
</main>