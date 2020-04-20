<template>
  <div class="my">
    <navigation-bar :pageName="pageName" :isShowBack="false"></navigation-bar>
    <!-- 登录/注册 -->
    <div class="my-login" @click="onloginClick">
      <img src="@images/avater.png">
      登录/注册</div>
    <ul class="my-list">
      <li
        class="my-list-item"
        v-for="item of myData"
        :key="item.id"
      >
      {{item.title}}
      <span class="my-list-item-right"><img src="@images/right-arrow.svg"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'My',
  components: {
    NavigationBar
  },
  data () {
    return {
      pageName: '个人中心',
      // 数据源
      myData: [
        {
          id: '1',
          title: '全部订单'
        },
        {
          id: '2',
          title: '我的预约'
        },
        {
          id: '3',
          title: '应用推荐'
        },
        {
          id: '4',
          title: '用户福利'
        }
      ]
    }
  },
  methods: {
    /**
     * 登录按钮 单击事件
     */
    onloginClick: function () {
      this.$router.push({
        name: 'Login',
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
.my {
  width: 100%;
  height: 100%;
  background: $bgColor;
  font-size: $infoSize;
  line-height: px2rem(18);
  .my-login {
    margin-top: px2rem(8);
    padding: px2rem(6) px2rem(12);
    border-bottom: px2rem(1) solid #eee;
    background-color: #fff;
    display: flex;
    line-height: px2rem(54);
    font-size: $titleSize;
    img {
      width: px2rem(54);
      margin-right: px2rem(8);
    }
  }
  .my-list {
    background: #fff;
    &-item {
      padding-left: px2rem(12);
      line-height: px2rem(42);
      border-bottom: px2rem(1) solid #eee;
      display: flex;
      justify-content: space-between;
      &-right {
        padding: 0 px2rem(12);
        line-height: px2rem(32);
        display: flex;
        img {
          width: px2rem(16);
        }
      }
    }
  }
}
</style>
