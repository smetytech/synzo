import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, params }) {
	const { id } = params;

	// Fetch thread details
	let threadQuery = supabase.from('threads').select('id, name').eq("id", id).single();
	const { data: threadData, error: threadError } = await threadQuery;

	if (threadError) {
		return json(threadError, { status: 500 });
	}

	// Fetch thread messages
	let messagesQuery = supabase.from('thread_messages').select('*').eq("thread_id", id);
	const { data: messagesData, error: messagesError } = await messagesQuery;

	if (messagesError) {
		return json(messagesError, { status: 500 });
	}

	// Fetch user details for each message
	const userIds = messagesData.map(message => message.user_id);
	const uniqueUserIds = [...new Set(userIds)];
	let usersQuery = supabase.from('users').select('id, display_name').in('id', uniqueUserIds);
	const { data: usersData, error: usersError } = await usersQuery;

	if (usersError) {
		return json(usersError, { status: 500 });
	}

	// Map user details to messages
	const usersMap = Object.fromEntries(usersData.map(user => [user.id, user.display_name]));
	const messagesWithUserNames = messagesData.map(message => ({
		...message,
		user_name: usersMap[message.user_id]
	}));

	return json({ thread: threadData, messages: messagesWithUserNames });
}
