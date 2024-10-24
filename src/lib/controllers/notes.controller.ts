import type { INote } from '$lib/interfaces/note.interface';

export async function getNotes(courseId: string): Promise<Array<INote>> {
	const url = `/api/notes?courseId=${courseId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
