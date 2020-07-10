<template>
  <v-dialog
    :value="loading"
    width="300"
    overlay-color="rgba(0, 0, 0, 0)"
    persistent>
    <v-card color="primary" dark>
      <v-card-text class="pt-5">
        {{ loadingMessage }}
      </v-card-text>
      <v-progress-linear class="mb-0" color="white" indeterminate/>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'loading',
  data () {
    return {
      active: true
    }
  },
  computed: {
    ...mapState('sdk', [
      'loading',
      'loadingMessage'
    ])
  }
}
</script>
