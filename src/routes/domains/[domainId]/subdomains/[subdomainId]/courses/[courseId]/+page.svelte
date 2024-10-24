<script lang="ts">
	import { marked } from 'marked';

	export let data;

	$: ({ title, content } = data.course);
</script>

<svelte:head>
	<title>{title} | Synzo.</title>
</svelte:head>

<div class="prose dark:prose-invert max-w-full p-6">
	{@html marked(content)}
</div>
