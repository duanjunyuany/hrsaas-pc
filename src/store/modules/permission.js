// vuex的权限模块
import { constantRoutes, asyncRoutes } from '@/router'

const state = {
  // 路由表，当前用户拥有的所有路由
  routes: constantRoutes
}

const mutations = {
  // newRoutes可以认为是用户登录通过权限所得到的动态路由
  setRoutes(state, newRoutes) {
    // 每次更新都应该在静态路由的基础上进行追加
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  // 筛选权限路由
  // asyncRoutes是所有的动态路由
  filterRoutes(context, menus) {
    const routes = []
    // 筛选出动态路由中和menus中能够对上的路由
    menus.forEach(key => {
      routes.push(...asyncRoutes.filter(item => item.name === key))
    })
    context.commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
