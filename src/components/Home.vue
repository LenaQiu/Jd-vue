<template>
  <div class="home">
    <!-- swiper -->
    <my-swiper :swiperImgs="swiperData"></my-swiper>
    <!-- 520 activity -->
    <activity>
      <div class="activity-520">
        <img v-for="item of activityData" :key="item.id" :src="item.icon">
      </div>
    </activity>
    <!-- 京东服务选项 -->
    <mode-options></mode-options>
    <!-- 京东秒杀 -->
    <seckill :seckillData="seckillData"></seckill>
    <!-- 拼购节 -->
    <activity>
      <div class="activity-pin-gou-jie">
        <img src="@images/haoHuoQiang.gif">
      </div>
    </activity>
    <!-- 商品列表 -->
    <goods></goods>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
import Seckill from '@c/seckill/Seckill.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'Home',
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seckill,
    Goods
  },
  data: function () {
    return {
      swiperData: [],
      // swiperHeight: '184px',
      activityData: [],
      // 秒杀数据
      seckillData: []
    }
  },
  methods: {
    initData: function () {
      // axios 同时发送多个请求 （并行）
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys'),
        this.$http.get('/seconds')
      ]).then(this.$http.spread((swiperData, activityData, seckillData) => {
        this.swiperData = swiperData.list
        this.activityData = activityData.list
        this.seckillData = seckillData.list
        // console.log(this.seckillData)
      })).catch(err => {
        console.log(err)
      })
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow-y: auto;
  .activity-520 {
    display: flex;
    img {
      width: 33.33%;
    }
  }
  .activity-pin-gou-jie {
    margin-top: px2rem(8);
    display: flex;
    width: 100%;
    background-color: #fff;
    img {
      width: 100%
    }
  }
}
</style>
