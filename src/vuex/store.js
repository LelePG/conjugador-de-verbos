import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    inputWithFocus: "",
    verbs: [],
    points : 0,
    verbalDescriptions: [],
    currentIndex: 0,
    visualizationStyle: "",
    currentArray:[]
  },
  getters:{
    getInputWithFocus: function(state){
      return state.inputWithFocus
    },
    getPoints: function(state){
      return state.points
    },
    getVerbs: function(state){
      return state.verbs
    },
    getVerbalDescriptions: function(state){
      return state.verbalDescriptions
    },
    getCurrentVerbalTense : function(state){
      return state.verbalDescriptions[state.currentIndex]
    },
    getAvailableVerbalDescriptions : function(state){
      return state.verbalDescriptions.length -1
    }, 
    getCurrentIndex : function(state){
      return state.currentIndex
    }, 
  },
  mutations: {
    setInputWithFocus: function(state, input) {
     state.inputWithFocus = input
    },
    addPoints: function(state, points){
      state.points += points
    },
    setVerbalDescriptions: function(state, verbalDescriptions){
      state.verbalDescriptions = verbalDescriptions
    },
    setAuxVerb: function(state, auxVerb){
      state.auxVerb = auxVerb
    },
    setVerbs: function(state, verbs){
      state.verbs = verbs
    },
    setCurrentIndex: function(state, currentIndex){
      state.currentIndex = currentIndex >=0 ? state.currentIndex+1: state.currentIndex-1
    },
    clearCurrentIndex: function(state){
      state.currentIndex = 0
    },
    clearPoints: function(state){
      state.points = 0
    },
  }
})