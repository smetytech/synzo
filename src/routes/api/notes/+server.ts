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

export async function POST({ request, locals: { supabase, user } }) {
	const { courseId, content, highlighted_content } = await request.json();

	if (!courseId) {
		return json('Course ID is required.', { status: 400 });
	}

	if (!content) {
		return json('Content is required.', { status: 400 });
	}

	if (!user) {
		return json('User is not authenticated.', { status: 401 });
	}

	const { data, error } = await supabase
		.from('notes')
		.insert({
			content: content,
			highlighted_content: highlighted_content,
			course_id: courseId,
			user_id: user.id
		});

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
