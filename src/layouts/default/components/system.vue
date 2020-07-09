<template>
  <v-system-bar class="app-drag" color="primary" @dblclick="onDbclick" app dark window>
    <v-icon left>{{ icon }}</v-icon>
    <span>{{ title }}</span>
    <v-spacer></v-spacer>
    <v-icon v-if="!isFullScreen" @click="onClickMinimizeButton">mdi-minus</v-icon>
    <v-icon v-if="!isFullScreen" @click="onClickMaximizeButton">{{ isMaximized ? 'mdi-window-restore' : 'mdi-window-maximize' }}</v-icon>
    <v-icon @click="onClickFullScreenButton">{{ isFullScreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
    <v-icon @click="onClickCloseButton">mdi-close</v-icon>
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
      'isLogged',
      'userName'
    ]),
    title () {
      return this.isLogged ? `${this.userName} 已连接到 iconfont+` : '未登录'
    },
    icon () {
      return this.isLogged ? 'mdi-cloud-check-outline' : 'mdi-alert-rhombus-outline'
    }
  },
  methods: {
    ...mapActions('window', [
      'close',
      'toggleFullScreen',
      'toggleAlwaysOnTop',
      'toggleMaximize',
      'minimize'
    ]),
    onClickMinimizeButton (event) {
      event.target.blur()
      this.minimize()
    },
    onClickMaximizeButton (event) {
      event.target.blur()
      this.toggleMaximize()
    },
    onClickFullScreenButton (event) {
      event.target.blur()
      this.toggleFullScreen()
    },
    onClickCloseButton (event) {
      event.target.blur()
      this.close()
    },
    onDbclick () {
      this.toggleMaximize()
    }
  }
}
</script>
