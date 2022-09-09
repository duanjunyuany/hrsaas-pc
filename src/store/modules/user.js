import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

// 状态
const state = {
  // 设置token为共享状态
  // 初始化vuex时，从本地缓存中读取token，没有就是null
  token: getToken()
}

// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token
    // vuex设置 => 缓存数据
    setToken(token)
  },
  // 删除token
  removeToken(state) {
    state.token = null
    // vuex删除 => 缓存数据
    removeToken()
  }
}

// 异步操作
const actions = {
  // 登录方法
  async login(context, data) {
    // 调用登录接口发送请求
    const result = await login(data)
    if (result.data.success) {
      context.commit('setToken', result.data.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
