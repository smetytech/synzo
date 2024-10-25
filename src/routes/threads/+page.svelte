<script lang="ts">
	import { page } from '$app/stores';
	import { ThreadSidemenu } from '$lib/components/layout/thread-sidemenu';
	import { Header } from '$lib/components/layout/header';

	$: ({ user } = $page.data);
</script>

<div class="flex grow">
	{#if user}
		<ThreadSidemenu
			{user}
		/>
	{/if}

	<div class="grow flex flex-col">
		<Header/>

		<div class="flex grow">
			<div class="flex flex-col grow">
				<div class="grow">
					<slot />
				</div>
				<div class="sticky bg-zinc-800 bottom-0">
					Toolbar
				</div>
			</div>
		</div>
	</div>
</div>
