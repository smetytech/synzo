import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, request }) {
	const { subdomainId } = await request.json();

	if (!subdomainId) {
		return json('Subdomain ID is required.', { status: 400 });
	}

	const { data, error } = await supabase
		.from('courses')
		.select('id, title, content, author')
		.eq('subdomain_id', subdomainId);

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
