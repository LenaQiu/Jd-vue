<template>
  <div class="search" :style="{background: bgColor}">
    <img class="search-ico" :src="icon" alt="">
    <span :style="{color: hintColor}" class="search-centent">大前端开发，混合京东商城系统</span>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    icon: { // 搜索小图标
      default: require('@images/search.svg'),
      type: String
    },
    hintColor: { // 初始灰色字
      default: '#999',
      type: String
    },
    bgColor: { // 背景色
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.search {
  box-sizing: border-box;
  display: flex;
  margin: px2rem(6);
  height: px2rem(32);
  padding: px2rem(2) px2rem(8);
  text-align: left;
  border-radius: px2rem(16);
  &-ico {
    width: px2rem(28);
  }
  &-centent {
    font-size: $infoSize;
    line-height: px2rem(28);
  }
}
</style>
