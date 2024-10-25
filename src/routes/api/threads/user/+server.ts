import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, user } }) {
	if(!user) return json({ error: 'Unauthorized' }, { status: 401 });

	const { data, error } = await supabase
		.from('threads')
		.select('id, name')
		.eq('user_id', user.id)

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
