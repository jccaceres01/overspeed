import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errors: null,
    busy: false
  },
  mutations: {
    setErrors(state, val) {
      state.errors = val
    },
    setBusy(state, val) {
      state.busy = val
    }
  },
  getters: {
    errors(state) {
      return state.errors
    },
    busy(state) {
      return state.busy
    }
  },
  actions: {
    busyOn({ commit }) {
      commit('setBusy', true)
    },
    busyOff({ commit }) {
      commit('setBusy', false)
    }
  },
  modules: {
    auth
  }
})
