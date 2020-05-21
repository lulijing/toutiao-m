/**
 * 请求模块
 */

import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/' // 接口的基准路径
  baseURL: 'http://api-toutiao-web.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    // 请求发起会经过这里
    // config:本次请求的请求配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意：这里务必要返回config配置对象，否则请求就会停在这里出不去了
    // console.log(config, '1111')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
// 响应拦截器

export default request
