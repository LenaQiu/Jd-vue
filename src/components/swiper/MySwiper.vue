<template>
<!-- 1、swiper; 2、滑动模块； 3、分页器 -->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="item of swiperImgs" :key="item.id">
      <img :style="{height: height}" :src="item.icon" alt="">
    </swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'MySwiper',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    swiperImgs: Array,
    height: String
  },
  data: function () {
    return {
      // swiper 配置
      swiperOptions: {
        // 自动滚动
        autoplay: true,
        // swiper 高度 跟随 slide 高度变化
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
          // bulletClass: 'custom-bullet-class'
        }
      }
    }
  }
}
</script>

<style lang="scss"  scoped>
@import '@css/style.scss';
.swiper-container {
  .swiper-wrapper
    img {
      display: block;
    }
      // 隐藏部分 出错， 页面不渲染一下样式
  .swiper-pagination{
    bottom: px2rem(12);
    height: 30px;
    .custom-bullet-class {
      box-sizing: border-box;
      border-radius: 100%;
      height: px2rem(6);
      width: px2rem(6);
      border: px2rem(1) solid #fff;
      margin: 0 px2rem(4);
      display: inline-block;
      opacity: 1;
  }

    .swiper-pagination-bullet-active {
        background: white;
    }
  }
}

</style>
