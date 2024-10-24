import { PRIVATE_GROQ_API_KEY } from '$env/static/private';
import Groq from 'groq-sdk';

const MODEL = 'llama3-8b-8192';
const TEMPERATURE = 0;

const groq = new Groq({ apiKey: PRIVATE_GROQ_API_KEY });

const TEST_GENERATION_PROMPT = ``
const PLANT_UML_PROMPT = ``
const TTS_PROMPT = ``

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

export async function generateTTS(prompt: string) {
    const rephrasingResponse = await groq.chat.completions.create({
		model: MODEL,
		messages: [
			{ role: 'system', content: TTS_PROMPT },
			{ role: 'user', content: prompt }
		],
		stream: false,
		temperature: TEMPERATURE
	});
    return rephrasingResponse.choices[0].message.content;
}