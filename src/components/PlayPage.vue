<template>
	<div class="bg-light ">
		<div class="d-flex flex-column align-items-center text-dark pt-2">
			<h4 class="text-sm-center">O modo é {{ this.conjugationData[index].mode }}</h4>
			<h5>Pontos: {{ getPoints }}</h5>
		</div>
		<div class="p-0 m-auto d-flex justify-content-around flex-wrap">
			<Conjugations v-for="verb in this.conjugationData[index].verbs" :key="verb.name" :verb="verb" />
		</div>

		<div class="text-center">
			<router-link to="/">
				<b-button class="bg-primary text-dark mx-2 my-1">Voltar</b-button>
			</router-link>
			<b-button v-if="index > 0" class="bg-primary text-dark mx-2 my-1" @click="decrementIndex">Anterior
			</b-button>
			<b-button v-if="index < getAvailableVerbalDescriptions" class="bg-primary text-dark mx-2 my-1"
				@click="incrementIndex">Próximo
			</b-button>
			<b-button class="bg-primary text-dark mx-2 my-3" @click="clearAnswers">Limpar</b-button>
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
		...mapGetters(["getPoints", "getVerbs", "getVerbalDescriptions", "getCurrentVerbalTense", "getVerbs", "getAvailableVerbalDescriptions", "getCurrentIndex"]),
		index: function () {
			return this.getCurrentIndex;
		}
	},
	data: function () {
		return {
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
		clearAnswers: function () {
			this.decrementIndex();
			this.incrementIndex();
		}
	},
	created: function () {
		this.allConjugationsOfVerbs = this.getVerbs.map(verb => {
			try {
				let conjugations = conjugator.conjugateSync(verb.name)[0].conjugation
				return { ...verb, conjugations }
			} catch {
				return { ...verb, erro: true }
			}
		})

		this.conjugationData = this.getVerbalDescriptions.map(verbalDescription => {
			const [mode, tense] = verbalDescription.split("-")
			const verbConjugations = this.allConjugationsOfVerbs.map(verb => {
				if (!verb.erro) {
					return { name: verb.name, translation: verb.translation, conjugation: verb.conjugations[mode][tense] }
				} else {
					return { ...verb }
				}
			})
			return { mode, tense, verbs: [...verbConjugations] }
		})
	},
	updated: function () {
		this.currentVerbalDescription = this.getCurrentVerbalDescription;
	}
};
</script>

<style>
a,
a:hover {
	text-decoration: none;
}
</style>
