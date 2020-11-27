<style lang="scss">
@include b(user-card) {
  &:hover {
    background-color: rgba(#000, .02);
  }
}
</style>

<template>
  <div class="app-user-card px-6 py-3 mb-2 rounded">
    <div
      class="app-user-card__header py-3"
      flex="cross:center"
      @click="$go.user.detail(id)">
      <app-avatar
        class="mr-4"
        :avatar="avatar | https"
        :name="nickname"
        :size="30"/>
      <div>
        <div class="text-subtitle-1">{{ nickname }}</div>
        <div class="text-caption">{{ bio }}</div>
      </div>
    </div>
    <div class="app-user-card__collections">
      <app-collection-list :value="collections">
        <template v-slot="{ collection }">
          <app-collection-mode-search-result-user :value="collection"/>
        </template>
      </app-collection-list>
    </div>
  </div>
</template>

<script>
import { fromPairs, get } from 'lodash-es'

export default {
  name: 'app-user-card',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...fromPairs([
      ['loading', 'loading', false],
      ['id', 'id', 0],
      ['avatar', 'avatar', ''],
      ['nickname', 'nickname', ''],
      ['bio', 'bio', ''],
      ['collections', 'collections', []]
    ].map(e => [e[0], function () { return get(this.value, e[1], e[2]) }]))
  }
}
</script>
