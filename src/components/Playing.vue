<template>
  <v-app id="inspire" dark v-if="book !== undefined">

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
      <v-container fill-height justify-center class="container">
        <v-parallax
          :src="book.cover"
          height="100%"
          jumbotron
          class="parallax">
        </v-parallax>
        <v-layout column>
          <div class="content">
            <v-progress-linear v-model="book.progressPercent" 
              class="progress" height="30" color="accent">
              </v-progress-linear>
            <div class="text-area">
              <h1 class="white--text">Vuetify.js</h1>
              <h4 class="white--text">Build your application today!</h4>
            </div>
          </div>
        </v-layout>
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
.container {
  padding: 0;
}
.parallax {
  width: 100%;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
}
.progress {
  margin: 0;
  opacity: 0.7;
  grid-area: progress;
}
.content {
  display: grid;
  flex-direction: column;
  grid-template-areas: "progress" "text";
}
.text-area{
  grid-area: text;
}
</style>
