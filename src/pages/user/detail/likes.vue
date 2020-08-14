<template>
  <app-icon-list :value="list.data" class="mb-2">
    <template v-slot="{ icon }">
      <app-square class="white rounded" center>
        <app-icon-render :value="icon.show_svg" :size="60"/>
      </app-square>
    </template>
  </app-icon-list>
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
