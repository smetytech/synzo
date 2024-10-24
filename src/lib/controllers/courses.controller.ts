import type { ICourse } from '$lib/interfaces/course.interface';

export async function getCourses(subdomainId: string): Promise<Array<ICourse>> {
	const url = `/api/courses?subdomainId=${subdomainId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
