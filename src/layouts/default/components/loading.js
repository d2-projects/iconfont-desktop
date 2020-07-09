import { mapState } from 'vuex'

export default {
  name: 'loading',
  render () {
    const node =
      <v-dialog value={ this.initialization } persistent width="300" overlay-color="rgba(0,0,0,0)">
        <v-card color="primary" dark>
          <v-card-text class="pt-5">wating...</v-card-text>
          <v-progress-linear indeterminate color="white" class="mb-0"/>
        </v-card>
      </v-dialog>
    return node
  },
  data () {
    return {
      active: true
    }
  },
  computed: {
    ...mapState('sdk', [
      'initialization'
    ])
  }
}
