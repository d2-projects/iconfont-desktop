<template>
  <v-tabs background-color="primary" centered dark>
    <v-tab
      v-for="option of options"
      :key="option.route.name"
      :value="option.matchPath"
      @click="onClick(option.route)">
      {{ option.title }}
    </v-tab>
  </v-tabs>
</template>

<script>
import mixinComponentNavGroup from '@/mixins/component-nav-group.js'

export default {
  name: 'app-nav-group-tabs',
  mixins: [
    mixinComponentNavGroup
  ]
}
</script>
