<style lang="scss">
@include b(page-collection) {
  @extend .absolute-parent;
  @include e(topbar) {
    z-index: 1;
    @extend .absolute-top;
    @extend .backdrop;
  }
  @include e(bottombar) {
    z-index: 1;
    @extend .absolute-bottom;
    @extend .backdrop;
  }
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<template>
  <div class="app-page-collection">
    <div class="app-page-collection__content">
      <app-list ref="list">
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
        <app-collection-list :value="list.data">
          <template v-slot="{ collection }">
            <app-collection-mode-search-result :value="collection"/>
          </template>
        </app-collection-list>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-collection__topbar pa-4">
      <app-input-search
        class="mx-auto"
        v-model="list.query.keyword"
        placeholder="搜索图标库"
        :loading="list.status.isSearching"
        @submit="listMixinReload"/>
    </div>
    <div v-if="list.page.total" ref="bottombar" class="app-page-collection__bottombar">
      <app-pagination v-model="list.page" @change="listMixinLoadMore"/>
    </div>
  </div>
</template>

<script>
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
          size: 9
        },
        setting: {
          searchWithoutKeywords: true
        }
      }
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  mounted () {
    this.listMixinLoad()
  },
  watch: {
    'list.page.total': 'uiLoad'
  },
  methods: {
    scrollTop () {
      const list = this.$refs.list
      if (!list) return
      const osInstance = list.getOsInstance()
      if (!osInstance) return
      osInstance.scroll(0)
    },
    async listMixinLoad () {
      this.scrollTop()
      this.list.data = []
      this.listMixinAddPlaceholder()
      const fetch = this.sdk.collections({
        keyword: this.list.query.keyword,
        type: this.list.query.type,
        sort: this.list.query.sort,
        pageNo: this.list.page.current,
        pageSize: this.list.page.size
      })
      const result = await this.listMininFetch(fetch)
      this.listMixinRemovePlaceholder()
      this.list.data = result.lists
      this.list.page.current = result.page
      this.list.page.size = result.limit
      this.list.page.total = result.count
    }
  }
}
</script>
