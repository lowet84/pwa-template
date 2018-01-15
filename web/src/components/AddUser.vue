<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">Add new user</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-content app class="content">
      <v-container justify-center>
        <v-text-field label="Username" v-model="username" :rules="[rules.userlength]"></v-text-field>
        <v-text-field type="password" label="Password" v-model="password" :rules="[rules.pwlength]"></v-text-field>
        <v-text-field type="password" label="Confirm Password" v-model="pwconfirm"></v-text-field>
        <v-switch label="Admin" v-model="admin"></v-switch>
        <v-btn block color="accent" @click="dialog = true" :disabled="!canAdd">Add user</v-btn>
      </v-container>
    </v-content>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Create user</v-card-title>
        <v-card-text>
          Are you sure that you want to create the user "{{username}}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="dialog = false">No</v-btn>
          <v-btn color="primary" flat="flat" @click.native="add">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'users',
  data: () => ({
    dialog: false,
    username: '',
    password: '',
    pwconfirm: '',
    admin: false,
    rules: {
      pwlength: (value) => value.length > 7 || 'Password must be at least 8 characters',
      userlength: (value) => value.length > 3 || 'Username must be at least 4 characters'
    }
  }),
  methods: {
    back () {
      this.$router.go(-1)
    },
    async add () {
      let res = await this.addUserToServer({
        username: this.username,
        password: this.password,
        admin: this.admin
      })
      if (res) {
        this.$router.go(-1)
      }
    },
    ...mapActions(['addUserToServer'])
  },
  computed: {
    canAdd () {
      return this.username.length > 0 &&
        this.password.length > 7 &&
        this.password === this.pwconfirm
    }
  }
}
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: row;
}
</style>
