declare global {
	namespace App {
		interface Locals {
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			supabase: SupabaseClient;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			supabase: SupabaseClient;
			session: Session | null;
			user: User | null;
		}
	}
}

export {};
