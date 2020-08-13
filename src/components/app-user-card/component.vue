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
      @click="$go.detail.user(id)">
      <v-avatar color="grey lighten-2" class="is-pointer mr-4">
        <v-img v-if="avatar" :src="avatar"/>
        <span
          v-else-if="nickname"
          class="grey--text text--lighten-5 font-weight-bold">
          {{ nickname[0] }}
        </span>
      </v-avatar>
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

// account_type: 0
// alipay_code: ""
// avatar: ""
// avatar_file_name: null
// avatar_small_file_name: null
// avatar_tiny_file_name: null
// bio: ""
// collectionCount: 0
// collections: Array(0)
// created_at: "2019-09-16T03:58:05.000Z"
// email: "6625734718@weibo.oauth.com"
// from_site: null
// iconsCount: 0
// id: 6216846
// last_login_at: null
// nickname: "1"
// qq: ""
// role: 0
// show_email: ""
// status: 1
// updated_at: "2019-09-16T03:58:55.000Z"
// weixin_code: "//iconfont.alicdn.com/tfscom/TB1NcQ6GXXXXXcoXFXXwu0bFXXX.png"

const dataMap = [
  ['loading', 'loading', false],
  ['id', 'id', 0],
  ['avatar', 'avatar', ''],
  ['nickname', 'nickname', ''],
  ['bio', 'bio', ''],
  ['collections', 'collections', []]
]

export default {
  name: 'app-user-card',
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
