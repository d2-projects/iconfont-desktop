<template>
  <div
    class="is-pointer"
    flex="dir:top cross:center"
    @click="$go.datail.user(id)">
    <v-avatar :size="size" color="grey lighten-2" class="mb-2">
      <v-img v-if="avatar" :src="avatar"/>
      <span
        v-else-if="nickname"
        class="grey--text text--lighten-5 font-weight-bold">
        {{ nickname[0] }}
      </span>
    </v-avatar>
    <div class="text-subtitle-1">{{ nickname }}</div>
  </div>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

const dataMap = [
  ['avatar', 'avatar', ''],
  ['nickname', 'nickname', ''],
  ['id', 'id', 0]
]

export default {
  name: 'app-collection-info-user-portrait',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    size: {
      type: Number,
      default: 36
    }
  },
  computed: {
    ...fromPairs(dataMap.map(e => [e[0], function () { return get(this.value, e[1], e[2]) }]))
  }
}
</script>
