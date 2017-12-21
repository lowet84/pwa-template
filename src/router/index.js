import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Browse from '@/components/Browse'
import Settings from '@/components/Settings'
import Playing from '@/components/Playing'
import Tabs from '@/components/Tabs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/playing',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      components: { default: Tabs, inner: Home }
    },
    {
      path: '/browse',
      name: 'Browse',
      components: { default: Tabs, inner: Browse }
    },
    {
      path: '/settings',
      name: 'Settings',
      components: { default: Tabs, inner: Settings }
    },
    {
      path: '/playing/:id',
      name: 'Playing',
      component: Playing
    }
  ]
})
