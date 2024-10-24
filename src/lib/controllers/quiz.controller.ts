import type { IQuestion } from "../interfaces/question.interface";

export async function storeGeneratedQuiz(courseId: string, quiz: Array<IQuestion>){
	const url = '/api/quizes';
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' };
	const body = JSON.stringify({ courseId, quiz });

	const response = await fetch(url, { method, headers, body });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}

export async function updateAnswerById(questionId: string, user_answer: string): Promise<Array<IQuestion>> {
	const url = `/api/quizes`;
	const method = 'PUT';
	const headers = { 'Content-Type': 'application/json' };
	const body = JSON.stringify({ questionId, user_answer });

	const response = await fetch(url, { method, headers, body });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}


export async function getQuizById(quizId: string): Promise<Array<IQuestion>> {
	const url = `/api/quizes/${quizId}`;
	const method = 'GET';
	const headers = { 'Content-Type': 'application/json' };

	const response = await fetch(url, { method, headers });
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}

	return data;
}
