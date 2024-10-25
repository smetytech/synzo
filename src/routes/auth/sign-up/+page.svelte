<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { signUp } from '$lib/controllers/auth.controller';
	import { displayErrorToast } from '$lib/scripts/toast.script';
	import { validateEmail, validatePassword } from '$lib/scripts/validation.script';
	import { Loader2 } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { InputPassword } from '$lib/components/form/input-password';
	import { InputText } from '$lib/components/form/input-text';

	const values = { name: '', email: '', password: '' };
	const errors = { name: '', email: '', password: '' };

	let isLoading = false;

	async function handleSubmit() {
		Object.entries(values).forEach(([key, value]) => {
			if (!value.trim()) {
				errors[key as keyof typeof values] = 'This field is required.';
			}
		});

		if (values.email && !validateEmail(values.email)) {
			errors.email = 'Please enter a valid email address.';
		}

		if (values.password && !validatePassword(values.password)) {
			errors.password =
				'The password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a digit and a special character.';
		}

		if (Object.values(errors).some((error) => error)) {
			return;
		}

		isLoading = true;

		try {
			await signUp(values.email, values.password, values.name);
			await goto('/quiz');
			invalidate('supabase:auth');
		} catch (error) {
			handleError(error);
		}

		isLoading = false;
	}

	function handleError(error: any) {
		Object.entries(error).forEach(([key, value]) => {
			if (key in errors) {
				errors[key as keyof typeof errors] = value as string;
			} else {
				displayErrorToast(error[key]);
			}
		});
	}
</script>

<svelte:head>
	<title>Register | Synzo.</title>
</svelte:head>

<div class="space-y-6 grow">
	<div class="space-y-1.5">
		<h1 class="text-2xl font-semibold tracking-tight lg:text-3xl">Register</h1>
		<p class="text-sm text-muted-foreground lg:text-base">
			Fill in the form below to create a new account.
		</p>
	</div>

	<form class="space-y-6" on:submit|preventDefault={handleSubmit}>
		<div class="space-y-4">
			<InputText
				id="name"
				label="Full name"
				placeholder="Enter your full name"
				bind:value={values.name}
				bind:error={errors.name}
			/>

			<InputText
				id="email"
				label="Email address"
				placeholder="Enter your email address"
				bind:value={values.email}
				bind:error={errors.email}
			/>

			<InputPassword
				id="password"
				label="Password"
				placeholder="Choose a secure password"
				bind:value={values.password}
				bind:error={errors.password}
			/>
		</div>

		<Button class="w-full" type="submit" disabled={isLoading}>
			{#if isLoading}
				<Loader2 class="mr-2 h-5 w-5 animate-spin" />
			{/if}

			<span>Continue</span>
		</Button>
	</form>
</div>
