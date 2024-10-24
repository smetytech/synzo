<script lang="ts">
	import NoteInput from 'src/lib/components/layout/notes/NoteInput.svelte';
	import NotesList from 'src/lib/components/layout/notes/NotesList.svelte';
	import { onMount } from 'svelte';

	interface Note {
		id: number;
		text: string;
	}

	let selectedText: string = '';
	let notes: Note[] = [];

	let textParagraph: HTMLParagraphElement; // Reference to the paragraph element

	onMount(() => {
		function updateSelectedText() {
			const selection = window.getSelection();
			if (selection && selection.toString()) {
				// Check if the selection is within the paragraph
				const anchorNode = selection.anchorNode;
				const focusNode = selection.focusNode;

				// Get the parent elements of the anchor and focus nodes
				const anchorElement =
					anchorNode instanceof Text ? anchorNode.parentElement : (anchorNode as HTMLElement);
				const focusElement =
					focusNode instanceof Text ? focusNode.parentElement : (focusNode as HTMLElement);

				if (textParagraph.contains(anchorElement) && textParagraph.contains(focusElement)) {
					selectedText = selection.toString();
				}
			}
			// Do not clear selectedText when selection is empty or outside the paragraph
		}

		document.addEventListener('selectionchange', updateSelectedText);

		return () => {
			document.removeEventListener('selectionchange', updateSelectedText);
		};
	});

	function handleAddNote(event: CustomEvent<{ text: string }>) {
		notes = [...notes, { id: Date.now(), text: event.detail.text }];
		// Optionally, clear selectedText if you want the card to disappear after adding a note
		selectedText = '';
	}
</script>

<div class="flex gap-6 w-full max-w-[1400px] mx-auto p-6">
	<!-- Main content on the left -->
	<div class="flex-1">
		<div class="bg-zinc-800 rounded-lg shadow-md overflow-hidden mb-4">
			<div class="p-4 border-b border-zinc-700">
				<h3 class="text-lg font-semibold text-zinc-300">Select Text Below</h3>
			</div>
			<div class="p-4">
				<!-- Bind the paragraph element to get a reference -->
				<p class="text-zinc-400" bind:this={textParagraph}>
					Cybersecurity is the practice of protecting systems, networks, and data from digital
					attacks. It involves implementing measures to defend against threats like hacking,
					malware, and unauthorized access. Key components include encryption, firewalls, secure
					coding, and regular system updates. With the rise of cyber threats, cybersecurity is
					critical in safeguarding personal information, financial assets, and organizational data
					across all industries.
				</p>
			</div>
		</div>
	</div>

	<!-- Notes panel on the right -->
	<div class="w-[400px]">
		{#if selectedText}
			<div class="space-y-4 pb-8">
				<NoteInput {selectedText} on:addNote={handleAddNote} />
			</div>
		{/if}
		<NotesList bind:notes />
	</div>
</div>

<style>
    ::selection {
	background: #bce784;
    color: black;
}

::-moz-selection {
	background: #bce784;
    color: black;
}
</style>