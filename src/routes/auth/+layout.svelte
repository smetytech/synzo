<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	$: isSignUpRoute = $page.route.id === '/auth/sign-up';
	$: isSignInRoute = $page.route.id === '/auth/sign-in';

	function handleBackButtonClick() {
		history.back();
	}
</script>

<div class="mx-auto grid min-h-[100dvh] max-w-[80rem] lg:grid-cols-2">
	<div class="hidden lg:flex lg:flex-col lg:items-start lg:justify-center lg:p-10">
		<img src="/assets/images/auth_bg.png" alt="Marketing" />
	</div>

	<div class="flex flex-col justify-between gap-12 p-6 lg:p-10">
		<div class="flex items-center justify-between">
			<Button variant="ghost" on:click={handleBackButtonClick}>
				<ArrowLeft class="mr-2 h-5 w-5" />
				<span>Back</span>
			</Button>

			{#if isSignUpRoute}
				<Button variant="ghost" href="/auth/sign-in">
					<span>Sign In</span>
				</Button>
			{:else if isSignInRoute}
				<Button variant="ghost" href="/auth/sign-up">
					<span>Sign Up</span>
				</Button>
			{/if}
		</div>

		<div class="mx-auto w-full max-w-sm grow lg:flex lg:items-center">
			<slot />
		</div>
	</div>
</div>
