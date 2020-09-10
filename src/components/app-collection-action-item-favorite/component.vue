<template>
  <v-btn color="red" @click="onClick" text>
    <v-icon size="16" left>{{ icon }}</v-icon>
    {{ currentValue | numberFormat }}
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-collection-action-item-favorite',
  props: {
    value: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data () {
    const data = {}
    data.currentValue = this.value
    data.related = false
    return data
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ]),
    icon () {
      return `mdi-heart${this.related ? '' : '-outline'}`
    }
  },
  watch: {
    value (value) {
      this.currentValue = value
    }
  },
  methods: {
    async onClick () {
      const addResult = await this.sdk.collectionAddFavorite({ id: this.id })
      if (addResult.favorite_count === this.currentValue) {
        // 已经收藏过 取消收藏
        const delResult = await this.sdk.collectionDelFavorite({ id: this.id })
        this.currentValue = delResult.favorite_count
        this.related = false
      } else {
        // 收藏成功
        this.currentValue = addResult.favorite_count
        this.related = true
      }
    }
  }
}
</script>
