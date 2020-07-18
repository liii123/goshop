import Vue from 'vue'
import VueRouter from 'vue-router'

/*import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'*/

// 路由组件懒加载
const Msite = () => import('../pages/Msite/Msite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite' 
    },
    {
      path:'/msite',
      component: Msite,
      //此时的Msite等都是返回路由组件的函数，只有请求对应的路由路径时(第一次)才会执行此函数并加载路由组件
      meta:{show:true}
      // 标识此路由是否显示FooterGuide
    },
    {
      path:'/search',
      component: Search,
      meta:{show:true}
    },
    {
      path:'/order',
      component:Order,
      meta:{show:true}
    },
    {
      path:'/profile',
      component:Profile,
      meta:{show:true}
    },
    {
      path:'/login',
      component:Login
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path:'/',
          redirect:'goods'
        },
        {
          path:'goods',// 二级路由这样子写的话，不需要添加反斜杠
          component: ShopGoods
        },
        {
          path:'ratings',
          component: ShopRatings
        },
        {
          path:'/shop/info',// 这样子写就需要反斜杠
          component: ShopInfo
        }
      ]
    },
  ]
})
