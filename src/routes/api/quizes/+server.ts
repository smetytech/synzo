import { json } from '@sveltejs/kit';
import type { IGeneratedQuestion } from 'src/lib/interfaces/question.interface';

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
export async function POST({ request, locals: { supabase, user }}) {
	const { courseId, quiz } = await request.json();

	if (!user) {
		return json('User is not authenticated.', { status: 400 });
	}

	if (!courseId) {
		return json('Course ID is required.', { status: 400 });
	}

	if (!quiz) {
		return json('Quiz data is required.', { status: 400 });
	}
	const { data: quizData, error: quizError } = await supabase
		.from('quizes')
		.insert([{
			user_id: user.id,
			course_id: courseId
		}])
		.select('id') // Ensure the ID is returned

	if (quizError) {
		return json("Error on uploading quiz: " + quizError.message, { status: 500 });
	}

	if (!quizData || quizData.length === 0) {
		return json("Failed to retrieve the new quiz ID.", { status: 500 });
	}

	const quizId = quizData[0].id;
	const quizQuestions = quiz.map((item: IGeneratedQuestion) => {
		return {
		  question: item.question,
		  quiz_id: quizId, 
		  option1: item.options[0],
		  option2: item.options[1],
		  option3: item.options[2],
		  option4: item.options[3],
		  correct_answer: item.answer,
		  user_answer: ""
		};
	  })
	const { data: quizInfoData, error: quizInfoError } = await supabase
		.from('quiz_information')
		.insert(quizQuestions)
		.select("*");

	if (quizInfoError) {
		return json(quizInfoError, { status: 500 });
	}

	return json({ quizId, quizInfoData }, { status: 201 });
}

export async function PUT({ locals: { supabase }, request }) {
	const { questionId, user_answer } = await request.json();
	
	if (!questionId) {
		return json('Quiz ID is required.', { status: 400 });
	}
	
	if (user_answer === undefined) {
		return json('User answer is required.', { status: 400 });
	}

	const { data, error } = await supabase
		.from('quiz_information')
		.update({ user_answer })
		.eq('id', questionId)
		.single();

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}