<template>
  <!-- 计数器 -->
  <div class="counter">
    <span class="counter-less" :class="{'counter-disabled': number === 1}" @click="onLessClick">-</span>
    <span class="counter-number">{{number}}</span>
    <span class="counter-add" @click="onAddClick">+</span>
  </div>
</template>

<script>
export default {
  name: 'Counter', // 计数器
  props: {
    // 父组件指定到默认数量
    defaultNumber: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      // 数量数据源
      number: 1
    }
  },
  watch: {
    /**
     * 监听父组件 defaultNumber值到变化
     */
    defaultNumber: function (newV) {
      console.log('defaultNumber改变： ' + newV)
      this.number = newV
    },
    /**
     * 监听数量到变化，当数量发生变化时，通知父组件
     */
    number: function (newV) {
      console.log('defaultNumber改变： ' + newV)
      this.$emit('onChangeNumber', newV)
    }
  },
  methods: {
    /**
     * 点击 减少 -  按钮
     */
    onLessClick: function () {
      if (this.number <= 1) {
        alert('最少只能为1！')
        return
      }
      this.number -= 1
    },
    /**
     * 点击 添加 +  按钮
     */
    onAddClick: function () {
      this.number += 1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.counter {
  display: flex;
  background: #ccc;
  line-height: px2rem(22);
  span {
    padding: 0 px2rem(8);
  }
  .counter-disabled {
    color: #989797;
  }
  .counter-number {
    background: #fff;
    min-width: 20px;
    border: 1px solid #eee;
  }
}
</style>
