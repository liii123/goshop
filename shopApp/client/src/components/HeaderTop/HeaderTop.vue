<template>
    <header class="header">
      <!-- slot插槽,实现内容分发，即父组件可以在子组件中添加自己的节点 -->
        <slot name="left"></slot>
          <a class="header_title">
            <span class="header_title_text">{{title}}</span>
          </a>
        <slot name="right" class="header_login"></slot>
    </header>
</template>

<script type="text/javascript">
export default {
    props:['title']
 }
</script>

<style lang="stylus" scoped>
.header //头部公共css
          background-color #02a774
          position fixed
          z-index 100
          left 0
          top 0
          width 100%
          height 45px
        .header_title
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)
            width 30%
            color #fff
            font-size 22px
            text-align center
            overflow hidden
            text-overflow:ellipsis
            white-space: nowrap
</style>
