<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let id: string;
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let error = '';

	function handleInput() {
		error = '';
	}
</script>

<div class="flex w-full flex-col gap-1.5">
	{#if label}
		<Label class={error && 'text-destructive'} for={id}>{label}</Label>
	{/if}

	<Input
		class="{error && 'border-destructive !ring-destructive'} truncate"
		{id}
		type="text"
		{placeholder}
		bind:value
		on:input={handleInput}
	/>

	{#if error}
		<span class="text-[0.8rem] text-destructive">{error}</span>
	{/if}
</div>
