<style lang="scss">
@include b(page-user-detail) {
  @extend .absolute-parent;
  @include e(topbar) {
    z-index: 1;
    @extend .absolute-top;
    @extend .backdrop;
  }
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<template>
  <div class="app-page-user-detail">
    <div class="app-page-user-detail__content">
      <app-list ref="list">
        <div slot="header" :style="{ height: ui.topbar.size + 'px' }"/>
        list
      </app-list>
    </div>
    <div ref="topbar" class="app-page-user-detail__topbar">
      <v-container class="px-0">
        <v-skeleton-loader
          height="72"
          type="list-item-avatar-two-line"
          :loading="false"
          transition="fade-transition">
          <div flex="cross:center">
            <v-avatar :size="64" color="grey lighten-2" class="mr-4" @click="$go.datail.user(userId)">
              <v-img v-if="userAvatar" :src="userAvatar"/>
              <span v-else-if="userNickname" class="grey--text text--lighten-5 text-h4 font-weight-bold">
                {{ userNickname[0] }}
              </span>
            </v-avatar>
            <div>
              <div class="text-h6">{{ userNickname }}</div>
            </div>
          </div>
        </v-skeleton-loader>
      </v-container>
    </div>
  </div>
</template>

<script>
import { fromPairs, get } from 'lodash-es'
import { mapState } from 'vuex'

import ui from '@/mixins/ui.js'
import list from '@/mixins/list.js'

const dataMap = [
  ['userId', 'id', ''],
  ['userNickname', 'nickname', ''],
  ['userAvatar', 'avatar', '']
]

export default {
  mixins: [
    ui,
    list
  ],
  data () {
    return {
      list: {
        page: {
          size: 120
        }
      },
      detail: {}
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    ...fromPairs(dataMap.map(e => [e[0], function () { return get(this.detail, e[1], e[2]) }]))
  },
  created () {
    this.listMixinLoad()
    this.userDetailLoad()
  },
  methods: {
    async listMixinLoad () {
      this.listMixinAddPlaceholder()
      const fetch = this.sdk.userCollections({
        id: this.$route.query.id
      })
      const result = await this.listMininFetch(fetch)
      this.listMixinRemovePlaceholder()
      this.list.data = result.collections
    },
    async userDetailLoad () {
      const result = await this.sdk.userDetail({
        id: this.$route.query.id
      })
      this.detail = result
      // alipay_code: string
      // avatar: string
      // bio: string
      // id: 7509436
      // isXiaoer: false
      // nickname: string
      // weixin_code: string
    }
  }
}
</script>
