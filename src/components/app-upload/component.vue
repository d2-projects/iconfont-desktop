<style lang="scss">
@include b(upload) {
  border: 1px solid map-get($grey, 'lighten-3');
}
</style>

<template>
  <div class="app-upload pa-4 is-rounded" @click="onClick">
    <v-img class="is-rounded" :src="value" height="90" width="90" aspect-ratio="1"/>
    <input
      ref="input"
      type="file"
      @change="fileSelected"
      style="display:none;">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-upload',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('sdk', [
      'sdk'
    ])
  },
  methods: {
    onClick () {
      console.log('onClick')
      this.$refs.input.click()
    },
    fileSelected (event) {
      const file = event.target.files[0]
      console.log(file)
    }
  }
}
</script>
