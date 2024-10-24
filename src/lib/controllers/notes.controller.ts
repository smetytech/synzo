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

export async function postNote(courseId: string, content: string, highlighted_content: string): Promise<INote> {
	const url = '/api/notes';
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' };
	const body = JSON.stringify({
		courseId,
		content,
		highlighted_content,
	});

	const response = await fetch(url, { method, headers, body });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}