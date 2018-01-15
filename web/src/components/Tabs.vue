<template>
  <v-app id="inspire" dark>

    <v-toolbar color="primary" fixed app>
      <v-spacer />
      <v-toolbar-title class="title">{{currentPage}}</v-toolbar-title>
      <v-spacer />
      <div class="buttons">
        <BrowseButton v-if="currentPage==='Browse'"/>
        <ImportButton v-if="currentPage==='Import'"/>
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

    <v-bottom-nav value="true" color="primary" :active.sync="page">
      <v-btn flat value="Home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat value="Browse">
        <span>Browse</span>
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn flat value="Import" v-if="isAdmin">
        <span>Import</span>
        <v-badge color="secondary">
          <span slot="badge" v-if="importCount>0">{{importCount}}</span>
          <v-icon large>new_releases</v-icon>
        </v-badge>
      </v-btn>
      <v-btn flat value="Settings">
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
import BrowseButton from './BrowseButton'
import Import from './Import'
import ImportButton from './ImportButton'
import Settings from './Settings'
export default {
  name: 'tabs',
  computed: {
    ...mapGetters(['importCount', 'isAdmin']),
    ...mapState(['currentPage']),
    page: {
      get () {
        return this.currentPage
      },
      set (value) {
        this.setCurrentPage(value)
      }
    }
  },
  methods: {
    ...mapMutations(['setCurrentPage'])
  },
  components: {
    Home,
    Browse,
    BrowseButton,
    Import,
    ImportButton,
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
