<template>
  <div class="home">
    <tool-bar @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import ToolBar from '@c/ToolBar.vue'

export default {
  name: 'Home',
  components: {
    ToolBar
  },
  methods: {
    onChangeFragment: function (compoentName) {
      console.log(compoentName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
</style>
