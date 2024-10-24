<script lang="ts">
	import { page } from '$app/stores';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import { DomainBar } from '$lib/components/layout/domain-bar';
	import { LeftSidemenu } from '$lib/components/layout/left-sidemenu';
	import 'src/app.css';

	export let data;

	$: ({ user } = data);
	$: isAuthRoute = $page.route.id?.startsWith('/auth');

	setMode('dark');
</script>

<ModeWatcher />
<Toaster closeButton richColors />

{#if isAuthRoute}
	<slot />
{:else}
	<div class="flex">
		<DomainBar {user} />
		<LeftSidemenu />

		<div class="bg-zinc-800 w-full">content</div>
		<slot />
	</div>
{/if}
