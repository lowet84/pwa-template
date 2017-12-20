import Vue from 'vue'
import Router from 'vue-router'
import Recent from '@/components/Recent'
import Nearby from '@/components/Nearby'
import Favorites from '@/components/Favorites'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home/recent'
    },
    {
      path: '/home/recent',
      name: 'Recent',
      component: Recent
    },
    {
      path: '/home/favorites',
      name: 'Favorites',
      component: Favorites
    },
    {
      path: '/home/nearby',
      name: 'Nearby',
      component: Nearby
    }
  ]
})
