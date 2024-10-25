<script lang="ts">
	import { page } from '$app/stores';
	import { ThreadSidemenu } from '$lib/components/layout/thread-sidemenu';
	import { Header } from '$lib/components/layout/header';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { getTreadById } from 'src/lib/controllers/thread.controller';
	import { Hash } from 'lucide-svelte';
	import type { IThread } from 'src/lib/interfaces/thread.interface';

	$: ({ user } = $page.data);
	const threadId = get(page).params.threadId;
	let messages: IThread;
	onMount(async () => {
		messages = await getTreadById(threadId);
	});


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
					{#if messages && user}
						{#each messages.messages as message}
							<div class="flex {message.user_id === user?.id ? 'flex-row-reverse' : 'flex-row'} mb-4 mt-4 w-full {message.user_id === user?.id ? 'mr-4' : 'ml-4'}">
								<Hash class="text-muted-foreground shrink-0 h-8 w-8 justify-items-center" />
								<div class="flex flex-col rounded-xl {message.user_id === user?.id ? 'pr-2' : 'pl-2'} border-2 border-[#36363D] w-[50%] {message.user_id === user?.id ? 'text-right' : 'text-left'}">
									<span class="border-l-2 gap-x-4 text-3xl {message.user_id === user?.id ? 'text-right' : 'text-left'}">{message.user_id === user?.id ? 'You' : message.user_name}</span>
									<p class="w-full text-2xl text-muted-foreground">{message.message}</p>
								</div>
							</div>
						{/each}
					{:else}
						<p>No messages available.</p>
					{/if}
				</div>
				<div class="sticky bg-zinc-800 bottom-0">
					Toolbar
				</div>
			</div>
		</div>
	</div>
</div>
