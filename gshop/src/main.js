// 入口文件
import Vue from 'Vue'
import App from './App.vue'
import router from './router'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

new Vue({
    el:'#app',
    render:h =>h(App),
    router,
})