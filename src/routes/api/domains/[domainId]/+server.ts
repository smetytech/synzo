import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// API endpoint handler
export const GET: RequestHandler = async ({ locals: { supabase }, url }) => {
  const domainId = url.searchParams.get('domainId');
  try {
    // Query the 'domains' table to get all domains
    const { data, error } = await supabase
      .from('domains')
      .select('id, name')
      .eq('id', domainId);

    if (error) {
      throw error;
    }

    // Return the data as JSON
    return json(data);
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching domains:', error);
    return json({ error: 'Failed to fetch domains' }, { status: 500 });
  }
};