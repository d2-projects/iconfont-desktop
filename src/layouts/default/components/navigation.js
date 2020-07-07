export default {
  name: 'navigation',
  render (h) {
    const node =
      <v-bottom-navigation
        value={ this.active }
        shift={ true }
        app={ true }
        onChange={ this.onChange }>
        {
          this.navs.map(
            nav => <v-btn
              value={ nav.value }>
              <span>{ nav.label }</span>
              <v-icon>{ nav.icon }</v-icon>
            </v-btn>
          )
        }
      </v-bottom-navigation>
    return node
  },
  data () {
    return {
      navs: [
        { label: '首页', value: 'index', icon: 'mdi-home-variant' },
        { label: '库', value: 'collections', icon: 'mdi-image-multiple' },
        { label: '搜索', value: 'search', icon: 'mdi-magnify' },
        { label: '管理', value: 'manage', icon: 'mdi-account-box-multiple' },
        { label: '设置', value: 'setting', icon: 'mdi-tune' }
      ]
    }
  },
  computed: {
    active () {
      return this.$route.name
    }
  },
  methods: {
    onChange (name) {
      this.$router.replace({
        name
      })
    }
  }
}
