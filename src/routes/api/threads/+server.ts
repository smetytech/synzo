import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, user } }) {
	if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
	
	let query = supabase.from('threads').select('id, name').eq("user_id", user.id);

	const { data, error } = await query;

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
