<template>
  <v-layout row>
    <v-flex class="flex">
      <v-card v-for="latestBook in latestBooks" :key="latestBook.id" class="card">
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs7>
              <div>
                <div class="headline">{{latestBook.title}}</div>
                <div>{{latestBook.author}}</div>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-card-media
                src="/static/img/cover.jpg"
                height="200px"
                contain>
              </v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
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
