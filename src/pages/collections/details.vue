<style lang="scss">
@include b(page-collections-details) {
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

<template>
  <div class="app-page-collections-details">
    <div class="app-page-collections-details__content">
      <app-list ref="list">
        <div
          slot="header"
          :style="{ height: ui.topbar.size + 'px' }"/>
        <div
          slot="footer"
          :style="{ height: ui.bottombar.size + 'px' }"/>
        <app-icon-list :value="list" class="mb-2"/>
      </app-list>
    </div>
    <div ref="topbar" class="app-page-collections-details__topbar">
      <v-container class="px-0">
        <div class="py-2" flex="cross:center">
          <v-avatar :size="64" color="grey lighten-2" class="mr-4">
            <v-img v-if="createrAvatar" :src="createrAvatar"/>
            <span v-else-if="createrName" class="grey--text text--lighten-5 text-h4 font-weight-bold">
              {{ createrName[0] }}
            </span>
          </v-avatar>
          <div>
            <div class="text-h6">{{ name }}</div>
            <div class="text-caption">{{ countIcons }} icons</div>
            <div class="text-caption">{{ createrName }}</div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { fromPairs, get } from 'lodash-es'
import { mapState } from 'vuex'
import ui from '@/mixins/ui.js'

const dataMap = [
  ['list', 'icons', []],
  ['name', 'collection.name', ''],
  ['countIcons', 'collection.icons_count', 0],
  ['createrName', 'creater.nickname', ''],
  ['createrAvatar', 'creater.avatar', '']
]

export default {
  mixins: [
    ui
  ],
  data () {
    return {
      detail: {}
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    ...fromPairs(dataMap.map(e => [e[0], function () { return get(this.detail, e[1], e[2]) }]))
  },
  watch: {
    detail: 'uiLoad'
  },
  created () {
    this.getCollectionDetail()
  },
  methods: {
    async getCollectionDetail () {
      const result = await this.sdk.collectionDetail({
        id: this.$route.query.id
      })
      this.detail = Object.assign({}, this.detail, result)
    }
  }
}
</script>
