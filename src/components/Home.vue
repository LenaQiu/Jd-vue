<template>
  <div class="home">
    <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
export default {
  name: 'Home',
  components: {
    MySwiper
  },
  data: function () {
    return {
      swiperImgs: [
        require('@images/swiper-1.jpg'),
        require('@images/swiper-2.jpg'),
        require('@images/swiper-3.jpg'),
        require('@images/swiper-4.jpg'),
        require('@images/swiper-5.jpg'),
        require('@images/swiper-6.jpg'),
        require('@images/swiper-7.jpg'),
        require('@images/swiper-8.jpg')
      ],
      swiperHeight: '184px'
    }
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
