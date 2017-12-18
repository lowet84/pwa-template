<template>
  <md-app md-waterfall md-mode="flexible">
    <md-app-toolbar class="md-large md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>more_vert</md-icon>
          </md-button>
        </div>
      </div>

      <div class="md-toolbar-row md-toolbar-offset">
        <span class="md-display-1">My Title</span>
      </div>
    </md-app-toolbar>

    <md-app-content id="content">
      <div class="home">
        <md-button class="md-raised md-primary">Primary</md-button>
        <md-button class="md-raised md-accent">Accent</md-button>
      </div>
    </md-app-content>

    <md-app-drawer id="drawer"
        :md-active.sync="drawerState" :md-fixed="true">
      <drawer></drawer>
    </md-app-drawer>
  </md-app>
</template>

<script>
import Drawer from '@/components/Drawer'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {
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

<style>
.home{
  height: 200vh;
}
.md-app-toolbar {
    height: 400px;
}
</style>
