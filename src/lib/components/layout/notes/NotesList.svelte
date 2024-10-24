<script lang="ts">
	import { NotepadText } from 'lucide-svelte';
	interface Note {
		id: number;
		text: string;
	}

	export let notes: Note[];

	function deleteNote(id: number) {
		notes = notes.filter((note) => note.id !== id);
	}
</script>

<div class="bg-zinc-800 rounded-lg shadow-md overflow-hidden">
	<div class="p-4 border-b border-zinc-700 flex items-center gap-2">
		<h3 class="text-lg font-semibold text-zinc-300">Notes</h3>
		<NotepadText/>
	</div>
	<div class="p-4">
		<div class="max-h-[400px] overflow-y-auto pr-2">
			<div class="space-y-4">
				{#each notes as note (note.id)}
					<div class="flex items-start justify-between gap-2 p-3 rounded-lg bg-zinc-700">
						<p class="text-sm text-zinc-300">{note.text}</p>
						<!-- svelte-ignore a11y_consider_explicit_label -->
						<button
							class="text-zinc-500 hover:text-zinc-300 p-1 rounded transition-colors"
							on:click={() => deleteNote(note.id)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
								/>
							</svg>
						</button>
					</div>
				{:else}
					<p class="text-sm text-zinc-400 text-center py-4">
						No notes yet. Select some text and add a note to begin.
					</p>
				{/each}
			</div>
		</div>
	</div>
</div>
