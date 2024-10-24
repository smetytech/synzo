<script lang="ts">
	import { page } from '$app/stores';
	import { CourseSidemenu } from '$lib/components/layout/course-sidemenu';
	import { Header } from '$lib/components/layout/header';
	import { NoteSidebar } from '$lib/components/layout/note-sidebar';

	$: ({ domain, subdomain, course, user } = $page.data);
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
				<div class="sticky bg-zinc-800 bottom-0">Toolbar</div>
			</div>

			{#if course}
				<NoteSidebar selectedCourse={course} />
			{/if}
		</div>
	</div>
</div>
