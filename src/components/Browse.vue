<template>
  <v-list two-line class="list">
    <v-list-tile v-for="book in allBooks" avatar :key="book.id">
      <v-list-tile-avatar>
        <v-icon>book</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content @click="play(book.id)">
        <v-list-tile-title v-html="book.title"></v-list-tile-title>
        <v-list-tile-sub-title v-html="subtitle(book)"></v-list-tile-sub-title>
      </v-list-tile-content>
      <v-btn flat icon @click="edit(book.id)"> 
        <v-icon>edit</v-icon>
      </v-btn>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'browse',
  computed: {
    ...mapGetters(['allBooks'])
  },
  methods: {
    subtitle (book) {
      return `${book.author} (${book.progress}%)`
    },
    play (id) {
      this.$router.push(`/playing/${id}`)
    },
    edit (id) {
      this.$router.push(`/edit/${id}`)
    }
  }
}
</script>

<style scoped>
.list {
  width: 100%;
}
</style>
