import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'

Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.baseURL = process.env.VUE_APP_API_URL
  config.headers.common = {
    Authorization: `Bearer ${localStorage.getItem('hash')}`
  }

  return config
})

axios.interceptors.response.use(response => response, errors => {
  if (errors.response.status === 400) {
    store.commit('setErrors', errors.response.data)
  } else {
    return Promise.reject(errors)
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
