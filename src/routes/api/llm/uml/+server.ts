import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { generateUML } from 'src/lib/scripts/llm.script';

// API endpoint handler
export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
    const { content } = await request.json();
    const createdUML = await generateUML(content);
    console.log(createdUML);

    return new Response(createdUML, { headers: { 'Content-Type': 'text/plain' } });
};
