import type { ISubdomain } from '$lib/interfaces/subdomain.interface';

export async function getSubdomains(domainId: string): Promise<Array<ISubdomain>> {
	const url = `/api/subdomains?domainId=${domainId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
