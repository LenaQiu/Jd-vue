<template>
  <div class="my">
    <navigation-bar :pageName="pageName"></navigation-bar>
    <h1></h1>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'My',
  components: {
    NavigationBar
  },
  data () {
    return {
      pageName: '个人中心'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.my {
  width: 100%;
  height: 100%;
}
</style>
