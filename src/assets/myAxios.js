import axios from 'axios'
import qs from 'qs'

const myAxios = axios.create({
  baseURL: 'http://127.0.0.1:80/api',
  timeout: 5000,
  withCredentials: true
})

// 拦截请求
myAxios.interceptors.request.use(config => {
  console.log(config)
  if (config.method === 'post') {
    config.data = qs.stringify(config)
  }
  return config
})

export { myAxios }
