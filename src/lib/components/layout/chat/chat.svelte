<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Bot, Send } from 'lucide-svelte';
</script>

<div>
	<div class="flex items-center w-2/3">
		<div
			class="bg-[#383A40] flex items-center focus-within:border-none focus-within:outline-none rounded-lg"
		>
			<Textarea
				placeholder="Take notes..."
				class="resize-none flex-1 bg-[#383A40] border-none focus:border-none w-[790px] min-h-[40px]"
			/>

			<div class="flex items-center transition-colors duration-200">
				<Button
					class="bg-[#383A40] border-none text-[#BCE784] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2"
				>
					<Bot />
				</Button>
				<Button
					class="bg-[#383A40] border-none text-[#BCE784] hover:bg-[#BCE784] hover:text-[#383A40] focus:border-none mx-2"
				>
					<Send />
				</Button>
			</div>
		</div>
	</div>
</div>
