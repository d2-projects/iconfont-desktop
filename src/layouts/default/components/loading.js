export default {
  render () {
    const node =
      <v-dialog vModel={ this.active } persistent width="300" overlay-color="rgba(0,0,0,0)">
        <v-card color="primary" dark>
          <v-card-text class="pt-5">
            Loading
          </v-card-text>
          <v-progress-linear indeterminate color="white" class="mb-0"/>
        </v-card>
      </v-dialog>
    return node
  },
  data () {
    return {
      active: true
    }
  }
}
