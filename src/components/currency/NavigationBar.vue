<template>
  <!--
      导航条
      默认样式： 左 -》 返回； 中 ——》 页面名称； 右 ——》空
  -->
  <div class="navigation-bar" :class="{'bottom-line': pageName}" :style="navBarStyle">
    <!-- 左: 返回 -->
    <div class="left" @click="onBackClick">
      <img v-show="isShowBack" src="@images/back.svg" alt />
      <slot name="nav-left"></slot>
    </div>
    <!-- 中: 页面名称 -->
    <div class="center">
      <!-- 默认状态 -->
      <span v-if="isShowTitle" class="page-title">{{pageName}}</span>
      <!-- 具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <!-- 右: 空 -->
    <div class="right">
      <!-- 具名插槽 -->
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    pageName: { // 页面名称
      type: String,
      default: ''
    },
    isShowBack: { // 是否展示后退按钮
      type: Boolean,
      default: true
    },
    isShowTitle: { // 是否展示页面名称
      type: Boolean,
      default: true
    },
    navBarStyle: { // navBar 样式
      type: Object,
      default: function () {
        return {
          background: '#fff'
        }
      }
    }
  },
  methods: {
    onBackClick: function () {
      this.$emit('onLeftClick')
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@css/style.scss";
.navigation-bar {
  position: relative;
  width: 100%;
  height: px2rem(44);
  display: flex;
  justify-content: space-between;
  font-size: $titleSize;
  line-height: px2rem(44);
  z-index: 999;
  //background:rgba(0, 0, 0, 0.8);
  // 左、右 样式
  .left,
  .right {
    width: px2rem(26);
    padding: 0 px2rem(10);
    text-align: center;
    display: flex;
    img {
      width: px2rem(26)
    }
  }
  .center {
    flex: 1;
    text-align: center
  }
}

.bottom-line {
  border-bottom: 1px solid #ccc
}
</style>
