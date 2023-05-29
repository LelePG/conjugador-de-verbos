<template>
	<div class="bg-light pb-4">

		<div class="d-flex flex-column align-items-center text-dark pt-2">
			<h4 class="text-sm-center">O tempo é {{ currentVerb.tense }}</h4>
			<h5>Pontos: {{ parseFloat(getPercentage).toFixed(2) + "%" }}</h5>
		</div>

		<div class="p-0 m-auto d-flex justify-content-around flex-wrap">
			<Conjugations v-for="verb in currentVerb.verbs" :key="`${currentVerb.tense}-${verb.name}`" :verb="verb"
				:verify-answers="verifyAnswers" />
		</div>

		<div class="text-center">
			<router-link to="/">
				<b-button class="bg-primary text-dark mx-2 my-1">Voltar</b-button>
			</router-link>
			<b-button v-if="index > 0" class="bg-primary text-dark mx-2 my-1" @click="decrementIndex">Anterior
			</b-button>
			<b-button class="bg-primary text-dark px-5" @click="verifyAnswers = !verifyAnswers"> Verificar
			</b-button>
			<b-button v-if="index < (getTotalTenses - 1)" class="bg-primary text-dark mx-2 my-1"
				@click="incrementIndex">Próximo
			</b-button>
		</div>

	</div>
</template>

<script>
import Conjugations from "./Conjugations.vue";
import { mapGetters, mapMutations } from "vuex";
const CNG = require("@jirimracek/conjugate-esp");
const conjugator = new CNG.Conjugator();

export default {
	components: {
		Conjugations,
	},
	computed: {
		...mapGetters(["getPercentage", "getVerbs", "getTotalTenses", "getVerbalDescriptions", "getCurrentIndex"]),
		index: function () {
			return this.getCurrentIndex
		},
		currentVerb: function () {
			return this.conjugationData[this.index];
		},
	},
	data: function () {
		return {
			verifyAnswers: false,
			currentVerbalDescription: "",
			allConjugationsOfVerbs: [],
			conjugationData: []
		};
	},
	methods: {
		...mapMutations(["setCurrentIndex"]),
		incrementIndex: function () {
			this.$store.commit("setCurrentIndex", +1);
		},
		decrementIndex: function () {
			this.$store.commit("setCurrentIndex", -1);
		},
	},
	created: function () {
		this.allConjugationsOfVerbs = this.getVerbs.map(verb => {
			try {
				let conjugations = conjugator.conjugateSync(verb.name)[0].conjugation
				if (conjugations === undefined) {
					throw new Error();
				}
				return { ...verb, conjugations }
			} catch {
				return { ...verb, error: true }
			}
		})

		this.conjugationData = this.getVerbalDescriptions.map(verbalDescription => {
			const [mode, tense, displayTense] = verbalDescription.split("-")
			const verbConjugations = this.allConjugationsOfVerbs.map(verb => {
				if (!verb.error) {
					let conjugation = verb.conjugations[mode][tense]
					return { name: verb.name, translation: verb.translation, conjugation }
				} else {
					return { ...verb }
				}
			})
			return { mode, tense: displayTense, verbs: [...verbConjugations] }
		})
	},
};
</script>

<style>
a,
a:hover {
	text-decoration: none;
}
</style>
