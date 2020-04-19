<template>
  <div class="home" @scroll="onScollChange" ref="home">
    <navigation-bar :isShowBack="false" :isShowTitle="false" :navBarStyle="navBarStyle">
      <!-- 插槽 nav-left -->
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
      </template>
      <!-- 插槽 nav-center -->
      <template v-slot:nav-center>
        <search
        :icon="navBarCurrentSlotStyle.search.icon"
        :bgColor="navBarCurrentSlotStyle.search.bgColor"
        :hintColor="navBarCurrentSlotStyle.search.hintColor"
        >
        </search>
      </template>
      <!-- 插槽 nav-right -->
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
      </template>
    </navigation-bar>
    <!-- swiper -->
    <my-swiper :swiperImgs="swiperImgs"></my-swiper>
    <!-- 520 activity -->
    <activity>
      <div class="activity-520">
        <img v-for="item of activityData" :key="item.id" :src="item.icon">
      </div>
    </activity>
    <!-- 京东服务功能选项选项 -->
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
    <goods :layoutType="'2'" :isScroll="false"></goods>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
import Seckill from '@c/seckill/Seckill.vue'
import Goods from '@c/goods/Goods.vue'
import NavigationBar from '@c/currency/NavigationBar.vue'
import Search from '@c/currency/Search.vue'
export default {
  name: 'Home',
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seckill,
    Goods,
    NavigationBar,
    Search
  },
  data: function () {
    return {
      pageName: '首页',
      swiperData: [],
      // swiperHeight: '184px',
      activityData: [],
      // 秒杀数据
      seckillData: [],
      // navBar 插槽的样式数据，包含页面未开始滑动的时候插槽的样式
      // 和 页面滑动到指定位置 之后的插槽的样式
      navBarSlotStyle: {
        // 默认样式
        normal: {
          // 左侧插槽
          leftIcon: require('@images/more-white.svg'),
          // 中间插槽
          search: {
            bgColor: '#fff',
            hintColor: '#999',
            icon: require('@images/search.svg')
          },
          // 右边
          rightIcon: require('@images/message-white.svg')
        },
        // 高亮样式 （页面滑动到指定位置）
        heightLight: {
          // 左侧插槽
          leftIcon: require('@images/more.svg'),
          // 中间插槽
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#fff',
            icon: require('@images/search-white.svg')
          },
          // 右边
          rightIcon: require('@images/message.svg')
        }
      },
      // navBar 当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      // navBar 的定制样式
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面滚动值
      scrollTopValue: null
    }
  },
  computed: {
    swiperImgs: function () {
      return this.swiperData.map(item => item.icon)
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
    },
    /**
     * home元素 滚动事件处理
     * 透明度 = 滚动距离 / 指定的距离
     */
    onScollChange: function ($e) {
      this.scrollTopValue = $e.target.scrollTop
      let opc = this.scrollTopValue / 160
      opc = opc < 1 ? opc : 1
      this.navBarStyle.backgroundColor = 'rgba(255, 255, 255, ' + opc + ')'
      if (opc >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.heightLight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
    }
  },
  created () {
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    this.initData()
  },
  /**
   * 在 keep-alive 激活被执行
   */
  activated () {
    this.$refs.home.scrollTop = this.scrollTopValue
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
  .navigation-bar {
    .center .nav-center-search{
      margin: px2rem(6) 0;
      width: 100%;
      height: px2rem(32);
      background: #fff;
      border-radius: px2rem(6);
    }
  }
  .swiper-container {
    height: 0;
    padding-bottom: 48.9%;
  }
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
      width: 100%;
    }
  }
}
</style>
