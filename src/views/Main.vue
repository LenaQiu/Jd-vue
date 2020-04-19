<template>
  <div class="main">
    <keep-alive>
      <!-- 动态组件 -->
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import ToolBar from '@c/currency/ToolBar.vue'
// import Home from '@c/Home.vue'
// import Shopping from '@c/Shopping.vue'
// import My from '@c/My.vue'

export default {
  name: 'Main',
  components: {
    ToolBar,
    // 异步组件
    home: () => import('@c/Home'),
    shopping: () => import('@c/Shopping'),
    my: () => import('@c/My')
  },
  data () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    onChangeFragment: function (compoentName) {
      this.currentComponent = compoentName
    },
    /**
     * 指定加载的页面组件
     */
    pushFragment: function () {
      // 获取到组件加载的下标
      const componentIndex = this.$route.params.componentIndex
      if (componentIndex === undefined) return
      // 获取 this.$refs.toolBar 组件的方法
      this.$refs.toolBar.pushFragment(componentIndex)
    }
  },
  activated () {
    // keep-alive 被激活的时候，调用指定加载页面组件的方法
    this.pushFragment()
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
