<template>
  <!--
      瀑布流布局：
      1、创建商品列表当基本 html 与 css ， 让 item 相对于 goods 进行排列
      2、生成不同高度当图片，撑起不同高度当 item
      3、计算 item 的位置，来达到 从上到下 、从左到右 依次排列到目的
   -->
  <div class="goods goods-waterfalls" :style="this.goodsWaterfallsStyle">
    <div
      class="goods-item goods-waterfalls-item"
      v-for="(item, index) of sourceData"
      :key="item.id"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
    >
      <img
        class="goods-item-img"
        :src="item.img"
        :alt="item.name"
        :style="imgStyles[index]"
      >
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
  name: 'Goods', // 模版名称
  data () {
    return {
      // 数据源
      sourceData: [],
      MAX_IMG_HEIGHT: 220, // 瀑布流图片最高值
      MIN_IMG_HEIGHT: 100, // 瀑布流图片最低值
      imgStyles: [], // 瀑布流图片样式
      ITEM_MARGIN_SIZE: 8, // item margin值
      goodsWaterfallsStyle: {}, // 瀑布流容器 样式
      goodsItemStyles: [] // 瀑布流图片 样式
    }
  },
  methods: {
    // 请求数据源
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          this.sourceData = data.list

          // 获取数据后， 执行 图片样式 事件
          this.initImgStyle()

          // vm.$nextTick(）将回调延迟到下次 DOM 更新循环之后执行...
          this.$nextTick(() => {
            this.initWaterfall()
          })
        })
    },
    /**
     * 返回随机的图片高度
     */
    imgHeight: function () {
      //   Math.random() 返回从 0-1 的随机数 * （高度区间 + 最低的图片高度
      // const randomHeight = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT))
      const result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT)) + this.MIN_IMG_HEIGHT
      return result
    },
    /**
     * 根据随机的图片高度，生产对应的图片样式
     */
    initImgStyle: function () {
      this.sourceData.forEach((item) => {
        const nImgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({
          height: nImgHeight
        })
      })
    },
    /**
     * 瀑布流布局
     * 1、获取所有的 item 元素
     * 2、遍历 item 元素，得到每一个 item 的高度，加上一个 margin 的高度
     * 3、 创建两个变量： leftHeightTotal, rightHeightTotal 分别表示左右两侧距离顶部的高度；
     */
    initWaterfall: function () {
      // 获取所有 item 元素
      const $goodsItems = this.$refs.goodsItem
      if (!$goodsItems) return
      // 遍历 item 元素， 得到每一个item 的高度，加上一个 margin 的高度
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      $goodsItems.forEach(($item, index) => {
        // item 样式
        let goodsItemStyle = {}
        // goodsItems + margin 的高度
        const eHeight = $item.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0',
            top: leftHeightTotal + 'px'
          }
          // 更新左侧 距离顶部的高度
          leftHeightTotal += eHeight
        } else {
          goodsItemStyle = {
            right: 0,
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += eHeight
        }

        // 保存计算出的  item 所有样式
        this.goodsItemStyles.push(goodsItemStyle)
        // goods 总高样式
        const goodsHeightTotal = leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal
        this.goodsWaterfallsStyle = { height: goodsHeightTotal + 'px' }
      })
    }
  },
  created () {
    this.initData()
    this.imgHeight()
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  margin-top: px2rem(8);
  padding: 0 px2rem(4);
  position: relative;
  &-item {
    box-sizing: border-box;
    padding: px2rem(8);
    width: 49%;
    // display: inline-block;
    background-color: #fff;
    text-align: center;
    &-img {
      max-width: 100%;
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
  .goods-waterfalls-item {
    position: absolute;
  }
}
</style>
