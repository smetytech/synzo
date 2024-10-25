<script lang="ts">
	import { marked } from 'marked';
	import { selectedTextStore } from 'src/lib/stores/selectedTextStore.js';
	import { onMount } from 'svelte';

	export let data;

	$: ({ title, content } = data.course);

	let selectedText = '';
	let courseContentElement: HTMLElement | null = null;

	onMount(() => {
		function updateSelectedText() {
			const selection = window.getSelection();
			if (selection && selection.toString()) {
				const anchorNode = selection.anchorNode;
				const focusNode = selection.focusNode;

				const anchorElement =
					anchorNode instanceof Text ? anchorNode.parentElement : (anchorNode as HTMLElement);
				const focusElement =
					focusNode instanceof Text ? focusNode.parentElement : (focusNode as HTMLElement);

				if (
					courseContentElement &&
					courseContentElement.contains(anchorElement) &&
					courseContentElement.contains(focusElement)
				) {
					selectedText = selection.toString();
					selectedTextStore.set(selectedText);
				}
			}
		}

		document.addEventListener('selectionchange', updateSelectedText);

		return () => {
			document.removeEventListener('selectionchange', updateSelectedText);
		};
	});
</script>

<svelte:head>
	<title>{title} | Synzo.</title>
</svelte:head>

<div class="prose dark:prose-invert max-w-full p-6" bind:this={courseContentElement}>
	{@html marked(content)}
</div>

<style>
	::selection {
		background: #bce784;
		color: black;
	}

	::-moz-selection{
		background: #bce784;
		color: black;
	}
</style>