import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, request }) {
	const { domainId } = await request.json();

	if (!domainId) {
		return json('Domain ID is required.', { status: 400 });
	}

	const { data, error } = await supabase
		.from('subdomains')
		.select('id, name')
		.eq('domain_id', domainId);

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}