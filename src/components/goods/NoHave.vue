<template>
  <!-- 缺货 组件 -->
  <div class="no-have">
    <span class="no-have-info">缺货</span>
  </div>
</template>

<script>
export default {
  name: 'NoHave'
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.no-have {
  display: inline-block;
  margin-right: px2rem(3);
  &-info {
    display: inline-block;
    padding: 0 px2rem(8);
    font-size: $miniSize;
    line-height: px2rem(16);
    color: #fff;
    background: #ccc;
    border-radius: px2rem(2);
  }
}
</style>
