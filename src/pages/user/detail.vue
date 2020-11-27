<route>
{
  "meta": {
    "navigation": true
  }
}
</route>

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
      <app-scroll-group ref="list">
        <div slot="header" :style="{ height: ui.topbar.size + 'px' }"/>
        <router-view/>
      </app-scroll-group>
    </div>
    <div ref="topbar" class="app-page-user-detail__topbar">
      <v-container class="px-0">
        <v-skeleton-loader
          height="72"
          type="list-item-avatar-two-line"
          :loading="false"
          transition="fade-transition">
          <div flex="cross:center">
            <app-avatar
              :avatar="userAvatar | https"
              :name="userNickname"
              :size="64"
              class="mr-4"/>
            <div class="mr-auto">
              <div class="text-h6 is-nowrap">{{ userNickname }}</div>
              <div class="text-subtitle-1 is-nowrap">{{ userBio }}</div>
            </div>
            <app-nav-group-buttons :options="children" query/>
          </div>
        </v-skeleton-loader>
      </v-container>
    </div>
  </div>
</template>

<script>
import { fromPairs, get } from 'lodash-es'
import { mapState } from 'vuex'

import mixinPageUI from '@/mixins/page-ui.js'

export default {
  mixins: [
    mixinPageUI
  ],
  data () {
    return {
      detail: {},
      children: [
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
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    ...fromPairs([
      ['userId', 'id', ''],
      ['userNickname', 'nickname', ''],
      ['userBio', 'bio', ''],
      ['userAvatar', 'avatar', '']
    ].map(e => [e[0], function () { return get(this.detail, e[1], e[2]) }]))
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
