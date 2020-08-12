<style lang="scss">
@include b(collection-info-name) {
  @include e(main) {
    position: relative;
  }
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<template>
  <span
    class="app-collection-info-name d-flex align-center flex-grow-1 is-pointer"
    @click="$go.detail.user(id)">
    <v-avatar :size="size" color="grey lighten-2 is-pointer" class="mr-2">
      <v-img v-if="avatar" :src="avatar"/>
      <span
        v-else-if="nickname"
        class="grey--text text--lighten-5 font-weight-bold">
        {{ nickname[0] }}
      </span>
    </v-avatar>
    <div class="app-collection-info-name__main align-self-stretch flex-grow-1">
      <div class="app-collection-info-name__content is-nowrap">
        {{ nickname }}
      </div>
    </div>
  </span>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

const dataMap = [
  ['avatar', 'avatar', ''],
  ['nickname', 'nickname', ''],
  ['id', 'id', 0]
]

export default {
  name: 'app-collection-info-user-horizontal',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    size: {
      type: Number,
      default: 22
    }
  },
  computed: {
    ...fromPairs(dataMap.map(e => [e[0], function () { return get(this.value, e[1], e[2]) }]))
  }
}
</script>
