<template>

  <div class="tool-bar">
    <!-- tab 有数据源，根据数据源驱动视图 -->
    <div class="tool-bar-item"></div>
  </div>

</template>

<script>
/**
 * ToolBar 功能
 * 1、位于页面最底部
 * 2、点击 toobar 按钮时，页面发生对应的切换
 * 3、按钮分为 默认 和 选中 两个状态
 */
export default {
data: () => {
  return {
    toolBarData: []
  }
}    
}
</script>

<style lang="scss" scoped>

</style>