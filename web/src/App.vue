<template>
  <div>
    <router-view>
      <router-view name="inner"></router-view>
      <router-view name="button" slot="button"></router-view>
    </router-view>
    <v-snackbar
      :timeout="5000"
      bottom
      multi-line
      vertical 
      v-model="toast">
      {{ error }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'app',
  data: () => ({
    error: null,
    toast: false
  }),
  created () {
    this.init()
  },
  computed: {
    ...mapGetters(['loggedIn']),
    ...mapState(['errors'])
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
    },
    errors (newval) {
      if (this.errors.length > 0 && !this.toast) {
        this.error = this.errors[0]
        this.toast = true
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