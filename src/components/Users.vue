<template>
  <v-app dark>

    <v-toolbar color="primary" fixed app>
      <v-btn flat icon @click="back">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title class="title">Users</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$router.push('/adduser')">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content app class="content">
      <v-container justify-center>
        <v-list>
          <v-list-tile avatar v-for="user in users" 
            v-bind:key="user.username">
            <v-list-tile-avatar>
              <v-icon v-if="user.username===currentUser.username">person_pin</v-icon>
              <v-icon v-else-if="user.admin">person</v-icon>
              <v-icon v-else>person_outline</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content class="row">
              <div>{{user.username}}</div>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-menu offset-y v-if="user.username!==currentUser.username">
                <v-btn icon slot="activator">
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="deleteUser(user)">
                    <v-list-tile-title>Delete user</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="" v-if="!user.admin">
                    <v-list-tile-title>Promote to admin</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="" v-if="user.admin">
                    <v-list-tile-title>Demote to user</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-container>
    </v-content>

    <v-dialog v-model="dialog.show" max-width="290">
      <v-card>
        <v-card-title class="headline">{{dialog.Title}}</v-card-title>
        <v-card-text>
          {{dialog.text}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="dialog = false">No</v-btn>
          <v-btn color="primary" flat="flat" @click.native="dialog.action(dialog.item)">Yes</v-btn>
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
    dialog: {
      show: false,
      title: '',
      text: '',
      action: null,
      item: null
    },
    users: []
  }),
  methods: {
    back () {
      this.$router.go(-1)
    },
    ...mapActions(['getUsersFromServer', 'deleteUserFromServer']),
    async init () {
      this.users = await this.getUsersFromServer()
    },
    deleteUser (user) {
      let context = this
      this.dialog.title = 'Delete user'
      this.dialog.text = `Are you sure that you want to delete the user "${user.username}"?`
      this.dialog.item = user
      this.dialog.action = async function (value) {
        await context.deleteUserFromServer(value)
        context.users = await context.getUsersFromServer()
        this.show = false
      }
      this.dialog.show = true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    this.init()
  }
}
</script>

<style scoped>
.user {
  display: flex;
  flex-direction: row;
}
</style>
