import { mapGetters } from 'vuex'

export default {
  name: 'system',
  render (h) {
    const node =
      <v-system-bar class="app-drag" color="primary" app dark window>
        <v-icon left>{ this.icon }</v-icon>
        <span>{ this.title }</span>
        <v-spacer></v-spacer>
        <v-icon>mdi-minus</v-icon>
        <v-icon>mdi-checkbox-blank-outline</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-system-bar>
    return node
  },
  computed: {
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
  }
}
