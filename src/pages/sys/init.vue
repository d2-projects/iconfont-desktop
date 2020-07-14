<template>
  <div>
    <v-dialog
      :value="true"
      width="300"
      overlay-color="rgba(0, 0, 0, 0)"
      persistent>
      <v-card color="primary" dark>
        <v-card-text class="pt-5">
          Loading
        </v-card-text>
        <v-progress-linear class="mb-0" color="white" indeterminate/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'init',
  computed: {
    ...mapState('sdk', [
      'loadingMessage'
    ])
  },
  async created () {
    await this.autoLogin()
    this.$router.replace(this.$route.query.redirect || '/')
  },
  methods: {
    ...mapActions('sdk', [
      'autoLogin'
    ])
  }
}
</script>
