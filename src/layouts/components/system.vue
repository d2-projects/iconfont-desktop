<template>
  <v-system-bar
    class="app-drag"
    color="primary"
    @click="blurIcons"
    @dblclick="toggleMaximize"
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
        <span class="font-weight-medium">
          Iconfont Desktop
        </span>
      </v-col>
      <v-col cols="5" flex="main:right cross:center">
        <v-icon @click="toggleAlwaysOnTop">
          {{ isAlwaysOnTop ? 'mdi-layers' : 'mdi-layers-outline' }}
        </v-icon>
        <v-icon v-if="!isFullScreen" @click="minimize">
          mdi-minus
        </v-icon>
        <v-icon v-if="!isFullScreen" @click="toggleMaximize">
          {{ isMaximized ? 'mdi-window-restore' : 'mdi-window-maximize' }}
        </v-icon>
        <v-icon @click="toggleFullScreen">
          {{ isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
        </v-icon>
        <v-icon @click="close">
          mdi-close
        </v-icon>
      </v-col>
    </v-row>
  </v-system-bar>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'system',
  computed: {
    ...mapState('window', [
      'isMaximized',
      'isMinimized',
      'isFullScreen',
      'isAlwaysOnTop'
    ]),
    ...mapGetters('sdk', [
      'isLogged'
    ])
  },
  methods: {
    ...mapActions('window', [
      'close',
      'toggleFullScreen',
      'toggleAlwaysOnTop',
      'toggleMaximize',
      'minimize'
    ]),
    blurIcons () {
      this.$el.getElementsByClassName('v-icon')
        .forEach(icon => {
          icon.blur()
        })
    },
    toLogin () {
      this.$router.replace({
        name: 'setting-account'
      })
    }
  }
}
</script>
