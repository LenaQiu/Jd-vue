<template>
<!-- 视差组件 -->
<!--
    1、 至少需要两层背景 （缓慢移动区、正常移动区）
    2、将背景设置为相对布局 （为缓慢移动区设置 top 来缓冲 scroll 滚动）
    3、 监听 Parallax 组件滚动， 根据滑动来计算 缓慢移动区的 top 值。
 -->
<div class="parallax" @scroll="onScrollChange">
  <!-- 缓慢移动区 -->
  <div class="parallax-low" :style="{top: slowTop}">
    <slot name="parallax-low"></slot>
  </div>
   <!-- 正常移动区 -->
  <div class="parallax-content z-index-2">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Parallax',
  data () {
    return {
      SPEED_DIFF: 4, // 速度差
      parallaxScroll: null // 页面滑动值
    }
  },
  methods: {
    /**
     * 滑动事件
     */
    onScrollChange: function ($event) {
      this.parallaxScroll = $event.target.scrollTop
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  },
  computed: {
    /**
     * 返回 slow 距离顶部的距离
     */
    slowTop: function () {
      // 当前页面滑动距离 / 速度差 = 缓慢移动区应该滑动的距离
      // 当前页面的滑动距离 - 缓慢移动区应该滑动的距离 = 缓慢移动区用来缓冲调的 scroll 值
      return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px'
      // return (this.parallaxScroll / this.SPEED_DIFF) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.parallax {
  width: 100%;;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;

  &-low {
    width: 100%;
    position: relative;
  }
  &-content {
    width: 100%;
    position: relative;
    background: $bgColor;
  }
}
</style>
