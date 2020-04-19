<template>
  <div class="buy">
    <navigation-bar
      :pageName="pageName"
      @onLeftClick="onBackClick"
      :navBarStyle="navBarStyle"
    >
    </navigation-bar>
    <div class="buy-content">
        <!-- 要购买到商品 -->
        <div class="buy-item">
        <img class="buy-item-img" :src="this.goodsData.img">
        <div class="buy-item-desc">
            <p  class="buy-item-desc-name">{{this.goodsData.name}}</p>
            <p  class="buy-item-desc-price">¥{{this.goodsData.price | priceValue}}</p>
        </div>
        </div>
        <!-- /要购买到商品 -->
        <!-- 支付选项 -->
        <div class="buy-pay">
        <div
            class="buy-pay-item"
            v-for="item of payData"
            :key="item.id"
            @click="onPayClick(item)">
            <img class="buy-pay-item-img" :src="item.icon" alt="支付图表">
            <div class="buy-pay-item-info" >
            <p class="buy-pay-item-info-name">{{item.name}}</p>
            <p class="buy-pay-item-info-slogn">{{item.slogn}}</p>
            </div>
            <img class="buy-pay-item-img check" :src="checkIcon(item.id === selectItem.id)" alt="选择图标">
        </div>
        </div>
        <!-- 支付选项 -->
    </div>
    <!-- 立即购买按钮 -->
    <div class="buy-btn">立即购买 </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'Buy',
  components: {
    NavigationBar
  },
  data () {
    return {
      pageName: '立即购买',
      navBarStyle: {
        marginTop: '8px'
      },
      // 商品信息
      goodsData: {},
      // 支付信息
      payData: [{
        id: '0',
        icon: require('@images/alipay.svg'),
        name: '支付宝支付',
        slogn: '数亿用户都在用'
      }, {
        id: '1',
        icon: require('@images/weichat.png'),
        name: '微信支付',
        slogn: '数亿用户都在用'
      }],
      // 选中支付方式项
      selectItem: {}
    }
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
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
    /**
     * 返回 check 图标
     */
    checkIcon: function (check) {
      return check ? require('@images/check.svg') : require('@images/no-check.svg')
    },
    /**
     * 支付方式点击事件
     */
    onPayClick: function (item) {
      this.selectItem = item
    }
  },
  created () {
    this.selectItem = this.payData[0]
    this.loadGoodsData()
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.buy {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: $infoSize;
  background: $bgColor;
  .buy-content {
    flex-grow: 1;
    .buy-item {
        display: flex;
        margin-top: px2rem(8);
        border-top-left-radius: px2rem(4);
        border-top-right-radius: px2rem(4);
        background: #fff;
        &-img {
        display: inline-block;
        width: px2rem(100);
        height: px2rem(100);
        }
        &-desc {
        padding: px2rem(8);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        line-height: px2rem(18);
        &-price {
            color: $mainColor;
            font-size: px2rem(16);
            font-weight: 600;
        }
        }
    }
    .buy-pay {
        margin-top: px2rem(8);
        background: #fff;
        border-top-left-radius: px2rem(4);
        border-top-right-radius: px2rem(4);
        &-item {
        display: flex;
        padding: px2rem(6);
        border-bottom: 1px solid #eee;
        img {
            width: px2rem(40);
            height: px2rem(40);
        }
        &-info {
            padding-left: px2rem(10);
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: #ccc;
            &-name {
            font-size: $titleSize;
            color: #333;
            }
        }
        .check {
            width: px2rem(18)
        }
        }
    }

  }
  .buy-btn {
    position: absolute;
    bottom: 10%;
    width: 80%;
    margin-left: 10%;
    text-align: center;
    display: inline-block;
    color: #fff;
    font-size: $titleSize;
    line-height: px2rem(36);
    background: $mainColor;
    border-radius: px2rem(16);
  }
}
</style>
