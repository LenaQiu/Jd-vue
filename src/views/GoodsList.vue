<template>
  <div class="goods-list-page">
    <!-- 导航条 -->
    <navigation-bar
      :isShowBack="isShowBack"
      :pageName="pageName"
      @onLeftClick="onBackClick"
    >
      <!-- 右边插槽 waterfall-type -->
      <template v-slot:nav-right>
        <img
          :src="layoutType.icon"
          @click="onChangeLayoutTypeClick"
        />
      </template>
    </navigation-bar>
    <!-- 功能选项 -->
    <div class="goods-list-page-content">
      <!-- 功能选项 -->
      <goods-options @optionsChange="onGoodsOptionsChange"></goods-options>
      <!-- 商品展示 -->
      <goods :layoutType="layoutType.type" :sort="sortType"></goods>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'GoodsList',
  components: {
    NavigationBar, // 顶部导航条
    GoodsOptions, // 选项
    Goods // 商品列表
  },
  data () {
    return {
      pageName: '商品列表',
      isShowBack: true, // 是否显示后退小图标
      // goods 展示形式列表
      layoutTypeDatas: [{
        type: '1',
        icon: require('@images/list-type.svg')
      }, {
        type: '2',
        icon: require('@images/grid-type.svg')

      }, {
        type: '3',
        icon: require('@images/waterfall-type.svg')
      }],
      // 当前展示形式
      layoutType: {},
      // 排序规则
      sortType: '1'
    }
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    /**
     * 切换 goods 展示形式
     */
    onChangeLayoutTypeClick: function () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
    },
    /**
     * 当 筛选项改变时调用
     */
    onGoodsOptionsChange: function (sortType) {
      this.sortType = sortType
    }
  },
  created: function () {
    // 初始化 layoutType
    this.layoutType = this.layoutTypeDatas[0]
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: $bgColor;
  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
