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
    @click="$go.user.detail(id)">
    <app-avatar
      class="mr-2"
      :avatar="https(avatar)"
      :name="nickname"
      :size="22"/>
    <div class="app-collection-info-name__main align-self-stretch flex-grow-1">
      <div class="app-collection-info-name__content is-nowrap">
        {{ nickname }}
      </div>
    </div>
  </span>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

export default {
  name: 'app-collection-info-user-horizontal',
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
  },
  methods: {
    https (url) {
      if (/^https:/.test(url)) return url
      return 'https:' + url
    }
  }
}
</script>
