import { ISkill } from "./skill.interface";

export interface ICourse {
	id: string;
	content: string;
	subdomain_id: string;
    skills: ISkill[];
}