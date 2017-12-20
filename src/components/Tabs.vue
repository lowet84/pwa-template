<template>
  <v-layout align-center justify-center>
    <slot></slot>
    <v-bottom-nav absolute :value="true" color="primary">
      <v-btn flat to="/home" value="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat to="/browse" value="browse">
        <span>Browse</span>
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn flat to="/settings" value="settings">
        <span>Settings</span>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-layout>
</template>

<script>
export default {
  name: 'tabs'
}
</script>

<style scoped>

</style>
