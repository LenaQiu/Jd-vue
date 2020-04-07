<template>
  <!--
      瀑布流布局：
      1、创建商品列表当基本 html 与 css ， 让 item 相对于 goods 进行排列
      2、生成不同高度当图片，撑起不同高度当 item
      3、计算 item 的位置，来达到 从上到下 、从左到右 依次排列到目的
   -->
  <div class="goods goods-waterfalls">
    <div
      class="goods-item goods-waterfalls-item"
      v-for="item of sourceData"
      :key="item.id"
    >
      <img class="goods-item-img" :src="item.img" :alt="item.name">
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2">
          <!-- 是否 直营 / 是否 有货 -->
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">¥{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Goods',
  data () {
    return {
      // 数据源
      sourceData: '',
      MAX_HEIGHT: '',
      MIN_HEIGHT: ''
    }
  },
  methods: {
    // 请求数据源
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          this.sourceData = data.list
          console.log(data.list)
        })
    },
    /**
     * 返回随机的图片高度
     */
    imgHeight: function () {
    //   Math.random()
    let result = Math.floor(Math.random() * (this.MAX_HEIGHT - this.MIN_HEIGHT))
    return result
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  margin-top: px2rem(6);
  padding: 0 px2rem(4);
  position: relative;
  &-item {
    margin: 1%;
    box-sizing: border-box;
    padding: px2rem(8);
    width: 48%;
    // display: inline-block;
    background-color: #fff;
    &-img {
      width: 100%;
    }
    &-desc {
      font-size: $infoSize;
      line-height: px2rem(18);
      &-name {
        font-weight: 600;
      }
      &-data {
        margin-top: px2rem(6);
        display: flex;
        justify-content: space-between;
        line-height: $titleSize;
        font-size: $infoSize;
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
