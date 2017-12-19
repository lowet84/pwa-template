<template>
  <v-container fluid fill-height class="home">
    <v-layout align-center justify-center>
      <div class="headline text-xs-center pa-5">Active: {{ e1 }}</div>
      <v-bottom-nav absolute :value="true" :active.sync="e1" color="primary">
        <v-btn flat color="secondary" value="recent">
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn flat color="secondary" value="favorites">
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn flat color="secondary" value="nearby">
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      e1: 'recent'
    }
  }
}
</script>

<style>

</style>
