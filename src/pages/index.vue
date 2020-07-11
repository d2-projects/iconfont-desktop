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
        <v-row class="mb-5">
          <v-col v-for="(collection, collectionIndex) of collections" :key="collectionIndex" xs="6" sm="6" md="4" lg="4" xl="2">
            <app-collection-card v-bind="collection"/>
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
import { get, fill } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      keyword: '',
      collections: fill(Array(6), { loading: true }),
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
    ].map(e => ({
      loading: false,
      name: e.name,
      username: get(e, 'User.nickname', ''),
      avatar: get(e, 'User.avatar', ''),
      isOfficial: e.is_official === 1,
      icons: e.icons,
      countIcons: e.icons_count,
      countVisits: e.visits_count,
      countLikes: e.likes_count,
      countFavorite: e.favorite_count
    }))
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
