import type { IDomain } from '$lib/interfaces/domain.interface';

export async function load({ fetch, params }) {
	const domain = await getDomain(params.domainId, fetch);

	return { domain };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getDomain(id: string, fetch: any): Promise<IDomain> {
	const url = `/api/domains/${id}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
