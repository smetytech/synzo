import type { IThread } from '$lib/interfaces/thread.interface';

export async function getTreads(): Promise<Array<IThread>> {
	const url = '/api/threads';
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}


export async function getTreadByUserId(): Promise<Array<IThread>> {
	const url = `/api/threads/user`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}


export async function getTreadById(threadId: string): Promise<IThread> {
	const url = `/api/threads/${threadId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
