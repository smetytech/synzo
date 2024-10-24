import type { ISkill } from '$lib/interfaces/skill.interface';

export interface ICourse {
	id: string;
	title: string;
}

export interface IExtendedCourse extends ICourse {
	content: string;
	author: string;
	skills: Array<ISkill>;
}
