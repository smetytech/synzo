export interface IThreadMessage {
	id: string;
	message: string;
	thread_id: string;
	user_id: string
}

export interface IThread {
	id: string;
	name: string;
	domain_id: string;
	subdomain_id: string;
	course_id: string;
	messages: IThreadMessage[];
}