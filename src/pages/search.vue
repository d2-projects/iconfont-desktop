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
    transition: all .3s;
    &:hover {
      background-color: rgba(#FFF, .95);
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

<template>
  <div class="app-page">
    <!-- left -->
    <div class="app-page__side pa-4 pr-0">
      <app-search-filter v-model="filter" @change="onFilterChange"/>
    </div>
    <!-- right -->
    <div class="app-page__main">
      <div class="app-page__main-content">
        <app-icon-list :value="list" @scrollBottom="onScrollBottom">
          <div slot="header" :style="{ height: topbarHeight + 'px' }"></div>
          <div slot="footer">
            <!-- 加载更多 -->
            <v-btn v-if="showLoadMoreButton" color="primary" :loading="isSearching" @click="doSearch" text large block>
              加载更多 {{ list.length }}/{{ total }}
              <v-icon right>mdi-cloud-download-outline</v-icon>
            </v-btn>
            <!-- 全部加载完毕 -->
            <v-btn v-if="showLoadedAllButton" :ripple="false" text large block disabled>
              全部加载完毕
              <v-icon right>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <!-- 没有搜索到数据 -->
            <v-btn v-if="showEmptyButton" :ripple="false" text large block disabled>
              无搜索结果
              <v-icon right>mdi-alert-circle-outline</v-icon>
            </v-btn>
          </div>
        </app-icon-list>
      </div>
      <div ref="topbar" class="app-page__main-topbar">
        <app-search-bar v-model="keyword" @submit="onKeywordChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      // 搜索条件
      keyword: 'github',
      filter: {
        collection: -1,
        fills: '',
        style: ''
      },
      pageSize: 6 * 4,
      pageNo: 1,
      // 搜索结果
      list: [],
      total: 0,
      // 搜索状态
      isSearched: false,
      isSearching: false,
      // UI
      topbarHeight: 0
    }
  },
  computed: {
    showLoadMoreButton () {
      return this.isSearched && this.total !== 0 && this.total !== this.list.length
    },
    showLoadedAllButton () {
      return this.isSearched && this.total !== 0 && this.total === this.list.length
    },
    showEmptyButton () {
      return this.isSearched && this.total === 0
    }
  },
  mounted () {
    this.topbarHeight = this.getTopbarHeight()
  },
  beforeRouteLeave (to, from, next) {
    this.list = []
    next()
  },
  methods: {
    ...mapActions('sdk', [
      'search'
    ]),
    getTopbarHeight () {
      return this.$refs.topbar.offsetHeight
    },
    onScrollBottom () {
      this.doSearch()
    },
    resetSearchStatus () {
      this.list = []
      this.pageNo = 1
      this.isSearched = false
    },
    onFilterChange () {
      this.resetSearchStatus()
      this.doSearch()
    },
    onKeywordChange () {
      this.resetSearchStatus()
      this.doSearch()
    },
    async doSearch () {
      console.log('doSearch')
      this.isSearching = true
      const result = await this.search({
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
