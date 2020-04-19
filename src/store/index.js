import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * 1、vuex
 */

export default new Vuex.Store({
  state: {
    // 购物车数据源
    shoppingDatas: []
  },
  mutations: {
    /**
     * 添加商品到购物车数据源
     */
    addShoppingData: function (state, goods) {
      // 判断购物车中是否已经包含该商品，如果购物车已经包含该商品，那么应该让商品的数量 + 1
      const isExist = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          item.number += 1
          return true
        }
      })
      // 购物车中不包含该商品
      if (!isExist) {
        // 为商品新增属性
        // isCheck: 表示商品是否选中
        // number: 表示选中的商品数量
        // 通过 Vue.set 的方法可以把新添加的属性变为响应式的数据
        Vue.set(goods, 'ischeck', false)
        Vue.set(goods, 'number', 1)
        state.shoppingDatas.push(goods)
      }
    },
    /**
     * 更改指定的商品数量
     * data: {
     *   index: 指定的商品
     *   number: 商品数量
     * }
     */
    changeShoppingDataNumber: function (state, data) {
      state.shoppingDatas[data.index].number = data.number
    }
  },
  actions: {
  },
  modules: {
  }
})
