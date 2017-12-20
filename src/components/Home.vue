<template>
  <v-container fluid fill-height class="home">
    <v-layout align-center justify-center>
      <div class="headline text-xs-center pa-5">Active: sdsf</div>
      <v-bottom-nav absolute :value="true" color="primary">
        <v-btn flat to="/home/recent" value="recent">
          <span>Recent</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn flat to="/home/favorites" value="favorites">
          <span>Favorites</span>
          <v-icon>favorite</v-icon>
        </v-btn>
        <v-btn flat to="/home/nearby" value="nearby">
          <span>Nearby</span>
          <v-icon>place</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style>

</style>
