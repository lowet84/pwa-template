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
        <Home v-if="page==='home'"/>
        <Browse v-if="page==='browse'"/>
        <Import v-if="page==='import'"/>
        <Settings v-if="page==='settings'"/>
      </v-container>
    </v-content>

    <v-bottom-nav value="true" color="primary" :active.sync="page">
      <v-btn flat @click="page='home'" value="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat @click="page='browse'" value="browse">
        <span>Browse</span>
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn flat @click="page='import'" value="import" v-if="isAdmin">
        <span>Import</span>
        <v-badge color="secondary">
          <span slot="badge" v-if="importCount>0">{{importCount}}</span>
          <v-icon large>new_releases</v-icon>
        </v-badge>
      </v-btn>
      <v-btn flat @click="page='settings'" value="settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Home from './Home'
import Browse from './Browse'
import Import from './Import'
import Settings from './Settings'
export default {
  name: 'tabs',
  data: () => ({
    page: 'home'
  }),
  computed: {
    ...mapGetters(['currentPage', 'importCount', 'isAdmin'])
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
