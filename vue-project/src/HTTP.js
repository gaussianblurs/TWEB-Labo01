import axios from 'axios'
import NProgress from 'nprogress'

const baseUrl =  window.location.hostname === 'localhost'
  ? 'http://localhost:3000'
  : 'https://technography.herokuapp.com/';

// create a new axios instance
const instance = axios.create({
  baseURL: baseUrl
})

// before a request is made start the nprogress
instance.interceptors.request.use(config => {
  NProgress.start()
  return config
})

// before a response is returned stop nprogress
instance.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default instance
