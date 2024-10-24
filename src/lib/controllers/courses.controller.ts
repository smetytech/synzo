import type { ICourse, IExtendedCourse } from '$lib/interfaces/course.interface';

export async function getCourses(subdomainId: string): Promise<Array<ICourse>> {
	const url = '/api/courses/';
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };
	const body = JSON.stringify({ subdomainId });

	const response = await fetch(url, { method, headers, body });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}

export async function getCourse(id: string): Promise<IExtendedCourse> {
	const url = `/api/courses/${id}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
