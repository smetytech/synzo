import type { PageServerLoad } from '../upload/$types';

export const load: PageServerLoad = async ({ locals }) => {
	try {
		const { data: subdomains, error } = await locals.supabase.from('subdomains').select('*');

		if (error) {
			return {
				subdomains: []
			};
		}

		return {
			subdomains
		};
	} catch (err) {
		return {
			subdomains: []
		};
	}
};
