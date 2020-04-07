<template>
  <div class="mode-options">
    <div
      class="mode-options-itme"
      v-for="item of dataSource"
      :key="item.id"
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
  mounted () {
    console.log(this.dataSource)
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.mode-options {
  position: relative;
  &-itme {
    width: 20%;
    display: inline-block;
    margin-top: px2rem(8);
    box-sizing: border-box;
    padding: 2px;
    text-align: center;
    &-icon {
      width: 80%;
      font-size: 0;
      display: inline-block;
    }
    &-title {
      font-size: $minifoSize;
      margin-top: px2rem(4);
    }
  }
}
</style>
