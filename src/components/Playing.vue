<template>
  <v-app id="inspire" dark v-if="book !== undefined">

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">Now playing</v-toolbar-title>
      <v-spacer />
      <v-spacer />
    </v-toolbar>

    <v-content app class="base">
      <v-container fill-height justify-center class="container">
        <div class="content">
          <div class="progress">
            <div class="progress-content-left">{{progressSec}}</div>
            <div class="progress-content-right">{{leftSec}}</div>
            <v-progress-linear v-model="book.progressPercent" 
            class="progress-bar" height="30" color="accent">
            </v-progress-linear>
          </div>
          <div class="text-area">
            <h1 class="white--text">{{book.title}}</h1>
            <h4 class="white--text">{{book.author}}</h4>
          </div>
          <div class="control">
            <v-btn flat icon class="button" @click="jumpClick(-60)">
              <v-icon large>skip_previous</v-icon>
            </v-btn>
            <v-btn flat icon class="button" @click="jumpClick(-10)">
              <v-icon large>fast_rewind</v-icon>
            </v-btn>
            <v-btn flat icon class="button" @click="jumpClick(10)">
              <v-icon large>fast_forward</v-icon>
            </v-btn>
            <v-btn flat icon class="button" @click="jumpClick(60)">
              <v-icon large>skip_next</v-icon>
            </v-btn>
          </div>
          <div class="play" @click="playPause(book.id)">
            <v-btn flat icon v-if="sound.source===null">
              <v-icon x-large>play_arrow</v-icon>
            </v-btn>
            <v-btn flat icon v-if="sound.source!==null">
              <v-icon x-large>pause</v-icon>
            </v-btn>
          </div>
        </div>
        <v-parallax
          :src="book.cover"
          height="100%"
          jumbotron
          class="parallax">
        </v-parallax>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'playing',
  methods: {
    back () {
      this.$router.go(-1)
    },
    ...mapActions(['playPause', 'jump']),
    jumpClick (value) {
      this.jump({ book: this.book, position: value })
    }
  },
  computed: {
    ...mapGetters(['getBook']),
    ...mapState(['route', 'sound']),
    book: function () {
      return this.getBook(this.route.params.id)
    },
    progress () {
      return this.book.progress
    },
    progressSec () {
      return Math.floor(this.progress)
    },
    left () {
      return this.book.length - this.book.progress
    },
    leftSec () {
      return Math.floor(this.left)
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
  height: 100%;
}
.parallax {
  width: 100%;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.progress {
  grid-area: progress;
}
.progress-bar {
  opacity: 0.7;
  margin: 0;
  z-index: 0;
  position: absolute;
}
.content {
  display: grid;
  flex-direction: column;
  grid-template-areas: "progress" "." "text" "." "play" "." "control";
  grid-template-columns: 100%;
  grid-template-rows: auto 1fr auto 1fr auto 1fr auto;
  height: 100%;
  z-index: 1;
}
.text-area {
  grid-area: text;
  text-align: center;
}
.control {
  grid-area: control;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.button {
  margin: 0.5em;
}
.play {
  grid-area: play;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  transform: scale(2, 2);
}
.base {
  overflow: hidden;
}
.progress-content-left {
  z-index: 1;
  position: absolute;
  margin: 4px;
}
.progress-content-right {
  z-index: 1;
  position: absolute;
  margin: 4px;
  right: 0px;
}
</style>
