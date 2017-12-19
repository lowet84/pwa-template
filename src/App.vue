<template>
  <div class="app">
    <drawer></drawer>
    <toolbar></toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Drawer from '@/components/Drawer'
import Toolbar from '@/components/Toolbar'
export default {
  name: 'app',
  components: {
    drawer: Drawer,
    toolbar: Toolbar
  }
}
</script>

<style lang="scss">
@import "./theme";

.app {
  height: 100vh;
}
</style>
