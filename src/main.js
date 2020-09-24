import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import axios from 'axios'

axios.defaults.headers = {
  token: localStorage.getItem('token')
}

axios.interceptors.response.use((response) => {
  if (response.data.message === 'Authorization Failed, Token Expired') {
    alert('Your token has run out')
    window.location = '/Login'
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  } else if (response.data.message === 'Authorization Failed, This is admin access') {
    alert('This is admin permissions')
    window.location = '/Home'
  }
  return response
}, (err) => {
  console.log(err)
})

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
