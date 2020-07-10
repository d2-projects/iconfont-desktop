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
      keyword: ''
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
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
