<template>
  <v-layout row>
    <v-flex class="flex">
      <v-card v-for="latestBook in latestBooks" :key="latestBook.id" class="card">
        <v-card-media src="/static/doc-images/cards/desert.jpg" height="200px">
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{latestBook.title}}</h3>
            <div>{{latestBook.author}}</div>
          </div>
        </v-card-title>
        <v-progress-linear :value="80"></v-progress-linear>
        <v-card-actions>
          <v-btn flat color="accent">Play</v-btn>
          <v-btn flat color="accent">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters(['latestBooks'])
  }
}
</script>

<style scoped>
.card{
  margin: 1em;
}
.flex{
  margin-bottom: 1em;
}
</style>
