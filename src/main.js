import Vue from 'vue'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import Component from '@/components'
import * as filters from '@/filters'
import Print from 'vue-print-nb'
import CheckPermission from '@/mixin/checkPermission'

import '@/icons'
import '@/permission'

Vue.use(ElementUI, { locale })
// 注册自定义组件
Vue.use(Component)
// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
// 注册打印插件
Vue.use(Print)
// 全局混入检查对象
Vue.mixin(CheckPermission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
