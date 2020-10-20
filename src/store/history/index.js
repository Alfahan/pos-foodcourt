import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    historyData: null,
    historyMaster: null
  }
}

const getters = {
  getHistoryData (state) {
    return state.historyData
  },
  getHistoryMaster (state) {
    return state.historyMaster
  }
}

const mutations = {
  SET_HISTORY (state, payload) {
    state.historyData = payload
  },
  SET_HISTORY_MASTER (state, payload) {
    state.historyMaster = payload
  }
}

const actions = {
  insertHistory (context, payload) {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios.post(`${url}/history/insert`, payload)
        .then(result => {
          resolve(result.data.message)
        }).catch(err => {
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
