import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// 侧边栏折叠展开
import app from './modules/app'
// logo/头部
import settings from './modules/settings'
// 用户信息
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 分成三个子模块
  modules: {
    app,
    settings,
    user
  },
  // 提供快捷访问子模块的状态
  getters
})

export default store
