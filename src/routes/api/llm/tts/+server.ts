import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { generateTTS } from 'src/lib/scripts/llm.script';

// API endpoint handler
export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
    const { content } = await request.json();
    const createdTTS = await generateTTS(content);
    console.log(createdTTS);

    return new Response(createdTTS, { headers: { 'Content-Type': 'text/plain' } });
};
