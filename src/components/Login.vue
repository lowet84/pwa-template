<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-spacer />
      <v-toolbar-title class="title">Log in</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-content app class="content">
      <v-container justify-center class="container">
        <div class="logo">
          <img src="/static/img/icons/android-chrome-512x512.png"/>
        </div>
        <v-text-field label="Username" v-model="username"></v-text-field>
        <v-text-field
              label="Password"
              type="password"
              v-model="password"
            ></v-text-field>
        <v-btn block color="accent" @click="login">Log in</v-btn>
      </v-container>
    </v-content>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Login error</v-card-title>
        <v-card-text>
          You were not able to log in. 
          Did you use the wrong username/password?
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import auth from '../auth'
export default {
  name: 'login',
  data: () => ({
    dialog: false,
    username: '',
    password: ''
  }),
  methods: {
    async login () {
      let loggedIn = await auth.tryLogin(this.username, this.password)
      if (loggedIn) {
        this.$router.push('/')
      } else {
        this.dialog = true
      }
    }
  },
  created () {
    if (auth.loggedIn()) {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.logo {
  max-height: 12.5em;
  overflow: hidden;
  padding: 0;
}
</style>
