<template>
  <!--
      瀑布流布局：
      1、创建商品列表当基本 html 与 css ， 让 item 相对于 goods 进行排列
      2、生成不同高度当图片，撑起不同高度当 item
      3、计算 item 的位置，来达到 从上到下 、从左到右 依次排列到目的
      垂直列表： goods-list
      网格布局  goods-grid
      瀑布流布局 goods-waterfalls
   -->
  <div
    class="goods"
    :style="{height: goodsViewHeight}"
    :class="[layoutClass, {'goods-scroll': isScroll}]"
    @scroll="onScrollChange"
    ref="goods"
  >
    <div
      class="goods-item"
      :class="layoutItemClass"
      v-for="(item, index) of sourceData"
      :key="item.id"
      ref="goodsItem"
      :style="goodsItemStyles[index]"
      @click="onItemClick(item)"
    >
      <img
        class="goods-item-img"
        :src="item.img"
        :alt="item.name"
        :style="imgStyles[index]"
      >
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2" :class="{ 'goods-item-desc-name-hint':!(item.isHave) }">
          <!-- 是否 直营 / 是否 有货 -->
          <direct v-if="item.isDirect"></direct>
          <no-have v-if="!(item.isHave)"></no-have>
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
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'
export default {
  name: 'Goods', // 模版名称
  components: {
    Direct,
    NoHave
  },
  props: {
    /**
     * 在父元素中指定的展示形式
     * 1: 垂直布局
     * 2: 网格布局
     * 3: 瀑布流布局
     */
    layoutType: {
      type: String,
      default: '1'
    },
    // 是否允许单独滑动
    isScroll: {
      type: Boolean,
      default: true
    },
    // 排序规则
    sort: {
      type: String,
      default: '1' // 筛选数据源的方式
    }
  },
  data () {
    return {
      // 数据源
      sourceData: [],
      // 排序数据
      sortGoodsData: [],
      MAX_IMG_HEIGHT: 220, // 瀑布流图片最高值
      MIN_IMG_HEIGHT: 100, // 瀑布流图片最低值
      imgStyles: [], // 瀑布流图片样式
      ITEM_MARGIN_SIZE: 8, // item margin值
      goodsViewHeight: '100%', // 瀑布流容器 样式
      goodsItemStyles: [], // 瀑布流图片 样式
      layoutClass: 'goods-list', // 不同展示形式下的类名
      layoutItemClass: 'goods-list-item',
      scrollTopValue: 0 // 滑动距离
    }
  },
  methods: {
    // 请求数据源
    initData: function () {
      this.$http.get('/goods')
        .then(data => {
          this.sourceData = data.list
          this.setSortGoodsData()
          // 设置布局
          this.initLayout()
        })
    },
    /**
     *  根据筛选项排序
     */
    setSortGoodsData: function () {
      // console.log('根据晒选项排序')
      // 有货有先
      switch (this.sort) {
        // 默认
        case '1':
          // 深拷贝数据源， 不改变原数组
          this.sortGoodsData = this.sourceData.slice(0)
          break
        // 价格由高到低
        case '1-2':
          this.getSortGoodsDataFromkey('price')
          break
        // 销量由高到低
        case '1-3':
          this.getSortGoodsDataFromkey('volume')
          break
        // 有货有先
        case '2':
          this.getSortGoodsDataFromkey('isHave')
          break
        // 直营优先
        case '3':
          this.getSortGoodsDataFromkey('isDirect')
          break
      }
    },
    /**
     * 根据传入的 key 进行排序
     */
    getSortGoodsDataFromkey: function (key) {
      /**
       * sort 可以完成数据的数据排序
       * 当接收的值，为负数的时候， goods1 排在 goods2 之前
       * 当接收的值，为整数的时候， goods1 排在 goods2 之后
       * 当接收的值，为0的时候， goods1 排在 goods2 不变
       */
      this.sourceData.sort((goods1, goods2) => {
        // 根据传入的 key 获取对应的 value
        const v1 = goods1[key]
        const v2 = goods2[key]
        // 对 value 进行对比
        // boolean 类型的值 （有货优先和直营优先）
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        // float 类型的值处理 （价格、销量）
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        } else {
          return 1
        }
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
        // 如果不允许滑动， 则展示计算高度
        if (!this.isScroll) {
          this.goodsViewHeight = goodsHeightTotal + 'px'
        }
      })
    },
    /**
     * 设置布局，为不同的 layOutType 设置不同的展示形式
     * 1、初始化影响到布局的数据
     *    1、goodsViewHeight -> 垂直布局、网格布局 (100%) 瀑布流(实际高度)
     *    2、goodsItemStyles
     *    3、imgStyles
     * 2、 为不同的 layOutType 设置不同的展示类
     */
    initLayout: function () {
      // 初始化数据
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []
      // 为不同的 layOutType 设置不同的展示类
      switch (this.layoutType) {
        // 垂直布局
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        // 网格布局
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        // 瀑布流布局
        case '3':
          this.layoutClass = 'goods-waterfalls'
          this.layoutItemClass = 'goods-waterfalls-item'
          // 图片样式处理
          this.initImgStyle()
          // 调用创建瀑布流的方法 （等到 dom 创建完成之后）
          // vm.$nextTick(）将回调延迟到下次 DOM 更新循环之后执行...
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
        default:
          this.layoutClass = 'goods-waterfalls'
          this.layoutItemClass = 'goods-waterfalls-item'
      }
    },
    onItemClick: function (item) {
      if (!item.isHave) {
        alert('该商品无库存')
        return
      }
      this.$router.push({
        name: 'GoodsDetail',
        params: {
          routerType: 'push'
        },
        // 带查询参数，变成 /GoodsDetail?goodsId=item.id
        query: {
          goodsId: item.id
        }
      })
    },
    /**
     * 滑动事件
     */
    onScrollChange: function ($event) {
      this.scrollTopValue = $event.target.scrollTop
    }
  },
  created () {
    this.initData()
    this.imgHeight()
  },
  watch: {
    /**
     * 监听 layout 的变化
     */
    layoutType: function () {
      this.initLayout()
    },
    /**
     * 监听 sort
     */
    sort: function () {
      this.setSortGoodsData()
    }
  },
  activated () {
    this.$refs.goods.scrollTop = this.scrollTopValue
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  // margin-top: px2rem(8);
  // padding: 0 px2rem(4);
  position: relative;
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }
  &-item {
    box-sizing: border-box;
    // padding: px2rem(8);
    // width: 49%;
    // display: inline-block;
    background-color: #fff;
    text-align: center;
    &-img {
      display: inline-block;
      max-width: 100%;
      font-size: 0;
    }
    &-desc {
      font-size: $infoSize;
      line-height: px2rem(18);
      &-name {
        text-align: left;
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
      .goods-item-desc-name-hint {
        color: #ccc;
      }
    }
  }
}
// 垂直列表
.goods-list {
  &-item {
    display: flex;
    background: #fff;
    border-bottom: 1px solid #ccc;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120)!important;
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: px2rem(16);
    }
  }
}
//网格布局
.goods-grid {
  // padding:0 px2rem(8);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: px2rem(8);
    margin-bottom: px2rem(8);
    .goods-item-img {
      width: 100%;
    }
    .goods-item-desc {
      padding:0 px2rem(8) px2rem(8);
    }
  }
}
// 瀑布流布局样式
.goods-waterfalls {
  &-item {
    position: absolute;
    width: 49%;
    .goods-item-desc {
      padding: 0 px2rem(8) px2rem(8);
    }
  }
}
</style>
