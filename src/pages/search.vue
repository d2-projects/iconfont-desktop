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
      <app-search-filter v-model="filter" @change="reload"/>
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
          :placeholder="iconSearchPlaceholder"
          :loading="isSearching"
          @submit="reload"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import fetchList from '@/mixins/fetch-list.js'

export default {
  mixins: [
    fetchList
  ],
  data () {
    return {
      // 搜索条件
      filter: {
        collection: -1,
        fills: '',
        style: ''
      },
      pageSize: 6 * 5,
      // UI
      topbarHeight: 0
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    ...mapGetters('sdk', [
      'iconSearchPlaceholder'
    ])
  },
  created () {
    this.keyword = this.$route.query.keyword || ''
    this.load()
  },
  mounted () {
    this.topbarHeight = this.$refs.topbar.offsetHeight
  },
  beforeRouteLeave (to, from, next) {
    this.list = []
    next()
  },
  methods: {
    async load () {
      const result = await this.fetchList(this.sdk.iconSearch({
        keyword: this.keyword,
        ...this.filter,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }))
      this.list.push(...result.icons)
      this.total = result.count
      this.pageNo += 1
    }
  }
}
</script>
