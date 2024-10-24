export async function generateTest(content: string){
    const url = `/api/llm/test`;
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ content });

	const response = await fetch(url, { method, headers, body});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};


export async function generateUML(content: string){
    const url = `/api/llm/uml`;
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ content });

	const response = await fetch(url, { method, headers, body});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};

export async function generateNote(content: string){
    const url = `/api/llm/note`;
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ content });

	const response = await fetch(url, { method, headers, body});
	const data = await response.json();

	if (!response.ok) {
		throw data;
	}
    return data;
};

export async function generateSummary(content: string, prompt: string){
    const url = `/api/llm/summary`;
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({ content, prompt });

	const response = await fetch(url, { method, headers, body});
	const data = await response.text();

	if (!response.ok) {
		throw data;
	}
    return data;
};