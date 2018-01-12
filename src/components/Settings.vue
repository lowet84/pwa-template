<template>
  <div>
    <v-list three-line subheader>
      <v-list-tile @click="showLogout">
        <v-list-tile-content>
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile v-if="isAdmin" @click="$router.push('/users')">
        <v-list-tile-content>
          <v-list-tile-title>Users</v-list-tile-title>
          <v-list-tile-sub-title>Manage user accounts</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile @click="$router.push('/changepass')">
        <v-list-tile-content>
          <v-list-tile-title>Change password</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="isAdmin" @click="showClean">
        <v-list-tile-content>
          <v-list-tile-title>Clear local storage</v-list-tile-title>
          <v-list-tile-sub-title>Only for debugging</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-dialog v-model="dialog.show" max-width="290">
      <v-card>
        <v-card-title class="headline">{{dialog.title}}</v-card-title>
        <v-card-text>
          {{dialog.text}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="dialog.show = false">No</v-btn>
          <v-btn color="primary" flat="flat" @click.native="dialog.action(dialog.item)">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'settings',
  methods: {
    ...mapActions(['logout']),
    showLogout () {
      let context = this
      this.dialog.title = 'Log out'
      this.dialog.text = `Are you sure that you want to log out?`
      this.dialog.action = async function (value) {
        context.logout()
        context.$router.push('/login')
        this.show = false
      }
      this.dialog.show = true
    },
    showClean () {
      let context = this
      this.dialog.title = 'Clear local storage'
      this.dialog.text = `Are you sure that you want to log clear local storage?`
      this.dialog.action = async function (value) {
        localStorage.clear()
        context.$router.push('/login')
        this.show = false
      }
      this.dialog.show = true
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  data: () => ({
    dialog: {
      show: false,
      title: '',
      text: '',
      action: null,
      item: null
    }
  })
}
</script>

<style scoped>

</style>
