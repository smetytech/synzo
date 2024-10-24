import type { PageServerLoad } from '../upload/$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { data: subdomains, error } = await locals.supabase.from('subdomains').select('*');

	if (error) {
		return { toast: error, subdomains: [] };
	}

	return {
		subdomains
	};
};
