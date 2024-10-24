import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, user }, url }) {
	const courseId = url.searchParams.get('courseId');

	if (!courseId) {
		return json('Course ID is required.', { status: 400 });
	}

	if (!user) {
		return json('User is not authenticated.', { status: 401 });
	}

	const { data, error } = await supabase
		.from('notes')
		.select('id, content')
		.eq('course_id', courseId)
		.eq('user_id', user.id);

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
