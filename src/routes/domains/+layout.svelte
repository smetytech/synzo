<script lang="ts">
	import { page } from '$app/stores';
	import { LeftSidemenu } from '$lib/components/layout/left-sidemenu';

	$: ({ user } = $page.data);
</script>

<div class="flex grow">
	{#if user}
		<LeftSidemenu {user} />
	{/if}

	<div class="grow">
		<slot />
	</div>
</div>
