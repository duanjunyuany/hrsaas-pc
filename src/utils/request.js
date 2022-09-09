import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'

// 定义超时时间 （一小时）
const TimeOut = 3600

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
    // 如果token存在，检查是否超时，有效则注入token，超时则退出登录
    if (checkTimeOut()) {
      // token过期，退出登录
      store.dispatch('user/logout')
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
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
  // error里面的response对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候表示token超时了，退出登录
    store.dispatch('user/logout')
    // 跳转到登录页
    router.push('/login')
  } else {
    // 提示错误信息
    Message.warning(error.message)
  }
  // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
  return Promise.reject(error)
})

// 检查是否超时  (当前时间 - 缓存中的时间) > 时间差 ?
function checkTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 导出axios实例
export default service
