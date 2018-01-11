<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">Change password</v-toolbar-title>
      <v-spacer />
    </v-toolbar>

    <v-content app class="content">
      <v-container justify-center>
        <v-text-field type="password" label="Old password" v-model="oldpass"></v-text-field>
        <v-text-field type="password" label="Password" v-model="password" :rules="[rules.pwlength]"></v-text-field>
        <v-text-field type="password" label="Confirm Password" v-model="pwconfirm"></v-text-field>
        <v-btn block color="accent" @click="showDialog" :disabled="!canChange">Change password</v-btn>
      </v-container>
    </v-content>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm password change</v-card-title>
        <v-card-text>
          Are you sure that you want to change your password?
        </v-card-text>
        <v-card-text class="wrongpass" v-if="wrongpass">
          Could not change password.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="dialog = false">No</v-btn>
          <v-btn color="primary" flat="flat" @click.native="change">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'users',
  data: () => ({
    wrongpass: false,
    dialog: false,
    oldpass: '',
    password: '',
    pwconfirm: '',
    rules: {
      pwlength: (value) => value.length > 7 || 'Password must be at least 8 characters'
    }
  }),
  methods: {
    back () {
      this.$router.go(-1)
    },
    showDialog () {
      this.wrongpass = false
      this.dialog = true
    },
    async change () {
      let res = await this.changePasswordToServer({
        username: this.currentUser.username,
        password: this.password,
        oldpass: this.oldpass
      })
      if (res) {
        this.$router.go(-1)
      } else {
        this.wrongpass = true
      }
    },
    ...mapActions(['changePasswordToServer'])
  },
  computed: {
    canChange () {
      return this.oldpass.length > 0 &&
        this.password.length > 7 &&
        this.password === this.pwconfirm
    },
    ...mapState(['currentUser'])
  }
}
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: row;
}
.wrongpass {
  color: red;
}
</style>
