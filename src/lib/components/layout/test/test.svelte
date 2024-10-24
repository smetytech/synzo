<script lang="ts">
	import type { IQuestion, IQuiz } from "$lib/interfaces/question.interface";
	import { generateTest } from "src/lib/controllers/llm.controller";
	import { Quiz } from "$lib/components/layout/quiz";
	import { storeGeneratedQuiz } from "$lib/controllers/quiz.controller";
	import type { IExtendedCourse } from "$lib/interfaces/course.interface";
	import Button from "$lib/components/ui/button/button.svelte";
	import { BookOpenCheck } from "lucide-svelte";

	let questionair: IQuiz;
    $: questionair;
	let isLoading = false;
	export let course: IExtendedCourse;

    async function generate(){
		isLoading = true;
		const questions = await generateTest(course.content)
		const res = await storeGeneratedQuiz(course.id, questions);
		questionair = res;
		isLoading = false;

	}

</script>

<div>
	<Button class="w-[50px] h-[50px] rounded-mg !bg-[#383A40] justify-items-center" on:click={() => generate()}>
		<BookOpenCheck class="h-8 w-6 stroke-white" />
	</Button>
	{#if isLoading}
		<Quiz questions={[]} courseContent={course.content}></Quiz>
	{:else}
		{#if questionair}
			<Quiz questions={questionair.quizInfoData} courseContent={course.content}></Quiz>
		{/if}
	{/if}
</div>