<template>
  <div>
      <router-view/>
      <!-- 路由的meta对象里面设置状态，来控制公共组件的显示或隐藏 -->
      <FooterGuide v-if="$route.meta.show"/>
  </div>
</template>

<script type="text/javascript">
import FooterGuide from './components/FooterGuide/FooterGuide'
// import {reqCategorys} from './api/index'
import {mapActions} from 'vuex'

export default {
    // async mounted() {
    //     // 跨域请求
    //    let result = await reqCategorys();
    //    console.log(result)
    // },
    mounted() {
        // this.$store.dispatch('getAddress');
        this.getAddress();
        this.getUserInfo();
    },
    methods: {
        ...mapActions(['getAddress','getUserInfo'])
    },
    components:{
        FooterGuide,
    }
 }
</script>

<style lang="stylus" scoped>
</style>
