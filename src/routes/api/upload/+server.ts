// src/routes/upload/+server.ts
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
    return json({ error: 'No file uploaded' }, { status: 400 });
  }
  if (!subdomain_id) {
    return json({ error: 'No subdomain selected' }, { status: 400 });
  }

  // Validate that the subdomain exists
  const { data: subdomainData, error: subdomainError } = await supabase
    .from('subdomains')
    .select('id')
    .eq('id', subdomain_id)
    .single();

  if (subdomainError || !subdomainData) {
    return json({ error: 'Invalid subdomain selected' }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const data = await pdf(buffer);

    if (!data.text || !data.info.Title || !data.info.Author || !data.info.Keywords) {
      return json({ error: 'File not valid' }, { status: 400 });
    }

    const { data: course, error } = await supabase.from('courses').insert({
      title: data.info.Title,
      author: data.info.Author,
      content: data.text,
      created_at: new Date(),
      subdomain_id: subdomain_id
    });

    if (error) {
      console.error('Error inserting course:', error);
      return json({ error: 'Failed to create course: ' + error.message }, { status: 500 });
    }

    return json({
      text: data.text
    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    return json({ error: 'Failed to parse PDF' }, { status: 500 });
  }
};
