import type { RequestHandler } from '@sveltejs/kit';
import { generateSummary } from 'src/lib/scripts/llm.script';

// API endpoint handler
export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
    const { content, prompt } = await request.json();
    const createdTest = await generateSummary(content, prompt);
    return new Response(createdTest, { headers: { 'Content-Type': 'text/plain' } });
};
