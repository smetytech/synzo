import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, request }) {
	const { domainId, subdomainId, courseId } = await request.json();

	let query = supabase.from('threads').select('id, name');

	if (domainId) {
		query = query.eq('domain_id', domainId);
	} else if (subdomainId) {
		query = query.eq('subdomain_id', subdomainId);
	} else if (courseId) {
		query = query.eq('course_id', courseId);
	}

	const { data, error } = await query;

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
