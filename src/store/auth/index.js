import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
  }
}

const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/register`, payload)
        .then((response) => {
          resolve(response.data.message)
        })
        .catch(err => {
          reject(err.message)
        })
    })
  },
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/login`, {
        email: payload.email,
        password: payload.password
      })
        .then((response) => {
          localStorage.setItem('iduser', response.data.data.iduser)
          localStorage.setItem('nameuser', response.data.data.nameuser)
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('level', response.data.data.level)
          localStorage.setItem('refreshToken', response.data.data.refreshToken)
          resolve(response.data.message)
        }).catch(err => {
          reject(err.message)
        })
    })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('iduser')
      localStorage.removeItem('nameuser')
      localStorage.removeItem('token')
      localStorage.removeItem('level')
      localStorage.removeItem('refreshToken')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters
}
