<script lang="ts">
	import { Eye, EyeOff } from 'lucide-svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let id: string;
	export let label = '';
	export let placeholder = '';
	export let value = '';
	export let error = '';

	let type = 'password';

	function handleVisibilityButtonClick() {
		if (type === 'password') {
			type = 'text';
		} else {
			type = 'password';
		}
	}

	function handleInput() {
		error = '';
	}
</script>

<div class="flex flex-col gap-1.5">
	{#if label}
		<Label class={error && 'text-destructive'} for={id}>{label}</Label>
	{/if}

	<div class="relative">
		<Input
			class="{error && 'border-destructive !ring-destructive'} truncate"
			{id}
			{type}
			{placeholder}
			bind:value
			on:input={handleInput}
		/>

		{#if value}
			<button
				class="absolute right-2 top-1/2 -translate-y-1/2 p-1"
				type="button"
				on:click={handleVisibilityButtonClick}
			>
				{#if type === 'password'}
					<Eye class="h-4 w-4" />
				{:else}
					<EyeOff class="h-4 w-4" />
				{/if}
			</button>
		{/if}
	</div>

	{#if error}
		<span class="text-[0.8rem] text-destructive">{error}</span>
	{/if}
</div>
