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

import '@/icons'
import '@/permission'

Vue.use(ElementUI, { locale })
// 注册自定义组件
Vue.use(Component)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
