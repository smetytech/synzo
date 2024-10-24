<script lang="ts">
  import { onMount } from 'svelte';
  import type { ICourse } from "$lib/interfaces/course.interface";
  let courses: ICourse[] = $state([]);

  // Fetch the courses from the API route
  const fetchcourses = async () => {
    const res = await fetch('/api/courses');
    courses = await res.json();
  };

  // Load the courses when the component mounts
  onMount(() => {
    fetchcourses();
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