<script lang="ts">
	import { page } from '$app/stores';
	import { CourseSidemenu } from '$lib/components/layout/course-sidemenu';
	import { Header } from '$lib/components/layout/header';

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
			<div class="sticky top-20 max-h-[calc(100dvh-5rem)] bg-zinc-900">Notes</div>
		</div>
	</div>
</div>
