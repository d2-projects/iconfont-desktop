<style lang="scss">
@include b(page-collections-detail) {
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
  <div class="app-page-collections-detail">
    <div class="app-page-collections-detail__content">
      <app-list ref="list">
        <div
          slot="header"
          :style="{ height: ui.topbar.size + 'px' }"/>
        <div
          slot="footer"
          :style="{ height: ui.bottombar.size + 'px' }"/>
        <app-icon-list :value="list.data" class="mb-2">
          <template v-slot="{ icon }">
            <app-square class="white rounded" center>
              <app-icon-render :value="icon.show_svg" :size="60"/>
            </app-square>
          </template>
        </app-icon-list>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-collections-detail__topbar">
      <v-container class="px-0">
        <v-skeleton-loader
          height="72"
          type="list-item-avatar-two-line"
          :loading="list.status.isSearching"
          transition="fade-transition">
          <div flex="cross:center">
            <v-avatar :size="64" color="grey lighten-2" class="mr-4">
              <v-img v-if="createrAvatar" :src="createrAvatar"/>
              <span v-else-if="createrName" class="grey--text text--lighten-5 text-h4 font-weight-bold">
                {{ createrName[0] }}
              </span>
            </v-avatar>
            <div>
              <div class="text-h6">{{ name }}</div>
              <div class="text-caption">{{ countIcons }} icons</div>
              <div class="text-caption">{{ createrName }}</div>
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

import ui from '@/mixins/ui.js'
import list from '@/mixins/list.js'

const dataMap = [
  ['name', 'collection.name', ''],
  ['countIcons', 'collection.icons_count', 0],
  ['createrName', 'creater.nickname', ''],
  ['createrAvatar', 'creater.avatar', '']
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
          size: 36
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
