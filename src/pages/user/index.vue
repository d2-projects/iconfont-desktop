<style lang="scss">
@include b(page-user) {
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
  <div class="app-page-user">
    <div class="app-page-user__content">
      <app-list ref="list">
        <div slot="header" :style="{ height: ui.topbar.size + 'px' }"/>
        <div slot="footer" :style="{ height: ui.bottombar.size + 'px' }"/>
        {{ list.data.length }}
      </app-list>
    </div>
    <div ref="topbar" class="app-page-user__topbar pa-4">
      <app-input-search
        class="mx-auto"
        v-model="list.query.keyword"
        placeholder="搜索图标库"
        :loading="list.status.isSearching"
        @submit="listMixinReload"/>
    </div>
    <div v-if="list.page.total" ref="bottombar" class="app-page-user__bottombar">
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
        page: {
          size: 10
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
    async listMixinLoad () {
      this.scrollTop()
      this.list.data = []
      this.listMixinAddPlaceholder()
      const fetch = this.sdk.userSearch({
        keyword: this.list.query.keyword,
        pageNo: this.list.page.current
      })
      const result = await this.listMininFetch(fetch)
      this.listMixinRemovePlaceholder()
      this.list.data = result.users
      this.list.page.total = result.count
    }
  }
}
</script>
