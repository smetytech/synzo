import type { IDomain } from "$lib/interfaces/domain.interface";

export async function fetchDomains(): Promise<Array<IDomain>>{
    const url = `/api/domains`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};

export async function fetchDomainById(domainId: string, subDomainId: string): Promise<IDomain>{
    const url = `/api/domains/${domainId}/subdomains/${subDomainId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};
