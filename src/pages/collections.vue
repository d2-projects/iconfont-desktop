<style lang="scss">
@include b(page-collections) {
  @extend %absoluteParent;
  @include e(topbar) {
    z-index: 1;
    @extend %absoluteTop;
    @extend %backdrop;
  }
  @include e(bottombar) {
    z-index: 1;
    @extend %absoluteBottom;
    @extend %backdrop;
  }
  @include e(content) {
    @extend %absoluteAll;
  }
}
</style>

<route>
{
  "meta": {
    "sdk": true
  }
}
</route>

<template>
  <div class="app-page-collections">
    <div class="app-page-collections__content">
      <app-list>
        <div
          slot="header"
          :style="{ height: ui.topbar.size + 'px' }"/>
        <div
          slot="footer"
          :style="{ height: ui.bottombar.size + 'px' }"/>
        <app-dict-select-chip-group>
          <app-dict-select-chip
            v-model="list.query.type"
            name="collectionType"
            label="图标库"
            @change="listMixinReload"/>
          <app-dict-select-chip
            v-model="list.query.sort"
            name="collectionSort"
            label="排序"
            @change="listMixinReload"/>
        </app-dict-select-chip-group>
        <app-collection-list :value="list.data"/>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-collections__topbar pa-4">
      <app-input-search
        class="mx-auto"
        v-model="list.query.keyword"
        placeholder="搜索图标库"
        :loading="list.status.isSearching"
        @submit="listMixinReload"/>
    </div>
    <div v-if="list.page.total" ref="bottombar" class="app-page-collections__bottombar">
      <app-pagination v-model="list.page" @change="listMixinLoadMore"/>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash-es'
import { mapState } from 'vuex'

import ui from '@/mixins/ui.js'
import list from '@/mixins/list.js'

export default {
  mixins: [
    ui,
    list
  ],
  data () {
    return {
      list: {
        query: {
          type: 3,
          sort: 'time'
        },
        page: {
          size: 12
        }
      }
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  created () {
    this.listMixinLoad()
  },
  watch: {
    'list.page.total': 'uiLoad'
  },
  methods: {
    listItem (item) {
      return {
        loading: false,
        name: item.name,
        username: get(item, 'User.nickname', ''),
        avatar: get(item, 'User.avatar', ''),
        isOfficial: item.is_official === 1,
        icons: item.icons,
        countIcons: item.icons_count,
        countVisits: item.visits_count,
        countLikes: item.likes_count,
        countFavorite: item.favorite_count
      }
    },
    async listMixinLoad () {
      this.list.data = []
      this.listMixinAddPlaceholder()
      const result = await this.listMininFetch(this.sdk.collections({
        keyword: this.list.query.keyword,
        type: this.list.query.type,
        sort: this.list.query.sort,
        pageNo: this.list.page.current,
        pageSize: this.list.page.size
      }))
      this.listMixinRemovePlaceholder()
      this.list.data = result.lists.map(this.listItem)
      this.list.page.current = result.page
      this.list.page.size = result.limit
      this.list.page.total = result.count
    }
  }
}
</script>
