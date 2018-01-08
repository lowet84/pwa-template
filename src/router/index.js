import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Browse from '@/components/Browse'
import BrowseButton from '@/components/BrowseButton'
import Settings from '@/components/Settings'
import Playing from '@/components/Playing'
import Tabs from '@/components/Tabs'
import Edit from '@/components/Edit'
import CoverSearch from '@/components/CoverSearch'

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
      components: { default: Tabs, inner: Browse, button: BrowseButton }
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
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/coversearch/:id',
      name: 'CoverSearch',
      component: CoverSearch
    }
  ]
})
