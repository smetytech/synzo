<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ImagePlus, ListCheck, Speech, Highlighter } from 'lucide-svelte';
	export let selectedText: string;
</script>

<div class="flex flex-wrap justify-start w-[300px]">
	<Button
		class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
		><Highlighter class="h-8 w-6" /></Button
	>
	<Button
		class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
		><ImagePlus class="h-8 w-6" /></Button
	>
	<Button
		class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
		><Speech class="h-8 w-6" /></Button
	>
	<Button
		class="h-[55px] bg-[#383A40] border-none text-[#FFFFFF] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2 mb-2"
		><ListCheck class="h-8 w-6" /></Button
	>
</div>
