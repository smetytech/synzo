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