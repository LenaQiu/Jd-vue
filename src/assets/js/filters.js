import Vue from 'vue'
/**
 * 过滤器
 * 金额过滤器处理
 */
Vue.filter('priceValue', function (value) {
  if (!value) {
    return ''
  }

  const result = parseFloat(value)

  // 如果文本为 integer 类型带文本， 表示当前文本没有小数
  if (Number.isInteger(result)) {
    return result
  }

  // 文本包含小数，result.toFixed(2)
  return result.toFixed(2)
})

/**
 * 时间过滤器
 */
Vue.filter('formatTime', function (value) {
  // 如果 时间值不存在
  if (!value) {
    return ''
  }

  // 如果 value 不是时间 时：分：秒
  if (value.indexOf(':') === -1) {
  }

  let result = ''
  // 时间格式处理， 拆分成数组
  const arr = value.split(':')
  const nArr = []
  /**
   * forEach() 依次处理元素 但不返回值
   * map() 把每一次的执行结果组成一个新数组返回。
   * 当数组元素 < 10 时， 则在元素前加 ‘0’
   */
  arr.forEach(function (elem, index, arr) {
    if (elem < 10) {
      elem = '0' + elem
    }
    nArr.push(elem)
  })
  result = nArr.join(':')
  return result
})
