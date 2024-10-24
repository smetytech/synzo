<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { FilePlus2 } from 'lucide-svelte';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	export let selectedText: string;

	let noteText: string = '';
	$: noteText;
	const dispatch = createEventDispatcher();

	function handleSubmit() {
		if (noteText.trim()) {
			dispatch('addNote', { text: noteText });
			noteText = '';
			selectedText = '';
		}
	}

	async function generateAINote() {
		try {
			const response = await fetch('/api/llm/note', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ content: selectedText })
			});
			console.log(response);
			const data = await response.text();

			if (data) {
				noteText = data;
			}
		} catch (error) {
			console.error('Error generating AI note:', error);
		}
	}
</script>

<div class="bg-zinc-800 rounded-lg overflow-hidden">
	<div class="p-6">
		<div class="bg-zinc-800 rounded-lg">
			<div class="p-4 border-b border-zinc-700 flex justify-between items-center">
				<h3 class="text-lg font-semibold text-zinc-300">Selected Text</h3>
				<button
					class="px-4 py-2 bg-zinc-600 text-zinc-300 rounded-md hover:bg-zinc-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					on:click={generateAINote}
					disabled={!selectedText}
					title="Generate AI Note"
				>
					<svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M6.3 5.1c-.492.492-2.279.707-3.312.83-.118.014-.122.153-.005.173.912.155 2.285.365 3.017 1.097.756.756 1.039 2.385 1.288 3.598.024.12.206.111.227-.01.222-1.285.787-3.14 1.394-3.747.647-.647 2.064-.725 3.014-.956.1-.024.1-.146-.001-.166-.957-.186-2.414.02-3.222-.52-.766-.51-1-2.8-1.18-4.145-.016-.12-.168-.12-.187 0C7.128 2.576 6.813 4.587 6.3 5.1zM3.167 8.819c-.158.157-.854.258-1.253.318-.056.009-.056.071 0 .08.342.056.898.156 1.185.442.302.3.362.926.44 1.416.01.06.09.057.099-.004.071-.506.224-1.171.466-1.412.25-.249.748-.344 1.085-.432.051-.014.049-.077-.004-.085-.356-.057-.862-.088-1.114-.34-.265-.262-.377-1.161-.446-1.497-.009-.042-.053-.047-.067-.006-.115.34-.214 1.343-.39 1.52zM1.8 2.7c-.146.145-.577.3-.904.397-.058.017-.051.106.008.115.278.041.638.131.896.388.3.3.467.89.585 1.366.015.06.108.054.118-.007.08-.492.256-1.12.497-1.359.22-.218.615-.325.92-.38.059-.011.062-.095.004-.109-.3-.074-.707-.195-.924-.411-.242-.241-.377-.82-.475-1.242l-.002-.009c-.014-.057-.104-.056-.121 0-.136.448-.437 1.087-.602 1.25z"
							stroke-width="0.8"
							stroke="currentColor"
						></path>
					</svg>
				</button>
			</div>

			<div class="p-4">
				<div class="overflow-y-auto max-h-[200px]">
					<p class="text-zinc-400">{selectedText || 'No text selected'}</p>
				</div>
			</div>
		</div>

		<div class="flex gap-4 mt-4">
			<Textarea
				type="text"
				bind:value={noteText}
				placeholder="Write your note..."
				class="bg-zinc-700 text-zinc-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
				style="resize: none;"
				disabled={!selectedText}
			/>

			<button
				class="px-2 py-1 bg-zinc-500 text-zinc-300 rounded-md hover:bg-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
				on:click={handleSubmit}
				disabled={!selectedText || !noteText.trim()}
				style="width: fit-content; margin: 0 auto;"
			>
				<FilePlus2 size={16} />
			</button>
		</div>
	</div>
</div>
