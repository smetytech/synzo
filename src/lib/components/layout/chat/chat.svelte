<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Bot, Send, Loader } from 'lucide-svelte';
	import { postNote } from '$lib/controllers/notes.controller';

	export let courseId: string;
	export let selectedText: string;

	let noteText = '';
	let isLoading = false;

	async function generateAINote(selectedText: string) {
		isLoading = true;
		const url = '/api/llm/note';
		const method = 'POST';
		const headers = { 'Content-Type': 'application/json' };
		const body = JSON.stringify({ content: selectedText });

		const response = await fetch(url, { method, headers, body });

		const data = await response.text();

		if (!response.ok) {
			throw data;
		}

		noteText = data;
		isLoading = false;
	}

	async function handleSubmit() {
		if (courseId && noteText && selectedText) {
			await postNote(courseId, noteText, selectedText);
			noteText = '';
		}
	}
</script>

<div>
	<div class="flex items-center w-2/3">
		<div
			class="bg-[#383A40] flex items-center focus-within:border-none focus-within:outline-none rounded-lg"
		>
			{#if isLoading}
				<div class="flex items-center text-muted-foreground gap-2">
					<Loader class="h-5 w-5 animate-spin" />
					<span>Loading...</span>
				</div>
			{:else}
				<Textarea
					bind:value={noteText}
					placeholder="Take notes..."
					class="resize-none flex-1 bg-[#383A40] border-none focus:border-none w-[575px] min-h-[40px]"
				/>

				<div class="flex items-center transition-colors duration-200">
					<Button
						class="bg-[#383A40] border-none text-[#BCE784] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2"
						on:click={() => generateAINote(selectedText)}
					>
						<Bot />
					</Button>
					<Button
						class="bg-[#383A40] border-none text-[#BCE784] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2"
						on:click={handleSubmit}
					>
						<Send />
					</Button>
				</div>
			{/if}
		</div>
	</div>
</div>

