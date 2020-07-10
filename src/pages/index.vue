<style lang="scss">
@include b(page-index) {
  @extend %absoluteParent;
  @include e(topbar) {
    z-index: 1;
    border-bottom: 1px solid #FFF;
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
  <div class="app-page-index">
    <div class="app-page-index__content">
      <app-list>
        <div slot="header" :style="{ height: topbarHeight + 'px' }"/>
        <p v-for="n in 100" :key="n">{{ n }}</p>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-index__topbar">
      <app-search-bar @submit="onSearch"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      keyword: '',
      row1: [],
      row2: [],
      // UI
      topbarHeight: 0
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  async created () {
    const result = await this.sdk.commonIndexConfig()
    this.row1 = result.topCollections
    this.row2 = result.bottomCollections
  },
  mounted () {
    this.topbarHeight = this.$refs.topbar.offsetHeight
  },
  methods: {
    onSearch (keyword) {
      if (keyword) {
        this.$router.replace({
          name: 'search',
          query: {
            keyword
          }
        })
      }
    }
  }
}
</script>
