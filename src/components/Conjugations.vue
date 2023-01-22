<template>
	<div class="conjugations mx-2 my-3 p-3 text-dark rounded-lg border-primary border-with-width-lg custom-width">

		<div class="text-dark d-inline-flex w-100 justify-content-between align-items-center">
			<h5 class="m-0">{{ verb.name }} - {{ verb.translation }}</h5>
			<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bulb d-float float-right ml-1"
				width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#3c271f" fill="none"
				stroke-linecap="round" stroke-linejoin="round" @click="showAnswer = !showAnswer">
				<path stroke="none" d="M0 0h24v24H0z" fill="none" />
				<path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
				<line x1="9.7" y1="17" x2="14.3" y2="17" />
			</svg>
		</div>

		<p v-if="verb.error">Houve um problema com o verbo {{ this.verb.name }} e ele não pode ser conjugado.
			Verifique a digitação dele na tela inicial e tente novamente.</p>

		<ul v-else>
			<PersonConjugation :data="verbalPeople.yo" :showAnswer="showAnswer" :correctConjugation="verifyAnswers"
				:changeFocusToNextInput="changeFocusToNextInput" />
			<PersonConjugation :data="verbalPeople.tu" :showAnswer="showAnswer" :correctConjugation="verifyAnswers"
				:changeFocusToNextInput="changeFocusToNextInput" />
			<PersonConjugation :data="verbalPeople.usted" :showAnswer="showAnswer" :correctConjugation="verifyAnswers"
				:changeFocusToNextInput="changeFocusToNextInput" />
			<PersonConjugation :data="verbalPeople.nosotros" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" :changeFocusToNextInput="changeFocusToNextInput" />
			<PersonConjugation :data="verbalPeople.vosotros" :showAnswer="showAnswer"
				:correctConjugation="verifyAnswers" :changeFocusToNextInput="changeFocusToNextInput" />
			<PersonConjugation :data="verbalPeople.ustedes" :showAnswer="showAnswer" :correctConjugation="verifyAnswers"
				:changeFocusToNextInput="changeFocusToNextInput" />
		</ul>

		<b-button v-if="!verb.error" class="bg-primary text-dark" block @click="verifyAnswers = !verifyAnswers"> Verificar
		</b-button>

	</div>
</template>

<script>
import PersonConjugation from "./PersonConjugation.vue";

export default {
	props: ["verb"],
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
		changeFocusToNextInput: function (e) {
			let id = +e.target.id
			const allInputs = this.$el.querySelectorAll("input");
			if (e.code === "ArrowDown") {
				if (id >= 0 && id < allInputs.length - 1) {
					allInputs[id + 1].focus()
				}
			} else if (e.code === "ArrowUp") {
				if (id > 0 && id < allInputs.length) {
					allInputs[id - 1].focus();
				}
			}
		},
	},
	created: function () {
		this.verbalPeople = {
			yo: { person: "yo", id: 0, conjugation: this.verb.conjugation[0] },
			tu: { person: "tú", id: 1, conjugation: this.verb.conjugation[1] },
			usted: { person: "él/ella/usted", id: 2, conjugation: this.verb.conjugation[2] },
			nosotros: { person: "nosotros/nosotras", id: 3, conjugation: this.verb.conjugation[3] },
			vosotros: { person: "vosotros/vosotros", id: 4, conjugation: this.verb.conjugation[4] },
			ustedes: { person: "ellos/ellas/ustedes", id: 5, conjugation: this.verb.conjugation[5] },
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
