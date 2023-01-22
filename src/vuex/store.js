import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		verbs: [],
		points: 0,
		verbalDescriptions: [],
		currentIndex: 0,
	},
	getters: {
		getPercentage: function (state) {
			const totalConjugatios = state.verbs.length * 6;
			const percent = (state.points * 100) / totalConjugatios;
			return percent;
		},
		getVerbs: function (state) {
			return state.verbs;
		},
		getVerbalDescriptions: function (state) {
			return state.verbalDescriptions;
		},
		getCurrentVerbalTense: function (state) {
			return state.verbalDescriptions[state.currentIndex];
		},
		getCurrentIndex: function (state) {
			return state.currentIndex;
		},
	},
	mutations: {
		addPoints: function (state) {
			state.points = state.points + 1;
		},
		setVerbalDescriptions: function (state, verbalDescriptions) {
			state.verbalDescriptions = verbalDescriptions;
		},
		setVerbs: function (state, verbs) {
			state.verbs = verbs;
		},
		setCurrentIndex: function (state, currentIndex) {
			state.currentIndex = currentIndex >= 0 ? state.currentIndex + 1 : state.currentIndex - 1;
		},
		clearCurrentIndex: function (state) {
			state.currentIndex = 0;
		},
		clearPoints: function (state) {
			state.points = 0;
		},
	},
});
