<script lang="ts">
	import { page } from '$app/stores';
	import { LeftSidemenu } from '$lib/components/layout/left-sidemenu';

	$: ({ domain, subdomain, course, user } = $page.data);
</script>

<div class="flex grow">
	{#if domain && user}
		<LeftSidemenu
			selectedDomain={domain}
			selectedSubdomain={subdomain}
			selectedCourse={course}
			{user}
		/>
	{/if}

	<div class="grow">
		<div class="sticky top-0 bg-zinc-800">Header</div>
		<div class="flex">
			<div class="grow">
				<slot />
				<div class="sticky bg-zinc-800 bottom-0">Toolbar</div>
			</div>
			<div class="sticky top-6 bg-zinc-900 max-h-screen">Notes</div>
		</div>
	</div>
</div>
