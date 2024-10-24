import type { RequestHandler } from '@sveltejs/kit';
import { generateUML } from 'src/lib/scripts/llm.script';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const plantumlEncoder = require('plantuml-encoder');

// API endpoint handler
export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
    const { content } = await request.json();
    const createdTTS = await generateUML(content);
    return new Response('http://www.plantuml.com/plantuml/img/' + plantumlEncoder.encode(createdTTS), { headers: { 'Content-Type': 'text/plain' } });
};
