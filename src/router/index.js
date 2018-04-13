import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index/index'
import Goods from '../components/goods/index'
import Shops from '../components/shops/index'
import Comments from '../components/comments/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/shops',
          name: 'shops',
          component: Shops
        },
        {
          path: '/comments',
          name: 'comments',
          component: Comments
        }
      ]
    }
  ]
})
