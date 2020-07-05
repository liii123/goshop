<template>
  <section class="search">
    <HeaderTop title="搜索"/>
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword">
      <input type="submit" class="search_submit">
    </form>
  </section>
</template>

<script type="text/javascript">
import HeaderTop from '../../components/HeaderTop/HeaderTop'

export default { 
  components:{
    HeaderTop,
  },
  methods: {
    search(){

    }
  },
  data:{
    keyword:'',
  }
}
</script>

<style lang="stylus" scoped>
 @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow auto
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774
</style>
