<style lang="scss">
@include b(page-index) {
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
  <div class="app-page-index">
    <div class="app-page-index__content">
      <app-list>
        <div slot="header" :style="{ height: topbarHeight + 'px' }"/>
        <v-row v-if="collections.length === 0" class="mb-5">
          <v-col v-for="n in 6" :key="n" xs="6" sm="6" md="4" lg="4" xl="2">
            <app-collection-card-skeleton/>
          </v-col>
        </v-row>
        <v-row v-else class="mb-5">
          <v-col v-for="item of collections" :key="item.id" xs="6" sm="6" md="4" lg="4" xl="2">
            <app-collection-card :value="item"/>
          </v-col>
        </v-row>
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
      collections: [],
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
    this.collections = [
      ...result.topCollections,
      ...result.bottomCollections
    ]
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
