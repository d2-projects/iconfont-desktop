<template>
  <v-system-bar
    class="app-drag"
    color="primary"
    app
    dark
    window>
    <v-row no-gutters>
      <v-col v-if="isLogged" cols="5" flex="cross:center">
        <v-icon left>mdi-cloud-check-outline</v-icon>
        <span class="font-weight-medium">已登录到 iconfont+</span>
      </v-col>
      <v-col v-else cols="5" flex="cross:center">
        <v-icon left>mdi-earth</v-icon>
        <span class="font-weight-medium is-pointer" @click="toLogin">登录到 iconfont+</span>
      </v-col>
      <v-col cols="2" flex="main:center cross:center">
        <span class="font-weight-medium"></span>
      </v-col>
      <v-col cols="5" flex="main:right cross:center">
        <span class="font-weight-medium"></span>
      </v-col>
    </v-row>
  </v-system-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'system',
  computed: {
    ...mapGetters('sdk', [
      'isLogged'
    ])
  },
  methods: {
    toLogin () {
      this.$go.setting.account()
    }
  }
}
</script>
