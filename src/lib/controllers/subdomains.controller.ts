import type { ISubdomain } from "../interfaces/subdomain.interface";

export async function fetchSubdomains(): Promise<Array<ISubdomain>>{
    const url = '/api/domains';
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};

export async function fetchSubdomainById(threadId: string): Promise<ISubdomain>{
    const url = `/api/domains/${threadId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};
