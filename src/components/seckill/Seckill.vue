<template>
  <!-- 秒杀组件 -->
  <div class="seckill">
    <!-- 标题 -->
    <h2 class="seckill-title">京东秒杀</h2>
    <!-- 秒杀倒计时 -->
    <count-down :endHours="1"></count-down>
    <!-- 秒杀内容 -->
    <ul class="seckill-content">
      <li
        class="seckill-content-item"
        v-for="item of seckillData"
        :key="item.id"
      >
        <img class="seckill-content-item-img" :src="item.icon">
        <p class="seckill-content-item-price">¥{{item.price | priceValue}}</p>
        <p class="seckill-content-item-old-price">¥{{item.oldPrice}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import CountDown from '@c/seckill/CountDown.vue'
export default {
  name: 'Seckill',
  components: {
    CountDown
  },
  props: {
    seckillData: Array
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.seckill {
  position: relative;
  width: 100%;
  height: 0;
  margin-top: px2rem(8);
  padding-bottom: 41.6%;
  background-color: #fff;
  border-top-left-radius: px2rem(8);
  border-top-right-radius: px2rem(8);
  &-title {
    display: inline-block;
    padding: px2rem(8) px2rem(8);
    font-size: $titleSize;
  }
  &-content {
    white-space: nowrap;
    overflow-x: scroll;
    &-item {
      width: 20%;
      display: inline-block;
      text-align: center;
      &-img {
        width: 100%;
      }
      &-price {
        margin-top: px2rem(4);
        font-size: $infoSize;
        color: $mainColor;
      }
      &-old-price {
        margin-top: px2rem(4);
        padding-bottom: px2rem(8);
        font-size: $infoSize;
        text-decoration: line-through;
      }
    }
  }
}
</style>
