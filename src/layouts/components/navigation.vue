<template>
  <v-bottom-navigation
    class="app-drag"
    :value="active"
    shift
    app>
    <v-btn
      v-for="menu of menus"
      :key="menu.value"
      :value="menu.value"
      @click="onClick(menu.value)">
      <span>{{ menu.label }}</span>
      <v-icon>{{ menu.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { last } from 'lodash'
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
      return last(this.$route.matched).name.split('-')[0]
    }
  },
  methods: {
    onClick (name) {
      this.$router.push({ name })
    }
  }
}
</script>
