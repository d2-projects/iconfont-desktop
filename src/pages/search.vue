<style lang="scss">
$sidebarWidth: 240px;
@include b(page) {
  min-height: 100%;
  position: relative;
  @include e(side) {
    position: absolute;
    width: $sidebarWidth;
    top: 0px;
    bottom: 0px;
    left: 0px;
  }
  @include e(main) {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: $sidebarWidth;
    right: 0px;
  }
  @include e(main-topbar) {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 1;
    overflow: hidden;
    position: relative;
    transition: all .3s;
    background-color: rgba(#FFF, .8);
    backdrop-filter: saturate(180%) blur(6px);
    border-bottom: 1px solid #FFF;
    &:hover {
      background-color: rgba(#FFF, .9);
    }
  }
  @include e(main-content) {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
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
  <div class="app-page">
    <!-- left -->
    <div class="app-page__side pa-4 pr-0">
      <app-search-filter v-model="filter" @change="searchWithNewQuery"/>
    </div>
    <!-- right -->
    <div class="app-page__main">
      <div class="app-page__main-content">
        <app-icon-list
          :value="list"
          @inCordonY="onInCordonY">
          <div slot="header" :style="{ height: topbarHeight + 'px' }"/>
          <div slot="footer">
            <!-- 加载更多 -->
            <v-btn v-if="canLoadMore" color="primary" :loading="isSearching" @click="loadMore" text large block>
              加载更多 {{ list.length }}/{{ total }}
              <v-icon right>mdi-cloud-download-outline</v-icon>
            </v-btn>
            <!-- 全部加载完毕 -->
            <v-btn v-if="isLoadedAll" :ripple="false" text large block disabled>
              全部加载完毕
              <v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <!-- 没有搜索到数据 -->
            <v-btn v-if="isNoResult" :ripple="false" text large block disabled>
              无搜索结果
              <v-icon right>mdi-alert-circle-outline</v-icon>
            </v-btn>
          </div>
        </app-icon-list>
      </div>
      <div ref="topbar" class="app-page__main-topbar">
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
    this.topbarHeight = this.getTopbarHeight()
  },
  beforeRouteLeave (to, from, next) {
    this.list = []
    next()
  },
  methods: {
    getTopbarHeight () {
      return this.$refs.topbar.offsetHeight
    },
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
