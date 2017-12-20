<template>
  <v-app id="inspire" dark>
    <v-toolbar color="primary" fixed app>
      <v-spacer />
      <v-toolbar-title class="title">{{currentPage}}</v-toolbar-title>
      <v-spacer />
      <div>v6</div>
    </v-toolbar>
    <v-content app>
      <v-container fluid fill-height class="home">
        <v-layout align-center justify-center>
          <router-view></router-view>
          <!-- <div class="headline text-xs-center pa-5">Active: sdsf</div> -->
          <v-bottom-nav absolute :value="true" color="primary">
            <v-btn flat to="/home" value="home">
              <span>Home</span>
              <v-icon>history</v-icon>
            </v-btn>
            <v-btn flat to="/browse" value="browse">
              <span>Browse</span>
              <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn flat to="/settings" value="settings">
              <span>Settings</span>
              <v-icon>place</v-icon>
            </v-btn>
          </v-bottom-nav>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters(['currentPage'])
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
</style>
