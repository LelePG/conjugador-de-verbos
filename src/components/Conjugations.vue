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
		<p v-if="error">{{ error }}</p>
		<ul v-else>
			<PersonConjugation person="yo" :answer="verbalPeople.yo.conjugation" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="tú" :answer="verbalPeople.tu.conjugation" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="él/ella/usted" :answer="verbalPeople.usted.conjugation" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="nosotros/nosotras" :answer="verbalPeople.nosotros.conjugation" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="vosotros/vosotras" :answer="verbalPeople.vosotros.conjugation" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
			<PersonConjugation person="ellos/ellas/ustedes" :answer="verbalPeople.ustedes.conjugation" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" />
		</ul>
		<b-button v-if="!error" class="bg-primary text-dark" block @click="verificaResposta"> Verificar
		</b-button>
	</div>
</template>

<script>

import { mapGetters } from "vuex";
import PersonConjugation from "./PersonConjugation.vue";

const SpanishVerbs = require('spanish-verbs');

export default {
	props: ["verbalTense", "verb"],
	components: {
		PersonConjugation,
	},
	data: function () {
		return {
			verifyAnswers: false,
			showAnswer: false,
			error: "",
			verbalPeople: {
				yo: { person: 0 },
				tu: { person: 1 },
				usted: { person: 2 },
				nosotros: { person: 3 },
				vosotros: { person: 4 },
				ustedes: { person: 5 },
			},
		};
	},
	computed: {
		...mapGetters(["getAuxVerb", "getCurrentVerbalTense"]),
		auxVerb: function () {
			return this.getAuxVerb
		},
	},
	watch: {
		'getCurrentVerbalTense': function () {
			this.showAnswer = false
			this.updateVerb()
		}
	},
	methods: {
		verificaResposta: function () {
			this.verifyAnswers = !this.verifyAnswers;
		},
		updateVerb: function () {
			try {
				for (let verbalPerson of Object.values(this.verbalPeople)) {
					const conjugationFromAPI = SpanishVerbs.getConjugation(this.verb?.name?.trim(), 
					this.verbalTense?.trim(), verbalPerson.person);
					verbalPerson.conjugation = conjugationFromAPI;
				}
			} catch (e) {
				this.error = `Houve um problema com o verbo ${this.verb.name} e ele não pode ser conjugado.\nVerifique a digitação dele na tela inicial e tente novamente.`
				console.log(e)
			}
		},
	},
	created: function () {
		this.updateVerb();
	}
};
</script>

<style>
.border-with-width-lg {
	border: 4px solid;
}

.custom-width {
	width: auto;
	max-width: 300px;
}

ul {
	list-style-type: none;
}
</style>
