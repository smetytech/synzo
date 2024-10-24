import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, params }) {
	const quizId = params.id;
	if (!quizId) {
		return json('Quiz ID is required.', { status: 400 });
	}

	const { data, error } = await supabase
		.from('quiz_information')
		.select('id, quiz_id, question, option1, option2, option3, option4, correct_answer, user_answer')
		.eq('quiz_id', quizId)

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}
