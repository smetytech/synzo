<!-- src/routes/upload/+page.svelte -->
<script lang="ts">
  export let data;

  // Destructure subdomains from data
  let { subdomains } = data;

  let selectedSubdomainId: string = '';

  // File upload handling
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

<div class="flex flex-col items-center p-4">
  <select
    id="subdomain-select"
    bind:value="{selectedSubdomainId}"
    class="mb-4 border border-gray-300 rounded px-2 py-1"
  >
    <option value="">Select a subdomain..</option>
    {#each subdomains as subdomain}
      <option value="{subdomain.id}">{subdomain.name}</option>
    {/each}
  </select>

  <input
    type="file"
    accept="application/pdf"
    class="mb-4 border border-gray-300 rounded px-2 py-1"
    on:change="{(e: Event) => {
      const target = e.target as HTMLInputElement;
      file = target.files ? target.files[0] : null;
    }}"
  />

  <button class="bg-green-700 text-white px-4 py-2 rounded" on:click="{uploadPDF}">
    Upload PDF
  </button>
</div>
