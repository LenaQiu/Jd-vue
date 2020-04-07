<template>
  <div class="activity">
    <!-- 插槽， 展示活动内容 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Activity'
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.activity {
  max-height: px2rem(160);
  position: relative;
}
</style>
