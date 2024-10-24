<script lang="ts">
  import { onMount } from 'svelte';
  import type { ICourse } from "$lib/interfaces/course.interface";
	import { fetchCourses } from 'src/lib/controllers/courses.controller';
  
  let courses: ICourse[] = [];
  $: courses;

  // Load the courses when the component mounts
  onMount(() => {
    fetchCourses();
  });
</script>

<main>
  <h1>courses List</h1>

  {#if courses.length > 0}
    <ul>
      {#each courses as course}
        <li>{course.content}</li>
      {/each}
    </ul>
  {:else}
    <p>No courses found.</p>
  {/if}
</main>