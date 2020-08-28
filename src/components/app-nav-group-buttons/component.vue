<template>
  <v-btn-toggle :value="currentValue" rounded dense>
    <v-btn
      v-for="option of options"
      :key="option.route.name"
      :value="option.matchPath"
      @click="onClick(option.route)">
      {{ option.title }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
import mixinComponentNavGroup from '@/mixins/component-nav-group.js'

export default {
  name: 'app-nav-group-buttons',
  mixins: [
    mixinComponentNavGroup
  ]
}
</script>
