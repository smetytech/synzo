export async function load({ locals }) {
	const { data: subdomains, error } = await locals.supabase.from('subdomains').select('*');

	if (error) {
		return { toast: error, subdomains: [] };
	}

	return { subdomains };
}
