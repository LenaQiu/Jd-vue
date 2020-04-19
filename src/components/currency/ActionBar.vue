<template>
  <div class="action-bar z-index-max">
    <div class="add-cart" @click="onAddCartClick">
      <span>加入购物车</span>
    </div>
    <div class="to-buy" @click="onBuyClick">
      <span>立即购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionBar',
  data () {
    return {
      msg: '点击立即购买按钮事件'
    }
  },
  methods: {
    /**
     * 点击立即购买按钮事件
     */
    onBuyClick: function () {
      this.$emit('onBuyClick')
    },
    onAddCartClick: function () {
      this.$emit('onAddCartClick')
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@css/style.scss';
.action-bar {
  display: flex;
  border-top: 1px solid #f5f5f5;
  box-sizing: border-box;
  justify-content: flex-end;
  font-size: px2rem(18);
  color: white;
  background: white;
  .add-cart, .to-buy {
    padding: px2rem(12) px2rem(18);
    background: #FF9500;
  }
  .to-buy {
    background-color: $mainColor;
  }
}
</style>
