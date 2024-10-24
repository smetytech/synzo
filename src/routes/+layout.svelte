<script lang="ts">
	import { page } from '$app/stores';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { DomainSidebar } from 'src/lib/components/layout/domain-sidebar';

	import 'src/app.css';

	$: isAuthRoute = $page.route.id?.startsWith('/auth');

	setMode('dark');
</script>

<ModeWatcher />
<Toaster closeButton richColors />

{#if isAuthRoute}
	<slot />
{:else}
	<div class="flex bg-zinc-800">
		<DomainSidebar />
		<slot />
	</div>
{/if}
