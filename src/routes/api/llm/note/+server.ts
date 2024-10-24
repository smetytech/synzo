import { json, type RequestHandler } from '@sveltejs/kit';
import { generateNote } from 'src/lib/scripts/llm.script';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
	const { content } = await request.json();
	const createdNote = await generateNote(content);
	return new Response(createdNote, { headers: { 'Content-Type': 'text/plain' } });
};

export async function GET({ locals: { supabase }, url }) {
	const courseId = url.searchParams.get('courseId');
	if (!courseId) {
		return json('Course ID is required.', { status: 400 });
	}

	const { data, error } = await supabase
		.from('note')
		.select('id, content, highlighted_content')
		.eq('course_id', courseId)

	if (error) {
		return json(error, { status: 500 });
	}

	return json(data);
}