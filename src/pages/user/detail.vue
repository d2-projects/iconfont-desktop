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
        <router-view/>
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
            <v-avatar :size="64" color="grey lighten-2" class="mr-4">
              <v-img v-if="userAvatar" :src="userAvatar"/>
              <span v-else-if="userNickname" class="grey--text text--lighten-5 text-h4 font-weight-bold">
                {{ userNickname[0] }}
              </span>
            </v-avatar>
            <div class="mr-auto">
              <div class="text-h6 is-nowrap">{{ userNickname }}</div>
              <div class="text-subtitle-1 is-nowrap">{{ userBio }}</div>
            </div>
            <app-links-btn-group :options="children" query/>
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

const dataMap = [
  ['userId', 'id', ''],
  ['userNickname', 'nickname', ''],
  ['userBio', 'bio', ''],
  ['userAvatar', 'avatar', '']
]

const children = [
  {
    title: '图标',
    matchPath: '/user/detail/collections',
    route: {
      name: 'user-detail-collections'
    }
  },
  {
    title: '插画',
    matchPath: '/user/detail/illustrations',
    route: {
      name: 'user-detail-illustrations'
    }
  },
  {
    title: '收藏',
    matchPath: '/user/detail/likes',
    route: {
      name: 'user-detail-likes'
    }
  }
]

export default {
  mixins: [
    ui
  ],
  data () {
    return {
      detail: {},
      children
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    ...fromPairs(dataMap.map(e => [e[0], function () { return get(this.detail, e[1], e[2]) }]))
  },
  created () {
    this.userDetailLoad()
  },
  methods: {
    async userDetailLoad () {
      const result = await this.sdk.userDetail({
        id: this.$route.query.id
      })
      this.detail = result
    }
  }
}
</script>
