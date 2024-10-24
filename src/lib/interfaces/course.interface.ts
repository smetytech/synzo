import { ISkill } from "./skill.interface";

export interface ICourse {
	id: string;
	content: string;
    skills: ISkill[];
}