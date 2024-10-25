<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ImagePlus, ListCheck, Speech, Highlighter, Loader } from 'lucide-svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { generateUML } from '$lib/controllers/llm.controller';
	export let selectedText: string;

	let showUMLModal = false;
	let umlDiagram = '';

	let isLoadingPuml = false;
	let isLoadingHighlighter = false;
	let isLoadingSpeech = false;
	let isLoadingTests = false;

	async function handleGenerateUML() {
		if (!selectedText) return;

		isLoadingPuml = true;
		try {
			const response = await generateUML(selectedText);
			umlDiagram = await response.text();
			if (umlDiagram) {
				showUMLModal = true;
			}
		} catch (error) {
			console.error('Error generating UML:', error);
		} finally {
			isLoadingPuml = false;
		}
	}
</script>

<div class="flex flex-wrap justify-start w-[300px]">
	<Button
		class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
	>
		{#if isLoadingHighlighter}
			<div class="flex items-center text-muted-foreground gap-2">
				<Loader class="h-5 w-5 animate-spin" />
			</div>
		{:else}
			<Highlighter class="h-8 w-6" />
		{/if}
	</Button>

	<Dialog.Root bind:open={showUMLModal}>
		<Button
			class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
			on:click={handleGenerateUML}
			disabled={isLoadingPuml}
		>
			{#if isLoadingPuml}
				<div class="flex items-center text-muted-foreground gap-2">
					<Loader class="h-5 w-5 animate-spin" />
				</div>
			{:else}
				<ImagePlus class="h-8 w-6" />
			{/if}
		</Button>

		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>UML Diagram</Dialog.Title>
			</Dialog.Header>
			<Dialog.Description>
				{#if umlDiagram}
					<img
						src={`data:image/svg+xml,${encodeURIComponent(umlDiagram)}`}
						alt="Generated UML Diagram"
						class="w-full"
					/>
				{:else}
					<div class="text-muted-foreground">No UML diagram generated</div>
				{/if}
			</Dialog.Description>
		</Dialog.Content>
	</Dialog.Root>

	<Button
		class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
	>
		{#if isLoadingSpeech}
			<div class="flex items-center text-muted-foreground gap-2">
				<Loader class="h-5 w-5 animate-spin" />
			</div>
		{:else}
			<Speech class="h-8 w-6" />
		{/if}
	</Button>

	<Button
		class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
	>
		{#if isLoadingTests}
			<div class="flex items-center text-muted-foreground gap-2">
				<Loader class="h-5 w-5 animate-spin" />
			</div>
		{:else}
			<ListCheck class="h-8 w-6" />
		{/if}
	</Button>
</div>
