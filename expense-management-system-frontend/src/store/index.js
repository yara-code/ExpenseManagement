import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionActive: false,
    accounts: {}
  },
  mutations: {
    setSessionActive(state, payload){
      state.sessionActive = payload
    }
  },
  actions: {
    setSessionActive(state,payload){
      state.commit("setSessionActive", payload);
    }

  },
  modules: {
  },
  getters: {

  },
})
