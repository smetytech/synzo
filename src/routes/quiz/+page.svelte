<script lang="ts">
	import { X } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let questions = [
		{
			question: 'When learning something new, which method is most comfortable for you?',
			options: [
				'Watching a diagram or a visual presentation.',
				'Listening to someone explain the topic.',
				'Reading information from a book or article.',
				'Doing a practical activity related to the topic.'
			]
		},
		{
			question: 'How do you best remember information?',
			options: [
				'By reviewing images or charts.',
				'By listening to audio recordings or recalling conversations.',
				'By looking over notes or the texts you studied.',
				'Doing a practical activity related to the topic.'
			]
		},
		{
			question: 'If you have to learn a chapter from a book, how do you prefer to prepare?',
			options: [
				'Looking for diagrams and illustrations to help you understand better.',
				'Reading the chapter aloud or listening to an audio recording.',
				'Taking notes and highlighting important passages.',
				'Applying the concepts in a practical way or doing exercises.'
			]
		},
		{
			question: 'When faced with a practical problem, how do you approach it?',
			options: [
				'You think of images, mind maps, or diagrams to better understand it.',
				'You try discussing the problem with someone to clarify your ideas.',
				'You look for written information or read instructions to find the solution.',
				'You try solving the problem directly by manipulating objects or simulating.'
			]
		},
		{
			question: 'How do you prefer to prepare for an exam?',
			options: [
				'Using mind maps or charts to summarize the information.',
				'Repeating the material out loud or discussing it with classmates.',
				'Reviewing and rewriting your notes or summaries.',
				'Doing practice exercises or simulations that mimic the exam.'
			]
		},
		{
			question: 'During a presentation, what helps you understand the information better?',
			options: [
				'The slides and images shown by the presenter.',
				'The way the presenter explains the topic orally.',
				'The written materials distributed during the presentation.',
				'Participating actively, perhaps by handling objects presented.'
			]
		},
		{
			question: 'When planning a vacation, how do you prefer to gather information?',
			options: [
				'Watching videos or looking at images of the destination.',
				'Listening to recommendations from friends about places to visit.',
				'Reading articles, travel guides, or reviews.',
				'Planning physical activities to do there (hiking, sports).'
			]
		},
		{
			question: 'What do you do when you receive a new device that you need to assemble or use?',
			options: [
				'You look at the diagram in the manual to understand how to assemble it.',
				'You like to listen to detailed instructions from someone else.',
				'You read the manual and follow the instructions step by step.',
				'You start assembling it right away and learn while putting it together.'
			]
		},
		{
			question: 'How do you prefer to spend your free time?',
			options: [
				'Watching movies or image galleries.',
				'Listening to music or podcasts.',
				'Reading books or articles online.',
				'Engaging in sports or physical activities.'
			]
		},
		{
			question: 'How do you best remember the name of someone you just met?',
			options: [
				'You remember the person’s facial features.',
				'You remember the name because you heard it several times.',
				'You write down the name or make a mental note of it.',
				'You remember the name because you shook hands.'
			]
		}
	];
	let isSubmitAnswers = false;
	let userHasSubmited = false;
	let userLearningStyle = null;
	let optionCounts = Array(questions.length).fill([0, 0, 0, 0]);
	let index = 0;
	const questionsPerPage = 1;
	$: paginatedQuestions = questions.slice(index * questionsPerPage, (index + 1) * questionsPerPage);
	function registerAnswer(questionIndex: number, optionIndex: number) {
		if (isSubmitAnswers) {
			return;
		}
		optionCounts[questionIndex][optionIndex] += 1;
		if (index + 1 < questions.length) index += 1;
		else {
			let maxCount = 0;
			let maxIndex = 0;
			for (let i = 0; i < optionCounts.length; i++) {
				for (let j = 0; j < optionCounts[i].length; j++) {
					if (optionCounts[i][j] > maxCount) {
						maxCount = optionCounts[i][j];
						maxIndex = j;
					}
				}
			}
			userLearningStyle = ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'][maxIndex];
			userHasSubmited = true;
		}
	}
</script>

<div class="flex flex-col items-center w-full gap-y-4 mt-4">
	<div class="flex flex-row justify-between w-[75%]">
		<div class="flex flex-row gap-x-4 items-center text-center">
			<img src="/assets/icons/synzo.svg" alt="synzo." class="h-12 w-12" />
			<span class="flex flex-col text-3xl">Synzo.</span>
		</div>
		<span
			class="flex flex-col text-[#BCE784] text-3xl justify-center justify-items-center text-4xl items-center text-center"
			>Discover Your Learning Style!</span
		>
		<Button class="flex flex-col rounded-full w-12 h-12"><X /></Button>
	</div>
	<div>
		{#if questions.length > 0}
			{#if !userLearningStyle}
				<ul class="flex flex-col items-center">
					{#each paginatedQuestions as question}
						<li class="text-2xl">{index + 1}. {question.question}</li>
						<div class="flex flex-col items-center mt-4 gap-y-4">
							{#each question.options as option, i}
								<Button
									class="w-[800px] h-[80px] text-xl justify-start hover:bg-muted-foreground"
									on:click={() => registerAnswer(index, i)}
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
			{:else}
				<div class="flex flex-col items-center gap-y-4 text-4xl">
					<span>You have completed the learning style quiz!</span>
					<span class="gap-x-4 mb-4">Your learning style is: {userLearningStyle}</span>
				</div>
			{/if}
		{/if}
	</div>
</div>
