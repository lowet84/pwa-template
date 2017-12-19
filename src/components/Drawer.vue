<template> 
  <v-list dense>
    <v-list-tile @click="log('home')">
      <v-list-tile-action>
        <v-icon>home</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile @click="log('contact_mail')">
      <v-list-tile-action>
        <v-icon>contact_mail</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Contact</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
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
    ...mapMutations(['setDrawer']),
    log (text) {
      console.log(text)
    }
  }
}
</script> 
 
<style>

</style> 