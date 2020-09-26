<style lang="scss">
@include b(assets-details-illustration) {
}
</style>

<template>
  <div
    class="app-assets-details-illustration px-5 py-2"
    flex="dir:left box:first">
    <div class="mr-5">
      <v-img :aspect-ratio="1" :src="displayImageUrl" width="200px" contain/>
    </div>
    <v-card flat>
      <v-list-item>
        <v-list-item-avatar color="grey">
          <v-img :src="createrAvatar"/>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ createrNickname }}</v-list-item-title>
          <v-list-item-subtitle>更新日期：{{ displayUpdatetime }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <p class="text--primary">"{{ displayImageName }}"</p>
        <p>所属插画库</p>
        <p>
          <v-btn
            v-for="collection of collections"
            :key="collection.id"
            small
            depressed
            color="primary">
            {{ collection.name }}
          </v-btn>
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn depressed @click="onClickDownloadSvg">SVG 下载</v-btn>
        <v-btn depressed @click="onClickDownloadPng">PNG 下载</v-btn>
        <v-btn depressed @click="onClickCopySvg">复制 SVG</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { get } from 'lodash-es'
import { mapState } from 'vuex'

export default {
  name: 'app-assets-details-illustration',
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    idKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      info: {}
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    displayImageName () {
      return get(this.info, 'name', '') || get(this.value, 'name', '')
    },
    displayImageUrl () {
      return get(this.info, 'origin_file', '') || get(this.value, 'origin_file', '')
    },
    displayUpdatetime () {
      const source = get(this.info, 'updated_at', '') || get(this.value, 'updated_at', '')
      return dayjs(source).format('YYYY-MM-DD')
    },
    createrAvatar () {
      return get(this.info, 'creater.avatar', '')
    },
    createrNickname () {
      return get(this.info, 'creater.nickname', '')
    },
    collections () {
      return get(this.info, 'collections', [])
    },
    originFile () {
      return get(this.info, 'origin_file', '') || get(this.value, 'origin_file', '')
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const result = await this.sdk.svgInfo({ id: this.value[this.idKey] })
      this.info = result
    },
    onClickDownloadSvg () {},
    onClickDownloadPng () {},
    async onClickCopySvg () {
      this.$clipboard.writeText(await this.sdk.getOriginFile(this.originFile))
    }
  }
}
</script>
