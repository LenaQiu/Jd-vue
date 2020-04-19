<template>
  <!--
    点击功能选项跳转到商品列表
  -->
  <div class="mode-options">
    <div
      class="mode-options-itme"
      v-for="item of dataSource"
      :key="item.id"
      @click="handleOptionsClick"
    >
      <img class="mode-options-itme-icon" :src="item.icon">
      <p class="mode-options-itme-title">{{item.titel}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModeOptions',
  data () {
    return {
      // 数据源
      dataSource: [{
        id: '1',
        icon: require('@images/jingDongChaoShi.png'),
        titel: '京东超市'
      }, {
        id: '2',
        icon: require('@images/jingDongDaoJia.png'),
        titel: '京东到家'
      }, {
        id: '3',
        icon: require('@images/jingDongFuShi.png'),
        titel: '京东服饰'
      }, {
        id: '4',
        icon: require('@images/jingDongPinGou.png'),
        titel: '京东拼购'
      }, {
        id: '5',
        icon: require('@images/jingDongShengXian.png'),
        titel: '京东鲜生'
      }, {
        id: '6',
        icon: require('@images/lingJuan.png'),
        titel: '领券'
      }, {
        id: '7',
        icon: require('@images/zhuanQian.png'),
        titel: '赚钱'
      }, {
        id: '8',
        icon: require('@images/quanBu.png'),
        titel: '查物流'
      }, {
        id: '9',
        icon: require('@images/chongZhiJiaoFei.png'),
        titel: '充值缴费'
      }, {
        id: '10',
        icon: require('@images/haiTunQuanQiu.png'),
        titel: '全球购'
      }]
    }
  },
  methods: {
    handleOptionsClick: function () {
      this.$router.push({
        name: 'GoodsList',
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
.mode-options {
  position: relative;
  margin-top: px2rem(6);
  background-color: #fff;
  border-top-left-radius: px2rem(8);
  border-top-right-radius: px2rem(8);
  &-itme {
    box-sizing: border-box;
    width: 20%;
    display: inline-block;
    padding: px2rem(6)px2rem(4);
    text-align: center;
    &-icon {
      width: 80%;
      font-size: 0;
      display: inline-block;
    }
    &-title {
      font-size: $miniSize;
      margin-top: px2rem(4);
    }
  }
}
</style>
