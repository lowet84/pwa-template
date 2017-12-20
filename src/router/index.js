import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Browse from '@/components/Browse'
import Settings from '@/components/Settings'
import Playing from '@/components/Playing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/browse',
      name: 'Browse',
      component: Browse
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/other',
      name: 'Playing',
      component: Playing
    }
  ]
})
