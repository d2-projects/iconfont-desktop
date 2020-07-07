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
}
</style>

<template>
  <div class="app-page">
    <!-- left -->
    <div class="app-page__side py-2 pl-2">
      <app-search-filter v-model="filter"/>
    </div>
    <!-- right -->
    <div class="app-page__main">
      <app-search-bar v-model="keyword" @submit="onSearchBarSubmit"/>
      <span v-for="item in list" :key="item.id" v-html="item.show_svg"></span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      keyword: '',
      filter: {
        collection: -1,
        fills: '',
        style: ''
      },
      list: [],
      count: 0
    }
  },
  methods: {
    ...mapActions('sdk', [
      'search'
    ]),
    async onSearchBarSubmit (keyword) {
      const result = await this.search({
        keyword: this.keyword,
        ...this.filter
      })
      this.list = result.icons
    }
  }
}
</script>
