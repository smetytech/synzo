import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, url }) {
	const userId = url.searchParams.get('userId');
	const courseId = url.searchParams.get('courseId');

	if (!userId) {
		return json('User ID is required.', { status: 400 });
	}

	if (!courseId) {
		return json('Course ID is required.', { status: 400 });
	}

	const { data, error } = await supabase
		.from('quizes')
		.select('id, user_id, course_id')
		.eq('user_id', userId)
		.eq('course_id', courseId);

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
export async function POST({ request, locals: { supabase }}) {
	const body = await request.json();

	if (!body.userId) {
		return json('User ID is required.', { status: 400 });
	}

	if (!body.courseId) {
		return json('Course ID is required.', { status: 400 });
	}

	if (!body.quiz) {
		return json('Quiz data is required.', { status: 400 });
	}

	const { data: quizData, error: quizError } = await supabase
		.from('quizes')
		.insert({
			user_id: body.userId,
			course_id: body.courseId
		})
		.single();

	if (quizError) {
		return json(quizError, { status: 500 });
	}

	const { data: quizInfoData, error: quizInfoError } = await supabase
		.from('quiz_information')
		.insert({
			quiz_id: quizData.id,
			...body.quiz
		});

	if (quizInfoError) {
		return json(quizInfoError, { status: 500 });
	}

	return json({ quizData, quizInfoData }, { status: 201 });
}
