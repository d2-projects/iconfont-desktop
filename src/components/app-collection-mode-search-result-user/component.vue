<template>
  <app-collection-body
    type="image, list-item"
    :height="222"
    :loading="loading">
    <app-collection-cover class="pa-2 pb-0" :value="icons" :id="id"/>
    <app-collection-text justify>
      <app-collection-info-name :value="name" class="mr-2"/>
      <app-collection-info-count-icons :value="countIcons"/>
    </app-collection-text>
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
  name: 'app-collection-mode-search-result-user',
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
