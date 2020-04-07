<template>
  <div class="home">
    <!-- swiper -->
    <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
    <!-- 520 activity -->
    <activity>
      <div class="520-activity">
        <img v-for="item of activityDatas" :key="item.id" :src="item.icon">
      </div>
    </activity>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
export default {
  name: 'Home',
  components: {
    MySwiper,
    Activity
  },
  data: function () {
    return {
      swiperImgs: [],
      swiperHeight: '184px',
      activityDatas: []
    }
  },
  methods: {
    initData: function () {
      this.$http.get('/swiper').then(data => {
        this.swiperImgs = data.list
        // console.log(this.swiperImgs)
      }).catch(err => {
        console.log(err)
      })
      // activityData
      this.$http.get('/activitys').then(data => {
        this.activityDatas = data.list
        console.log(this.activityDatas)
      }).catch(err => {
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
}
</style>
