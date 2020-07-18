<template>
  <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">一扣外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" @click="loginWay=true" :class="{on:loginWay}">短信登录</a>
            <a href="javascript:;" @click="loginWay=false" :class="{on:!loginWay}">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click="getCode">{{codeTime ?`已发送(${codeTime}s)`:'获取验证码'}}</button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="showPwd">
                  <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle"></div>
                    <span class="switch_text">{{showPwd ? '显示' : '隐藏'}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click="login">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <router-link to="/profile" class="go_back">
          <i class="iconfont icon-jiantou2"></i>
        </router-link>
      </div>
      <!-- 调用父组件的方法closeTip -->
       <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </section>
</template>

<script type="text/javascript">
import AlertTip from '../../components/AlertTip/AlertTip'
import {reqPwdLogin,reqSendCode,reqSmsLogin} from '../../api/index'

export default { 
  data() {
    return {
      loginWay: true,//默认是短信登陆
      phone:'',//手机号
      code:'',//短信验证码
      name:'',//用户名
      pwd:'',//密码
      captcha:'',//图形验证码
      alertText:'',//弹出警告信息（父组件向子组件传值）
      alertShow:false,
      codeTime:0,//计时    
      showPwd:false,//默认显示密码
    }
  },
  computed: {
    rightPhone(){
      return /^1\d{10}$/.test(this.phone);//正确手机号码的格式
    }
  },
  methods: {
    // 点击获取短信验证码
    async getCode(){
      // 点击后开始倒计时
      if(this.codeTime == 0){
        this.codeTime = 30;
        this.time = setInterval(() => { 
          this.codeTime--;
          if(this.codeTime === 0){
            clearInterval(this.time);
          }
        },1000)
      }
      // 同时接收手机验证码
      const result = await reqSendCode(this.phone);
      if(result.code === 1){ // 发送失败
          // 停止计时
          clearInterval(this.time);
          this.tipAlert('短信验证码发送失败');
          this.codeTime = 0;
      }
    },
    // 获取图片验证码
    getCaptcha(){
      // 使每次的验证码都不一样，不需要重新刷新页面
      this.$refs.captcha.src = 'http://localhost:4000/captcha/?time=' + Date.now();
    },
    // 点击登陆
    async login(){
      let result;
      //手机号验证码登陆
      if(this.loginWay){
        // 判断手机号
        if(!this.rightPhone){
          this.tipAlert('手机号不正确')
          return
        }
        // 判断短信验证码
        else if(!/^\d{6}$/.test(this.code)){
          this.tipAlert('短信验证码不正确')
          return
        }
        result = await reqSmsLogin(this.phone,this.code);
      }
      // 密码登陆
      else{
        const {name,pwd,captcha} = this;
        // 判断姓名
        if(!this.name){
          this.tipAlert('用户名不能为空')
          return
        }
        // 判断密码
        else if(!this.pwd){
          this.tipAlert('密码不能为空')
          return
        }
        // 判断图片验证码
        else if(!this.captcha){
          this.tipAlert('图片验证码不能为空')
          return
        }
        // 判断用户信息是否正确（后台验证）
        result = await reqPwdLogin({name,pwd,captcha});
      }
  
      // 停止计时
      clearInterval(this.time);
      this.codeTime = 0;

      // 登陆成功
      console.log(result);
      if(result.code === 0){
        const user = result.data;
        console.log(user)
        // 保存用户信息到state中
        this.$store.dispatch('saveUser',user)
        // 跳转页面
        this.$router.replace('/profile');
      }else{ // 登陆失败
        this.tipAlert(result.msg);
        // 重新获取验证码
        this.getCaptcha();  
      }
    },
    // 提示框信息
    tipAlert(alertText){
        this.alertShow = true;
        this.alertText = alertText;
    },
    // 关闭提示框
    closeTip(){
        this.alertShow = false;
        this.alertText = '';
    },
  },
  components:{
    AlertTip
  }
}
</script>

<style lang="stylus" scoped>
 .loginContainer
      width 100%
      height 100%
      background #fff
      .loginInner
        padding-top 60px
        width 80%
        margin 0 auto
        .login_header
          .login_logo
            font-size 40px
            font-weight bold
            color #02a774
            text-align center
          .login_header_title
            padding-top 40px
            text-align center
            >a
              color #333
              font-size 14px
              padding-bottom 4px
              &:first-child
                margin-right 40px
              &.on
                color #02a774
                font-weight 700
                border-bottom 2px solid #02a774
        .login_content
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
                  &.right_phone
                    color black
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
        .go_back
          position absolute
          top 5px
          left 5px
          width 30px
          height 30px
          >.iconfont
            font-size 20px
            color #999
          >form
            >div
              display none
              &.on
                display block
              input
                width 100%
                height 100%
                padding-left 10px
                box-sizing border-box
                border 1px solid #ddd
                border-radius 4px
                outline 0
                font 400 14px Arial
                &:focus
                  border 1px solid #02a774
              .login_message
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .get_verification
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  border 0
                  color #ccc
                  font-size 14px
                  background transparent
              .login_verification
                position relative
                margin-top 16px
                height 48px
                font-size 14px
                background #fff
                .switch_button
                  font-size 12px
                  border 1px solid #ddd
                  border-radius 8px
                  transition background-color .3s,border-color .3s
                  padding 0 6px
                  width 30px
                  height 16px
                  line-height 16px
                  color #fff
                  position absolute
                  top 50%
                  right 10px
                  transform translateY(-50%)
                  &.off
                    background #fff
                    .switch_text
                      float right
                      color #ddd
                  &.on
                    background #02a774
                  >.switch_circle
                    //transform translateX(27px)
                    position absolute
                    top -1px
                    left -1px
                    width 16px
                    height 16px
                    border 1px solid #ddd
                    border-radius 50%
                    background #fff
                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                    transition transform .3s
              .login_hint
                margin-top 12px
                color #999
                font-size 14px
                line-height 20px
                >a
                  color #02a774
            .login_submit
              display block
              width 100%
              height 42px
              margin-top 30px
              border-radius 4px
              background #4cd96f
              color #fff
              text-align center
              font-size 16px
              line-height 42px
              border 0
          .about_us
            display block
            font-size 12px
            margin-top 20px
            text-align center
            color #999
</style>
