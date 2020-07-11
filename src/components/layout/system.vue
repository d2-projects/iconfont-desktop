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
      <v-col cols="5">
        <v-icon left>{{ icon }}</v-icon>
        <span>{{ title }}</span>
      </v-col>
      <v-col cols="2" flex="main:center cross:center">
        <v-row justify="center" no-gutters>
          <v-col xs="10" sm="8" md="6" lg="5" xl="4">
            <v-progress-linear color="white" rounded indeterminate/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" flex="main:right">
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
    ]),
    title () {
      return this.isLogged ? '已登录到 iconfont+' : '未登录'
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
    blurIcons () {
      this.$el.getElementsByClassName('v-icon')
        .forEach(icon => {
          icon.blur()
        })
    }
  }
}
</script>
