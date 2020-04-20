<template>
  <div class="login">
    <navigation-bar :pageName="pageName" :isShowBack="true" @onLeftClick="onLeftClick"></navigation-bar>
    <div class="login-content">
      <div class="input-container"><input v-model="username" type="text" placeholder="用户名"></div>
      <div class="input-container"><input v-model="userpassword" type="password" placeholder="密码"></div>
      <div class="submit-btn" @click="onLoginClick">登录</div>
      <p class="login-content-register" @click="onRegisterClick">注册新用户</p>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'Login',
  components: {
    NavigationBar
  },
  data: function () {
    return {
      pageName: '登录页面',
      // 用户名
      username: '',
      // 密码
      userpassword: ''
    }
  },
  methods: {
    /**
     * 导航栏 返回按钮 单击事件
     */
    onLeftClick: function () {
      console.log('点击后退按钮')
      this.$router.go(-1)
    },
    /**
     * 登录按钮 单击事件
     */
    onLoginClick: function () {
      // 验证用户输入等合法性
      if (this.username.length === 0 && this.userpassword.length === 0) {
        alert('用户名或密码不能为空')
        return
      }
      console.log('与原生交互,验证用户输入账户是否正确')
      // 与原生交互，验证用户输入账户是否正确
    },
    /**
     * 注册按钮 单击事件
     */
    onRegisterClick: function () {
      this.$router.push({
        name: 'Register',
        params: {
          routerType: 'push'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  // 登录表单
  .login-content {
    // 登录按钮
    .submit-btn {
      bottom: 40%;
    }

    // 注册新用户
    .login-content-register {
      font-size: $infoSize;
      color: #949393;
      position: absolute;
      right: px2rem(22);
      bottom: 36%;
      text-align: right;
    }
  }
}
</style>
