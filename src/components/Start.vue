<template>
	<div class="bg-light pb-5 d-flex flex-column align-items-center text-dark">

		<h4 class="pt-4 pb-3 text-center font-weight-bolder">
			Selecione os tempos verbais que você quer praticar e clique em iniciar!
		</h4>

		<b-form class="pa-2 d-flex justify-content-around w-100 ">
			<b-form-group class="p-2">
				<h4>Indicativo</h4>
				<b-form-checkbox v-for="tense in indicative" v-model="verbalDescriptions"
					:value="`Indicativo-${tense.value}-${tense.text}`" :key="`Indicativo-${tense.value}`">{{
						tense.text
					}}</b-form-checkbox>
			</b-form-group>

			<b-form-group class="p-2">
				<h4>Subjuntivo</h4>
				<b-form-checkbox v-for="tense in subjuntive" v-model="verbalDescriptions"
					:value="`Subjuntivo-${tense.value}-${tense.text}`" :key="`Subjuntivo-${tense.value}}`">{{
						tense.text
					}}</b-form-checkbox>
			</b-form-group>

			<b-form-group class="p-2">
				<h4>Imperativo</h4>
				<b-form-checkbox v-for="tense in imperative" v-model="verbalDescriptions"
					:value="`Imperativo-${tense.value}-${tense.text}`" :key="`Imperativo-${tense.value}}`">{{
						tense.text
					}}</b-form-checkbox>
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
			<b-button class="bg-secondary text-white w-25 start-button">Iniciar </b-button>
		</router-link>
	</div>
</template>


<script>
import { mapMutations } from "vuex";
import sets from "../assets/verbs.js";
export default {
	data: function () {
		return {
			verbalDescriptions: [],
			verbalSetsWithNames: sets.map((arr) => arr.map((element) => element.name)),
			verbalSet: [],
			indicative: [
				{ value: "CondicionalCompuesto", text: "Condicional Compuesto" },
				{ value: "CondicionalSimple", text: "Condicional Simple" },
				{ value: "FuturoImperfecto", text: "Futuro Imperfecto" },
				{ value: "FuturoPerfecto", text: "Futuro Perfecto" },
				{ value: "Presente", text: "Presente" },
				{ value: "PreteritoAnterior", text: "Pretérito Anterior" },
				{ value: "PreteritoImperfecto", text: "Pretérito Imperfecto" },
				{ value: "PreteritoIndefinido", text: "Pretérito Indefinido" },
				{ value: "PreteritoPerfecto", text: "Pretérito Perfecto" },
				{ value: "PreteritoPluscuamperfecto", text: "Pretérito Pluscuamperfecto" },
			],
			subjuntive: [
				{ value: "FuturoImperfecto", text: "Futuro Imperfecto" },
				{ value: "FuturoPerfecto", text: "Futuro Perfecto" },
				{ value: "Presente", text: "Presente" },
				{ value: "PreteritoImperfectoRa", text: "Pretérito Imperfecto (RA)" },
				{ value: "PreteritoImperfectoSe", text: "Pretérito Imperfecto (SE)" },
				{ value: "PreteritoPerfecto", text: "Pretérito Perfecto" },
				{ value: "PreteritoPluscuamperfectoRa", text: "Pretérito Pluscuamperfecto (RA)" },
				{ value: "PreteritoPluscuamperfectoSe", text: "Pretérito Pluscuamperfecto (SE)" },
			],
			imperative: [
				{ value: "Afirmativo", text: "Afirmativo" },
				{ value: "Negativo", text: "Negativo" },
			],
			verbsToBeUsed: "default",
			customSet: "",
		};
	},
	methods: {
		...mapMutations[("setVerbalDescriptions", "setVerbs", "clearCurrentIndex", "clearPoints")],
		loadInfo: async function () {
			if (!this.verbalDescriptions.length) {
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
			await this.$store.commit("setVerbalDescriptions", this.verbalDescriptions);
			await this.$store.commit("setVerbs", selectedSet);
			await this.$store.commit("clearCurrentIndex");
			await this.$store.commit("clearPoints");
			this.$router.push("/play");
		},
	},
};
</script>
