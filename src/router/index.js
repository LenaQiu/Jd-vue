import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/goodslist',
    name: 'GoodsList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GoodsList.vue')
  },
  {
    path: '/goodsdetail',
    name: 'GoodsDetail',
    component: () => import('../views/GoodsDetail.vue')
  },
  {
    path: '/buy',
    name: 'Buy',
    component: () => import('../views/Buy.vue')
  }
  // {
  //   path: '/goodslist',
  //   name: 'GoodsList',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
