<script lang="ts">
	import { page } from '$app/stores';
	import { selectedTextStore } from '$lib/stores/selectedTextStore'; // Import the store
	import { CourseSidemenu } from '$lib/components/layout/course-sidemenu';
	import { Header } from '$lib/components/layout/header';
	import { NoteSidebar } from '$lib/components/layout/note-sidebar';
	import { Chat } from '$lib/components/layout/chat';
	import { Toolbar } from '$lib/components/layout/toolbar';
	import { onDestroy } from 'svelte';

	$: ({ domain, subdomain, course, user } = $page.data);

	let selectedText = '';

	const unsubscribe = selectedTextStore.subscribe((value) => {
		selectedText = value;
		console.log('Selected text:', selectedText);
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="flex grow">
	{#if domain && user}
		<CourseSidemenu
			selectedDomain={domain}
			selectedSubdomain={subdomain}
			selectedCourse={course}
			{user}
		/>
	{/if}

	<div class="grow flex flex-col">
		<Header selectedCourse={course} />

		<div class="flex grow">
			<div class="flex flex-col grow">
				<div class="grow">
					<slot />
				</div>
				<!-- Pass selectedText to Chat and Toolbar components -->
				<div class="sticky bg-zinc-800 bottom-0 flex px-8 pb-8 gap-2">
					<Chat selectedText={selectedText} courseId={course.id} />
					<Toolbar {selectedText} />
				</div>
			</div>

			{#if course}
				<NoteSidebar selectedCourse={course} />
			{/if}
		</div>
	</div>
</div>
