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
