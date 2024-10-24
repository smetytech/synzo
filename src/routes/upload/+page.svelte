<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';

	export let data;

	let { subdomains } = data;

	let selectedSubdomainId: string = '';

	let file: File | null = null;
	let extractedText = '';

	const uploadPDF = async () => {
		if (!file) {
			alert('Please select a PDF file.');
			return;
		}
		if (!selectedSubdomainId) {
			alert('Please select a subdomain.');
			return;
		}

		const formData = new FormData();
		formData.append('pdf', file);
		formData.append('subdomain_id', selectedSubdomainId);

		const response = await fetch('/api/upload', {
			method: 'POST',
			body: formData
		});

		const data = await response.json();

		if (data.error) {
			alert(`Error: ${data.error}`);
		} else {
			extractedText = data.text;
		}
	};
</script>

<div class="mx-auto max-w-sm space-y-4 px-4 py-6">
	<div class="flex items-center space-x-2">
		<Select.Root portal={null}>
			<Select.Trigger
				class="w-full h-10 px-4 py-2 rounded-md border border-input ring-offset-background focus-visible:ring-ring"
			>
				<Select.Value placeholder="Select a subdomain" />
			</Select.Trigger>
			<Select.Content class="max-h-[200px] overflow-auto">
				<Select.Group>
					<Select.Label>Subdomains</Select.Label>
					{#each subdomains as subdomain}
						<Select.Item value={subdomain.id} label={subdomain.name}>
							{subdomain.name}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
			<Select.Input name="selectedSubdomainId" bind:value={selectedSubdomainId} />
		</Select.Root>
	</div>

	<div class="grid w-full items-center gap-1.5">
		<Label for="pdf" class="text-dark">Course</Label>
		<Input
			id="pdf"
			type="file"
			accept="application/pdf"
			on:change={(e: Event) => {
				const target = e.target as HTMLInputElement;
				file = target.files ? target.files[0] : null;
			}}
			class="h-10 px-4 py-2 rounded-md border border-input ring-offset-background focus-visible:ring-ring"
		/>
	</div>

	<Button
		class="h-10 w-full text-dark px-4 py-2 rounded-md  ring-offset-background focus-visible:ring-ring"
		on:click={uploadPDF}
	>
		Upload course
	</Button>
</div>
