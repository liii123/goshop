/* 入口文件 */
import Vue from 'vue'
import App from './App'
import router from './router/index'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import {Button} from 'mint-ui'

import './mock/mockServer' //使用mockjs模拟数据
import loading from './common/imgs/1.gif'
import './filters' // 过滤器


Vue.component(Button.name,Button) // 注册全局组件标签,<mt-button>
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // template: '<App/>'
  // components: { App },
  render: h => h(App),
  router,
  store,// 使用vuex
  
  
})
