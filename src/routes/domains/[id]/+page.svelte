<script lang="ts">
	export let data;

	$: ({ name } = data.domain);
</script>

<svelte:head>
	<title>{name} | Synzo.</title>
</svelte:head>
