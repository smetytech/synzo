import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, params }) {
	const { data, error } = await supabase
		.from('subdomains')
		.select('id, name')
		.eq('id', params.id)
		.single();

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
