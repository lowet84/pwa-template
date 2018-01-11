<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">Import book</v-toolbar-title>
      <v-spacer />
      <v-spacer />
    </v-toolbar>

    <v-content app class="content">
      
    </v-content>

  </v-app>
</template>

<script>
import { } from 'vuex'
export default {
  name: 'importselect',
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
