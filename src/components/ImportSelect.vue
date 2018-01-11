<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">Import book</v-toolbar-title>
      <v-spacer />
      <v-spacer />
    </v-toolbar>

    <v-content app class="content">
      <v-container justify-center>
        <v-subheader>Search using a template:</v-subheader>
        <v-list three-line subheader>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{importItem.author}} {{importItem.title}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="$router.push(`/import/${importItem.id}/${importItem.author} ${importItem.title}`)">
                <v-icon>search</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{importItem.author}} {{importItem.album}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="$router.push(`/import/${importItem.id}/${importItem.author} ${importItem.album}`)">
                <v-icon>search</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{importItem.path}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="$router.push(`/import/${importItem.id}/${importItem.path}`)">
                <v-icon>search</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider/>
        </v-list>
        <br/>
        <v-subheader>Custom search:</v-subheader>
        <v-text-field label="Search string" v-model="search"></v-text-field>
        <v-btn color="accent" :disabled="search.length===0"
           @click="$router.push(`/import/${importItem.id}/${search}`)">
          Search
        </v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'importselect',
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  data: () => ({
    search: ''
  }),
  computed: {
    ...mapGetters(['getImport']),
    ...mapState(['route']),
    importItem () {
      return this.getImport(this.route.params.id)
    }
  }
}
</script>

<style scoped>

</style>
