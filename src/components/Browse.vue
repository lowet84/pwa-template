<template>
  <v-list two-line class="list">
    <div v-for="(book, index)  in allBooks" avatar :key="book.id">
      <v-list-tile>
        <v-list-tile-avatar>
          <img :src="book.cover" alt="">
        </v-list-tile-avatar>
        <v-list-tile-content @click="play(book.id)">
          <v-list-tile-title v-html="book.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="subtitle(book)"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-btn flat icon @click="edit(book.id)"> 
          <v-icon>edit</v-icon>
        </v-btn>
      </v-list-tile>
      <v-divider v-if="index + 1 < allBooks.length"></v-divider>
    </div>
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
      return `${book.author} (${book.progressPercent}%)`
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
