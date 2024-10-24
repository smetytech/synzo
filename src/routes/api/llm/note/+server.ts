import type { RequestHandler } from '@sveltejs/kit';
import { generateNote } from 'src/lib/scripts/llm.script';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
	const { content } = await request.json();
	const createdNote = await generateNote(content);
	return new Response(createdNote, { headers: { 'Content-Type': 'text/plain' } });
};
