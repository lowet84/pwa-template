// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import { sync } from 'vuex-router-sync'

sync(store, router)

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935,
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})
import('vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false

window.oncontextmenu = function (event) {
  event.preventDefault()
  event.stopPropagation()
  return false
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
