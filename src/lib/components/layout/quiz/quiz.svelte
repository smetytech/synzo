<script lang="ts">
	import { generateTest } from "$lib/controllers/llm.controller";
	import { onMount } from "svelte";

    let questions = [];
    $: questions;
    // Load the domains when the component mounts
    onMount( async () => {
        questions = await generateTest("Tehnici de programare Capitolul 3 Octombrie 2018 Danciu Gabriel Jurnalizare • Definitie: inregistrarea actiunilor utilizatorilor, a raspunsului aplicatiei la aceste actiuni, a exceptiilor aparute in cadrul unui scenariu si in general a starii aplicatiei in timpul utilizarii • Poate fi realizata prin simpla afisare a datelor de mai sus la consola sau intr-un fisier de tip text. • Pentru o afisare a mesajelor mai complexa se pot utiliza biblioteci care permit diferite nivele de logare: trace/debug/info/warn/error • Exemple de biblioteci pentru a formata fisierul de log: • Log4j • java.util.logging • Log4Net • Nlog • log4cplus Hands on: Adaugati in proiectul dvs cel putin trei use case –uri in care exceptiile sunt logate Unitati de testare • Definitie: o metoda de testare software prin care sunt apelate anumite functionalitati din aplicatie pentru a determina daca acestea sunt corespunzatoare • Pasi: • Se alege o biblioteca de unit testing: Junit, Jtest, Nunit • Se creeza obiecte de mock (pentru a umple partile lipsa ale aplicatiei) • Recomandari : • Testele sunt scrise inainte de a scrie codul functional • Toate clasele din aplicatie sunt testate • Mituri false: • Testele astea necesita timp, sunt foarte algomerat(a) • Codul meu este beton! N-am nevoie de teste Hands on: Adaugati in proiectul dvs cel putin trei unitati de testare a functionalitatilor de baza Bug - tracking • Definitie: o aplicatie de tip bug-tracking permite inregistrarea tuturor bug-urilor detectate in timpul dezvoltarii unui proiect. Poate fi vazuta ca o baza de date a tuturor problemelor detectate. • Aplicatii open source: • BugZilla • Pivotal • Redmine • Mituri false • Toate (100%) defectele trebuie identificate si reparate • Testerii sunt responsabili de erorile din productie • Testele automatizate vor inregistra toate erorile • Erorile sunt rele Hands on: Adaugati pentru proiectul dvs un sistem de bug-tracking. Inregistrati-va erorile, iar cand acestea sunt rezolvate, marcati-le ca atare.");
    })
  </script>
  
  <main>
    <h1>Domains List</h1>
  
    {#if questions.length > 0}
      <ul>
        {#each questions as question}
          <li>{question.question}</li>
          <li>{question.options.join(", ")}</li>
          <li>{question.answer}</li>
        {/each}
      </ul>
    {:else}
      <p>No questions found.</p>
    {/if}
  </main>