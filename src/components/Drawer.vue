<template>
  <md-drawer id="drawer"
      :md-active.sync="drawerState" :md-fixed="true">
      drawer
  </md-drawer>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'drawer',
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

</style>
