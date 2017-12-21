<template>
  <v-app id="inspire" dark>

    <v-toolbar color="primary" fixed app>
      <v-spacer />
      <v-toolbar-title class="title">{{currentPage}}</v-toolbar-title>
      <v-spacer />
      <div>v6</div>
    </v-toolbar>

    <v-content app class="content">
      <v-container fill-height class="home" justify-center>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-bottom-nav :value="showNav" color="primary">
      <v-btn flat to="/home" value="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat to="/browse" value="browse">
        <span>Browse</span>
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn flat to="/settings" value="settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters(['currentPage', 'showNav'])
  },
  methods: {
    ...mapMutations(['populateDummyData'])
  },
  created () {
    this.populateDummyData()
  }
}
</script>

<style>
body {
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
}
</style>

<style scoped>
.title {
  margin-left: 0;
}
.home {
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 3em;
}
</style>
