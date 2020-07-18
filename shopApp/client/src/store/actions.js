/*
Action:通过操作mutation间接更新state的多个方法的对象
 */
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_SHOPS
  } from './mutations-types'
  
  // api接口
  import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqUserInfo,
    reqLogout,
    reqShopInfo,
    reqShopRatings,
    reqShopGoods,
    reqSearchShop
  } from '../api'

  export default{
        // 异步获取地址
        async getAddress({commit,state}){
            //发送异步ajax请求
              const geohash = state.latitude + ',' + state.longitude;
              const result = await reqAddress(geohash);
              console.log(result.data);
              // 提交一个mutation
              if(result.code === 0){
                  const address = result.data;
                  commit(RECEIVE_ADDRESS,{address});
              }
        },
        // 获取食品分类
        async getCategorys({commit}) {
            // 发送异步ajax请求
            const result = await reqCategorys()
            console.log(result.data)
            // 提交一个mutation
            if (result.code===0) {
            const categorys = result.data
            commit(RECEIVE_CATEGORYS,{categorys}) 
            }
        },
        async getShops({commit,state}) {
            const latitude = state.latitude;
            const longitude = state.longitude;
            const result = await reqShops(latitude,longitude);
            console.log(result);
            if(result.code === 0){
                const shops = result.data;
                commit(RECEIVE_SHOPS,{shops})
            }
        },
        // 同步记录用户信息
        saveUser({commit},userInfo){
          console.log(userInfo)
            commit(RECEIVE_USER_INFO,{userInfo})
        },
        // 异步获取用户信息（保存登录状态，在session期间）
        async getUserInfo({commit}){
          const result = await reqUserInfo();
          console.log(result)
          if(result.code === 0){
            const userInfo = result.data;
            commit(RECEIVE_USER_INFO,{userInfo})
          }
        },
        // 退出登录
        async logout({commit}){
          const result = await reqLogout();
          // 重置用户信息
          if(result.code === 0){
            commit(RESET_USER_INFO)
          }
        },

        // 商家信息
        async getShopInfo({commit}){
          const result = await reqShopInfo();
          if(result.code === 0){
            const info = result.data
            commit(RECEIVE_INFO,{info})
          }
        },
        // 商家评价
        async getShopRatings({commit},callback){
          const result = await reqShopRatings();
          if(result.code === 0){
            const ratings = result.data
            commit(RECEIVE_RATINGS,{ratings})
            // 数据更新了，通知组件
            callback && callback()
          }
        },
        // 商品信息
        async getShopGoods({commit},callback){
          const result = await reqShopGoods();
          if(result.code === 0){
            const goods = result.data
            commit(RECEIVE_GOODS,{goods})
            // 数据更新了，通知组件
            callback && callback()
          }
        },

        // 同步更新food的count
        updateFoodCount({commit},{isAdd,food}) {
          if (isAdd) {
            commit(INCREMENT_FOOD_COUNT,{food})
          } else {
            commit(DECREMENT_FOOD_COUNT,{food})
          }
        },
        // 清空购物车
        clearCart({commit}){
          commit(CLEAR_CART)
        },
        // 异步获取商家商品列表
        async getSearchShops({state,commit},keyword) {
          const geohash = state.latitude + ',' + state.longitude;
          const result = await reqSearchShop(geohash,keyword);
          console.log(keyword);
          console.log(geohash)
          if(result.code === 0){
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS,{searchShops})
          }

        }
       

  }