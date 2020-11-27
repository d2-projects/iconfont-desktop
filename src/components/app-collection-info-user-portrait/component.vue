<template>
  <div
    class="is-pointer"
    flex="dir:top cross:center"
    @click="$go.user.detail(id)">
    <app-avatar
      class="mb-2"
      :avatar="avatar"
      :name="nickname"
      :size="36"/>
    <div class="text-subtitle-1">{{ nickname }}</div>
  </div>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

export default {
  name: 'app-collection-info-user-portrait',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...fromPairs([
      ['avatar', 'avatar', ''],
      ['nickname', 'nickname', ''],
      ['id', 'id', 0]
    ].map(e => [e[0], function () { return get(this.value, e[1], e[2]) }]))
  }
}
</script>
