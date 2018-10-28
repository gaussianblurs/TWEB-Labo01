import axios from 'axios'
import NProgress from 'nprogress'

const baseUrl =  process.env.NODE_ENV === 'production'
  ? 'https://technography.herokuapp.com/'
  : 'http://localhost:3000'

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
