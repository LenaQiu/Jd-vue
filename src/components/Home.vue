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
    <mode-options></mode-options>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
export default {
  name: 'Home',
  components: {
    MySwiper,
    Activity,
    ModeOptions
  },
  data: function () {
    return {
      swiperData: [],
      // swiperHeight: '184px',
      activityData: []
    }
  },
  methods: {
    initData: function () {
      // this.$http.get('/swiper').then(data => {
      //   this.swiperImgs = data.list
      //   // console.log(this.swiperImgs)
      // }).catch(err => {
      //   console.log(err)
      // })
      // // activityData
      // this.$http.get('/activitys').then(data => {
      //   this.activityDatas = data.list
      //   console.log(this.activityDatas)
      // }).catch(err => {
      //   console.log(err)
      // })

      // axios 同时发送多个请求 （并行）
      this.$http.all([
        this.$http.get('/swiper'),
        this.$http.get('/activitys')
      ]).then(this.$http.spread((swiperData, activityData) => {
        this.swiperData = swiperData.list
        this.activityData = activityData.list
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
  .activity-520 {
    display: flex;
    img {
      width: 33.33%;
    }
  }
}
</style>
