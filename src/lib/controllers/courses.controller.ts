import type { ICourse } from "$lib/interfaces/course.interface";

export async function fetchCourses(domainId: string, subDomainId: string): Promise<Array<ICourse>>{
    const url = `/api/domains/${domainId}/subdomains/${subDomainId}/courses`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};

export async function fetchCourseById(domainId: string, subDomainId: string, courseId: string): Promise<ICourse>{
    const url = `/api/domains/${domainId}/subdomains/${subDomainId}/courses/${courseId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};
