<template>
  <v-app id="inspire" dark>

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
        <v-list three-line>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <v-icon v-if="book.metadata!==undefined">info_outline</v-icon>
              <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
            </v-list-tile-avatar>
            <v-list-tile-content v-if="book.metadata!==undefined">
              <v-list-tile-title v-html="meta1"></v-list-tile-title>
              <v-list-tile-sub-title v-html="meta2"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-text-field label="Title" v-model="title"></v-text-field>
        <v-text-field label="Author" v-model="author"></v-text-field>
        <v-btn color="accent" @click="save">Save</v-btn>
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
    title: ''
  }),
  methods: {
    back () {
      this.$router.go(-1)
    },
    ...mapActions(['getMetadata']),
    save () {
      console.log('saving')
    }
  },
  computed: {
    ...mapGetters(['getBook']),
    ...mapState(['route']),
    book: function () {
      return this.getBook(this.route.params.id)
    },
    meta1 () { return `${this.book.metadata.author}/${this.book.metadata.title}` },
    meta2 () { return `${this.book.metadata.path}/${this.book.metadata.filename}` }
  },
  created () {
    let book = this.book
    if (book === undefined) {
      this.$router.push('/')
    }
    this.getMetadata(this.book.id)
    this.author = this.book.author
    this.title = this.book.title
  }
}
</script>

<style scoped>

</style>
