export default {
  name: 'system',
  render (h) {
    const node =
      <v-system-bar class="app-drag" color="primary" app dark window>
        <v-icon>mdi-message</v-icon>
        <span>10 unread messages</span>
        <v-spacer></v-spacer>
        <v-icon>mdi-minus</v-icon>
        <v-icon>mdi-checkbox-blank-outline</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-system-bar>
    return node
  }
}
