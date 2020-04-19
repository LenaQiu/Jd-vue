<template>
  <!-- 直营 组件 -->
  <div class="direct">
    <span class="direct-info">直营</span>
  </div>
</template>

<script>
export default {
  name: 'Direct'
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.direct {
  display: inline-block;
  margin-right: px2rem(3);
  &-info {
    display: inline-block;
    padding: 0 px2rem(8);
    font-size: $miniSize;
    line-height: px2rem(16);
    color: #fff;
    background: $mainColor;
    border-radius: px2rem(2);
  }
}
</style>
