import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
	const formData = await request.formData();
	const file = formData.get('pdf') as File;
	const subdomain_id = formData.get('subdomain_id') as string;

	if (!file) {
		return json({ toast: 'No file uploaded' }, { status: 400 });
	}
	if (!subdomain_id) {
		return json({ toast: 'No subdomain selected' }, { status: 400 });
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const data = await pdf(buffer);

	if (!data.text || !data.info.Title || !data.info.Author) {
		return json({ toast: 'File not valid' }, { status: 400 });
	}

	const { data: course, error } = await supabase.from('courses').insert({
		title: data.info.Title,
		author: data.info.Author,
		content: data.text,
		created_at: new Date(),
		subdomain_id: subdomain_id
	});

	if (error) {
		return json({ toast: error }, { status: 500 });
	}

	return json({
		success: true
	});
};
