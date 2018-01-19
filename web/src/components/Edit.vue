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
        <v-card>
          <v-card-media
            height="200px"
            :src="book.cover"
          >
          </v-card-media>
          <v-card-title>
            <div>
              <span class="grey--text">Metadata from server</span><br>
              <span>{{meta1}}</span><br/>
              <span>{{meta2}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="accent" @click="searchCover">Search for cover</v-btn>
          </v-card-actions>
        </v-card>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-text-field label="Author" v-model="author"></v-text-field>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'edit',
  data: () => ({
    author: '',
    title: '',
    timer: null,
    metadata: undefined
  }),
  methods: {
    back () {
      this.$router.go(-1)
    },
    ...mapActions(['getMetadataFromServer', 'saveBookToServer']),
    searchCover () {
      this.$router.push(`/coversearch/${this.book.id}`)
    },
    startTimer () {
      if (this.timer !== null) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => this.saveBookToServer(this.book), 2000)
    },
    async getMetadata () {
      this.metadata = await this.getMetadataFromServer(this.book.id)
    }
  },
  computed: {
    ...mapGetters(['getBook']),
    ...mapState(['route']),
    book: function () {
      return this.getBook(this.route.params.id)
    },
    meta1 () {
      return this.metadata !== undefined
        ? `${this.metadata.author}/${this.metadata.title}/${this.metadata.album}`
        : ''
    },
    meta2 () {
      return this.metadata !== undefined
        ? `${this.metadata.path}/${this.metadata.filename}`
        : ''
    }
  },
  watch: {
    author (newval) {
      if (newval !== this.book.author) {
        this.startTimer()
      }
      this.book.author = newval
    },
    title (newval) {
      if (newval !== this.book.title) {
        this.startTimer()
      }
      this.book.title = newval
    }
  },
  created () {
    let book = this.book
    if (book === undefined) {
      this.$router.push('/')
    }
    this.getMetadata()
    this.author = this.book.author
    this.title = this.book.title
  }
}
</script>

<style scoped>

</style>
