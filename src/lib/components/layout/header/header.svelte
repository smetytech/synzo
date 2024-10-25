<script lang="ts">
	import type { ICourse } from '$lib/interfaces/course.interface';
	import { Hash, Inbox, MessagesSquare, UsersRound } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	export let selectedCourse: ICourse | null = null;

	function navigateToThreads() {
		goto('/threads');
	}
</script>

<header class="sticky top-0 flex justify-between items-center bg-zinc-800 p-5 shadow-lg">
	{#if selectedCourse}
		<div class="flex items-center gap-2">
			<Hash class="shrink-0 text-muted-foreground" />
			<span class="truncate text-lg">{selectedCourse.title}</span>
		</div>
	{/if}

	<div class="ml-auto flex items-center gap-1">
		<Button
			class="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-zinc-700/50"
			variant="ghost"
			on:click={navigateToThreads}
		>
			<MessagesSquare class="text-primary" />
			<span class="text-base">Threads</span>
		</Button>

		<Button
			class="text-muted-foreground hover:text-foreground hover:bg-zinc-700/50"
			variant="ghost"
			size="icon"
		>
			<Inbox />
		</Button>

		<Button
			class="text-muted-foreground hover:text-foreground hover:bg-zinc-700/50"
			variant="ghost"
			size="icon"
		>
			<UsersRound />
		</Button>
	</div>
</header>
