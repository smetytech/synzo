import { PRIVATE_GROQ_API_KEY } from '$env/static/private';
import Groq from 'groq-sdk';

const MODEL = 'llama-3.1-70b-versatile';
const TEMPERATURE = 0;
const TEST_GENERATION_PROMPT = `
You're an expert teacher that needs to generate a test for a student.
You will be given the content from a lesson and you need to generate a test based on that content.
You must give the output as a list of multiple objects, each object having the question, a list of options and the answer which will be a option from the list of options.
The output json format should look like this:
[{{
    "question": "Question",
    "options": ["option1", "option2", "option3", "option4"],
    "answer": "Answer"
}}]

You have to only generate the json object, without any other comments.
You have to generate at 5 questions.
Keep in mind that the anwer must the exactly one of the possible options.

This is the content:
`;
const PLANT_UML_PROMPT = `
You're an expert in generating UML diagrams using PlantUML. Your task is to convert the following course content into PlantUML format.

Output only the PlantUML code, without any explanations, comments, or additional text. No extra text needed, just PlantUML.
I dont want the user flow, i want only the UML code.

Before creating the UML, identify the best PlantUML diagram type to represent the provided content.
To not add any triple backticks for the plantuml.

To represent connections between 2 objects, you must use "-->" for dashed lines or "->" for solid lines. You dont need to specify the PlantUML diagram in the PlantUML text.
This is the content:
`;

const NOTE_GENERATION_PROMPT = `
You're an expert teacher that needs to generate a note for a student.
You will be given the content from a lesson and you need to generate a note based on that content.
Provide the response as text only, not markdown.

This is the content:
`;

const groq = new Groq({ apiKey: PRIVATE_GROQ_API_KEY });

export async function generateTest(prompt: string) {
	const rephrasingResponse = await groq.chat.completions.create({
		model: MODEL,
		messages: [
			{ role: 'system', content: TEST_GENERATION_PROMPT },
			{ role: 'user', content: prompt }
		],
		stream: false,
		temperature: TEMPERATURE
	});

	return rephrasingResponse.choices[0].message.content;
}

export async function generateUML(prompt: string) {
	const rephrasingResponse = await groq.chat.completions.create({
		model: MODEL,
		messages: [
			{ role: 'system', content: PLANT_UML_PROMPT },
			{ role: 'user', content: prompt }
		],
		stream: false,
		temperature: TEMPERATURE
	});
	return rephrasingResponse.choices[0].message.content;
}

export async function generateNote(prompt: string) {
	const rephrasingResponse = await groq.chat.completions.create({
		model: MODEL,
		messages: [
			{ role: 'system', content: NOTE_GENERATION_PROMPT },
			{ role: 'user', content: prompt }
		],
		stream: false,
		temperature: TEMPERATURE
	});

	return rephrasingResponse.choices[0].message.content;
}
