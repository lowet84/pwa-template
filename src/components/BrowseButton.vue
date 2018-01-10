<template>
  <div>
    <v-btn icon @click="updateFromServer">
      <v-icon>refresh</v-icon>
    </v-btn>
    <v-menu offset-y>
      <v-btn flat icon slot="activator">
        <v-icon>
          sort
        </v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="author">
          <v-list-tile-title>Author</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="title">
          <v-list-tile-title>Title</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'browseButton',
  methods: {
    author () {
      this.setSorting(1)
    },
    title () {
      this.setSorting(0)
    },
    ...mapMutations(['setSorting']),
    ...mapActions(['updateFromServer'])
  }
}
</script>

<style scoped>

</style>
