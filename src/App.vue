<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      transitionName: 'fold-left',
      virtualTaskStack: [
        'Main'
      ]
    }
  },
  watch: {
    // 监听路由对象，决定使用哪种过渡效果
    '$route' (to, from) {
      // 获取携带的标记
      const routerType = to.params.routerType
      if (routerType === 'push') {
        // 当进入新页面的时候，保存新页面名称到虚拟任务栈
        this.virtualTaskStack.push(to.name)
        // 跳转页面
        this.transitionName = 'fold-left'
      } else {
        // 当后退页面的时候，把最后一个页面从任务栈中弹出
        this.virtualTaskStack.pop()
        // 后退页面
        this.transitionName = 'fold-right'
      }
      if (to.params.clearTaskStack) {
        this.virtualTaskStack = ['Main']
      }
      // console.log(this.virtualTaskStack)
    }
  }
}
</script>

<style lang="scss" ecoped>
@import '@css/style.scss';
#app {
  height: 100%;
  font-size: 32px;

  // push 页面时：新页面的进入动画
  .fold-left-enter-active {
    animation-name: fold-left-in;
    animation-duration: 2s;
  }
  @keyframes fold-left-in {
    0% {
      transform: translate(100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  // push 页面时：新页面的退出动画
  .fold-left-leave-active {
    animation-name: fold-left-out;
    animation-duration: 2s;
  }
  @keyframes fold-left-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }
  // 后退页面时：即将展示页面的动画
  .fold-right-enter-active {
    animation-name: fold-right-in;
    animation-duration: 2s;
  }
  @keyframes fold-right-in {
    0% {
      transform: translate(-100%, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  // 后退页面时：后退的页面动画
  .fold-right-leave-active {
    animation-name: fold-right-out;
    animation-duration: 2s;
  }
  @keyframes fold-right-out {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(100%, 0);
    }
  }
}
</style>
