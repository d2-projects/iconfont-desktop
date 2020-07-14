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
        <app-collection-list :value="collections"/>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-index__topbar pa-4">
      <app-input-search class="mx-auto" :placeholder="iconSearchPlaceholder" @submit="onSearch"/>
    </div>
  </div>
</template>

<script>
import { get, fill } from 'lodash-es'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      collections: fill(Array(6), { loading: true }),
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
    listItem (item) {
      return {
        loading: false,
        name: item.name,
        username: get(item, 'User.nickname', ''),
        avatar: get(item, 'User.avatar', ''),
        isOfficial: item.is_official === 1,
        icons: item.icons,
        countIcons: item.icons_count,
        countVisits: item.visits_count,
        countLikes: item.likes_count,
        countFavorite: item.favorite_count
      }
    },
    async getIndexData () {
      const result = await this.sdk.commonIndexConfig()
      this.collections = [
        ...result.topCollections,
        ...result.bottomCollections
      ].map(this.listItem)
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
