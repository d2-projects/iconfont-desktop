<style lang="scss">
@include b(upload) {
  border: 1px solid map-get($grey, 'lighten-3');
}
</style>

<template>
  <div class="app-upload is-rounded" @click="onClick">
    <v-img
      v-if="value"
      class="is-rounded ma-2"
      :src="value"
      height="90"
      width="90"
      aspect-ratio="1"/>
    <div v-else class="text-subtitle-1 is-pointer px-2 py-1">
      点击上传图片
    </div>
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
      this.$refs.input.click()
    },
    async fileSelected (event) {
      const file = event.target.files[0]
      const result = await this.sdk.upload({
        filePath: file.path
      })
      this.$emit('input', result.url)
    }
  }
}
</script>
