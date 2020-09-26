<template>
  <app-sys-loading/>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'init',
  async created () {
    await this.autoLogin()
    this.$router.push(this.$route.query.redirect || '/')
  },
  methods: {
    ...mapActions('sdk', [
      'autoLogin'
    ])
  }
}
</script>
