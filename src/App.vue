<template>
  <router-view>
    <router-view name="inner"></router-view>
    <router-view name="button" slot="button"></router-view>
  </router-view>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  created () {
    this.init()
  },
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    ...mapActions(['updateFromServer', 'loadUser']),
    async init () {
      this.loadUser()
      if (!this.loggedIn) {
        this.$router.push('/login')
      }
      this.updateFromServer()
    }
  },
  watch: {
    $route (newval) {
      if (!this.loggedIn) {
        this.$router.push('/login')
      }
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