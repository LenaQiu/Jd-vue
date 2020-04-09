<template>
  <div class="shopping">
    <navigation-bar :pageName="pageName" :isShowBack="isShowBack"></navigation-bar>
    <h1>shopping</h1>
  </div>
</template>

<script>import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'Shopping',
  components: {
    NavigationBar
  },
  data () {
    return {
      pageName: '购物车',
      isShowBack: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.shopping {
  width: 100%;
  height: 100%;
}
</style>
