<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">Select book</v-toolbar-title>
      <v-spacer />
      <v-spacer />
    </v-toolbar>

    <v-content app class="content">
      <v-container justify-center>
        <v-subheader>Search: {{route.params.search}}</v-subheader>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-container fluid v-bind="{ ['grid-list-sm']: true }">
                <v-layout row wrap>
                  <v-flex
                    xs4
                    v-for="cover in covers"
                    :key="cover.id">
                    <v-card flat tile>
                      <v-card-media @click="select(cover)"
                        :src="cover.cover"
                        height="150px">
                      </v-card-media>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'search',
  data: () => ({
    covers: []
  }),
  methods: {
    back () {
      this.$router.go(-1)
    },
    ...mapActions(['searchCoversFromServer', 'importBookToServer', 'updateFromServer']),
    async select (cover) {
      var res = await this.importBookToServer({ id: this.importItem.id, cover: cover })
      if (res) {
        await this.updateFromServer()
        this.$router.go(this.route.params.id !== 'quick'
          ? -2
          : -1)
      }
    }
  },
  computed: {
    ...mapGetters(['getImport']),
    ...mapState(['route', 'imports']),
    importItem: function () {
      let id = this.route.params.id !== 'quick'
        ? this.route.params.id
        : (this.imports[0] !== undefined ? this.imports[0].id : null)
      if (id === null) this.$router.go(-1)
      return this.getImport(id)
    }
  },
  created () {
    this.searchCoversFromServer(this.route.params.search)
      .then(covers => { this.covers = covers })
  }
}
</script>

<style scoped>

</style>
