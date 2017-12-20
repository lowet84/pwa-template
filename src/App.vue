<template>
  <v-app id="inspire" dark>
    <v-toolbar color="primary" fixed app>
      <v-spacer />
      <v-toolbar-title class="title">{{currentPage}}</v-toolbar-title>
      <v-spacer />
      <div>v6</div>
    </v-toolbar>
    <v-content app>
      <v-container fluid fill-height class="home" justify-center>
        <router-view>
          <router-view name="tab"></router-view>
        </router-view>
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
