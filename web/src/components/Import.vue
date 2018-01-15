<template>
  <v-list two-line class="list">
    <div v-for="(item, index) in imports" avatar :key="item.title">
      <v-list-tile>
        <v-list-tile-content @click="$router.push(`/import/${item.id}`)">
          <v-list-tile-title>{{item.author}}/{{item.title}}/{{item.album}}</v-list-tile-title>
          <v-list-tile-sub-title>{{item.path}}/{{item.filename}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="index + 1 < imports.length"></v-divider>
    </div>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'imports',
  computed: {
    ...mapState(['imports'])
  }
}
</script>

<style scoped>
.list {
  width: 100%;
}
</style>
