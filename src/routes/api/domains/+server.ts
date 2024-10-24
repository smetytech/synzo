import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase } }) {
	const { data, error } = await supabase.from('domains').select('id, name');

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
