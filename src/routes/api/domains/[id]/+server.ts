import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, params }) {
	const { data, error } = await supabase.from('domains').select('id, name').eq('id', params.id);

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
