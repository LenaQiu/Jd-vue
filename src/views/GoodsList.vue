<template>
  <div class="GoodsList">
    <!--  -->
    <navigation-bar
      :isShowBack="isShowBack"
      :pageName="pageName"
      @onLeftClick="onBackClick"
    >
      <!-- 右边插槽 waterfall-type -->
      <template v-slot:nav-right>
        <img v-show="isShowBack" src="@images/waterfall-type.svg" alt />
      </template>
    </navigation-bar>
    <!-- 功能选项 -->
    <goods-options></goods-options>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
export default {
  name: 'GoodsList',
  components: {
    NavigationBar,
    GoodsOptions
  },
  data () {
    return {
      pageName: '商品列表',
      isShowBack: true
    }
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
