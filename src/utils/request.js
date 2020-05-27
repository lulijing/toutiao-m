/**
 * 请求模块
 */

import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'

const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://ttapi.research.itcast.cn/',

  // 自定义后端返回的原始数据
  // data: 后端返回的原始数据，说白了就是 JSON 格式的字符串
  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }

    // axios 默认会在内部这样来处理后端返回的数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
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
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
export default request
