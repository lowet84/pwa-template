import Vue from 'vue'
import Vuex from 'vuex'

import Mutations from './store/mutations'
import Actions from './store/actions'
import Getters from './store/getters'
import State from './store/state'

Vue.use(Vuex)

const state = {
  showDrawer: false,
  ...State
}

const mutations = {
  setDrawer (state, value) {
    state.showDrawer = value
  },
  ...Mutations
}

const actions = {
  ...Actions
}

// getters are functions
const getters = {
  ...Getters
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
