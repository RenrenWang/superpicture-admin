import axios from "axios";

const request = axios.create({
  baseURL: '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})
request.interceptors.request.use(
  function (config) {
    // config.data = JSON.parse(config?.data)
    console.log(config)
    config.headers = config.headers || {}
    config.params = config.params || {}
    config.headers['Accept-Language'] = 'en'
  
    return config
  },
  function (error) {
    const result = error.request ? error.request.data : undefined
    return Promise.reject(result || error)
  }
)
request.interceptors.response.use(
  async response => {
    if (response?.status) {
      return response?.data
    }
    return response
   },
)
export default request