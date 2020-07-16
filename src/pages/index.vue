<style lang="scss">
@include b(page-index) {
  @extend .absolute-parent;
  @include e(topbar) {
    z-index: 1;
    @extend .absolute-top;
    @extend .backdrop;
  }
  @include e(content) {
    @extend .absolute-all;
  }
}
</style>

<route>
{
  "meta": {
    "sdk": true,
    "title": "首页",
    "icon": "mdi-home-variant"
  }
}
</route>

<template>
  <div class="app-page-index">
    <div class="app-page-index__content">
      <app-list>
        <div slot="header" :style="{ height: topbarHeight + 'px' }"/>
        <!-- row 1 -->
        <app-collection-list :value="topCollections">
          <template v-slot="{ collection }">
            <app-collection-mode-index-user :value="collection"/>
          </template>
        </app-collection-list>
        <!-- row 2 -->
        <app-collection-list :value="bottomCollections">
          <template v-slot="{ collection }">
            <app-collection-mode-index-official :value="collection"/>
          </template>
        </app-collection-list>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-index__topbar pa-4">
      <app-input-search
        class="mx-auto"
        :placeholder="iconSearchPlaceholder"
        @submit="onSearch"/>
    </div>
  </div>
</template>

<script>
import { fill } from 'lodash-es'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      topCollections: fill(Array(3), { loading: true }),
      bottomCollections: fill(Array(3), { loading: true }),
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
    this.getIndexData()
  },
  mounted () {
    this.topbarHeight = this.$refs.topbar.offsetHeight
  },
  methods: {
    async getIndexData () {
      const result = await this.sdk.commonIndexConfig()
      console.log(result)
      this.topCollections = result.topCollections
      this.bottomCollections = result.bottomCollections
    },
    onSearch (keyword) {
      if (keyword) {
        this.$router.replace({
          name: 'icons',
          query: {
            keyword
          }
        })
      }
    }
  }
}
</script>
