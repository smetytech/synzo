<script lang="ts">
	import { getNotes } from '$lib/controllers/notes.controller';
	import type { ICourse } from '$lib/interfaces/course.interface';
	import type { INote } from '$lib/interfaces/note.interface';
	import { displayGeneralErrorToast } from '$lib/scripts/toast.script';
	import { Loader } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';

	export let selectedCourse: ICourse;

	$: {
		if (selectedCourse) {
			fetchNotes();
		}
	}

	let notes: Array<INote> = [];
	let isLoading = false;

	async function fetchNotes() {
		isLoading = true;

		try {
			notes = await getNotes(selectedCourse.id);
		} catch {
			displayGeneralErrorToast();
		}

		isLoading = false;
	}

	let expandedNoteId: number | null = null;

	function toggleExpandedNote(noteId: number) {
		expandedNoteId = expandedNoteId === noteId ? null : noteId;
	}
</script>

<div class="sticky top-20 min-w-72 max-h-[calc(100dvh-5rem)] bg-zinc-900">
	<div class="p-5">
		<span class="text-lg font-semibold">Notes</span>
	</div>

	<Separator />

	<div class="p-5 space-y-2 overflow-y-auto h-full">
		{#if isLoading}
			<div class="flex items-center text-muted-foreground gap-2">
				<Loader class="h-5 w-5 animate-spin" />
				<span>Loading...</span>
			</div>
		{:else}
			{#each notes as note}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="p-3 bg-zinc-800/50 text-muted-foreground rounded-xl cursor-pointer"
					on:click={() => toggleExpandedNote(note.id)}
				>
					{#if expandedNoteId === note.id}
						{note.content}
					{:else}
						{note.content.length > 50 ? `${note.content.slice(0, 47)}...` : note.content}
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</div>

