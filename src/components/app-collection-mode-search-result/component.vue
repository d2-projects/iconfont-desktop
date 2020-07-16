<template>
  <app-collection-body
    type="image, list-item, actions"
    :height="313"
    :loading="loading">
    <app-collection-cover class="pa-2 pb-0" :value="icons"/>
    <app-collection-text class="pb-0" justify>
      <app-collection-info-name :value="name" class="mr-2"/>
      <app-collection-info-count-icons :value="countIcons"/>
    </app-collection-text>
    <app-collection-text justify>
      <app-collection-info-user-horizontal :value="user"/>
      <app-collection-info-count-visits :value="countVisits"/>
    </app-collection-text>
    <app-collection-action-group>
      <app-collection-action-item-likes :value="countLikes"/>
      <app-collection-action-item-favorite :value="countFavorite"/>
    </app-collection-action-group>
  </app-collection-body>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

const dataMap = [
  ['loading', 'loading', false],
  ['id', 'id', 0],
  ['name', 'name', ''],
  ['icons', 'icons', []],
  ['countIcons', 'icons_count', 0],
  ['countVisits', 'visits_count', 0],
  ['countLikes', 'likes_count', 0],
  ['countFavorite', 'favorite_count', 0],
  ['user', 'User', {}]
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
