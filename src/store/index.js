import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import products from './products/index'
import auth from './auth/index'
import categories from './categories/index'
import history from './history/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    auth,
    categories,
    history
  }
})
