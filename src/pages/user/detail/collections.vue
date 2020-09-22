<template>
  <app-collection-list :value="list.data">
    <template v-slot="{ collection }">
      <app-collection-mode-user :value="collection"/>
    </template>
  </app-collection-list>
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
