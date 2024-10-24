import type { ISubdomain } from '$lib/interfaces/subdomain.interface';

export async function getSubdomains(domainId: string): Promise<Array<ISubdomain>> {
	const url = '/api/subdomains';
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };
	const body = JSON.stringify({ domainId });

	const response = await fetch(url, { method, headers, body });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}

export async function getSubdomain(id: string): Promise<ISubdomain> {
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
