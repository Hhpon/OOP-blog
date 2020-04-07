import axios from 'axios'
import Vue from 'vue'

import router from './router'

const fetch = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/api/admin/rest'
})

fetch.interceptors.request.use(
  config => {
    if (sessionStorage.token) {
      config.headers.Authorization = 'Bearer ' + sessionStorage.token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

fetch.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      console.log(err);
      Vue.prototype.$message({
        message: err.response.data.message
      })
    }

    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)

export default fetch
