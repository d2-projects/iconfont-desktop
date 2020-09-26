<route>
{
  "meta": {
    "navigation": true
  }
}
</route>

<style lang="scss">
@include b(page-collection-detail) {
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
  <div class="app-page-collection-detail">
    <div class="app-page-collection-detail__content">
      <app-scroll-group ref="list">
        <div slot="header" :style="{ height: ui.topbar.size + 'px' }"/>
        <div slot="footer" :style="{ height: ui.bottombar.size + 'px' }"/>
        <app-list-icon :value="list.data" class="mb-2"/>
      </app-scroll-group>
    </div>
    <div ref="topbar" class="app-page-collection-detail__topbar">
      <v-container class="px-0">
        <v-skeleton-loader
          height="72"
          type="list-item-avatar-two-line"
          :loading="list.status.isSearching"
          transition="fade-transition">
          <div flex="cross:center">
            <app-avatar
              :avatar="creatorAvatar"
              :name="creatorNickname"
              :user-id="creatorId"
              :size="64"
              class="mr-4"/>
            <div>
              <div class="text-h6">{{ collectionName }}</div>
              <div class="text-caption">{{ collectionCountIcons }} icons</div>
              <div class="text-caption">{{ creatorNickname }}</div>
            </div>
          </div>
        </v-skeleton-loader>
      </v-container>
    </div>
  </div>
</template>

<script>
import { fromPairs, get, omit } from 'lodash-es'
import { mapState } from 'vuex'

import mixinPageUI from '@/mixins/page-ui.js'
import mixinPageList from '@/mixins/page-list.js'

export default {
  mixins: [
    mixinPageUI,
    mixinPageList
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
    ...fromPairs([
      ['collectionName', 'collection.name', ''],
      ['collectionCountIcons', 'collection.icons_count', 0],
      ['creatorId', 'creator.id', ''],
      ['creatorNickname', 'creator.nickname', ''],
      ['creatorAvatar', 'creator.avatar', '']
    ].map(e => [e[0], function () { return get(this.detail, e[1], e[2]) }]))
  },
  watch: {
    detail: 'uiLoad'
  },
  created () {
    this.listMixinLoad()
  },
  methods: {
    async listMixinLoad () {
      this.listMixinAddPlaceholder()
      const fetch = this.sdk.collectionDetail({
        id: this.$route.query.id
      })
      const result = await this.listMininFetch(fetch)
      this.listMixinRemovePlaceholder()
      this.list.data = result.icons
      this.detail = Object.freeze(omit(result, 'icons'))
    }
  }
}
</script>
