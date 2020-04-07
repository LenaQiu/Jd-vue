<template>
  <!-- 秒杀倒计时 -->
  <div class="count-down">
    <!-- 整点场 + 倒计时 -->
    <span class="count-down-end-time">{{endHours}}点场</span>
    <span class="count-down-down-surplus">{{surplus | formatTime}}</span>
  </div>
  <!-- 秒杀倒计时 /-->
</template>

<script>
/**
 * 功能：传递给组件一个活动开始时间
 * 1、当前时间未到：展示倒计时
 * 2、活动时间到了，展示活动正在进行中
 * 3、时间过了： 活动已结束
 */
export default {
  name: 'CountDown',
  props: {
    // 活动开始时间
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data () {
    return {
      // 展示活动状态
      surplus: '',
      // 距活动开始时间还剩多少
      diffSeconds: 0,
      // 时间戳
      timmer: null
    }
  },
  /**
   * created () 周期函数 当初始化时，执行相应函数
   */
  created () {
    this.computedSurplusTime()
  },
  methods: {
    /**
     * 计算倒计时函数
     * 1、活动时间已过，返回状态
     * 2、正在活动时间，返回状态
     * 3、活动时间倒计时，返回剩余秒数
     */
    computedSurplusTime: function () {
      if (this.timmer) {
        clearInterval(this.timmer)
      }
      const date = new Date()
      // 当前时间 > 活动开始时间， 活动结束
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已结束'
        return
      }

      // 当前时间 = 活动开始时间， 活动正在进行中
      if (date.getHours() === this.endHours) {
        this.surplus = '活动正在进行中'
        return
      }

      /**
       * 当前时间 < 活动开始时间， 活动正在进行中
       * 1、获取当前时间与活动开始时间到秒数差距
       * 2、根据秒数来转化为对应到 -> 时 分 秒
       */
      const diffHours = this.endHours - date.getHours() - 1
      const difMiuntes = 60 - date.getMinutes() - 1
      const diffSeconds = 60 - date.getSeconds() - 1
      // 转化为对应到秒数 -> 1小时 === 3600
      this.diffSeconds = diffHours * 3600 + difMiuntes * 60 + diffSeconds
      // 当前时间没过 1 秒， 秒数 -1
      this.timmer = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  /**
   * 监听 当 某值 发生变化时，执行响应事件
   */
  watch: {
    /**
     * 当 值 发生变化当时候， 就会回调当前当方法
     */

    // 监听 diffSeconds 值； newV
    diffSeconds: function (newV) {
      const hours = Math.floor(newV / 3600)
      // 获取剩余 分钟
      const minutes = Math.floor((newV % 3600) / 60)
      // 获取剩余 秒数
      const seconds = newV % 60
      // 拼装数据
      this.surplus = hours + ':' + minutes + ':' + seconds
    },

    // 监听 endHours 值
    endHours: function () {
      this.computedSurplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.count-down {
  position: relative;
  box-sizing: content-box;
  display: inline-block;
  height: $titleSize;
  border: 1px solid $mainColor;
  border-radius: px2rem(8);
  font-size: $infoSize;
  line-height: $titleSize;
  vertical-align: middle;
  &-end-time {
    display: inline-block;
    padding: 0 px2rem(4);
    height: $titleSize;
    background: $mainColor;
    color: #fff;
    border-radius: px2rem(7);
  }
  &-down-surplus {
    display: inline-block;
    padding:0 px2rem(6);
    height: $titleSize;
    color: $mainColor;
  }
}
</style>
