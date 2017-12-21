<template>
  <router-view>
    <router-view name="inner"></router-view>
  </router-view>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'app',
  created () {
    this.populateDummyData()
  },
  methods: {
    ...mapMutations(['populateDummyData'])
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