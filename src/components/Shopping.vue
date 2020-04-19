<template>
  <div class="shopping">
    <navigation-bar :pageName="pageName" :isShowBack="false"></navigation-bar>
    <div class="shopping-content">
      <ul class="shoping-list">
        <!-- 商品item -->
        <li
          class="shoping-list-item"
          v-for="(item,index) of shoppingDatas"
          :key="index"
        >
          <img class="shoping-list-item-select" :src="checkIcon(item.ischeck)" @click="onGoodsClick(item)">
          <img class="shoping-list-item-img" :src="item.img">
          <div class="shoping-list-item-info">
            <p class="shoping-list-item-info-name text-line-2">
              <direct v-if="item.isDirect"></direct>{{item.name}}
            </p>
            <div class="shoping-list-item-info-data">
              <p class="shoping-list-item-info-data-price">¥{{item.price | priceValue}}</p>
              <!-- 计数器 -->
              <counter :defaultNumber="item.number" @onChangeNumber="onChangeNumber(arguments, item, index)"></counter>
            </div>
          </div>
        </li>
        <!-- /商品item -->
      </ul>
    </div>
     <!-- 统计 -->
    <div class="shopping-content-total">
      <!-- 全选 check -->
      <div class="shopping-content-total-check">
        <img :src="checkIcon(totalData.isAll)" @click="onAllCheck">
        <p>全选</p>
      </div>

      <!-- 总价格 -->
      <div class="shopping-content-total-price">
        <p class="shopping-content-total-price-total">合计：<span>¥{{totalData.totalPrice | priceValue}}</span></p>
        <p class="shopping-content-total-price-all">
          总额：<span>¥{{totalData.totalPrice | priceValue}}</span> &nbsp;&nbsp;&nbsp;
          立减<span>¥{{totalData.cutNumber | priceValue}}</span>
        </p>
      </div>

      <!-- 结算 -->
      <div class="shopping-content-total-commit">去结算({{totalData.number}})</div>
    </div>
    <!-- /统计 -->
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import Direct from '@c/goods/Direct.vue'
import Counter from '@c/goods/Counter.vue'
export default {
  name: 'Shopping',
  components: {
    NavigationBar,
    Direct,
    Counter
  },
  data () {
    return {
      pageName: '购物车',
      // 购物车里 商品数据
      shoppingDatas: this.$store.state.shoppingDatas,
      slecteImg: require('@images/check.svg'), // 选中图片
      totalData: {
        // 是否全选
        isAll: false,
        totalPrice: 0,
        goodsNumber: 0,
        cutNumber: 0
      }
    }
  },
  methods: {
    /**
     * 返回 check 图标
     */
    checkIcon: function (check) {
      return check ? require('@images/check.svg') : require('@images/no-check.svg')
    },
    /**
     * check 按钮点击事件
     * 1、 如果选中 => 不选； 不选 => 选中 互相切换
     */
    onGoodsClick: function (item) {
      item.ischeck = !item.ischeck
      // 统计数据
      this.computeGoodsTotal()
    },
    /**
     * 全选按钮点击事件
     */
    onAllCheck: function () {
      this.totalData.isAll = !this.totalData.isAll
      // 为每个商品设置选中标记 为当前是否全选标记
      this.shoppingDatas.forEach(element => {
        element.ischeck = this.totalData.isAll
      })
      // 统计数据
      this.computeGoodsTotal()
    },
    /**
     * 监听到 数量 变化事件
     */
    onChangeNumber: function ($arguments, item, index) {
      console.log('shopping组件监听到数量变化' + $arguments[0])
      // 最新商品数量
      const number = $arguments[0]
      // 修改对应的商品数量
      this.$store.commit('changeShoppingDataNumber', {
        index: index,
        number: number
      })
      // 在商品数量发生变化时，并且该商品处于选中状态下
      if (item.ischeck) {
        this.computeGoodsTotal()
      }
    },
    /**
     * 计数总数据
     */
    computeGoodsTotal: function () {
      // 先初始化 totalData 的数据, 让是否全选默认为 true
      this.totalData = {
        // 是否全选
        isAll: true,
        totalPrice: 0,
        goodsNumber: 0
      }

      // 计数总计数据
      /**
       * 遍历数据源，如果有商品出于未选中状态下，那么则把 isAll 变成 false
       */
      this.shoppingDatas.forEach(element => {
        // 如果商品处于选中状态下，则计算该商品的价格和数量
        if (element.ischeck) {
          this.totalData.totalPrice += parseFloat(element.price) * parseInt(element.number)
          this.totalData.goodsNumber += parseInt(element.number)
        } else {
          this.totalData.isAll = false
        }
      })
    }
  },
  created () {
    console.log(this.shoppingDatas)
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.shopping {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .shopping-content {
    height: 100%;
    overflow-y: auto;
    background: $bgColor;
    // 商品列表
    .shoping-list {
      &-item {
        display: flex;
        border-top: px2rem(1) solid #eee;
        padding-left: px2rem(8);
        width: 100%;
        background-color: #fff;
        border-radius: px2rem(6);
        &-select {
          width: px2rem(20);
          display: inline-block;
        }
        &-img {
          display: inline-block;
          width: px2rem(100);
          height: px2rem(100);
          padding: 0 px2rem(8);
        }
        &-info {
          flex-grow: 1;
          padding: px2rem(8) px2rem(8) px2rem(8) 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: $titleSize;
          &-data {
            display: flex;
            line-height: px2rem(22);
            justify-content: space-between;
            &-price {
            color: $mainColor;
            font-weight: 500;
            }
            // 计数器
          }
        }
      }
    }
  }

  // 结算
  .shopping-content-total {
    border-top: px2rem(1) solid #eee;
    background-color: #fff;
    font-size: $infoSize;
    display: flex;

    &-check {
      display: flex;
      margin-right: px2rem(8);
      line-height: px2rem(50);
      img {
        width: px2rem(18);
        margin: 0 px2rem(8);
      }
    }
    &-price {
      flex-grow: 1;
      padding-left: px2rem(8);
      &-total {
        font-size: $titleSize;
        font-weight: 500;
        line-height: px2rem(28);
      }
    }
    &-commit {
      color: #fff;
      padding: 0 px2rem(20);
      background: $mainColor;
      line-height: px2rem(50);
    }
  }
  // 结算 end
}
</style>
