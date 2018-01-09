<template>
  <router-view>
    <router-view name="inner"></router-view>
    <router-view name="button" slot="button"></router-view>
  </router-view>
</template>

<script>
import { mapActions } from 'vuex'
import auth from './auth'
export default {
  name: 'app',
  created () {
    this.init()
  },
  methods: {
    ...mapActions(['updateFromServer']),
    async init () {
      if (!auth.loggedIn()) {
        this.$router.push('/login')
      }
      this.updateFromServer()
    }
  }
}
</script>

<style>
body {
  -webkit-user-select: none;
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  user-select: none;
}
</style>