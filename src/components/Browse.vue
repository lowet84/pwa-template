<template>
  <v-list two-line class="list">
    <v-list-tile v-for="book in allBooks" avatar :key="book.id" @click="">
      <v-list-tile-avatar>
        <v-icon>book</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title v-html="book.title"></v-list-tile-title>
        <v-list-tile-sub-title v-html="book.author"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'browse',
  computed: {
    ...mapGetters(['allBooks'])
  }
}
</script>

<style scoped>
.list{
  width: 100%;
}
</style>
