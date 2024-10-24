<script lang="ts">
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { DomainBar } from '$lib/components/layout/domain-bar';
	import 'src/app.css';

	setMode('dark');
</script>

<ModeWatcher />
<Toaster closeButton richColors />

<div class="flex min-h-screen">
	<DomainBar />
	<slot />
</div>
