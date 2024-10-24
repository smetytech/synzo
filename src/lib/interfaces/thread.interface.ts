export interface IThreadMessage {
	id: string;
	message: string;
	thread_id: string;
	user: {
		display_name: string;
	}
	created_at: string;
}

export interface IThread {
	id: string;
	name: string;
	messages: IThreadMessage[];
}