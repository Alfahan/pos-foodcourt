import axios from 'axios'
import { url } from '../../helpers/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null
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
        .catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Register Failed')
        })
    })
  },
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/users/login`, payload)
        .then((response) => {
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('refreshToken', response.data.data.refreshToken)
          resolve(response.data.message)
        })
        .catch(() => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('Login Failed')
        })
    })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')
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
