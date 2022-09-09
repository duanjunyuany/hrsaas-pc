import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// 创建一个axios实例
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api
  // 设置axios请求的基础地址，开发环境中为 /api
  baseURL: process.env.VUE_APP_BASE_API,
  // 设置超时时间
  timeout: 5000
})

// 请求拦截器（注入token）
service.interceptors.request.use(config => {
  // config 请求的配置
  if (store.getters.token) {
    // 如果token存在 注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  // 必须返回配置
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    // 提示错误信息
    Message.warning(message)
    // 已经错误了 应该进 catch
    return Promise.reject(new Error(message))
  }
}, error => {
  // 提示错误信息
  Message.warning(error.message)
  // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  return Promise.reject(error)
})

// 导出axios实例
export default service
