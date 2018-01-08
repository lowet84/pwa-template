<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">{{book.title}}</v-toolbar-title>
      <v-spacer />
      <v-spacer />
    </v-toolbar>

    <v-content app class="content">
      <v-container justify-center>
        <v-subheader>Search: {{book.title}} {{book.author}}</v-subheader>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-container fluid v-bind="{ ['grid-list-sm']: true }">
                <v-layout row wrap>
                  <v-flex
                    xs4
                    v-for="cover in covers"
                    :key="cover">
                    <v-card flat tile>
                      <v-card-media @click="select(cover)"
                        :src="cover"
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
    ...mapActions(['searchCoversFromServer', 'saveBookToServer']),
    select (cover) {
      this.book.cover = cover
      this.saveBookToServer(this.book)
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapGetters(['getBook']),
    ...mapState(['route']),
    book: function () {
      return this.getBook(this.route.params.id)
    }
  },
  created () {
    let book = this.book
    if (book === undefined) {
      this.$router.push('/')
    }
    this.searchCoversFromServer(`${this.book.author} ${this.book.title}`)
      .then(covers => { this.covers = covers })
  }
}
</script>

<style scoped>

</style>
