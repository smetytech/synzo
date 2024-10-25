<script lang="ts">
	import { page } from '$app/stores';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';

	import 'src/app.css';

	$: isRootRoute = $page.route.id?.startsWith('/main');

	setMode('dark');
</script>

<ModeWatcher />
<Toaster closeButton richColors />
		{#if isRootRoute}
			<img class="w-full h-full" src="/assets/images/landingpage.png" alt="landingpage">
		{/if}
