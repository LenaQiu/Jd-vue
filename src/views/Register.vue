<template>
  <div class="register">
    <navigation-bar :pageName="pageName" :isShowBack="true" @onLeftClick="onLeftClick"></navigation-bar>
    <div class="register-content">
      <div class="input-container"><input v-model="username" type="text" placeholder="用户名"></div>
      <div class="input-container"><input v-model="password" type="password" placeholder="密码"></div>
      <div class="input-container"><input v-model="confirmPassword" type="password" placeholder="确认密码"></div>
      <div class="submit-btn" @click="onRegisterClick">注册</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'Register',
  components: {
    NavigationBar
  },
  data: function () {
    return {
      pageName: '注册页面',
      // 用户名
      username: '',
      // 密码
      password: '',
      // 确认密码
      confirmPassword: ''
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
     * 注册按钮 单击事件
     */
    onRegisterClick: function () {
      if (this.username.length === 0) {
        alert('用户名不能为空')
        return
      }
      if (this.password !== this.confirmPassword || this.password.length === 0) {
        alert('请完善密码')
        return
      }
      console.log('保存用户名和密码')
      // 与原生交互，保存用户名和密码
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.register {
  position: absolute;
  width: 100%;
  height: 100%;
  // 登录表单
  .register-content {
    // 登录按钮
    .submit-btn {
      bottom: 40%;
    }
  }
}
</style>
