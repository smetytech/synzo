<script lang="ts">
	import type { User as IUser } from '@supabase/supabase-js';
	import { Hash } from 'lucide-svelte';
	import { getTreadByUserId, getTreads } from 'src/lib/controllers/thread.controller';
	import type { IThread } from 'src/lib/interfaces/thread.interface';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let threads: IThread[];
	let personalThreads: IThread[];
	export let user: IUser;

	$: {
		threads, personalThreads;
	}
	onMount(async () => {
		threads = await getTreads();
		personalThreads = await getTreadByUserId();
	});
</script>

<nav class="bg-zinc-900 sticky top-0 h-screen flex flex-col w-[21.25rem]">
	<div class="flex flex-col">
		<span class="mt-2 pl-2 items-center text-[#BCE784] w-full text-3xl border-b-2 border-[#36363D] min-h-[80px]">Threads</span>
		<div class="flex flex-col">
			<div class="gap-y-4 text-[#949BA4] w-full">
				<span class="flex items-center text-[#BCE784] w-full text-xl border-b-2 border-[#36363D] min-h-[40px] w-full justify-center">Public threads</span>
				<div class="flex flex-row">
					{#each threads as thread}
				<Button
				class="flex items-center justify-start gap-2 text-base font-normal text-left w-full"
					variant="ghost"
					href={`/threads/${thread.id}`}
				>
					<Hash class="text-muted-foreground shrink-0 h-5 w-5" />
					<span class="truncate">{thread.name}</span>
				</Button>
				{/each}
				</div>
			</div>
			<div class="gap-y-4 text-[#949BA4] w-full">
				<span class="flex items-center text-[#BCE784] w-full text-xl border-b-2 border-t-2 border-[#36363D] min-h-[40px] w-full justify-center">Private threads</span>
				<div class="flex flex-row">
					{#each personalThreads as thread}
				<Button
				class="flex items-center justify-start gap-2 text-base font-normal text-left w-full"
					variant="ghost"
					href={`/threads/${thread.id}`}
				>
					<Hash class="text-muted-foreground shrink-0 h-5 w-5" />
					<span class="truncate">{thread.name}</span>
				</Button>
				{/each}
				</div>
			</div>
		</div>
	</div>
</nav>
