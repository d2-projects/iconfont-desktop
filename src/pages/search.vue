<style lang="scss">
$sidebarWidth: 240px;
@include b(page-search) {
  @extend %absoluteParent;
  @include e(side) {
    @extend %absoluteLeft;
    width: $sidebarWidth;
  }
  @include e(main) {
    @extend %absoluteAll;
    left: $sidebarWidth;
  }
  @include e(main-topbar) {
    z-index: 1;
    border-bottom: 1px solid #FFF;
    @extend %absoluteTop;
    @extend %backdrop;
  }
  @include e(main-content) {
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
  <div class="app-page-search">
    <!-- left -->
    <div class="app-page-search__side pa-4 pr-0">
      <app-search-filter v-model="filter" @change="searchWithNewQuery"/>
    </div>
    <!-- right -->
    <div class="app-page-search__main">
      <div class="app-page-search__main-content">
        <app-list @inCordonY="onInCordonY">
          <div slot="header" :style="{ height: topbarHeight + 'px' }"/>
          <div slot="footer">
            <!-- 加载更多 -->
            <v-btn v-if="canLoadMore" class="ma-1" color="primary" :loading="isSearching" @click="loadMore" text large block>
              加载更多 {{ list.length }}/{{ total }}
              <v-icon right>mdi-cloud-download-outline</v-icon>
            </v-btn>
            <!-- 全部加载完毕 -->
            <v-btn v-if="isLoadedAll" class="ma-1" :ripple="false" text large block disabled>
              全部加载完毕
              <v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <!-- 没有搜索到数据 -->
            <v-btn v-if="isNoResult" class="ma-1" :ripple="false" text large block disabled>
              无搜索结果
              <v-icon right>mdi-alert-circle-outline</v-icon>
            </v-btn>
          </div>
          <app-icon-list :value="list"/>
        </app-list>
      </div>
      <div ref="topbar" class="app-page-search__main-topbar">
        <app-search-bar
          v-model="keyword"
          :loading="isSearching"
          @submit="searchWithNewQuery"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // 搜索条件
      keyword: '',
      filter: {
        collection: -1,
        fills: '',
        style: ''
      },
      pageSize: 6 * 5,
      pageNo: 1,
      // 搜索结果
      list: [],
      total: 0,
      // 搜索状态
      isSearched: false,
      isSearching: false,
      // 自动加载前几页
      autoSearchCount: 0,
      autoSearchCountMax: 5,
      // UI
      topbarHeight: 0
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    canLoadMore () {
      return this.isSearched && this.total !== 0 && this.total !== this.list.length
    },
    isLoadedAll () {
      return this.isSearched && this.total !== 0 && this.total === this.list.length
    },
    isNoResult () {
      return this.isSearched && this.total === 0
    },
    canAutoSearch () {
      return this.autoSearchCount < this.autoSearchCountMax
    }
  },
  created () {
    this.keyword = this.$route.query.keyword || ''
    this.searchWithNewQuery()
  },
  mounted () {
    this.topbarHeight = this.$refs.topbar.offsetHeight
  },
  beforeRouteLeave (to, from, next) {
    this.list = []
    next()
  },
  methods: {
    reset () {
      this.list = []
      this.pageNo = 1
      this.isSearched = false
      this.autoSearchCount = 0
    },
    searchWithNewQuery () {
      this.reset()
      this.fetchList()
    },
    loadMore () {
      this.fetchList()
    },
    onInCordonY () {
      if (!this.isSearching && this.canLoadMore && this.canAutoSearch) {
        this.autoSearchCount += 1
        this.fetchList()
      }
    },
    async fetchList () {
      if (!this.keyword || this.isSearching) return
      this.isSearching = true
      const result = await this.sdk.iconSearch({
        keyword: this.keyword,
        ...this.filter,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      })
      this.pageNo += 1
      this.list.push(...result.icons)
      this.total = result.count
      this.isSearched = true
      this.isSearching = false
    }
  }
}
</script>
