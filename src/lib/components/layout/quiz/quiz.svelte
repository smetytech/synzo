<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import type { IQuestion } from '$lib/interfaces/question.interface';
	import { updateAnswerById } from '$lib/controllers/quiz.controller';
	import { generateSummary } from '$lib/controllers/llm.controller';
	import { marked } from 'marked';
	import { Skeleton } from "$lib/components/ui/skeleton";

	export let questions: IQuestion[];
	console.log(questions);
	export let courseContent: string;
	let selectedAnswers: Array<string> = [];
	let isSubmitAnswers = false;
	let userHasSubmited = false;
	let correctAnswers = 0;
	let index = 0;
	const questionsPerPage = 1;
	let wrongAnswers = "";
	let llmResponse: string = "";
	$: llmResponse;

	$: paginatedQuestions = questions.slice(index * questionsPerPage, (index + 1) * questionsPerPage);

	onMount(async () => {
		selectedAnswers = Array(questions.length).fill('');
	});

	function registerAnswer(option: string) {
		if (isSubmitAnswers) {
			return;
		}
		selectedAnswers[index] = option;
	}

	async function submitAnswers() {
		questions.forEach((question, index) => {
			if (selectedAnswers[index] === question.correct_answer) {
				correctAnswers += 1;
			}
			else{
				wrongAnswers += `Question: ${question.question}\nOption 1: ${question.option1}\nOption 2: ${question.option2}\nOption 3: ${question.option3}\nOption 4: ${question.option4}\nCorrect Answer: ${question.correct_answer}\nUser Answer: ${selectedAnswers[index]}`;
			}
		});
		updateUserAnswer();
		if(wrongAnswers !== "")
		{
			const res = await generateSummary(courseContent, wrongAnswers);
			llmResponse=res;
		}
		userHasSubmited = true;

	}
	async function updateUserAnswer() {
		try {
			const res = await updateAnswerById(questions[index].id, selectedAnswers[index]);
			if (!res) {
				throw new Error('Failed to update answer');
			}
		} catch (error) {
			console.error('Error updating answer:', error);
		}
	}
	async function nextPage() {
		isSubmitAnswers = true;

		setTimeout(() => {
			if ((index + 1) * questionsPerPage < questions.length) {
				index += 1;
				isSubmitAnswers = false;
			}
		}, 1000);
		updateUserAnswer();
		console.log(selectedAnswers);
	}

	function prevPage() {
		if (index > 0) {
			index -= 1;
		}
	}
</script>

<div class="flex flex-col items-center w-full gap-y-4 mt-4">
	<h1 class="text-3xl">⚡Flash Quizzz⚡</h1>

	{#if questions.length > 0}
		{#if !userHasSubmited}
			<ul class="flex flex-col items-center">
				{#each paginatedQuestions as question}
					<li class="text-2xl">{index + 1}. {question.question}</li>
					<div class="flex flex-col items-center mt-4 gap-y-4">
						{#each [question.option1, question.option2, question.option3, question.option4] as option, i}
							{#if option}
								<Button
									class="{option === selectedAnswers[index]
										? 'bg-muted-foreground'
										: 'bg-foreground'} {isSubmitAnswers
										? option === selectedAnswers[index]
											? option === question.correct_answer
												? '!bg-primary'
												: 'bg-red-300'
											: ''
										: ''} w-[800px] h-[80px] text-xl justify-start hover:bg-muted-foreground"
									on:click={() => registerAnswer(option)}
								>
									<div class="flex flex-row items-center text-center gap-x-8">
										<span
											class="bg-[#EDE8E3] rounded-full w-[48px] h-[48px] flex items-center justify-center"
										>
											{i + 1}.
										</span>
										<span class="flex-wrap break-words">{option}</span>
									</div>
								</Button>
							{/if}
						{/each}
					</div>
				{/each}
			</ul>
			<div class="flex w-[56%] justify-end text-xl">
				{#if index == questions.length - 1}
					<Button on:click={submitAnswers} disabled={selectedAnswers.includes('')}>Submit</Button>
				{:else}
					<Button
						class="gap-x-2"
						on:click={nextPage}
						disabled={(index + 1) * questionsPerPage >= questions.length}
						>Next <svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
						>
					</Button>
				{/if}
			</div>
		{:else}
			<div class="flex flex-col items-center gap-y-4">
				<span>You have correctly answered: {correctAnswers}/{questions.length}</span>
				<span class="gap-x-4 mb-4">{@html marked(llmResponse)}</span>
			</div>
		{/if}
	{:else}
	<div class="flex flex-col items-center space-x-4 mb-4">
		<div>
			<span> Generating quiz... </span>
		</div>
		<div class="space-y-2">
		  <Skeleton class="h-4 w-[250px] bg-[#C0C0C0]" />
		  <Skeleton class="h-4 w-[200px] bg-[#C0C0C0]" />
		</div>
	  </div>
	{/if}
</div>
