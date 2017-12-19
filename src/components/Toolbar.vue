<template>
  <md-toolbar class="md-primary">
    <md-button class="md-icon-button" @click="setDrawer(true)">
      <md-icon>menu</md-icon>
    </md-button>
    <h3 class="md-title">Primary</h3>
  </md-toolbar>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'toolbar',
  methods: {
    ...mapMutations(['setDrawer'])
  }
}
</script>

<style>

</style>
