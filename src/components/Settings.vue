<template>
  <div>
    <v-list three-line subheader>
      <v-list-tile @click="dialog=true">
        <v-list-tile-content>
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-if="isAdmin">
        <v-list-tile-content>
          <v-list-tile-title>Users</v-list-tile-title>
          <v-list-tile-sub-title>Manage user accounts</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Log out</v-card-title>
        <v-card-text>
          Are you sure that you want to log out?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="dialog = false">No</v-btn>
          <v-btn color="primary" flat="flat" @click.native="logoutClick">Yes</v-btn>
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
    logoutClick () {
      this.logout()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  data: () => ({
    dialog: false
  })
}
</script>

<style scoped>

</style>
