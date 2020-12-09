import axios from 'axios'
import router from '../router'

export default {
  namespaced: true,

  state: {
    hash: localStorage.getItem('hash')
  },
  mutations: {
    setHash(state, value) {
      state.hash = value
    }
  },
  getters: {
    hash(state) {
      return state.hash
    }
  },
  actions: {
    async logIn( {commit}, credentials) {
      let res = await axios.post('user/auth', credentials)
      if (res.data.success === true) {
        commit('setHash', res.data.hash)
        localStorage.setItem('hash', res.data.hash)
        router.push('/')
      }
    },
    logOut({ commit }) {
      commit('setHash', null)
      localStorage.removeItem('hash')
      router.push({name: 'Login'})
    }
  }
}
