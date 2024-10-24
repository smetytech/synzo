import type { RequestHandler } from '@sveltejs/kit';
import { generateTest } from 'src/lib/scripts/llm.script';

// API endpoint handler
export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
    const { content } = await request.json();
    const createdTest = await generateTest(content);
    return new Response(createdTest, { headers: { 'Content-Type': 'text/plain' } });
};
