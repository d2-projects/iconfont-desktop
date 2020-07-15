<template>
  <app-collection-body
    type="list-item-avatar-two-line, image"
    :height="260"
    :loading="loading">
    <app-collection-user-portrait :value="user" class="pb-0"/>
    <app-collection-cover class="pa-2" :value="icons"/>
  </app-collection-body>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

const dataMap = [
  ['loading', 'loading', false],
  ['name', 'name', ''],
  ['description', 'description', ''],
  ['id', 'id', 0],
  ['icons', 'icons', []],
  ['user', 'User', {}]
]

export default {
  name: 'app-collection-mode-index-user',
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
