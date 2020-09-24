import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    datacategory: []
  }
}

const getters = {
  getCategory (state) {
    return state.datacategory
  }
}

const mutations = {
  SET_ALL_DATA (state, payload) {
    state.datacategory = payload
  }
}

const actions = {
  getCategory (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/category/getall`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
        }).catch((err) => {
          console.log(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
