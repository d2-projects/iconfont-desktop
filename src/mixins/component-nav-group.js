export default {
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
      this.$router.push(_route)
    }
  }
}
