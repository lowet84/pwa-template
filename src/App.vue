<template>
  <router-view>
    <router-view name="inner"></router-view>
    <router-view name="button" slot="button"></router-view>
  </router-view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'app',
  created () {
    this.updateFromServer()
  },
  methods: {
    ...mapActions(['updateFromServer'])
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