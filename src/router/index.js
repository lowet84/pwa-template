import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Browse from '@/components/Browse'
import Settings from '@/components/Settings'
import Tabs from '@/components/Tabs'
import Other from '@/components/Other'

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
      components: { default: Tabs, tab: Home }
    },
    {
      path: '/browse',
      name: 'Browse',
      components: { default: Tabs, tab: Browse }
    },
    {
      path: '/settings',
      name: 'Settings',
      components: { default: Tabs, tab: Settings }
    },
    {
      path: '/other',
      name: 'Other',
      component: Other
    }
  ]
})
