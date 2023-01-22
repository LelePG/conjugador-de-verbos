<template>
	<div class="conjugations mx-2 my-3 p-3 text-dark rounded-lg border-primary border-with-width-lg custom-width">
		<div class="text-dark d-inline-flex w-100 justify-content-between align-items-center">
			<h5 class="m-0">{{ verb.name }} - {{ verb.translation }}</h5>
			<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bulb d-float float-right ml-1"
				width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" fill="none"
				stroke-linecap="round" stroke-linejoin="round" @click="showAnswer = !showAnswer">
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
				<line x1="9.7" y1="17" x2="14.3" y2="17" />
			</svg>
		</div>
		<p v-if="verb.error">Houve um problema com o verbo {{ this.verb.name }} e ele não pode ser conjugado.
			Verifique a digitação dele na tela inicial e tente novamente.</p>
		<ul v-else>
			<PersonConjugation person="yo" :answer="verbalPeople.yo" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="tú" :answer="verbalPeople.tu" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="él/ella/usted" :answer="verbalPeople.usted" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="nosotros/nosotras" :answer="verbalPeople.nosotros" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="vosotros/vosotras" :answer="verbalPeople.vosotros" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="ellos/ellas/ustedes" :answer="verbalPeople.ustedes" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
		</ul>
		<b-button v-if="!verb.error" class="bg-primary text-dark" block @click="verificaResposta"> Verificar
		</b-button>
	</div>
</template>

<script>
import PersonConjugation from "./PersonConjugation.vue";

export default {
	props: ["verb", "tense"],
	components: {
		PersonConjugation,
	},
	data: function () {
		return {
			verifyAnswers: false,
			showAnswer: false,
			verbalPeople: {
				yo: [],
				tu: [],
				usted: [],
				nosotros: [],
				vosotros: [],
				ustedes: [],
			},
		};
	},
	methods: {
		verificaResposta: function () {
			this.verifyAnswers = !this.verifyAnswers;
		},
	},
	created: function () {
		this.verbalPeople = {
			yo: this.verb.conjugation[0],
			tu: this.verb.conjugation[1],
			usted: this.verb.conjugation[2],
			nosotros: this.verb.conjugation[3],
			vosotros: this.verb.conjugation[4],
			ustedes: this.verb.conjugation[5],
		}
	}
};
</script>

<style>
.border-with-width-lg {
	border: 4px solid;
}

.custom-width {
	width: auto;
	max-width: 500px;
}

ul {
	list-style-type: none;
}
</style>
