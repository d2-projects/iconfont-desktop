<template>
  <app-collection-body
    type="card-heading, image"
    :height="220"
    :loading="loading">
    <app-collection-text class="text-subtitle-1 text-center pb-0">
      {{ name }}
    </app-collection-text>
    <app-collection-cover class="pa-2" :value="icons" :id="id"/>
  </app-collection-body>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

const dataMap = [
  ['loading', 'loading', false],
  ['id', 'id', 0],
  ['name', 'name', ''],
  ['icons', 'icons', []]
]

export default {
  name: 'app-collection-mode-index-official',
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
