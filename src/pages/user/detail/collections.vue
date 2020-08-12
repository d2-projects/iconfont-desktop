<template>
  <app-collection-list :value="list.data">
    <template v-slot="{ collection }">
      <app-collection-mode-search-result :value="collection"/>
    </template>
  </app-collection-list>
</template>

<script>
import { mapState } from 'vuex'
import list from '@/mixins/list.js'

export default {
  mixins: [
    list
  ],
  data () {
    return {
      list: {
        page: {
          size: 6
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
      const fetch = this.sdk.userCollections({
        id: this.$route.query.id
      })
      const result = await this.listMininFetch(fetch)
      this.listMixinRemovePlaceholder()
      this.list.data = result.collections
    }
  }
}
</script>
