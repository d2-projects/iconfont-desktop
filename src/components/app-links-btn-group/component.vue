<template>
  <v-btn-toggle :value="currentValue" rounded dense>
    <v-btn
      v-for="option of options"
      :key="option.route.name"
      :value="option.matchPath"
      @click="onClick(option.route)">
      {{ option.title }}
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  name: 'app-links-btn-group',
  props: {
    options: {
      type: Array,
      default: () => [],
      required: false
    },
    query: {
      type: Boolean
    }
  },
  data () {
    return {
      currentValue: ''
    }
  },
  watch: {
    $route: {
      handler (value) {
        const matchedPaths = value.matched.map(e => e.path)
        this.currentValue = this.options.reduce((result, option) => result || (matchedPaths.includes(option.matchPath) ? option.matchPath : ''), '')
      },
      immediate: true
    }
  },
  methods: {
    onClick (route) {
      const _route = route
      if (this.query) {
        _route.query = {
          ..._route.query,
          ...this.$route.query
        }
      }
      this.$router.replace(_route)
    }
  }
}
</script>
