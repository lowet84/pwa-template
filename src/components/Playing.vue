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
      <v-container fill-height class="home" justify-center>
        playing
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'playing',
  methods: {
    back () {
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
  }
}
</script>

<style scoped>

</style>
