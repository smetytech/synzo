import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// API endpoint handler
export const GET: RequestHandler = async ({ locals: { supabase }, url }) => {
  const domainId = url.searchParams.get('domainId');
  const subdomainId = url.searchParams.get('subdomainId');
  const courseId = url.searchParams.get('courseId');

  try {
    let query = supabase.from('threads').select('id, name');

    if (domainId) {
      query = query.eq('domain_id', domainId);
    } else if (subdomainId) {
      query = query.eq('subdomain_id', subdomainId);
    } else if (courseId) {
      query = query.eq('course_id', courseId);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    // Return the data as JSON
    return json(data);
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching threads:', error);
    return json({ error: 'Failed to fetch threads' }, { status: 500 });
  }
};
