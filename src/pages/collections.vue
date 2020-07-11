<style lang="scss">
@include b(page-collections) {
  @extend %absoluteParent;
  @include e(topbar) {
    z-index: 1;
    @extend %absoluteTop;
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
        <div slot="header" :style="{ height: topbarHeight + 'px' }"/>
        <app-collection-list :value="list"/>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-collections__topbar">
      <app-search-bar
        v-model="keyword"
        placeholder="搜索图标库"
        :loading="isSearching"
        @submit="searchWithNewQuery"/>
    </div>
  </div>
</template>

<script>
import { fill } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // 搜索条件
      keyword: '',
      type: 3,
      sort: 'time',
      pageNo: 1,
      pageSize: 3,
      // 搜索结果
      list: fill(Array(6), { loading: true }),
      total: 0,
      // 搜索状态
      isSearched: false,
      isSearching: false,
      // UI
      topbarHeight: 0
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  mounted () {
    this.topbarHeight = this.$refs.topbar.offsetHeight
  },
  methods: {
    searchWithNewQuery () {
      this.fetchList()
    },
    async fetchList () {
      if (!this.keyword || this.isSearching) return
      const result = await this.sdk.collections({
        keyword: this.keyword,
        type: this.type,
        sort: this.sort,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
      // count: 163
      // limit: 9
      // lists: Array(9)
      // page: 1
      // sort: "time"
      console.log(result)
    }
  }
}
</script>
