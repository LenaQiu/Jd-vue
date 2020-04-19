<template>
  <div class="goods-detail">
    <!-- 导航条 -->
    <navigation-bar
      :isShowBack="isShowBack"
      :navBarStyle="navBarStyle"
      :isShowTitle="false">
      <!-- 左边插槽 -->
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <!-- 默认状态下黑色后退按钮 -->
          <img :style="{opacity: opacity2}" src="@images/back-2.svg"/>
          <!-- 完全展示之后的白色后退按钮 -->
          <img :style="{opacity: opacity1}" src="@images/back-white.svg"/>
        </div>
      </template>
      <!-- /左边插槽 -->
      <template v-slot:nav-center>
        <p :style="{opacity: opacity1}">{{pageName}}</p>
      </template>
    </navigation-bar>
    <!-- /导航条 -->
    <!-- 产品详情内容区域 -->
    <div class="goods-detail-content">
      <parallax @onScrollChange="onScrollChange">
        <!-- 轮播图组件 & 缓慢移动区-->
        <template v-slot:parallax-low>
          <my-swiper
            :height="SWIPER_IMAGE_HEIGHT + 'px'"
            :swiperImgs="goodsData.swiperImgs"
            :paginationType="paginationType"
          ></my-swiper>
        </template>
        <!-- /轮播图组件 -->
        <!-- 正常移动区 -->
        <template>
          <!-- 商品价格 + 名称 -->
          <div class="goods-detail-content-group-warp">
            <p class="price">¥{{goodsData.price | priceValue}}</p>
            <p class="name">
            <!-- 是否 直营 / 是否 有货 -->
            <direct v-if="goodsData.isDirect"></direct>
            {{goodsData.name}}
            </p>
          </div>
          <div class="goods-detail-content-group-warp">
            <div class="selected text-line-1">
                <span class="selected-title">已选</span><span class="name">{{goodsData.name}}</span>
            </div>
            <ul class="server">
            <li v-for="(item, index) of attachData" :key="index">
                <img src="@images/support.svg"/>{{item}}
            </li>
            </ul>
          </div>
          <div class="goods-detail-desc">
            <img v-for="item of goodsData.detailImgs" :key="item.id" :src="item">
          </div>
          <!-- /产品详情内容区域 -->
        </template>
      </parallax>
    </div>
    <!-- 加入购物车 与 立即购买按钮 -->
    <action-bar @onBuyClick="onBuyClick" @onAddCartClick="onAddCartClick"></action-bar>
    <!-- /加入购物车 与 立即购买按钮 -->
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import MySwiper from '@c/swiper/MySwiper.vue'
import ActionBar from '@c/currency/ActionBar.vue'
import Direct from '@c/goods/Direct.vue'
import Parallax from '@c/parallax/Parallax.vue'
export default {
  name: 'GoodsDetail',
  components: {
    NavigationBar,
    MySwiper,
    ActionBar,
    Direct,
    Parallax
  },
  data () {
    return {
      pageName: '商品详情',
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      swiperImgs: [],
      // 附加服务
      attachData: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ],
      isShowBack: false, // 原 导航条 是否显示后退按钮
      SWIPER_IMAGE_HEIGHT: 200, // swiper 限高
      goodsData: {}, // 通过 route 传递过来的产品数据
      paginationType: '2', // 分页器展示类型
      ANCHOR_HEIGHT: 260, // 固定锚高
      navBarToTop: 0, // 滚动条滚动的距离
      opacity1: 0, // 逐渐显示：滚动条滚动的距离 / 固定锚高
      opacity2: null // 逐渐隐藏： 1 - opacity1
    }
  },
  methods: {
    /**
     * 后退事件
     */
    onBackClick () {
      this.$router.go(-1)
    },
    /**
     * 页面滚动事件
     */
    onScrollChange: function (scrollValue) {
      this.opacity1 = (scrollValue / this.ANCHOR_HEIGHT) < 1 ? (scrollValue / this.ANCHOR_HEIGHT) : 1
      this.opacity2 = 1 - this.opacity1
      this.navBarStyle.backgroundColor = 'rgba(216, 30, 6,' + this.opacity1 + ')'
    },
    /**
     * 根据商品id 获取商品详情数据
     */
    loadGoodsData: function () {
      this.$http.get('/goodsdetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsData = data.goodsData
      })
    },
    onBuyClick: function () {
      // console.log(msg)
      this.$router.push({
        name: 'Buy',
        params: {
          routerType: 'push'
        },
        query: {
          goodsId: this.goodsData.id
        }
      })
    },
    onAddCartClick: function () {
      // 保存商品到购物车数据源
      this.$store.commit('addShoppingData', this.goodsData)
      console.log('添加购物车')
      // alert('添加成功')
      this.$router.push({
        name: 'Main',
        params: {
          routerType: 'push',
          // 自定义标记 代表 toolbar tab 的下标
          componentIndex: 1,
          // 自定义标记， 清除虚拟任务栈
          clearTaskStack: true
        }
      })
    }
  },
  created () {
    // console.log('创建详情页面')
    this.loadGoodsData()
    // this.goodsData = this.$route.params.goods
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .navigation-bar {
    // background: $mainColor;
    color: #fff;
    .goods-detail-nav-left {
        display: flex;
        width: 100%;
        img {
        align-self: center;
        position: absolute;
        }
    }
  }
  // 详情内容区域样式
  &-content {
    height: 100%;
    overflow: hidden;
    .goods-detail-content-group-warp {
      padding: px2rem(8);
      font-size: $infoSize;
      background: white;
      margin-bottom: 10px;
      .price {
        margin-bottom: px2rem(8);
        color: red;
        font-size: px2rem(18);
      }
      .name {
        font-size: $titleSize;
        line-height: px2rem(20);
      }
      .selected {
        margin-bottom: px2rem(8);
        color: #ccc;
        line-height: px2rem(24);
        border-bottom: 1px solid #ccc;
        .selected-title {
          display: inline-block;
          margin-right: px2rem(4);
        }
        .name {
          font-size: $infoSize;
          color: #000;
        }
      }
      .server {
        font-size: $miniSize;
        color: #ccc;
        line-height: px2rem(24);
        li {
          display: inline-block;
          margin-right: px2rem(10);
          // background-image: url('@images/support.svg')
          img {
            width: px2rem(12);
            display: inline-block;
            margin-right: px2rem(4);
          }
        }
      }
    }
    .goods-detail-desc {
      display: block;
      font-size: 0;
      margin-bottom: px2rem(8);
      img {
        width: 100%;
      }
    }
  }
}

</style>
