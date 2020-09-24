<template>
  <app-list-icon :value="listMixinData" class="mb-2"/>
</template>

<script>
import { mapState } from 'vuex'
import mixinPageList from '@/mixins/page-list.js'

export default {
  mixins: [
    mixinPageList
  ],
  data () {
    return {
      list: {
        page: {
          size: 6 * 5
        }
      }
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  created () {
    this.listMixinLoad()
  },
  methods: {
    async listMixinLoad () {
      this.listMixinAddPlaceholder()
      const fetch = this.sdk.userLikes({
        id: this.$route.query.id
      })
      const result = await this.listMininFetch(fetch)
      this.listMixinRemovePlaceholder()
      this.list.data = result.icons
    }
  }
}
</script>
