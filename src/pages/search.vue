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
    <div class="app-page__side py-2 pl-2">
      <app-search-filter v-model="filter" @change="doSearch"/>
    </div>
    <!-- right -->
    <div class="app-page__main">
      <div class="app-page__main-content">
        <app-icon-list :value="list">
          <div slot="header" :style="{ height: topbarHeight + 'px' }"></div>
        </app-icon-list>
      </div>
      <div ref="topbar" class="app-page__main-topbar">
        <app-search-bar v-model="keyword" @submit="doSearch"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      keyword: 'github',
      filter: {
        collection: -1,
        fills: '',
        style: ''
      },
      list: [],
      count: 0,
      topbarHeight: 0
    }
  },
  mounted () {
    this.topbarHeight = this.getTopbarHeight()
  },
  methods: {
    ...mapActions('sdk', [
      'search'
    ]),
    getTopbarHeight () {
      return this.$refs.topbar.offsetHeight
    },
    async doSearch () {
      const result = await this.search({
        keyword: this.keyword,
        ...this.filter,
        pageSize: 60
      })
      this.list = result.icons
    }
  }
}
</script>
