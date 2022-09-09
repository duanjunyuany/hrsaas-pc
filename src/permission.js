// 权限拦截 ->导航守卫 ->路由守卫
import router from '@/router'
import store from '@/store'
// 引入一份进度条插件
import NProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 定义白名单 （所有不受权限控制的页面）
const whiteList = ['/login', '/404']

// 全局前置守卫
router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()
  if (store.getters.token) {
    // 如果有token 判断是不是登录页
    if (to.path === '/login') {
      // 访问登录页直接跳转到主页
      next('/')
    } else {
      // 直接放行
      // 只有放行时才获取用户信息，如果当前vuex中有用户id表示已经存在信息，不需要获取，否则获取信息
      if (!store.getters.userId) {
        // 没有用户信息则获取
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 如果没有token，判断是否在白名单
    if (whiteList.includes(to.path)) {
      // 在白名单直接放行
      next()
    } else {
      // 不在白名单跳转到登录页
      next('/login')
    }
  }
  // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
  NProgress.done()
})

// 全局后置守卫
router.afterEach(function() {
  // 关闭进度条
  NProgress.done()
})
