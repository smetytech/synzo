import type { IExtendedCourse } from '$lib/interfaces/course.interface';

export async function load({ fetch, params }) {
	const course = await getCourse(params.courseId, fetch);

	return { course };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getCourse(id: string, fetch: any): Promise<IExtendedCourse> {
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
