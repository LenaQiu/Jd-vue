<template>
  <div class="goods-options z-index-2">
    <!-- 一级筛选项 -->
    <ul class="goods-options-list">
      <li class="goods-options-list-item" v-for="item of optionsData" :key="item.id" @click="handleItemClick(item)">
        <span class="goods-options-list-item-title">{{item.name}}</span>
        <span class="goods-options-list-item-caret caret"></span>
      </li>
    </ul>
    <!-- 自选项 -->
    <div class="options-sub-content">
      <ul class="options-sub-content-list">
        <li class="options-sub-content-list-item" v-for="item of selectOption.subs" :key="item.id">
          <span class="options-sub-content-list-item-name">{{item.name}}</span>
          <img class="options-sub-content-list-item-select" src="@images/options-select.svg" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsOptions',
  data () {
    return {
      // 晒选项数据源
      optionsData: [
        {
          id: '1',
          name: '默认',
          subs: [
            {
              id: '1',
              name: '默认'
            }, {
              id: '1-2',
              name: '价格由高到低'
            }, {
              id: '1-3',
              name: '销量由高到低'
            }
          ]
        }, {
          id: '2',
          name: '有货有先'
        }, {
          id: '3',
          name: '直营优先'
        }
      ],
      // 选中的选项
      selectOption: {}
    }
  },
  methods: {
    // 点击 一级选项 ，如果有二级菜单：赋值给 selectOption；无则 返回 false
    handleItemClick: function (item) {
      if (!item.subs) return
      this.selectOption = item.subs
      console.log(item.subs)
    }
  },
  created: function () {
    this.selectOption = this.optionsData[0]
  },
  updated: function () {
    this.handleItemClick()
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-options {
  width: 100%;
  height: px2rem(32);
  &-list {
    display: flex;
    justify-content: space-around;
    font-size: $titleSize;
    line-height: px2rem(32);
    border-bottom: 1px solid #eee;
    &-item {
      &-caret {
        vertical-align: text-bottom;
      }
    }
  }
.options-sub-content {
  position: absolute;
  width: 100%;
  max-height: px2rem(180);
  overflow: hidden;
  overflow-y: scroll;
  &-list {
    font-size: $infoSize;
    line-height: px2rem(28);
    border-bottom: 1px solid #eee;
      &-item {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        &-name {
          display: inline-block;
          padding: 0 px2rem(20);
        }
        &-select {
          display: inline-block;
          padding: 0 px2rem(20);
          width: px2rem(14);
          margin-left: px2rem(4);
        }
      }
    }
}
}
</style>
