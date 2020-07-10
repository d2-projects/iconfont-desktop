<route>
{
  "meta": {
    "sdk": true
  }
}
</route>

<template>
  <div>
    <app-search-bar @submit="onSearch"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      keyword: '',
      row1: [],
      row2: []
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  async created () {
    const result = await this.sdk.commonIndexConfig()
    this.row1 = result.topCollections
    this.row2 = result.bottomCollections
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
