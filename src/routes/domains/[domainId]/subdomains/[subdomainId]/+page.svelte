<script lang="ts">
	export let data;

	$: ({ name } = data.subdomain);
</script>

<svelte:head>
	<title>{name} | Synzo.</title>
</svelte:head>
