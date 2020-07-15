<template>
  <app-collection-body
    type="card-heading, image"
    :height="220"
    :loading="loading">
    <app-collection-cover class="pa-2 pb-0" :value="icons"/>
    <v-card-text flex="main:justify">
      <app-collection-info-name :value="name"/>
      <app-collection-info-count-icons :value="countIcons"/>
    </v-card-text>
  </app-collection-body>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

const dataMap = [
  ['loading', 'loading', false],
  ['id', 'id', 0],
  ['name', 'name', ''],
  ['icons', 'icons', []],
  ['countIcons', 'icons_count', 0]
]

export default {
  name: 'app-collection-mode-search-result',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...fromPairs(dataMap.map(e => [e[0], function () { return get(this.value, e[1], e[2]) }]))
  }
}
</script>
