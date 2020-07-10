<template>
  <div>
    <app-search-bar @submit="onSearch"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
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
