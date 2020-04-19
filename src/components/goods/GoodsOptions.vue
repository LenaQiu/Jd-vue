<template>
  <div class="goods-options z-index-2">
    <!-- 一级筛选项 -->
    <ul class="goods-options-list">
      <li
        class="goods-options-list-item"
        v-for="item of optionsData"
        :key="item.id"
        @click="handleItemClick(item)"
      >
        <span
          class="goods-options-list-item-title"
          :class="{'goods-options-list-item-title-active' : selectOption.id === item.id}"
        >
          {{item.name}}
        </span>
        <span
          class="goods-options-list-item-caret caret"
          v-if="item.hasOwnProperty('subs')"
          :class="[haveSub && selectOption.id === item.id ? 'goods-options-list-item-caret-open':'goods-options-list-item-caret-close']"></span>
      </li>
    </ul>
    <!-- 子选项 -->
    <transition name="fold-height">
      <div class="options-sub-content z-index-max" v-show="this.haveSub">
        <ul class="options-sub-content-list">
          <li
            class="options-sub-content-list-item"
            v-for="item of selectOption.subs" :key="item.id"
            @click="handleSubItemClick(item, item.id)"
          >
            <span
            class="options-sub-content-list-item-name" :class="{'options-sub-content-list-item-name-active':selectSubOption.id===item.id}">{{item.name}}</span>
            <img class="options-sub-content-list-item-select" src="@images/options-select.svg" alt="" v-show="selectSubOption.id===item.id">
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮盖层 -->
    <div class="cover" v-show="haveSub" @click="haveSub = false"></div>
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
      selectOption: {},
      // 是否有子选项
      haveSub: false
    }
  },
  methods: {
    /**
     * 点击一级选项事件 ，如果有二级菜单：赋值给 selectOption；无则 返回 false
     */
    handleItemClick: function (item) {
      // 如果没有子选项
      if (item.subs !== undefined && this.selectOption.id === item.id) {
        // 如果有子选项， 子选项内容框显示、隐藏切换
        this.haveSub = !this.haveSub
      } else {
        // 不现实子选项内容框
        this.haveSub = false
      }
      // 赋值 将一级选项赋值给 selectOption
      this.selectOption = item
    },
    /**
     * 单击子选项事件
     */
    handleSubItemClick: function (subItem, key) {
      // 将子选项置顶
      // this.selectOption.id = item.id
      // this.selectOption.name = item.name
      // console.log(this.selectOption)
      // 设置选中项为用户点击当选项
      this.selectOption = subItem
      // 遍历所有可选项，将选中项置顶
      this.optionsData.forEach(options => {
        if (options.subs) {
          options.subs.forEach(subOptions => {
            if (subOptions.id === key) {
              options.id = subOptions.id
              options.name = subOptions.name
            }
          })
        }
      })
      this.haveSub = false
    }
  },
  created: function () {
    this.selectOption = this.optionsData[0]
    this.selectSubOption = this.optionsData[0].subs[0]
  },
  watch: {
    /**
     * 监听 筛选项改变
     */
    selectOption: function (newV) {
      this.$emit('optionsChange', newV.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-options {
  width: 100%;
  height: px2rem(32);
  background: #fff;
  &-list {
    display: flex;
    justify-content: space-around;
    font-size: $titleSize;
    line-height: px2rem(32);
    border-bottom: 1px solid #eee;
    &-item {
      &-title-active {
        color: $mainColor;
      }
      &-caret {
        &-open {
          transform: rotate(180deg);
          transition: all .5s;
        }
        &-close {
          transform: rotate(0deg);
          transition: all .5s;
        }
      }
    }
  }
.options-sub-content {
  position: absolute;
  width: 100%;
  max-height: px2rem(180);
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
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
          &-active {
            color: $mainColor;
          }
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
  .fold-height-enter-active {
    animation-duration: .3s;
    animation-name: fold-height-open;
  }
  .fold-height-leave-active {
    animation-duration: .3s;
    animation-name: fold-height-close;
  }
  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(180)
    }
  }
  @keyframes fold-height-close {
    0% {
      max-height: px2rem(180)
    }
    100% {
      max-height: 0;
    }
  }
  .cover {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba( 0, 0, 0, .4)
  }
}
</style>
