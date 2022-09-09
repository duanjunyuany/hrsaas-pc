import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

// 状态
const state = {
  // 设置token为共享状态
  // 初始化vuex时，从本地缓存中读取token，没有就是null
  token: getToken(),
  userInfo: {}
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
  },
  // 设置用户信息
  setUserInfo(state, result) {
    state.userInfo = result
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

// 异步操作
const actions = {
  // 登录
  async login(context, data) {
    // 经过响应拦截器的处理，result实际上就是token
    // 调用登录接口发送请求
    const result = await login(data)
    // if (result.data.success) {
    //   context.commit('setToken', result.data.data)
    // }
    // 登录成功，失败在拦截器中处理过了
    context.commit('setToken', result)
    // 登录成功后需要存入时间戳
    setTimeStamp()
  },
  // 获取用户信息
  async getUserInfo(context) {
    const result = await getUserInfo()
    // 获取用户基本信息
    const baseInfo = await getUserDetailById(result.userId)
    // 将两个接口返回的信息合并
    context.commit('setUserInfo', { ...result, ...baseInfo })
    return result
  },
  // 退出登录
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户信息
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
