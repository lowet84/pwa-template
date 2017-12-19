<template>
  <v-app id="inspire" dark>
    <!-- <v-navigation-drawer fixed v-model="drawerState" app>
      <drawer />
    </v-navigation-drawer> -->
    <v-toolbar color="primary" fixed app>
      <v-spacer />
      <!-- <v-toolbar-side-icon @click.stop="setDrawer(true)"></v-toolbar-side-icon> -->
      <v-toolbar-title class="title">Application</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-content app>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['showDrawer']),
    drawerState: {
      get: function () { return this.showDrawer },
      set: function (val) { this.setDrawer(val) }
    }
  },
  methods: {
    ...mapMutations(['setDrawer']),
    log (text) {
      console.log(text)
    }
  },
  components: {
    drawer: Drawer
  }
}
</script>

<style scoped>
.title{
  margin-left: 0;
}
</style>
