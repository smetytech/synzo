import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

// API endpoint handler
export const GET: RequestHandler = async ({ locals: { supabase }, url }) => {
  const courseId = url.searchParams.get('courseId');
  try {
    // Query the 'domains' table to get all domains
    const { data, error } = await supabase
      .from('courses')
      .select('id, content')
      .eq("id", courseId);

    if (error) {
      throw error;
    } else {
      const { data: skillsId, error: skillsIdError } = await supabase
        .from('course_skills')
        .select('course_id, skill_id')
        .eq("course_id", data.course_id);

      if(skillsIdError) {
        throw skillsIdError;
      } else {
        let courseSkills = [];
        for(let skillId of skillsId) {
          const { data: skills, data: skillsError } = await supabase
            .from('skills')
            .select('id, name')
            .eq("id", skillId);
          if(skillsError){
            throw skillsError;
          } else {
            courseSkills.push(skills);
          }
        }

        return json({...data, skills: courseSkills})

      }
    }
  } catch (error) {
    // Handle any errors that occur
    console.error('Error fetching courses:', error);
    return json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
};
