import type { SvelteComponent } from 'svelte';

export interface ILink {
	label: string;
	path: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon?: typeof SvelteComponent<any, any, any>;
}
