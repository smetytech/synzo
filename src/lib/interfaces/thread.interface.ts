export interface IThreadMessage {
	id: string;
	message: string;
	created_at: string;
	user: {
		display_name: string;
	};
}

export interface IThread {
	id: string;
	name: string;
	messages: IThreadMessage[];
}
