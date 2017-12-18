<template>
  <div>
    <md-button class="md-icon-button" @click="setDrawer(true)">
      <md-icon>menu</md-icon>
    </md-button>
  </div>
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
