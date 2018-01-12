<template>
  <v-app id="inspire" dark>

    <v-toolbar color="primary" fixed app>
      <v-spacer />
      <v-toolbar-title class="title">{{currentPage}}</v-toolbar-title>
      <v-spacer />
      <div class="buttons">
        <slot name="button"></slot>
      </div>
    </v-toolbar>

    <v-content app class="content">
      <v-container class="home" justify-center>
        <Home v-if="currentPage==='Home'"/>
        <Browse v-if="currentPage==='Browse'"/>
        <Import v-if="currentPage==='Import'"/>
        <Settings v-if="currentPage==='Settings'"/>
      </v-container>
    </v-content>

    <v-bottom-nav value="true" color="primary" :active.sync="currentPage">
      <v-btn flat @click="setCurrentPage('Home')" value="Home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat @click="setCurrentPage('Browse')" value="Browse">
        <span>Browse</span>
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn flat @click="setCurrentPage('Import')" value="Import" v-if="isAdmin">
        <span>Import</span>
        <v-badge color="secondary">
          <span slot="badge" v-if="importCount>0">{{importCount}}</span>
          <v-icon large>new_releases</v-icon>
        </v-badge>
      </v-btn>
      <v-btn flat @click="setCurrentPage('Settings')" value="Settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-app>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import Home from './Home'
import Browse from './Browse'
import Import from './Import'
import Settings from './Settings'
export default {
  name: 'tabs',
  computed: {
    ...mapGetters(['importCount', 'isAdmin']),
    ...mapState(['currentPage'])
  },
  methods: {
    ...mapMutations(['setCurrentPage'])
  },
  components: {
    Home,
    Browse,
    Import,
    Settings
  }
}
</script>

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
.buttons {
  position: absolute;
  right: -1em;
}
</style>
