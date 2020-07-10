<template>
  <v-bottom-navigation class="app-drag" :value="this.active" @change="onChange" shift app>
    <v-btn v-for="nav of navs" :key="nav.value" :value="nav.value">
      <span>{{ nav.label }}</span>
      <v-icon>{{ nav.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'navigation',
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
</script>
