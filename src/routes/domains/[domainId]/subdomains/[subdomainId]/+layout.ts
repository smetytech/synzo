import type { ISubdomain } from '$lib/interfaces/subdomain.interface';

export async function load({ fetch, params }) {
	const subdomain = await getSubdomain(params.subdomainId, fetch);

	return { subdomain };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getSubdomain(id: string, fetch: any): Promise<ISubdomain> {
	const url = `/api/subdomains/${id}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
