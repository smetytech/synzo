<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';

	type Question = {
		question: string;
		options: string[];
		answer: string;
	};

  export let questions: Question[];

	let selectedAnswers: Array<string> = [];
	let isSubmitAnswers = false;

	let index = 0;
	const questionsPerPage = 1;

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

	function submitAnswers() {
		let correctAnswers = 0;

		questions.forEach((question, index) => {
			if (selectedAnswers[index] === question.answer) {
				correctAnswers += 1;
			}
		});

		console.log(`Correct Answers: ${correctAnswers} out of ${questions.length}`);
	}

	function nextPage() {
		isSubmitAnswers = true;

		setTimeout(() => {
			if ((index + 1) * questionsPerPage < questions.length) {
				index += 1;
				isSubmitAnswers = false;
			}
		}, 1000);
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
		<ul class="flex flex-col items-center">
			{#each paginatedQuestions as question}
				<li class="text-2xl">{index + 1}. {question.question}</li>
				<div class="flex flex-col items-center mt-4 gap-y-4">
					{#each question.options as option, i}
						<Button
							class="{option === selectedAnswers[index]
								? 'bg-muted-foreground'
								: 'bg-foreground'} {isSubmitAnswers
								? option === selectedAnswers[index]
									? option === question.answer
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
		<p>No questions found.</p>
	{/if}
</div>
