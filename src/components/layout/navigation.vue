<template>
  <v-bottom-navigation
    class="app-drag"
    :value="this.active"
    shift
    app>
    <v-btn
      v-for="menu of menus"
      :key="menu.value"
      :value="menu.value"
      @click="onChange(menu.value)">
      <span>{{ menu.label }}</span>
      <v-icon>{{ menu.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { menus } from '@/router.js'

export default {
  name: 'navigation',
  data () {
    return {
      menus: menus.nav
    }
  },
  computed: {
    active () {
      return this.$route.name
    }
  },
  methods: {
    onChange (name) {
      this.$router.replace({
        name
      })
    }
  }
}
</script>
