<template>
  <v-layout row>
    <v-flex class="flex">
      <v-card class="card" v-if="latestBook!==undefined">
        <v-container fluid grid-list-lg>
          <v-layout row>
            <v-flex xs7>
              <div class="content">
                <div class="content-top">
                  <div class="headline">{{latestBook.title}}</div>
                  <div>{{latestBook.author}}</div>
                </div>
                <div class="content-bottom">
                  <v-btn color="accent" @click="play(latestBook.id)">play</v-btn>
                </div>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-card-media
                :src="latestBook.cover"
                height="12.5em"
                contain>
              </v-card-media>
            </v-flex>
          </v-layout>
        </v-container>
        <v-progress-linear v-model="latestBook.progressPercent"></v-progress-linear>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  computed: {
    ...mapGetters(['latestBook'])
  },
  methods: {
    play (id) {
      this.$router.push(`/playing/${id}`)
    }
  }
}
</script>

<style scoped>
.card {
  margin: 1em;
}
.flex {
  margin-bottom: 1em;
}
.content {
  display: grid;
  grid-template-areas: "top" "bottom";
  grid-template-rows: 9em 3.5em;
}
.content-top {
  grid-area: top;
}
.content-bottom {
  grid-area: bottom;
}
</style>
