<template>
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
  
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'browseButton',
  methods: {
    author () {
      this.setSorting(1)
    },
    title () {
      this.setSorting(0)
    },
    ...mapMutations(['setSorting'])
  }
}
</script>

<style scoped>

</style>
