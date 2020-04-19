<template>
<!-- 1、swiper; 2、滑动模块； 3、分页器 -->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item,index) of swiperImgs" :key="index">
      <img class="swiper-slide-img" :src="item" alt="">
    </swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
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
    /**
     * 1、 圆点切换
     * 2、
     */
    paginationType: {
      type: String,
      default: '1'
    }
  },
  data: function () {
    return {
      // swiper 配置
      swiperOptions: {
        // 自动滚动
        autoplay: false,
        // swiper 高度 跟随 slide 高度变化
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
          // bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  methods: {
    /**
     * 根据分页器类型配置对应当分页器
     */
    iniPaginationLayout: function () {
      switch (this.paginationType) {
        // 圆点分页器
        case '1':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            type: 'bullets',
            bulletClass: 'custom-bullet-class'
          }
          break
        case '2':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            // 分页器的样式为数字
            type: 'fraction'
            // bulletClass: 'custom-bullet-class'
          }
          break
      }
    }
  },
  created () {
    this.iniPaginationLayout()
  }
}
</script>
// 这里不加 scoped ，让它成为全局样式，只在其中操作swiper样式
<style lang="scss">
@import '@css/style.scss';
.swiper-container {
  .swiper-wrapper
    img {
      display: block;
      width: 100%;
    }
  // 页面不渲染一下样式
  .swiper-pagination{
    // bottom: px2rem(12);
    // 当前圆点样式
    .swiper-pagination-bullet-active {
      background: white;
    }
    // 自定义圆点样式
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
  }
  // 分页样式 -> 分数
  .swiper-pagination-fraction {
    width: auto;
    padding: px2rem(6) px2rem(18);
    right: 0;
    left: auto;
    bottom: px2rem(32);
    background: rgba(0, 0, 0, .3);
    border-radius: px2rem(16) 0 0 px2rem(16);
    font-size: $infoSize;
    color: #fff;
    .swiper-pagination-current {
      font-size: $titleSize;
      font-weight: bold;
    }
  }
}
</style>
