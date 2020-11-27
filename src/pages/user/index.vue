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
      <app-scroll-group ref="list">
        <div slot="header" :style="{ height: ui.topbar.size + 'px' }"/>
        <div slot="footer" :style="{ height: ui.bottombar.size + 'px' }"/>
        <app-user-card
          v-for="(user, userIndex) of list.data"
          :key="userIndex"
          :value="user"/>
      </app-scroll-group>
    </div>
    <div ref="topbar" class="app-page-user__topbar pa-4">
      <app-input-search
        class="mx-auto"
        v-model="list.query.keyword"
        placeholder="搜索用户"
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
        // 搜索条件
        query: {
          keyword: ''
        },
        // 分页
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
  watch: {
    'list.page.total': 'uiLoad'
  },
  methods: {
    async listMixinLoad () {
      this.listMixinScrollTop()
      this.list.data = []
      const fetch = this.sdk.userSearch({
        keyword: this.list.query.keyword,
        pageNo: this.list.page.current
      })
      const result = await this.listMininFetch(fetch)
      this.list.data = result.users
      this.list.page.total = result.count
    }
  }
}
</script>
