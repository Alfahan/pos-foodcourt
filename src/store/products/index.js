import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    all: {
      dataProducts: [],
      isLoading: false
    },
    detail: []
  }
}

const getters = {
  getProducts (state) {
    return state.all
  },
  getDetailProduct (state) {
    return state.detail
  }
}

const mutations = {
  SET_ALL_DATA (state, payload) {
    state.all.data = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  },
  SET_DETAIL_DATA (state, payload) {
    state.detail = payload
  }
}

const actions = {
  getProducts (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  getDetailProduct (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getdetail/${payload}`)
        .then((response) => {
          context.commit('SET_DETAIL_DATA', response.data.data[0])
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  delProducts (context, payload) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/product/delete/${payload}`)
        .then((response) => {
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
    })
  },
  addProducts (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/product/insert`, payload)
        .then((response) => {
          resolve(response.data.message)
        })
        .catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Insert Failed')
        })
    })
  },
  updateProducts (context, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/product/update/${payload.id}`, payload.form)
        .then((response) => {
          resolve(response.data.message)
        }).catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Update Gagal')
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
