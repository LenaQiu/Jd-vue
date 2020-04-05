<template>

  <div class="tool-bar">
    <!-- tab 有数据源，根据数据源驱动视图 -->
    <div
      class="tool-bar-item"
      v-for="(item,index) of toolBarData"
      :key="index"
      @click="handleToolClick(item, index)"
    >
      <img :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" :alt="item.name" />
      <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h': index === selectItemIndex}">{{item.name}}</p>
    </div>
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
  name: 'ToolBar',
  data: () => {
    return {
      toolBarData: [{
        nIcon: require('@images/home-n.svg'),
        hIcon: require('@images/home-h.svg'),
        name: '首页',
        compoentName: 'home'
      }, {
        nIcon: require('@images/shopping-n.svg'),
        hIcon: require('@images/shopping-h.svg'),
        name: '购物车',
        compoentName: 'shopping'
      }, {
        nIcon: require('@images/my-n.svg'),
        hIcon: require('@images/my-h.svg'),
        name: '我的',
        compoentName: 'my'
      }],
      selectItemIndex: 0
    }
  },
  methods: {
    handleToolClick (item, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', item.compoentName)
    }
  }
}
</script>

// scoped 的用处，限制 css 只在当前模版中生效
<style lang="scss" scoped>
@import '@css/style.scss';
.tool-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, .2);
  border-top: 1px solid $lineColor;
  &-item {
    padding: px2rem(4);
    img {
      display: block;
      margin: 0 auto;
      height: px2rem(26);
    }
    &-name {
      font-size: px2rem(16);
      line-height: px2rem(20)
    }
    &-name-h {
      color: $mainColor;
      }
  }
}
</style>
