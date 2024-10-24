import type { ISkill } from '$lib/interfaces/skill.interface';

export interface ICourse {
	id: string;
	content: string;
}

export interface IExtendedCourse extends ICourse {
	skills: Array<ISkill>;
}
