export interface IThreadMessage {
	id: string;
	message: string;
	created_at: string;
	user_id: string;
	user_name: string
}

export interface IThread {
	id: string;
	name: string;
	messages: IThreadMessage[];
}
