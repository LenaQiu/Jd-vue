<template>
  <div class="main">
    <component :is="currentComponent"></component>
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
