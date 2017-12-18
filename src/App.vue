<template>
  <div>
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary" >
        <toolbar></toolbar>
      </md-app-toolbar>

      <md-app-content id="content">
        <router-view></router-view>
      </md-app-content>

      <md-app-drawer id="drawer"
          :md-active.sync="drawerState" :md-fixed="true">
        <drawer></drawer>
      </md-app-drawer>
    </md-app>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import Drawer from '@/components/Drawer'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'app',
  components: {
    toolbar: Toolbar,
    drawer: Drawer
  },
  computed: {
    ...mapState(['showDrawer']),
    drawerState: {
      get: function () { return this.showDrawer },
      set: function (val) { this.setDrawer(val) }
    }
  },
  methods: {
    ...mapMutations(['setDrawer'])
  }
}
</script>

<style lang="scss">
@import './theme';

.md-app {  height: 100vh;}
</style>
