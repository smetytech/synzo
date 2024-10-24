import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase }, params }) {
	const course = await supabase
		.from('courses')
		.select('id, title, content, author')
		.eq('id', params.id)
		.single();

	if (course.error) {
		return json(course.error, { status: 500 });
	}

	const skills = await supabase
		.from('course_skills')
		.select('skills(id, name)')
		.eq('course_id', params.id);

	if (skills.error) {
		return json(skills.error, { status: 500 });
	}

	return json({ ...course.data, skills: skills.data.map((entry) => entry.skills) });
}
