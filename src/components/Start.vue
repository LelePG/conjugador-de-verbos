<template>
	<div class="bg-light pb-5 d-flex flex-column align-items-center text-dark">
		<h4 class="pt-4 pb-3 text-center font-weight-bolder">
			Selecione os tempos verbais que você quer praticar e clique em iniciar!
		</h4>
		<b-form class="pa-2 d-flex justify-content-around w-100 ">
			<b-form-group class="p-2">
				<h4>Indicativo</h4>
				<b-form-checkbox v-for="tense in indicativ" v-model="verbalTenses" :value="tense"
					:key="tense.text">{{ tense.text }}</b-form-checkbox>
			</b-form-group>

			<b-form-group class="p-2">
				<h4>Subjuntivo</h4>
				<b-form-checkbox v-for="tense in subjuntive" v-model="verbalTenses" :value="tense"
					:key="tense.text">{{ tense.text }}</b-form-checkbox>
			</b-form-group>

			<b-form-group class="p-2">
				<h4>Condicional</h4>
				<b-form-checkbox v-for="tense in conditional" v-model="verbalTenses" :value="tense"
					:key="tense.text">{{ tense.text }}</b-form-checkbox>
			</b-form-group>
		</b-form>

		<h4 clas="text-center font-weight-bolder">Selecione um set de verbos</h4>
		<b-form-group class="text-center">
			<b-form-radio v-model="verbsToBeUsed" value="default">Selecionar sets padrão
			</b-form-radio>
			<b-form-radio v-model="verbsToBeUsed" value="custom">Quero usar meus verbos
			</b-form-radio>
		</b-form-group>
		<div class="w-50">
			<b-form-select v-if="verbsToBeUsed === 'default'" v-model="verbalSet" :options="verbalSetsWithNames">
			</b-form-select>
			<b-form-input v-if="verbsToBeUsed === 'custom'" v-model="customSet"
				placeholder="Digite verbos separados por vírgula"></b-form-input>
		</div>
		<router-link to="/play" event="" @click.native="loadInfo()"
			class="w-75 mt-3 d-flex justify-content-center text-decoration-none">
			<b-button class="bg-secondary w-25 start-button">Iniciar </b-button>
		</router-link>
	</div>
</template>


<script>
import { mapMutations } from "vuex";
import sets from "../assets/sets.js";
export default {
	data: function () {
		return {
			verbalTenses: [],
			verbalSetsWithNames: sets.map((arr) => arr.map((element) => element.name)),
			verbalSet: [],
			indicativ: [
				{ value: "INDICATIVE_PRESENT", text: "Presente" },
				{ value: 'INDICATIVE_IMPERFECT', text: "Pretérito imperfeito" },
				{ value: "INDICATIVE_PRETERITE", text: "Pretérito perfecto simple" },
				{ value: "INDICATIVE_FUTURE", text: "Futuro" },
				{ value: "INDICATIVE_PERFECT", text: "Pretérito perfecto compuesto" },
				{ value: "INDICATIVE_PLUPERFECT", text: "Pretérito pluscuamperfecto" },
				{ value: "INDICATIVE_FUTURE_PERFECT", text: "Futuro perfecto" },
				{ value: "INDICATIVE_PRETERITE_PERFECT", text: "Pretérito anterior" },
			],
			subjuntive: [
				{ value: "SUBJUNCTIVE_PRESENT", text: "Presente" },
				{ value: "SUBJUNCTIVE_IMPERFECT_RA", text: "Pretérito imperfecto (ra)" },
				{ value: "SUBJUNCTIVE_IMPERFECT_SE", text: "Pretérito imperfecto (se)" },
				{ value: "SUBJUNCTIVE_FUTURE", text: "Futuro" },
				{ value: "SUBJUNCTIVE_PERFECT", text: "Pretérito perfecto" },
				{ value: "SUBJUNCTIVE_PLUPERFECT", text: "Pretérito pluscuamperfecto" },
				{ value: 'SUBJUNCTIVE_FUTURE_PERFECT', text: "Futuro perfecto" }
			],
			conditional: [
				{ value: "CONDITIONAL_PRESENT", text: "Condicional" },
				{ value: "CONDITIONAL_PERFECT", text: "Condicional perfecto" },
			],
			verbsToBeUsed: "default",
			customSet: "",
		};
	},
	methods: {
		...mapMutations[("setVerbalTenses", "setAuxVerb", "setVerbs", "clearCurrentIndex", "clearPoints")],
		loadInfo: async function () {
			if (!this.verbalTenses.length) {
				window.alert("Você precisa selecionar pelo menos um tempo.");
				return;
			}
			const index = this.verbalSetsWithNames.indexOf(this.verbalSet);
			let selectedSet

			if (this.verbsToBeUsed === "default") {
				selectedSet = sets[index];
			} else {
				selectedSet = this.customSet.split(",").map((element) => {
					return { name: element, translation: "" }
				})
			}
			if (!selectedSet || !selectedSet[0].name) {
				window.alert("Selecione um set de verbos");
				return;
			}
			await this.$store.commit("setVerbalTenses", this.verbalTenses);
			await this.$store.commit("setVerbs", selectedSet);
			await this.$store.commit("clearCurrentIndex");
			await this.$store.commit("clearPoints");
			this.$router.push("/play");
		},
	},
};
</script>
