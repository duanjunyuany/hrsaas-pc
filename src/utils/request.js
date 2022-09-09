import axios from 'axios'

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
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use()

// 导出axios实例
export default service
