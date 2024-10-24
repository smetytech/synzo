<script lang="ts">
    import { generateTest } from '$lib/controllers/llm.controller';
    import Button from 'src/lib/components/ui/button/button.svelte';
    import { onMount } from 'svelte';

    type Question = {
        question: string;
        options: string[];
        answer: string;
    };
    
    let questions: Question[] = [
        {
            question: 'Ce este jurnalizarea in programare?',
            options: [
                'Inregistrarea actiunilor utilizatorilor',
                'Formatarea fisierelor de log',
                'Utilizarea bibliotecilor de unit testing',
                'Inregistrarea defectelor in aplicatii'
            ],
            answer: 'Inregistrarea actiunilor utilizatorilor'
        },
        {
            question: 'Ce biblioteci pot fi utilizate pentru a forma fisierul de log?',
            options: ['Log4j', 'java.util.logging', 'Log4Net', 'Nlog', 'log4cplus'],
            answer: 'Log4j'
        },
        {
            question: 'Ce este unitatea de testare in programare?',
            options: [
                'O metoda de testare software prin care sunt apelate anumite functionalitati din aplicatie',
                'O metoda de formatare a fisierelor de log',
                'O metoda de inregistrare a defectelor in aplicatii',
                'O metoda de gestionare a actiunilor utilizatorilor'
            ],
            answer:
                'O metoda de testare software prin care sunt apelate anumite functionalitati din aplicatie'
        },
        {
            question: 'Ce este un sistem de bug-tracking?',
            options: [
                'O aplicatie de tip bug-tracking permite inregistrarea tuturor bug-urilor detectate in timpul dezvoltarii unui proiect',
                'O biblioteca de unit testing',
                'O metoda de formatare a fisierelor de log',
                'O metoda de gestionare a actiunilor utilizatorilor'
            ],
            answer:
                'O aplicatie de tip bug-tracking permite inregistrarea tuturor bug-urilor detectate in timpul dezvoltarii unui proiect'
        },
        {
            question: 'Ce este fals despre testele automatizate?',
            options: [
                'Testele automatizate vor inregistra toate erorile',
                'Testele automatizate sunt rapide si eficiente',
                'Testele automatizate sunt dificile de implementat',
                'Erorile sunt rare in aplicatiile bine construite'
            ],
            answer: 'Testele automatizate vor inregistra toate erorile'
        }
    ];
    let selectedAnswer: string[] = [];
    $: selectedAnswer;
    let currentPage = 0;
    const questionsPerPage = 1;

    let isCorrectAnswerColor = 'bg-[#BCE784]';
    let isIncorrectAnswerColor = 'bg-[#F23F42]';
    $: selectedAnswerColor = 'bg-[#F4F3F6]';
    $: paginatedQuestions = questions.slice(
        currentPage * questionsPerPage,
        (currentPage + 1) * questionsPerPage
    );

    onMount(async () => {
        //questions = await generateTest("Tehnici de programare Capitolul 3 Octombrie 2018 Danciu Gabriel Jurnalizare • Definitie: inregistrarea actiunilor utilizatorilor, a raspunsului aplicatiei la aceste actiuni, a exceptiilor aparute in cadrul unui scenariu si in general a starii aplicatiei in timpul utilizarii • Poate fi realizata prin simpla afisare a datelor de mai sus la consola sau intr-un fisier de tip text. • Pentru o afisare a mesajelor mai complexa se pot utiliza biblioteci care permit diferite nivele de logare: trace/debug/info/warn/error • Exemple de biblioteci pentru a formata fisierul de log: • Log4j • java.util.logging • Log4Net • Nlog • log4cplus Hands on: Adaugati in proiectul dvs cel putin trei use case –uri in care exceptiile sunt logate Unitati de testare • Definitie: o metoda de testare software prin care sunt apelate anumite functionalitati din aplicatie pentru a determina daca acestea sunt corespunzatoare • Pasi: • Se alege o biblioteca de unit testing: Junit, Jtest, Nunit • Se creeza obiecte de mock (pentru a umple partile lipsa ale aplicatiei) • Recomandari : • Testele sunt scrise inainte de a scrie codul functional • Toate clasele din aplicatie sunt testate • Mituri false: • Testele astea necesita timp, sunt foarte algomerat(a) • Codul meu este beton! N-am nevoie de teste Hands on: Adaugati in proiectul dvs cel putin trei unitati de testare a functionalitatilor de baza Bug - tracking • Definitie: o aplicatie de tip bug-tracking permite inregistrarea tuturor bug-urilor detectate in timpul dezvoltarii unui proiect. Poate fi vazuta ca o baza de date a tuturor problemelor detectate. • Aplicatii open source: • BugZilla • Pivotal • Redmine • Mituri false • Toate (100%) defectele trebuie identificate si reparate • Testerii sunt responsabili de erorile din productie • Testele automatizate vor inregistra toate erorile • Erorile sunt rele Hands on: Adaugati pentru proiectul dvs un sistem de bug-tracking. Inregistrati-va erorile, iar cand acestea sunt rezolvate, marcati-le ca atare.");
        selectedAnswer = Array(questions.length).fill("");
    });

    function registerAnswer(option: string, index: number, correctAnswer: string) {
        selectedAnswer[index] = option;
        if(selectedAnswer[index] === correctAnswer){
            selectedAnswerColor = isCorrectAnswerColor;
        } else {
            selectedAnswerColor = isIncorrectAnswerColor;
        }
    }

    function submitAnswers() {
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (selectedAnswer[index] === question.answer) {
                correctAnswers += 1;
            }
        });
        console.log(`Correct Answers: ${correctAnswers} out of ${questions.length}`);
    }

    function nextPage() {
        if ((currentPage + 1) * questionsPerPage < questions.length) {
            currentPage += 1;
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage -= 1;
        }
    }
</script>

<div class="flex flex-col items-center w-full gap-y-4 mt-4">
    <h1 class="text-3xl">⚡Flash Quizzz⚡</h1>

    {#if questions.length > 0}
        <ul class="flex flex-col items-center">
            {#each paginatedQuestions as question}
                <li class="text-2xl">{currentPage + 1}. {question.question}</li>
                <div class="flex flex-col items-center mt-4 gap-y-4">
                    {#each question.options as option, index}
                        <Button 
                            class="w-[800px] h-[80px] text-xl justify-start {selectedAnswer[currentPage] === option ? selectedAnswerColor : 'bg-[#F4F3F6]'}" 
                            on:click={() => registerAnswer(option, currentPage, question.answer)}>
                            <div class="flex flex-row items-center text-center gap-x-8">
                                <span class="bg-[#EDE8E3] rounded-full w-[48px] h-[48px] flex items-center justify-center">{index + 1}. </span>
                                <span class="flex-wrap break-words">{option}</span>
                            </div>
                        </Button>
                    {/each}
                </div>
                <li>{question.answer}</li>
            {/each}
        </ul>
        <div class="text-xl">
            {#if currentPage > 0}
                <Button on:click={prevPage} disabled={currentPage === 0}>Previous</Button>
            {/if}
            {#if currentPage == questions.length - 1}
                <Button on:click={submitAnswers} disabled={selectedAnswer.includes("")}>Submit</Button>
            {:else}
                <Button
                    on:click={nextPage}
                    disabled={(currentPage + 1) * questionsPerPage >= questions.length}>Next</Button
                >
            {/if}
        </div>
    {:else}
        <p>No questions found.</p>
    {/if}
</div>
