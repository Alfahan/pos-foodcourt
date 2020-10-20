import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    all: {
      dataProducts: [],
      isLoading: false,
      isError: false,
      errorMessage: '',
      meta: null
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
    state.all.dataProducts = payload
  },
  SET_ALL_LOADING (state, payload) {
    state.all.isLoading = payload
  },
  SET_DETAIL_DATA (state, payload) {
    state.detail = payload
  },
  SET_META (state, payload) {
    state.all.meta = payload
  }
}

const actions = {
  getProducts (context, payload) {
    const fd = {
      page: payload.page === undefined ? '' : payload.page
    }
    console.log(fd.page)
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?page=${fd.page}`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
          context.commit('SET_META', response.data.meta)
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
    const fd = new FormData()
    fd.append('nameproduct', payload.nameproduct)
    fd.append('price', payload.price)
    fd.append('img', payload.img)
    fd.append('idcategory', payload.idcategory)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/product/insert`, fd)
        .then((response) => {
          resolve(response.data.message)
        })
        .catch((err) => {
          console.log(err)
        })
    })
  },
  updateProducts (context, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/product/update/${payload.id}`, payload.form)
        .then((response) => {
          resolve(response.data.message)
        }).catch((err) => {
          console.log(err)
        })
    })
  },
  sortProduct (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?by=${payload.sort}`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  latestProduct (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?typesort=${payload.sortLatest}`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
        })
    })
  },
  sortSearch (context, payload) {
    context.commit('SET_ALL_LOADING', true)
    return new Promise((resolve, reject) => {
      axios.get(`${url}/product/getall?nameproduct=${payload}`)
        .then((response) => {
          context.commit('SET_ALL_DATA', response.data.data)
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          context.commit('SET_ALL_LOADING', false)
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
