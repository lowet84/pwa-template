import Vue from 'vue'
import Router from 'vue-router'
import Playing from '@/components/Playing'
import Tabs from '@/components/Tabs'
import Edit from '@/components/Edit'
import CoverSearch from '@/components/CoverSearch'
import Login from '@/components/Login'
import Users from '@/components/Users'
import AddUser from '@/components/AddUser'
import ChangePassword from '@/components/ChangePassword'
import ImportSelect from '@/components/ImportSelect'
import ImportSearch from '@/components/ImportSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Tabs
    },
    {
      path: '/playing',
      redirect: '/home'
    },
    {
      path: '/import/:id',
      name: 'ImportSelect',
      component: ImportSelect
    },
    {
      path: '/import/:id/:search',
      name: 'ImportSearch',
      component: ImportSearch
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/adduser',
      name: 'AddUser',
      component: AddUser
    },
    {
      path: '/changepass',
      name: 'ChangePassword',
      component: ChangePassword
    }
  ]
})
