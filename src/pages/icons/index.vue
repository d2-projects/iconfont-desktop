<style lang="scss">
$sidebarWidth: 240px;
@include b(page-search) {
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

<template>
  <div class="app-page-search">
    <div class="app-page-search__content">
      <app-list @inCordonY="listMixinOnInCordonY">
        <div
          slot="header"
          :style="{
            height: ui.topbar.size + 'px'
          }"/>
        <div slot="footer" class="ma-1 mb-2">
          <!-- 加载更多 -->
          <v-btn
            v-if="listMixinCanLoadMore"
            color="primary"
            :loading="list.status.isSearching"
            @click="listMixinLoadMore"
            text
            large
            block>
            加载更多 {{ list.data.length }}/{{ list.page.total }}
            <v-icon right>
              mdi-cloud-download-outline
            </v-icon>
          </v-btn>
          <!-- 全部加载完毕 -->
          <v-btn
            v-if="listMixinIsLoadedAll"
            :ripple="false"
            text
            large
            block
            disabled>
            全部加载完毕
            <v-icon right>
              mdi-checkbox-marked-circle-outline
            </v-icon>
          </v-btn>
          <!-- 没有搜索到数据 -->
          <v-btn
            v-if="listMixinIsNoResult"
            :ripple="false"
            text
            large
            block
            disabled>
            无搜索结果
            <v-icon right>
              mdi-alert-circle-outline
            </v-icon>
          </v-btn>
        </div>
        <app-dict-select-chip-group>
          <app-dict-select-chip
            v-model="list.query.collection"
            name="collection"
            label="分类"
            @change="listMixinReload"/>
          <app-dict-select-chip
            v-model="list.query.fills"
            name="fills"
            label="填充"
            @change="listMixinReload"/>
          <app-dict-select-chip
            v-model="list.query.sty"
            name="style"
            label="风格"
            @change="listMixinReload"/>
        </app-dict-select-chip-group>
        <app-icon-list :value="list.data"/>
      </app-list>
    </div>
    <div
      ref="topbar"
      class="app-page-search__topbar pa-4">
      <app-input-search
        class="mx-auto"
        v-model="list.query.keyword"
        :placeholder="iconSearchPlaceholder"
        :loading="list.status.isSearching"
        @submit="listMixinReload"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import ui from '@/mixins/ui.js'
import list from '@/mixins/list.js'

export default {
  mixins: [
    ui,
    list
  ],
  data () {
    return {
      list: {
        query: {
          collection: -1,
          fills: '',
          sty: ''
        },
        page: {
          size: 6 * 5
        }
      }
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
    this.list.query.keyword = this.$route.query.keyword || ''
    this.listMixinReload()
  },
  methods: {
    async listMixinLoad () {
      const result = await this.listMininFetch(this.sdk.iconSearch({
        keyword: this.list.query.keyword,
        collection: this.list.query.collection,
        fills: this.list.query.fills,
        style: this.list.query.sty,
        pageSize: this.list.page.size,
        pageNo: this.list.page.current
      }))
      this.list.data.push(...result.icons)
      this.list.page.total = result.count
      this.list.page.current += 1
    }
  }
}
</script>
