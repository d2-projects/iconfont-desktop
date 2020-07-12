export default {
  data () {
    return {
      ui: {
        topbar: {
          ref: 'topbar',
          size: 0,
          attr: 'offsetHeight'
        },
        bottombar: {
          ref: 'bottombar',
          size: 0,
          attr: 'offsetHeight'
        }
      }
    }
  },
  mounted () {
    this.uiLoad()
  },
  methods: {
    uiLoad () {
      this.$nextTick(() => {
        Object.keys(this.ui).forEach(name => {
          const item = this.ui[name]
          const element = this.$refs[item.ref]
          if (element) this.ui[name].size = element[item.attr]
        })
      })
    }
  }
}
